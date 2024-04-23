import React, { useState } from 'react';
import {
  Box,
  TextField,
  Typography,
  Button,
  InputLabel,
} from '@mui/material';
import { useMutation, gql } from '@apollo/client';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { PUSH_NEW_EMPLOYEE } from "@/gql/mutations/CRM";


const EmployeeOnboarding = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [ssn, setSsn] = useState('');
  const [email, setEmail] = useState('');
  const [dob, setDob] = useState(null);

  const [pushNewEmployee, { loading, error }] = useMutation(PUSH_NEW_EMPLOYEE);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const result = await pushNewEmployee({
        variables: {
          name,
          phone,
          email,
          social: ssn,
          dob: dob ? dob.toISOString() : '',
        },
      });
      console.log('Success:', result);
      alert('Employee added successfully!');
    } catch (err) {
      console.error('Error adding employee:', err);
      alert('Error adding employee. Please check the details and try again.');
    }
  };

  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        paddingTop: '5em',
      }}
    >
      <Box sx={{ width: { xs: '80vw', md: '50vw' }, p: 3, boxShadow: 3 }}>
        <Typography variant="h4" mb={2}>New Employee Onboarding</Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Full Name"
            variant="outlined"
            margin="normal"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <TextField
            fullWidth
            label="Phone Number"
            variant="outlined"
            margin="normal"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
          <TextField
            fullWidth
            label="Email Address"
            variant="outlined"
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextField
            fullWidth
            label="Social Security Number"
            variant="outlined"
            margin="normal"
            value={ssn}
            onChange={(e) => setSsn(e.target.value)}
            required
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Date of Birth"
              value={dob}
              onChange={setDob}
              renderInput={(params) => <TextField {...params} fullWidth margin="normal" />}
              required
            />
          </LocalizationProvider>
          <Button type="submit" variant="contained" sx={{ mt: 2 }} disabled={loading}>
            Submit
          </Button>
        </form>
        {error && <Typography color="error">Error: {error.message}</Typography>}
      </Box>
    </Box>
  );
};

export default EmployeeOnboarding;
