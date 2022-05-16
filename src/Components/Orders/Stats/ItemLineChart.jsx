import React from 'react'
import { LineChart, Line } from 'recharts';

export default function ItemLineChart(props) {
    const data = props.data;

    const renderLineChart = (
        <LineChart width={400} height={400} data={data}>
          <Line type="monotone" dataKey="uv" stroke="#8884d8" />
        </LineChart>
    )
    
  return (
    <div>{renderLineChart}</div>
  )
}
