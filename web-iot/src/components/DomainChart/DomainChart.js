import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

// const data = [
//   {
//     ppm: 4000,
//     pv: 2400,
//     amt: 2400,
//   },
//   {
//     ppm: 3000,
//     pv: 1398,
//     amt: 2210,
//   },
//   {
//     ppm: 2000,
//     pv: 9800,
//     amt: 2290,
//   },
//   {
//     ppm: 2780,
//     pv: 3908,
//     amt: 2000,
//   },
//   {
//     ppm: 1890,
//     pv: 4800,
//     amt: 2181,
//   },
//   {
//     ppm: 2390,
//     pv: 3800,
//     amt: 2500,
//   },
//   {
//     ppm: 3490,
//     pv: 4300,
//     amt: 2100,
//   },
//   {
//     ppm: 3490,
//     pv: 4300,
//     amt: 2100,
//   },
// ];

function DomainChart(props) {
  return (
    <div style={{height:props.height,width:props.width,marginBottom:"30px",marginLeft:"20px"}}>
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        width={500}
        height={400}
        data={props.data}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="chart" label={{ value: props.name, fill: "red" }} />
        <YAxis/>
        <Tooltip />
        <Area type="monotone" dataKey={props.dataKey} stroke="#8884d8" fill="#4CD9D9" />
        <Legend />
      </AreaChart>
    </ResponsiveContainer>
    </div>
  );
}

export default DomainChart;
