'use client';

import React from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { parseCSV } from '../../utils/parseCSV';

interface DataItem {
  'Units Sold': number;
  Date: string;
  'Data Type': string;
}

export default function ForecastChart() {
  const [data, setData] = React.useState<DataItem[]>([]);

  React.useEffect(() => {
    async function fetchData() {
      const result = await parseCSV('/forecast_data_sample.csv');
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
        data={data.filter(item => item['Data Type'] === 'History')}
      />
      <Line 
        type="monotone" 
        dataKey="Units Sold"
        stroke="#8884d8"
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





