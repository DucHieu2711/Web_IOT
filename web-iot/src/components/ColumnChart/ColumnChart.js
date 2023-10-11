import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Label, Legend
} from 'recharts';

// const data = [
//   {
//     name: 'Page A',
//     temperature: 1000,
//   },
//   {
//     name: 'Page B',
//     temperature: 3000,
//   },
//   {
//     name: 'Page C',
//     temperature: 2000,
//   },
//   {
//     name: 'Page D',
//     temperature: 2780,
//   },
//   {
//     name: 'Page E',
//     temperature: 1890,
//   },
//   {
//     name: 'Page F',
//     temperature: 2390,
//   },
//   {
//     name: 'Page G',
//     temperature: 3490,
//   },
// ];
// chuyển thành kí hiệu độ C
function CustomTooltip({ active, payload, label }) {
  if (active && payload && payload.length > 0) {
    return (
      <div className="custom-tooltip">
        <p className="label">{`${label} : ${payload[0].value}°C`}</p>
      </div>
    );
  }

  return null;
}
function ColumnChart(props) {
  const { name, dataKey, data } = props;  // Sử dụng destructuring để truy cập props
  return (
    <div style={{ height: "300px", width: "350px" }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="chart" label={{ value: name, fill: "red" }} />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
            <Bar dataKey={dataKey} fill="#FFA500">
              <Label value="°C" position="top" />
            </Bar>
          <Legend />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}


export default ColumnChart;


