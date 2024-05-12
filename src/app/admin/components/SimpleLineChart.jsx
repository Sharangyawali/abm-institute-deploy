"use client"
import React from 'react';
import { XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area,AreaChart } from 'recharts';


const SimpleLineChart = ({data}) => {
  return (
    <ResponsiveContainer>
    <AreaChart
      data={data}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="1 5" />
      <XAxis strokeWidth={0} dataKey="name" />
      <YAxis strokeWidth={0} />
      <Tooltip />
      {/* <Legend /> */}
        <Area type="monotone"  fill='#fc9003' dataKey="present" strokeWidth={3} stroke="#fc9003" fillOpacity={0.2}/>
        <Area type="monotone" dataKey="absent"  stroke="#1bc5d1" fillOpacity={0} />
    </AreaChart>
  </ResponsiveContainer>
  )
}

export default SimpleLineChart
