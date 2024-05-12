"use client"
import React from 'react'
import { PieChart, Pie, Sector, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const PieChartWithPaddingAngle = ({data}) => {
  const COLORS = ['#fc9003', '#00ccff', '#dadada'];
  return (
    <ResponsiveContainer>
    <PieChart>
        <Pie 
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={70}
          outerRadius={100}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell  key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
          <Tooltip/>
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  )
}

export default PieChartWithPaddingAngle
