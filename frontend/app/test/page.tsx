'use client';

import { useEffect, useState } from 'react';
import Papa, { ParseResult } from 'papaparse';
import { Sidebar } from '@/components/Sidebar/Sidebar';

interface CSVRow {
    [key: string]: string;
}

export default function Test() {
    const [csvData, setCsvData] = useState([]);

      const fetchCSVData = async () => {
        try {
          const response = await fetch('https://dsa-backend-1ca76fb6bbb8.herokuapp.com/datalake/raw/get_file/?file_name=test.csv');
          const csvRaw = await response.text();
          Papa.parse(csvRaw, {
            header: true,
            complete: (results: ParseResult<CSVRow>) => {
              setCsvData(results.data);
            },
          });
        } catch (error) {
          console.error('Error fetching CSV:', error);
        }
      };
      useEffect(() => {
        fetchCSVData();
      }, []);
  return (
    <>
      <div style={{ display: 'flex', height: '100vh' }}>
        <Sidebar />
        <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
            <div>
                {csvData.length > 0 ? (
                <table>
                    <thead>
                    {/* Render table headers based on the keys of the first object in the array */}
                    <tr>
                        {Object.keys(csvData[0]).map((header) => (
                        <th key={header}>{header}</th>
                        ))}
                    </tr>
                    </thead>
                    <tbody>
                    {/* Render each row */}
                    {csvData.map((row, index) => (
                        <tr key={index}>
                        {Object.values(row).map((value, cellIndex) => (
                            <td key={cellIndex}>{value}</td>
                        ))}
                        </tr>
                    ))}
                    </tbody>
                </table>
                ) : (
                <p>Loading CSV data...</p>
                )}
            </div>
        </div>

      </div>
    </>
  );
}
