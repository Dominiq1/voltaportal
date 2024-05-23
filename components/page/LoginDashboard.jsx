import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Container } from '@mui/material';
import { useRouter } from 'next/router';

const LoginDashboard = () => {
    const [username, setUsername] = useState('');
    const [id, setId] = useState('');
    const router = useRouter();

    const handleLogin = () => {
        if (username && id) {
            router.push(`/?id=${id}`);
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <Box sx={{ mt: 1 }}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Username"
                        name="username"
                        autoComplete="username"
                        autoFocus
                        InputProps={{
                            style: { color: 'black', backgroundColor: 'white' }, // Only changes the text input area
                        }}
                        sx={{
                            '& .MuiInputBase-root': {
                                backgroundColor: 'transparent', // Ensure no background change for the component
                                '& input': {
                                    backgroundColor: 'white', // White background for text input area only
                                },
                            },
                            '& .MuiOutlinedInput-notchedOutline': {
                                borderColor: 'grey', // Standard border color
                            },
                        }}
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="id"
                        label="ID"
                        type="text"
                        id="id"
                        InputProps={{
                            style: { color: 'black', backgroundColor: 'white' }, // Only changes the text input area
                        }}
                        sx={{
                            '& .MuiInputBase-root': {
                                backgroundColor: 'transparent', // Ensure no background change for the component
                                '& input': {
                                    backgroundColor: 'white', // White background for text input area only
                                },
                            },
                            '& .MuiOutlinedInput-notchedOutline': {
                                borderColor: 'grey', // Standard border color
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
                        sx={{ mt: 3, mb: 2 }}
                        onClick={handleLogin}
                    >
                        Sign In
                    </Button>
                </Box>
            </Box>
        </Container>
    );
};

export default LoginDashboard;
