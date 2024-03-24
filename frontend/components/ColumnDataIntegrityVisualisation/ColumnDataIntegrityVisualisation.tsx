import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, Cell, LabelList, Tooltip } from 'recharts';

interface DataItem {
  name: string;
  value: number;
}

interface ColumnDataIntegrityVisualisationProps {
  nullValues: number;
  duplicateValues: number;
  totalRows: number;
}

// eslint-disable-next-line max-len
const ColumnDataIntegrityVisualisation: React.FC<ColumnDataIntegrityVisualisationProps> = ({ nullValues, duplicateValues, totalRows }) => {
  const data: DataItem[] = [
    {
      name: 'Null Values',
      value: totalRows > 0 ? (nullValues / totalRows) * 100 : 0,
    },
    {
      name: 'Duplicate Values',
      value: totalRows > 0 ? (duplicateValues / totalRows) * 100 : 0,
    },
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="custom-tooltip" style={{ backgroundColor: '#fff', border: '1px solid #ccc' }}>
          <p>{data.name}</p>
        </div>
      );
    }

    return null;
  };

  return (
    <ResponsiveContainer width="100%" height={70}>
      <BarChart
        layout="vertical"
        data={data}
        barCategoryGap="15%"
        barGap={2}
        margin={{ top: 25, right: 55, left: 0, bottom: 5 }} // Adjusted right margin
      >
        <XAxis type="number" domain={[0, 100]} hide />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: 'transparent' }} />
        <Bar dataKey="value" barSize={20} fill="#82ca9d">

          <LabelList
            dataKey="value"
            position="right"
            content={({ value, x, y, width, height }) => (
              <text
                x={x + width + 10} // Adjust this value as needed
                y={y + height / 2}
                fill="#000"
                textAnchor="start"
                dominantBaseline="middle"
              >
                {`${value.toFixed(2)}%`}
              </text>
            )}
          />
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#8884d8' : '#82ca9d'} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default ColumnDataIntegrityVisualisation;
