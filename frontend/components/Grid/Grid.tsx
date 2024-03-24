'use client';

import { SimpleGrid, useMantineTheme, LoadingOverlay } from '@mantine/core';
import Image from 'next/image';
import { useEffect, useState } from 'react';
//import { useRouter } from 'next/router';
import { useRouter } from 'next/navigation';
import { AgGridReact } from 'ag-grid-react'; // React Grid Logic
import 'ag-grid-community/styles/ag-grid.css'; // Core CSS
import 'ag-grid-community/styles/ag-theme-balham.css'; // Theme CSS
import './tablePreview.css';

interface Dataset {
  id: string;
  name: string;
  last_modified: string;
}

export function GridView({ style }: { style?: React.CSSProperties }) {
  const theme = useMantineTheme();
  const [datasets, setDatasets] = useState<Dataset[]>([]);
  const [hovered, setHovered] = useState<string | null>(null); //Hovered is not used currently leave for now.
  const [isLoading, setLoading] = useState(true);
  const [datasetPreviews, setDatasetPreviews] = useState<Record<string, string[][]>>({});
  const [columnDefs, setColumnDefs] = useState<Record<string, any[]>>({});
  const [gridApi, setGridApi] = useState<any>(null);
  const [currentSelection, setCurrentSelection] = useState('raw'); // 'raw' or 'clean'
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch the list of datasets
        // For localhost replace with: http://localhost:8000/datalake/list_raw_files/
        // For heroku replace with: https://dsa-backend-1ca76fb6bbb8.herokuapp.com/datalake/list_raw_files/
        const endpoint = currentSelection === 'raw' ?
        'http://localhost:8000/datalake/list_raw_files/' :
        'http://localhost:8000/datalake/list_clean_files/'; // Replace with your actual endpoint for clean files

        const datasetsResponse = await fetch(endpoint);
        if (!datasetsResponse.ok) {
          throw new Error('Network response was not ok');
        }
        const datasetsData = await datasetsResponse.json();
        setDatasets(datasetsData.csv_files);

        // Initialize objects to hold column definitions and preview data
        const columnDefinitions: Record<string, any[]> = {};
        const previews: Record<string, any[]> = {};

        // Fetch column headers and first three rows for each dataset
        // eslint-disable-next-line no-restricted-syntax
        for (const dataset of datasetsData.csv_files) {
           //For heroku replace with: https://dsa-backend-1ca76fb6bbb8.herokuapp.com/datalake/get_dataset_details/?dataset_id=${dataset.name}&page=1&page_size=3
           //For localhost replace with: http://localhost:8000/datalake/get_dataset_details/?dataset_id=${dataset.name}&page=1&page_size=3

           // eslint-disable-next-line no-await-in-loop
          const detailsResponse = await fetch(`http://localhost:8000/datalake/get_dataset_details/?dataset_id=${dataset.name}&page=1&page_size=3`);
          if (!detailsResponse.ok) {
            throw new Error('Network response was not ok');
          }
          // eslint-disable-next-line no-await-in-loop
          const detailsData = await detailsResponse.json();

          // Store the column definitions for AG Grid
          columnDefinitions[dataset.id] = detailsData.columns.map((col: string) => ({
            headerName: col,
            field: col,
            sortable: false,
            filter: false,
            width: 148,
          }));

          // Store the first three rows of data for preview
          previews[dataset.id] = detailsData.data;
        }

        // Update the state with the fetched data
        setColumnDefs(columnDefinitions);
        setDatasetPreviews(previews);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [router, currentSelection]);

  const onGridReady = (params: any, datasetId: string) => {
    setGridApi({ ...gridApi, [datasetId]: params.api });
    params.api.sizeColumnsToFit(); // Make the columns fit the container
  };

  const toggleSelection = (selection: string) => {
    setCurrentSelection(selection);
  };

  const handleDatasetClick = (id: string) => {
    router.push(`/datasets/${id}`); // Navigate to the dataset detail page
  };

  // eslint-disable-next-line max-len
  const transformToRowData = (previewRows: string[][], columnHeaders: any[]) => previewRows.map(row => {
    const slicedRow = row.slice(0, 3);
    const rowObject = {};
    slicedRow.forEach((value, index) => {
      const colDef = columnHeaders[index];
      if (colDef) {
        rowObject[colDef.field] = value; //Type any leave for now
      }
    });
      return rowObject;
    });

  // Define common styles for each Grid.Col

  const uploadButtonStyle = {
    height: '160px',
    backgroundColor: theme.colors.white, // This is Mantine's secondary blue color. Adjust the shade (e.g., blue[5], blue[7]) if needed.
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '8px',
    border: '3px solid var(--mantine-color-blue-light-color)',
    color: 'var(--mantine-color-blue-light-color)',
    fontWeight: '800',
  };

  const datasetNameStyle = {
    fontSize: '20px',
    fontWeight: 'bold',
    color: theme.colors.dark[9],
    textAlign: 'left',
    cursor: 'pointer',
    flex: 1, // Take up remaining space to push the icon to the right
  };

  const datasetHeaderStyle = {
    display: 'flex',
    justifyContent: 'space-between', // Align items to the left and right
    alignItems: 'center', // Center items vertically
    marginBottom: '10px', // Space between header and table
  };

  // Utility function to truncate strings
const truncateString = (str, num) => {
  if (str.length <= num) {
    return str;
  }
  return str.slice(0, num) + '...';
};

const activeButtonStyle = {
  backgroundColor: theme.colors.blue[6], // Blue background
  color: theme.white, // White text
  border: 'none',
  padding: '10px 15px',
  cursor: 'pointer',
  // Other styling as needed
};

const inactiveButtonStyle = {
  backgroundColor: theme.white, // White background
  color: theme.colors.blue[6], // Blue text
  border: `2px solid ${theme.colors.blue[6]}`,
  padding: '10px 15px',
  cursor: 'pointer',
  // Other styling as needed
};

  if (isLoading) return <LoadingOverlay visible />;

  return (
    <>
 {/* Button Group for Selection */}
 <div style={{ marginBottom: '20px' }}>
        <button
          onClick={() => toggleSelection('raw')}
          style={currentSelection === 'raw' ? activeButtonStyle : inactiveButtonStyle}
          disabled={currentSelection === 'raw'}
        >
          Raw Datasets
        </button>
        <button
          onClick={() => toggleSelection('clean')}
          style={currentSelection === 'clean' ? activeButtonStyle : inactiveButtonStyle}
          disabled={currentSelection === 'clean'}
        >
          Clean Datasets
        </button>
 </div>
    <SimpleGrid cols={3} spacing="md" verticalSpacing="sm" style={{ paddingLeft: '40px', paddingRight: '20px', ...style }}>
      <div style={uploadButtonStyle}>
        <Image src="/add_new_icon.svg" alt="Add New" width={40} height={40} style={{ marginBottom: '10px' }} />
        <span>Add New Dataset</span>
      </div>
      {datasets.map(dataset => (
        // eslint-disable-next-line max-len, jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
        <div key={dataset.id} onMouseEnter={() => setHovered(dataset.id)} onMouseLeave={() => setHovered(null)} onClick={() => handleDatasetClick(dataset.id)}>
          {/* Dataset Name as a heading */}
          <div style={datasetHeaderStyle}>
            <div style={datasetNameStyle}>{truncateString(dataset.name, 20)}</div>
            <Image src="/dataset_share_icon.svg" alt="Share Dataset" width={40} height={40} />
          </div>

          {/* AG Grid Table for dataset preview */}
          <div className="ag-theme-alpine" style={{ height: '150px', width: '100%', cursor: 'pointer' }}>
            <AgGridReact
              onGridReady={(params) => onGridReady(params, dataset.id)}
              columnDefs={columnDefs[dataset.id] ? columnDefs[dataset.id].slice(0, 3) : []}
              // eslint-disable-next-line max-len
              rowData={datasetPreviews[dataset.id] ? transformToRowData(datasetPreviews[dataset.id], columnDefs[dataset.id]) : []}
              domLayout="autoHeight"
              suppressRowClickSelection
              suppressRowDeselection
              suppressClickEdit
              suppressCellFocus
              // ... any other grid options you need ...
            />
          </div>
        </div>
      ))}
    </SimpleGrid>
    </>
  );
}
