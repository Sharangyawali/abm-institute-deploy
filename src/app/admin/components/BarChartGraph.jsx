"use client"
import React from 'react'
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid,ResponsiveContainer, LabelList } from 'recharts';

const BarChartGraph = ({data}) => {
  const colors = ['orange', '#0044ff', '#c300ff', '#00e1ff', '#cfcfce'];
  return (
    <ResponsiveContainer>
    <BarChart
    width="95%"
    height="100%"
    data={data}
    margin={{
      top: 20,
      right: 30,
      left: 50,
      bottom: 5,
    }}
    layout='vertical'
  >
    <CartesianGrid strokeDasharray="1 5" />
    <XAxis strokeWidth={0} type='number' hide={true}/>
    <YAxis strokeWidth={0} dataKey="name" type='category' fontWeight="bold"/>
    <Bar dataKey="uv" fill="#8884d8" >
      <LabelList dataKey="uv" position="insideLeft" fill="#ffffff" fontSize={12} fontWeight="bold"/>
      {data.map((entry, index) => (
        <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
      ))}
    </Bar>
  </BarChart>
    </ResponsiveContainer>
  )
}

export default BarChartGraph
