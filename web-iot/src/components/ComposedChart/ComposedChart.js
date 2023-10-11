import React from 'react';
import {
  ComposedChart,
  Line,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

// const data = [
//   {
//     name: 'Page A',
//     uv: 590,
//     pv: 800,
//     amt: 1400,
//   },
//   {
//     name: 'Page B',
//     uv: 868,
//     pv: 967,
//     amt: 1506,
//   },
//   {
//     name: 'Page C',
//     uv: 1397,
//     pv: 1098,
//     amt: 989,
//   },
//   {
//     name: 'Page D',
//     uv: 1480,
//     pv: 1200,
//     amt: 1228,
//   },
//   {
//     name: 'Page E',
//     uv: 1520,
//     pv: 1108,
//     amt: 1100,
//   },
//   {
//     name: 'Page F',
//     uv: 1400,
//     pv: 680,
//     amt: 1700,
//   },
// ];
function ComposedChartComponent(props){
    const data = props.data.map(item =>({
        name: item.station_id, 
        pm10: item.pm10, 
        pm25: item.pm25, 
        ec: item.ec, 
    }));
  return (
    <div style={{width:"700px",height:"450px"}}>
    <ResponsiveContainer width="100%" height="100%">
      <ComposedChart
        width={500}
        height={400}
        data={data}
        margin={{
          top: 20,
          right: 80,
          bottom: 20,
          left: 20,
        }}
      >
        <CartesianGrid stroke="#f5f5f5" />
        <XAxis dataKey="chart" label={{ value: props.name, fill: "red" }} />
        <Tooltip />
        <YAxis />
        <Legend />
        <Area type="monotone" dataKey={props.key1} fill="#66CDAA" stroke="#8884d8" />
        <Bar dataKey={props.key2} barSize={20} fill="#413ea0" />
        <Line type="monotone" dataKey={props.key3} stroke="#ff7300" />
      </ComposedChart>
    </ResponsiveContainer>
    </div>
  );
};

export default ComposedChartComponent;
