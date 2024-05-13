import { useQuery } from '@apollo/client';
import { GET_PAYROLL } from '@/gql/queries/serviceQueries';
import { Box, useTheme, useMediaQuery } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { uuid } from 'uuidv4';

const Dashboard = ({ repID }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const { data, loading, error } = useQuery(GET_PAYROLL, {
    variables: { "repID": "2208" },
    fetchPolicy: 'network-only', // Ensures fresh data every time
  });

  const columns = [
    { field: 'id', headerName: 'ID', width: isMobile ? 70 : 90 },
    { field: 'homeownerName', headerName: 'Homeowner Name', width: isMobile ? 130 : 150 },
    { field: 'piecerate', headerName: 'Piece Rate', width: isMobile ? 100 : 110 },
    // Add more columns as needed
  ];

  const rows = data?.GetWeeklyPayrollReport.map(item => ({
    ...item,
    id: uuid(), 
    homeownerName: item.homeownerName.replace(/"/g, ''),
    piecerate: item.piecerate.replace(/"/g, ''),
  }));

  return (
    <Box sx={{
      height: 400,
      width: '100%',
      p: 2, // Adds padding around the DataGrid
      '& .MuiDataGrid-root': {
        backgroundColor: 'white',
        border: 0, // Optional: remove border if you prefer no borders
      },
      mx: 'auto', // Centers the Box in the available horizontal space
      maxWidth: theme.breakpoints.values.lg, // Max width can be adjusted as needed
    }}>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : (
        <DataGrid
          rows={rows || []}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
          autoHeight // Automatically adjust the height based on the number of rows
          density='comfortable' // Adjust this based on your needs: 'standard', 'comfortable', 'compact'
        />
      )}
    </Box>
  );
};

export default Dashboard;
