import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Container, CssBaseline, Paper } from '@mui/material';
import { useRouter } from 'next/router';

const LoginDashboard = () => {
    const [username, setUsername] = useState('');
    const [id, setId] = useState('');
    const router = useRouter();

    const handleLogin = () => {
        if (username && id) {
            router.push(`/?id=${id}`);
        } else {
            alert('Please fill in all fields.');
        }
    };






    const authorize = async ({ homeownerEmail, eventID }) => {
        const QB_DOMAIN = "voltaic.quickbase.com";
        const API_ENDPOINT = "https://api.quickbase.com/v1/records";
    
        const headers = {
          Authorization: "QB-USER-TOKEN b7738j_qjt3_0_dkaew43bvzcxutbu9q4e6crw3ei3",
          "QB-Realm-Hostname": QB_DOMAIN,
          "Content-Type": "application/json",
        };
    
        let requestBody = {
          to: "br5cqr3sn", // Table identifier in Quickbase
          data: [{
            3: { value: eventID },
            26: { value: "" },
            17: { value: "" },
          }],
          fieldsToReturn: [] // Specify fields to return, if any
        };
    
        if (decisionStatus === "1") { // Use `===` for comparison
          requestBody.data = [{
            3: { value: eventID },
            26: { value: "251" },
            17: { value: "" },
          }];
        } else {
          requestBody.data = [{
            3: { value: eventID },
            26: { value: "629" },
            17: { value: "" },
          }];
        }
    
        try {
          const response = await axios.post(API_ENDPOINT, requestBody, { headers });
          console.log("Success!", response.data);
        } catch (error) {
          console.error("Failed to send data:", error);
          throw error; // Rethrow or handle error as needed
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
                    mt: 8,
                    backgroundImage: 'url("https://source.unsplash.com/random/house")',
                    backgroundSize: 'cover',
                    color: '#ffffff'
                }}
            >
                <Typography component="h1" variant="h5" sx={{ color: '#fff' }}>
                    Homeowner Portal Sign In
                </Typography>
                <Box sx={{ mt: 3 }}>
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
                        InputProps={{
                            style: { color: 'black' },
                        }}
                        sx={{
                            input: {
                                color: '#333',
                                backgroundColor: '#fff',
                                borderRadius: '5px',
                            },
                            '& .MuiFilledInput-underline:before': {
                                borderBottomColor: 'transparent',
                            },
                            '& .MuiFilledInput-underline:hover:before': {
                                borderBottomColor: 'transparent',
                            },
                            '& .MuiFilledInput-underline:after': {
                                borderBottomColor: 'transparent',
                            },
                        }}
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
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
                        InputProps={{
                            style: { color: 'black' },
                        }}
                        sx={{
                            input: {
                                color: '#333',
                                backgroundColor: '#fff',
                                borderRadius: '5px',
                            },
                            '& .MuiFilledInput-underline:before': {
                                borderBottomColor: 'transparent',
                            },
                            '& .MuiFilledInput-underline:hover:before': {
                                borderBottomColor: 'transparent',
                            },
                            '& .MuiFilledInput-underline:after': {
                                borderBottomColor: 'transparent',
                            },
                        }}
                        autoComplete="off"
                        value={id}
                        onChange={(e) => setId(e.target.value)}
                    />
                    <Button
                        type="button"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2, bgcolor: 'primary.main', '&:hover': { bgcolor: 'primary.dark' } }}
                        onClick={handleLogin}
                    >
                        Sign In
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
};

export default LoginDashboard;
