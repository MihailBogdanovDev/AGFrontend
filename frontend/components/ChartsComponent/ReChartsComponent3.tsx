'use client';

import React from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { parseCSV } from '../../utils/parseCSV';

export default function ForecastChart() {
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    async function fetchData() {
      const result = await parseCSV('/forecast_data_adjusted2.csv');
      setData(result);
    }

    fetchData();
  }, []);

  return (
    <LineChart width={800} height={400} data={data}>
      {/* Historical data line */}
      <Line 
        type="monotone" 
        dataKey="Units Sold"
        stroke="#8884d8"
        dot={false}
        isAnimationActive={false}
        connectNulls
        data={data.filter(item => item['Data Type'] === 'Historical')}
      />
      {/* Prediction data line */}
      <Line 
        type="monotone" 
        dataKey="Units Sold"
        stroke="#82ca9d"
        dot={false}
        isAnimationActive={false}
        connectNulls
        strokeDasharray="3 3"
        data={data.filter(item => item['Data Type'] === 'Prediction')}
      />
      <CartesianGrid stroke="#ccc" />
      <XAxis dataKey="Date" />
      <YAxis />
      <Tooltip />
      <Legend />
    </LineChart>
  );
}
