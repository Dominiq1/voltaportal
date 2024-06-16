import React from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';

const UserInfo = ({ userData }) => {
  if (!userData) return <Typography>Loading...</Typography>;

  return (
    <Card sx={{ margin: 2, padding: 2, width: 'auto', backgroundColor: '#f0f0f0' }}>
      <CardContent>
        <Typography variant="h6" color="text.primary">Homeowner Name: {userData.name || 'Loading...'}</Typography>
        <Typography variant="subtitle1" color="text.secondary">Address: {userData.address || 'Loading...'}</Typography>
        <Typography variant="subtitle2">Email: {userData.email || 'No Email'}</Typography>
        <Typography variant="subtitle2">Homeowner Layout:</Typography>
        {userData.HomeownerLayout ? (
          <Button 
            variant="contained" 
            color="primary" 
            href={userData.HomeownerLayout} 
            target="_blank" 
            sx={{ mt: 2 }}
          >
            View Layout
          </Button>
        ) : (
          <Typography variant="subtitle2">No Owner Layout</Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default UserInfo;
