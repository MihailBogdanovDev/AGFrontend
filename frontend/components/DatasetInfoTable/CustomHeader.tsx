import React from 'react';
import { CustomHeaderProps } from 'ag-grid-react';
import ColumnDataIntegrityVisualisation from '../ColumnDataIntegrityVisualisation/ColumnDataIntegrityVisualisation';

const CustomHeader = ({ displayName, dataIntegrity, totalItems }) => {
  const cleanDisplayName = displayName.replace(' - Unit Col', '').replace(' - Date Col', '');

    const nullValues = dataIntegrity.null_values_per_column[cleanDisplayName] || 0;
    const duplicateValues = dataIntegrity.duplicate_values_per_column[cleanDisplayName] || 0;

    return (
        <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
      <div style={{ fontWeight: 'bold', marginBottom: '4px' }}>
        {displayName}
      </div>
      <div style={{ flexGrow: 1, minWidth: '150px' }}> {/* Adjust minWidth as needed */}
        <ColumnDataIntegrityVisualisation
          nullValues={nullValues}
          duplicateValues={duplicateValues}
          totalRows={totalItems}
        />
      </div>
        </div>
    );
  };

  export default CustomHeader;
