'use client';
import React from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { parseCSV } from '../../utils/parseCSV';

export default function ForecastChart() {
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    async function fetchData() {
      const result = await parseCSV('/forecast_data_one_year.csv');
      setData(result);
    }

    fetchData();
  }, []);

  return (
    <LineChart width={800} height={400} data={data}>
      <Line 
        type="monotone" 
        dataKey="Units Sold"
        stroke="#8884d8"
        dot={false}
        isAnimationActive={false}
        connectNulls
        strokeDasharray="none"
        data={data.filter(item => item['Waterfall-Component'] === 'historical')}
      />
      <Line 
        type="monotone" 
        dataKey="Units Sold"
        stroke="#8884d8"
        dot={false}
        isAnimationActive={false}
        connectNulls
        strokeDasharray="3 3"
        data={data.filter(item => item['Waterfall-Component'] === 'prediction')}
      />
      <CartesianGrid stroke="#ccc" />
      <XAxis dataKey="Date" />
      <YAxis />
      <Tooltip />
      <Legend />
    </LineChart>
  );
}
