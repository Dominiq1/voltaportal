


import * as React from 'react';
import { Button, FormControl, InputLabel, Select, MenuItem , TextField, Typography, Drawer  } from '@mui/material';
import { useQuery ,useMutation} from '@apollo/client';
import { useMemo,useState, useEffect} from 'react';


import { DataGridPro, GridToolbar } from '@mui/x-data-grid-pro';

import CellBox from '../CellBox';
import PhotoBox from '../PhotoBox';


import { GET_VAN, GET_VAN_ITEMS } from '@/gql/queries/VanQuery';
import OrderInventory from '../modals/OrderInventory';


// import ProfileDetailsPage from '../ProfileDetailsPage';
// import { updateLeadMutation } from '../../mutations/leadMutations';
// import { SEND_EMAILS_MUTATION } from '../../mutations/bulkEmail';



export default function InventoryDatagrid(props) {

  const [orderItems, setOrderItems] = useState([]);
  const [selectedColumns, setSelectedColumns] = useState([
    'itemId',
    'itemImage',
    'itemName',
    'itemQuantity',
    'itemDescription',
  ]);
  const [gridRef, setGridRef] = useState({});
  const [rowSelectedUsers, setRowSelectedUsers] = useState([
    'dominiqmartinez13@gmail.com',
    'unhashlabs@gmail.com',
  ]);
  const [responseData, setResponseData] = useState([]);
  //   GET VAN INVENTORY DATA ? 
  //  may not nee this immediately unless you want to pull warehouse inventory. 
 
   const {loading: graphQLClientsLoading, error: graphQLClientsError, data  } = useQuery(GET_VAN_ITEMS, {
    variables: { vanId: "64067ba9d93b3428a600075a" },
  });

  
  const [pageSize, setPageSize] = useState(5);
  const [rowId, setRowId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');



  const handleCellEditStart = (params) => {
    console.log('Cell edit started:', params);
   // alert(`Cell edit started: row ${params.id}, field ${params.field}`);
  };


  const handleCellEditCommit = (params, getRow) => {
  console.log('Cell edit commited:', params);
  };
  
  
  const rows = [
    { id: 1, itemImage: '', itemName: 'Copper Wire', itemQuantity: '35' },
    { id: 2, images: '', itemName: 'Steel Rod', itemQuantity: '9' },
    { id: 3, images: '', itemName: 'Mallet', itemQuantity: '3' },
    { id: 4, images: '', itemName: '4x8 Pannel', itemQuantity: '5' },
  ];



  const handleSendEmails = async (Emails, Subject, Body) => {
    try {
      const { data } = await sendEmails({
        variables: {
          emails: Emails,
          subject: Subject,
          body: Body,
        },
      });
      console.log(data); // do something with the returned data
    } catch (e) {
      console.error(e); // handle errors
    }
  };


  const apiRef = React.useRef(null);

  const handleRowSelection = (params) => {
    const selectedEmails = params.map((id) => {
      const row = responseData.find((r) => r.id === id);
      return row.email;
    });
    setRowSelectedUsers(selectedEmails);
  };

  useEffect(() => {

    if(props.UserData){ 
      // console.log(props.UserData)
      
 
    const usersWithIds = props.UserData.map((user, index) => {

      return { ...user, Uid: index};
    });



    setResponseData(usersWithIds)

}
  }, [ props.UserData ]);


  const columns = useMemo(
    () => [
  { field: 'id', headerName: 'ID', width: 70 },
      {field: 'itemImage', headerName: 'Item Image', width: 250,  editable: true, renderCell: (params) =>  <PhotoBox item={15} {...{params, rowId, setRowId }}/>  },
      { field: 'itemName', headerName: 'Item Name', width: 180, editable: true , renderCell: (params) =>  <CellBox item={2} {...{params, rowId, setRowId }}/>, hide: true },
      { field: 'itemQuantity', headerName: 'Item Quantity', width: 100, editable: true, renderCell: (params) =>  <CellBox item={3} {...{params, rowId, setRowId }}/> },
      { field: 'itemDescription', headerName: 'Order Inventory', width: 250, editable: true, renderCell: (params) =>  <OrderInventory item={4} {...{params, rowId, setRowId }}/> },
    
      ],
      [rowId]
      );
      
      const handlePageSizeChange = (params) => {
      setPageSize(params.pageSize);
      };
      
      const handleEditRowsModelChange = (params) => {
      const updatedData = [...responseData];
      params.forEach((cell) => {
      const { field, id, value } = cell;
      const row = updatedData.find((r) => r.id === id);
      row[field] = value;
      });



      setResponseData(updatedData);
      };
      
      const handleSearchInputChange = (event) => {
      setSearchQuery(event.target.value);
      };
      
      const [filteredData, setFilteredData] = useState([]);

      useEffect(() => {
        const filteredRows = responseData.filter((row) => {
          const matched = Object.values(row).some((value) => {
            return String(value).toLowerCase().includes(searchQuery.toLowerCase());
          });
      
          // const categoryMatched =
          //   props.Categories.length === 0 ||
          //   props.Categories.some((category) => {
          //     return row.categories.includes(category);
          //   });
      
          return matched ;
        });
      
        setFilteredData(filteredRows);
      }, [responseData, searchQuery, props.Categories]);
      
      // ...
      
      // <DataGridPro
      //    rows={rows}
      //   // rows={filteredData}
      //   // ...
      // />
      




    

    return (
    <div style={{ height: 600, width: '100%' }}>
    <div style={{ display: 'flex', alignItems: 'center' }}>
    <Typography variant="h6" style={{ marginRight: 16 }}>
    User Fields
    </Typography>
    <TextField
    variant="outlined"
    label="Search"
    value={searchQuery}
    onChange={handleSearchInputChange}
    style={{ marginRight: 16 }}
    />
   
 
    <Typography variant="h6" style={{ marginLeft: 'auto', marginRight: 16 }}>
    Rows per page:
    </Typography>
    <TextField
    select
    value={pageSize}
    onChange={(e) => setPageSize(Number(e.target.value))}
    variant="outlined"
    style={{ width: 80 }}
    >
    {[5, 10, 25].map((size) => (
    <MenuItem key={size} value={size}>
    {size}
    </MenuItem>
    ))}
    </TextField>
    </div>
    <div style={{ height: 540, width: '100%' }}>


      {/* DATA GRID PRO  */}
    <DataGridPro
  rows={responseData}
  columns={columns.filter((column) => selectedColumns.includes(column.field))}
  pageSize={pageSize}
 disableVirtualization
 rowHeight={100}
  rowsPerPageOptions={[10]}
  checkboxSelection={false}
  disableSelectionOnClick
    apiRef={apiRef}
  onSelectionModelChange={handleRowSelection}
  onPageSizeChange={handlePageSizeChange}
  // onCellEditCommit={(params) => setRowId(params.id)}
  onCellEditCommit={handleCellEditCommit} // Add this line
  onCellEditStart={handleCellEditStart} // Add this line
  components={{ Toolbar: GridToolbar }}
  componentsProps={{
    toolbar: {
      selectedColumns,
      setSelectedColumns,
      gridRef,
      setGridRef,
   
    },
  }}




/>


    </div>

    </div>
    );
    }





















// import * as React from 'react';
// import { Button, FormControl, InputLabel, Select, MenuItem, OutlinedInput } from '@mui/material';
// import { MenuProps } from '@mui/material';
// import { useQuery, useMutation } from '@apollo/client';
// import { useMemo, useState } from 'react';
// import Box from '@mui/material/Box';
// import { DataGridPro } from '@mui/x-data-grid-pro';
// import { useDemoData } from '@mui/x-data-grid-generator';
// import { GET_CLIENTS } from '@/gql/queries/clientQueres';
// import UploadImage from '../UploadImage';
// import UsersActions from '../UserActions';
// import CustomToolbar from '../CustomToolbar';
// import CustomFilterPanel from '../CustomFilterpannel';





// export default function IntenvtoryDatagrid(props) {
//   const [selectedColumns, setSelectedColumns] = useState([
//     'id',
//     'itemName',
//     'quantity',
//     'fillStatus',
//     'Images',
//   ]);
//   const [gridRef, setGridRef] = useState({});
//   const [rowSelectedUsers, setrowSelectedUsers] = useState([
//     'dominiqmartinez13@gmail.com',
//     'unhashlabs@gmail.com',
//   ]);
//   const [ResponseData, setResponseData] = useState(null);
//   const [filterColumns, setFilterColumns] = useState(['Actions', 'Images', 'itemName', 'quantity', 'fillStatus']);
//   const [rows, setRows] = React.useState([
//     { id: 1, itemName: 'Copper Wire', quantity: 10, status: 'In Queue' },
//     { id: 2, itemName: 'Steel Nails', quantity: 25, status: 'In Progress' },
//     { id: 3, itemName: 'Aluminum Foil', quantity: 5, status: 'Completed' },
//   ]);

  


//   React.useEffect(() => {
//     if (props.UserData) {
//       const usersWithIds = props.UserData.map((user, index) => {
//         return { ...user, Uid: index };
//       });

//       const data = [
//         {
//           id: 1,
//           item: 'Rebar - Reinforced 1/4 X 1 1/2',
//           quantity: '54',
//           fillStatus: '35',
//           image: '',
//         },
//         {
//           id: 2,
//           item: 'Concrete - 5lbs',
//           quantity: '54',
//           fillStatus: '35',
//           image: '',
//         },
//       ];

//       setResponseData(data);
//     } else {
//       setResponseData(rows);
//     }
//   }, [props.UserData, rows]);

//   const [rowId, setRowId] = useState(null);

//   const handleRowSelection = (params) => {
//     const selectedEmails = params.map((id) => {
//       const row = ResponseData.find((r) => r.id === id);
//       return row.email;
//     });

//     console.log(selectedEmails);
//     setrowSelectedUsers(selectedEmails);
//   };

//   const columns = useMemo(
//     () => [
//       {
//         field: 'Actions',
//         headerName: 'actions',
//         width: 130,
//         renderCell: (params) => <UsersActions {...{ params, rowId, setRowId }} />,
//       },
//       {
//         field: 'Images',
//         headerName: 'Images',
//         width: 120,
//         editable: true,
//         renderCell: (params) => <UploadImage row={params.row.Uid} {...{ params }} />,
//       },
//       {
//         field: 'itemName',
//         width: 400,
//         headerName: 'itemName',
//         editable: true,
//       },
//       {
//         field: 'quantity',
//         width: 75,
//         headerName: 'Quantity',
//         editable: true,
//       },
//       {
//         field: 'fillStatus',
//         width: 50,
//         headerName: 'Order',
//         editable: true,
//       },
//     ].filter((column) => filterColumns.includes(column.field)),
//     [rowId, filterColumns]
//   );

//   const filterOptions = [
//     { value: 'item', label: 'Item' },
//     { value: 'quantity', label: 'Quantity' },
//     { value: 'fillStatus', label: 'Order' },
//   ];

//   return (
//     <Box sx={{ height: 520, width: 'fit-content' }}>
//       <Box sx={{ display: 'flex', flexDirection: 'row' }}>
//         {/* <EmailActionModal Massemails={rowSelectedUsers}/> */}
//         {/* <AddNote/> */}
//         {/* <AddeAlert/> */}
//         {/* <AddCSVCall/> */}
//       </Box>
     
//       <Box sx={{ margin: '20px' }}>
//     {/* <AddCSVCall/> */}
//     {ResponseData ? (
//       <DataGridPro
//         ref={(grid) => setGridRef(grid)}
//         onSelectionModelChange={handleRowSelection}
//         columns={columns.filter((c) => selectedColumns.includes(c.field))}
//         rows={ResponseData}
//         rowHeight={100}
//         onCellEditCommit={(params) => setRowId(params.id)}
//         checkboxSelection
//         disableSelectionOnClick
//         components={{
//           Toolbar: CustomToolbar,
//           FilterPanel: CustomFilterPanel,
//         }}
//         onFilterModelChange={(model) => {
//           setFilterColumns(model.items.map((item) => item.columnField));
//         }}
//         filterMode="server"
//       />
//     ) : (
//       <div>No Data</div>
//     )}
//   </Box>

//   {/* <FormControl sx={{ minWidth: 120 }}>
//     <InputLabel id="demo-simple-select-label">Columns</InputLabel>
//     <Select
//       labelId="demo-simple-select-label"
//       id="demo-simple-select"
//       value={selectedColumns}
//       onChange={(e) => setSelectedColumns(e.target.value)}
//     >
//       {columns.map((column) => (
//         <MenuItem key={column.field} value={column.field}>
//           {column.headerName}
//         </MenuItem>
//       ))}
//     </Select>
//   </FormControl> */}





//   <Button
//     variant="contained"
//     onClick={() => {
//       if (gridRef.current) {
//         gridRef.current.exportDataAsCsv();
//       }
//     }}
//     sx={{ marginLeft: '10px' }}
//   >
//     Export
//   </Button>


// </Box>

// );  
// }

















