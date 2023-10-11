import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';

// const data = [
//   {
//     name: 'Page A',
//     temprature: 4000,
//     percent: 2400,
//   },
//   {
//     name: 'Page B',
//     temprature: 3000,
//     percent: 1398,
//   },
//   {
//     name: 'Page C',
//     temprature: 2000,
//     percent: 9800,
//   },
//   {
//     name: 'Page D',
//     temprature: 2780,
//     percent: 3908,
//   },
//   {
//     name: 'Page E',
//     temprature: 1890,
//     percent: 4800,
//   },
//   {
//     name: 'Page F',
//     temprature: 2390,
//     percent: 3800,
//   },
//   {
//     name: 'Page G',
//     temprature: 3490,
//     percent: 4300,
//   },
// ];

function LineChartComponent(props) {
  return (
    <div style={{height:props.height,width:props.width}}>
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        width={500}
        height={300}
        data={props.data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="chart" label={{ value: props.name, fill: "red" }} />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey={props.dataKey1} stroke="#8884d8" activeDot={{ r: 8 }} />
        <Line type="monotone" dataKey={props.dataKey2} stroke="#82ca9d" />
        <Legend />
      </LineChart>
    </ResponsiveContainer>
    </div>
  );
}

export default LineChartComponent;
