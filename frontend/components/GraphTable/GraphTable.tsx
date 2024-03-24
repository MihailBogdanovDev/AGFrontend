'use client';

import { AgGridReact } from 'ag-grid-react'; // React Grid Logic
import 'ag-grid-community/styles/ag-grid.css'; // Core CSS
import 'ag-grid-community/styles/ag-theme-quartz.css'; // Theme
import ChartCellRenderer from '../ChartCellRenderer/ChartCellRenderer';

//eslint-disable-next-line max-len
const GraphTable = () => {
const columnDefs = [
        { headerName: 'Name', field: 'name' },
        {
            headerName: 'Sales Chart',
            field: 'salesData',
            cellRenderer: ChartCellRenderer,
        },
        // ... other column definitions
    ];
    const rowData = [
        { name: 'Product A', salesData: [{ value: 20 }, { value: 40 }, { value: 30 }] },
        { name: 'Product B', salesData: [{ value: 50 }, { value: 60 }, { value: 70 }] },
        // ... other rows
    ];

return (
    <div>
          <div className="ag-theme-quartz" style={{ height: 500 }}>

          <AgGridReact
            columnDefs={columnDefs} //For some reason it says columnDefs is not a defnition but it is.
            rowData={rowData}
            // ... other grid props
          />

          </div>
    </div>
);
};

export default GraphTable;
