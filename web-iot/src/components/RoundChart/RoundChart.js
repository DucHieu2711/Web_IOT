import React, { useState, useEffect } from 'react';
import { VictoryPie, VictoryAnimation, VictoryLabel } from 'victory';

function RoundChart({ customThreshold }) {
  const [percent, setPercent] = useState(0);
  const [data, setData] = useState([{ x: 1, y: 0 }, { x: 2, y: 100 }]);
  const [isPaused, setIsPaused] = useState(false);
  let resetTimeout;
  let setStateInterval;
  const chartName = "Độ ẩm(%)";
  useEffect(() => {
    // Chuyển đổi customThreshold thành số nguyên
    const threshold = parseInt(customThreshold, 10);
    if (!isNaN(threshold)) {
      runChart(threshold);
    }
  }, [customThreshold]);

  useEffect(() => {
    return () => {
      if (resetTimeout) {
        clearTimeout(resetTimeout);
      }
      if (setStateInterval) {
        clearInterval(setStateInterval);
      }
    };
  }, []);

  const resetChart = () => {
    setIsPaused(true);
    resetTimeout = setTimeout(() => {
      setPercent(0);
      setData(getData(0));
      setIsPaused(false);
      // Chuyển đổi customThreshold thành số nguyên
      const threshold = parseInt(customThreshold, 10);
      if (!isNaN(threshold)) {
        runChart(threshold);
      }
    }, 3000); // 3 giây
  };

  const runChart = (customThreshold) => {
    let percent = 0;
    setStateInterval = setInterval(() => {
      if (!isPaused) {
        percent += Math.random() * 25;
        percent = percent > customThreshold ? customThreshold : percent;
        setPercent(percent);
        setData(getData(percent));

        if (percent === customThreshold) {
          clearInterval(setStateInterval);
          resetChart();
        }
      }
    }, 1500);
  };

  const getData = (percent) => {
    return [{ x: 1, y: percent }, { x: 2, y: 100 - percent }];
  };

  return (
    <div style={{marginLeft:"100px",marginTop:"30px"}}>
      <svg width="400" height="400" style={{border:"red 1px solid",background:"white",borderRadius:"10px"}}>
        <VictoryPie
          standalone={false}
          animate={{ duration: 1000 }}
          width={400}
          height={400}
          data={data}
          innerRadius={120}
          cornerRadius={25}
          labels={() => null}
          style={{
            data: {
              fill: ({ datum }) => {
                const color = datum.y > 30 ? 'green' : 'red';
                return datum.x === 1 ? color : 'transparent';
              },
            },
          }}
        />
        <VictoryAnimation duration={1000} data={{ percent }}>
          {(newProps) => {
            return (
              <>
                <VictoryLabel
                  textAnchor="middle"
                  verticalAnchor="middle"
                  x={200}
                  y={170}
                  text={`${Math.round(newProps.percent)}%`}
                  style={{ fontSize: 45 }}
                />
                <VictoryLabel
                  textAnchor="middle"
                  verticalAnchor="middle"
                  x={200}
                  y={230}
                  text={chartName}
                  style={{ fontSize: 20, fill: '#484848' }}
                />
              </>
            );
          }}
        </VictoryAnimation>
      </svg>
    </div>
  );
}

export default RoundChart;
