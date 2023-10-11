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
  Scatter,
  ResponsiveContainer,
} from 'recharts';

// const data = [
//   {
//     name: 'Page A',
//     TDS: 590,
//     do: 800,
//     waterlevel: 1400,
//     temperature: 490,
//   },
//   {
//     name: 'Page B',
//     TDS: 868,
//     do: 967,
//     waterlevel: 1506,
//     temperature: 590,
//   },
//   {
//     name: 'Page C',
//     TDS: 1397,
//     do: 1098,
//     waterlevel: 989,
//     temperature: 350,
//   },
//   {
//     name: 'Page D',
//     TDS: 1480,
//     do: 1200,
//     waterlevel: 1228,
//     temperature: 480,
//   },
//   {
//     name: 'Page E',
//     TDS: 1520,
//     do: 1108,
//     waterlevel: 1100,
//     temperature: 460,
//   },
//   {
//     name: 'Page F',
//     TDS: 1400,
//     do: 680,
//     waterlevel: 1700,
//     temperature: 380,
//   },
// ];

function CollapseChart(props) {
  return (
    <div style={{width:props.width,height:props.height,marginLeft:"50px",marginTop:"50px"}}>
    <ResponsiveContainer width="100%" height="100%">
      <ComposedChart
        width={500}
        height={400}
        data={props.data}
        margin={{
          top: 20,
          right: 20,
          bottom: 20,
          left: 20,
        }}
      >
        <CartesianGrid stroke="#f5f5f5" />
        <XAxis dataKey="chart" label={{ value:props.name, fill: "red" }} />
        <YAxis />
        <Tooltip />
        <Legend />
        <Area type="monotone" dataKey={props.key1} fill="#66CDAA" stroke="#8884d8" />
        <Bar dataKey={props.key2} barSize={20} fill="#413ea0" />
        <Line type="monotone" dataKey={props.key3} stroke="#ff7300" />
        <Scatter dataKey={props.key4} fill="red" />
      </ComposedChart>
    </ResponsiveContainer>
    </div>
  );
}

export default CollapseChart;
