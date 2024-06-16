import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Container, CssBaseline, Paper, Alert } from '@mui/material';
import { useRouter } from 'next/router';
import Image from 'next/image';
import axios from 'axios';
import logo from '@/public/images/logo.png'; // Adjust the path based on your directory structure

const LoginDashboard = () => {
  const [username, setUsername] = useState('');
  const [id, setId] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  console.log("Rendering LoginDashboard");

  function formatDate(date) {
    let day = ('0' + date.getDate()).slice(-2);
    let month = ('0' + (date.getMonth() + 1)).slice(-2);
    let year = date.getFullYear();
    return `${year}-${month}-${day}`;
  }

  const authLogin = async () => {
    setError(''); // Clear previous errors before a new login attempt
    if (!username || !id) {
      setError('Please fill in all fields.');
      return;
    }

    const today = formatDate(new Date()).toString();
    const QB_DOMAIN = "voltaic.quickbase.com";
    const API_ENDPOINT = "https://api.quickbase.com/v1/records";

    const headers = {
      Authorization: "QB-USER-TOKEN b7738j_qjt3_0_dkaew43bvzcxutbu9q4e6crw3ei3",
      "QB-Realm-Hostname": QB_DOMAIN,
      "Content-Type": "application/json",
    };

    const requestBody = {
      to: "br5cqr4r3",
      data: [{
        3: { value: id },
        2887: { value: today },
      }],
      fieldsToReturn: []
    };

    try {
      const response = await axios.post(API_ENDPOINT, requestBody, { headers });
      console.log("Success!", response.data);

      if (response.data.metadata.lineErrors) {
        const firstLineErrorKey = Object.keys(response.data.metadata.lineErrors)[0];
        const lineErrors = response.data.metadata.lineErrors[firstLineErrorKey];
        if (lineErrors && lineErrors.length > 0) {
          setError(lineErrors[0]); // Set the specific line error from the API
          return; // Stop further execution
        }
      }
      router.push(`/?id=${id}`);
    } catch (error) {
      console.error("Failed to send data:", error);
      if (error.response && error.response.data && error.response.data.metadata && error.response.data.metadata.lineErrors) {
        const firstLineErrorKey = Object.keys(error.response.data.metadata.lineErrors)[0];
        const lineErrors = error.response.data.metadata.lineErrors[firstLineErrorKey];
        if (lineErrors && lineErrors.length > 0) {
          setError(lineErrors[0]); // Set the specific line error from the API
        } else {
          setError('An unexpected error occurred. Please try again.');
        }
      } else {
        setError('Failed to login. Please check your credentials and try again.');
      }
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Paper
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        
          p: 4,
          mt: 20,
          backgroundImage: 'url("https://source.unsplash.com/random/house")',
          backgroundSize: 'cover',
          color: '#ffffff'
        }}
      >
 <Box sx={{ mb: 3 }}>
          <Image src={logo} alt="Voltaic Logo" width={150} height={70} objectFit="contain" />
        </Box>
        <Typography component="h1" variant="h5" sx={{ color: '#fff' }}>
          Homeowner Portal Sign In
        </Typography>
        <Box sx={{ mt: 3 }}>
          {error && <Alert severity="error">{error}</Alert>}
          <TextField
            variant="filled"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            InputProps={{ style: { color: 'black' }, }}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            sx={{ input: { color: '#333', backgroundColor: '#fff', borderRadius: '5px' }, }}
          />
          <TextField
            variant="filled"
            margin="normal"
            required
            fullWidth
            name="id"
            label="ID"
            type="text"
            id="id"
            autoComplete="off"
            value={id}
            onChange={(e) => setId(e.target.value)}
            sx={{ input: { color: '#333', backgroundColor: '#fff', borderRadius: '5px' }, }}
          />
          <Button
            type="button"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, bgcolor: 'primary.main', '&:hover': { bgcolor: 'primary.dark' } }}
            onClick={authLogin}
          >
            Sign In
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default LoginDashboard;
