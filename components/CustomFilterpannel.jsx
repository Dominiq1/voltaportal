import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { TextField } from '@mui/material';

function CustomFilterPanel({ column, onFilterChange }) {
  const [filterValue, setFilterValue] = useState('');

  const handleFilterChange = useCallback(
    (value) => {
      setFilterValue(value);
      onFilterChange(column.field, value);
    },
    [column.field, onFilterChange],
  );

  return (
    <div sx={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
      <TextField
        sx={{ width: '100%' }}
        placeholder={`Filter by ${column.headerName}`}
        value={filterValue}
        onChange={(e) => handleFilterChange(e.target.value)}
      />
    </div>
  );
}

CustomFilterPanel.propTypes = {
  column: PropTypes.object.isRequired,
  onFilterChange: PropTypes.func.isRequired,
};

export default CustomFilterPanel;
