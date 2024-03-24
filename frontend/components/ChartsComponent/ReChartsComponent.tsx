import React, { useState, useEffect, useRef } from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { parseCSV } from '../../utils/parseCSV';

export default function ForecastChart() {
  const [data, setData] = useState([]);
  const chartRef = useRef<HTMLDivElement>(null); // Explicitly typing the ref
  const [chartWidth, setChartWidth] = useState(500); // Default width

  useEffect(() => {
    async function fetchData() {
      const result = await parseCSV('/forecast_data.csv');
      setData(result);
    }

    fetchData();

    // Adjust chart width based on container size
    const handleResize = () => {
      if (chartRef.current) {
        setChartWidth(chartRef.current.offsetWidth); // Now TypeScript knows the type of chartRef.current
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div ref={chartRef} style={{ width: '100%' }}>  {/* Container for the chart */}
      <LineChart width={chartWidth} height={300} data={data}>
        <Line type="monotone" dataKey="Units Sold" stroke="#8884d8" />
        <CartesianGrid stroke="#ccc" />
        <XAxis dataKey="Date" />
        <YAxis />
        <Tooltip />
        <Legend />
      </LineChart>
    </div>
  );
}
