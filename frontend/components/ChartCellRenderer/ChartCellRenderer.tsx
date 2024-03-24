import React from 'react';
import { LineChart, Line } from 'recharts';

const ChartCellRenderer = ({ value /*value has type any*/ }) =>
    // Assuming value is an array of data for the chart
     (
        <LineChart width={100} height={50} data={value}>
            <Line type="monotone" dataKey="value" stroke="#8884d8" />
        </LineChart>
    );
export default ChartCellRenderer;
