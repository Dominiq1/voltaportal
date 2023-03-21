import PropTypes from 'prop-types';
import React from 'react';
import CustomFilterPanel from './CustomFilterpannel';

function CustomFilterToolPanel({ api }) {
  const handleFilterChange = React.useCallback(
    (field, value) => {
      api.current.setFilterModel((oldModel) => ({
        ...oldModel,
        [field]: {
          value,
        },
      }));
    },
    [api],
  );

  return (
    <div sx={{ display: 'flex', flexDirection: 'column' }}>
      {api.current.columns
        .filter((column) => column.filterable)
        .map((column) => (
          <CustomFilterPanel key={column.field} column={column} onFilterChange={handleFilterChange} />
        ))}
    </div>
  );
}

CustomFilterToolPanel.propTypes = {
  api: PropTypes.object.isRequired,
};

export default CustomFilterToolPanel;
