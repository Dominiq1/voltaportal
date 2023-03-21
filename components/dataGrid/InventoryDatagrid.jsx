
import * as React from 'react';
import { Button, FormControl, InputLabel, Select, MenuItem, OutlinedInput } from '@mui/material';
import { MenuProps } from '@mui/material';
import { useQuery, useMutation } from '@apollo/client';
import { useMemo, useState } from 'react';
import Box from '@mui/material/Box';
import { DataGridPro } from '@mui/x-data-grid-pro';
import { useDemoData } from '@mui/x-data-grid-generator';
import { GET_CLIENTS } from '@/gql/queries/clientQueres';
import UploadImage from '../UploadImage';
import UsersActions from '../UserActions';
import CustomToolbar from '../CustomToolbar';
import CustomFilterPanel from '../CustomFilterpannel';








export default function IntenvtoryDatagrid(props) {
  const [selectedColumns, setSelectedColumns] = useState([
    'id',
    'item',
    'quantity',
    'fillStatus',
    'Images',
  ]);
  const [gridRef, setGridRef] = useState({});
  const [rowSelectedUsers, setrowSelectedUsers] = useState([
    'dominiqmartinez13@gmail.com',
    'unhashlabs@gmail.com',
  ]);
  const [ResponseData, setResponseData] = useState(null);
  const [filterColumns, setFilterColumns] = useState(['Actions', 'Images', 'item', 'quantity', 'fillStatus']);
  const [rows, setRows] = React.useState([
    { id: 1, itemName: 'Copper Wire', quantity: 10, status: 'In Queue' },
    { id: 2, itemName: 'Steel Nails', quantity: 25, status: 'In Progress' },
    { id: 3, itemName: 'Aluminum Foil', quantity: 5, status: 'Completed' },
  ]);


  React.useEffect(() => {
    if (props.UserData) {
      const usersWithIds = props.UserData.map((user, index) => {
        return { ...user, Uid: index };
      });

      const data = [
        {
          id: 1,
          item: 'Rebar - Reinforced 1/4 X 1 1/2',
          quantity: '54',
          fillStatus: '35',
          image: '',
        },
        {
          id: 2,
          item: 'Concrete - 5lbs',
          quantity: '54',
          fillStatus: '35',
          image: '',
        },
      ];

      setResponseData(data);
    } else {
      setResponseData(rows);
    }
  }, [props.UserData, rows]);

  const [rowId, setRowId] = useState(null);

  const handleRowSelection = (params) => {
    const selectedEmails = params.map((id) => {
      const row = ResponseData.find((r) => r.id === id);
      return row.email;
    });

    console.log(selectedEmails);
    setrowSelectedUsers(selectedEmails);
  };

  const columns = useMemo(
    () => [
      {
        field: 'Actions',
        headerName: 'actions',
        width: 130,
        renderCell: (params) => <UsersActions {...{ params, rowId, setRowId }} />,
      },
      {
        field: 'Images',
        headerName: 'Images',
        width: 120,
        editable: true,
        renderCell: (params) => <UploadImage row={params.row.Uid} {...{ params }} />,
      },
      {
        field: 'item',
        width: 400,
        headerName: 'Item',
        editable: true,
      },
      {
        field: 'quantity',
        width: 75,
        headerName: 'Quantity',
        editable: true,
      },
      {
        field: 'fillStatus',
        width: 50,
        headerName: 'Order',
        editable: true,
      },
    ].filter((column) => filterColumns.includes(column.field)),
    [rowId, filterColumns]
  );

  const filterOptions = [
    { value: 'item', label: 'Item' },
    { value: 'quantity', label: 'Quantity' },
    { value: 'fillStatus', label: 'Order' },
  ];

  return (
    <Box sx={{ height: 520, width: 'fit-content' }}>
      <Box sx={{ display: 'flex', flexDirection: 'row' }}>
        {/* <EmailActionModal Massemails={rowSelectedUsers}/> */}
        {/* <AddNote/> */}
        {/* <AddeAlert/> */}
        {/* <AddCSVCall/> */}
      </Box>
     
      <Box sx={{ margin: '20px' }}>
    {/* <AddCSVCall/> */}
    {ResponseData ? (
      <DataGridPro
        ref={(grid) => setGridRef(grid)}
        onSelectionModelChange={handleRowSelection}
        columns={columns.filter((c) => selectedColumns.includes(c.field))}
        rows={ResponseData}
        rowHeight={100}
        onCellEditCommit={(params) => setRowId(params.id)}
        checkboxSelection
        disableSelectionOnClick
        components={{
          Toolbar: CustomToolbar,
          FilterPanel: CustomFilterPanel,
        }}
        onFilterModelChange={(model) => {
          setFilterColumns(model.items.map((item) => item.columnField));
        }}
        filterMode="server"
      />
    ) : (
      <div>No Data</div>
    )}
  </Box>

  {/* <FormControl sx={{ minWidth: 120 }}>
    <InputLabel id="demo-simple-select-label">Columns</InputLabel>
    <Select
      labelId="demo-simple-select-label"
      id="demo-simple-select"
      value={selectedColumns}
      onChange={(e) => setSelectedColumns(e.target.value)}
    >
      {columns.map((column) => (
        <MenuItem key={column.field} value={column.field}>
          {column.headerName}
        </MenuItem>
      ))}
    </Select>
  </FormControl> */}





  <Button
    variant="contained"
    onClick={() => {
      if (gridRef.current) {
        gridRef.current.exportDataAsCsv();
      }
    }}
    sx={{ marginLeft: '10px' }}
  >
    Export
  </Button>


</Box>

);  
}

















