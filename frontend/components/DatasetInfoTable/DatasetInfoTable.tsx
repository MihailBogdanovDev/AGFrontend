'use client';

import { AgGridReact } from 'ag-grid-react'; // React Grid Logic
import 'ag-grid-community/styles/ag-grid.css'; // Core CSS
import 'ag-grid-community/styles/ag-theme-quartz.css'; // Theme
import CustomHeader from './CustomHeader';

interface Props {
dataIntegrity: {}
datasetInfo: string[][];
totalItems: number
columnHeaders: string[]
onPageChange: (page: number) => void
currentPage: number
unitColumn: string; // marked unit column name
dateColumn: string; // marked date column name
}

//eslint-disable-next-line max-len
const DatasetInfoTable: React.FC<Props> = ({ dataIntegrity, datasetInfo, totalItems, columnHeaders, onPageChange, currentPage, unitColumn, dateColumn }) => { //Total Items is currently not used
const ITEMS_PER_PAGE = 14;

  // Function to determine the display name of a column
  const getColumnDisplayName = (header) => {
    if (header === unitColumn) {
      return `${header} - Unit Col`;
    } if (header === dateColumn) {
      return `${header} - Date Col`;
    }
    return header;
  };


//const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

const columnDefs = columnHeaders.map((header) => {
  let extraStyles = {};
        if (header === unitColumn) {
            extraStyles = { cellStyle: { backgroundColor: '#e0f2f1' } }; // Green background for unit column
        } else if (header === dateColumn) {
            extraStyles = { cellStyle: { backgroundColor: '#bbdefb' } }; // Blue background for date column
        }

  const col = getColumnDisplayName(header);

  return {
    headerName: header, // Use function to set display name
    field: header,
      headerComponent: CustomHeader,
      headerComponentParams: {
          displayName: col,
          dataIntegrity: dataIntegrity,
          totalItems: totalItems,
      },
      ...extraStyles,
  };
});

const rowData = datasetInfo.map((row) =>
row.reduce((acc, cell, index) => {
    acc[columnHeaders[index]] = cell;
    return acc;
}, {})
);

const handlePageChange = (page: number) => {
    onPageChange(page);
};

const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between', // ensures the pagination stays at the bottom
    backgroundColor: '#F7F9FB',
    padding: '20px',
    borderRadius: '10px',
    border: '1px solid #D1D9E2',
    boxShadow: '1px 1px 2px 1px rgba(16, 24, 40, 0.05)',
    margin: '40px 20px 20px',
    height: '450px', // fixed height for the container
  };

return (
    <div style={containerStyle}>
          <div className="ag-theme-quartz" style={{ height: 500 }}>

            <AgGridReact
              columnDefs={columnDefs}
              frameworkComponents={{
                CustomHeader: CustomHeader, // Register your custom header component here
              }}
              rowData={rowData}
              pagination
              paginationPageSize={ITEMS_PER_PAGE}
              onPaginationChanged={() => handlePageChange(currentPage)}
              headerHeight={120}
            />

          </div>
    </div>
);
};

export default DatasetInfoTable;
