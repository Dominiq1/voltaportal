import React, { useState, useEffect } from 'react';
import { Box, Typography, Container, CssBaseline } from '@mui/material';
import axios from 'axios';

import QuickContact from '../Homeportal/Contact';
import ProgressTracker from '../Homeportal/Progress';
import UserInfo from '../Homeportal/UserInfo';

const HomeScreen = () => {
  const [currentStep, setCurrentStep] = useState(2);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    fetchCRMUsers();
  }, []);

  const fetchCRMUsers = async () => {
    const API_URL = "https://api.quickbase.com/v1/records/query";
    const USER_TOKEN = "QB-USER-TOKEN b7738j_qjt3_0_dkaew43bvzcxutbu9q4e6crw3ei3";
    const QB_DOMAIN = "voltaic.quickbase.com";

    const requestBody = {
      from: "br5cqr4r3",
      where: "({3.EX.'Active'})",
      sortBy: [{ fieldId: 12, order: "ASC" }],
      options: { skip: 0, top: 1, compareWithAppLocalTime: false },
    };

    const headers = {
      Authorization: USER_TOKEN,
      "QB-Realm-Hostname": QB_DOMAIN,
      "Content-Type": "application/json",
    };

    try {
      const response = await axios.post(API_URL, requestBody, { headers });
      if (response.data && response.data.data) {
        setUserData(response.data.data[0]);
      }
    } catch (error) {
      console.error('Failed to fetch user data:', error);
    }
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth={false} sx={{ height: '100vh', display: 'flex', flexDirection: 'column', bgcolor: '#f8f9fa', overflow: 'hidden'}}>
        <UserInfo userData={userData} sx={{ flex: 'none' }} />
        <Box sx={{ display: 'flex', flexGrow: 1, flexDirection: 'row', height: 'calc(100% - 64px)' }}> {/* Adjust height calculation as needed */}
          <Box sx={{ width: '100%', height: '100%', overflowY: 'auto' }}>
            <ProgressTracker currentStep={currentStep} />
          </Box>
          <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <QuickContact onChatClick={() => console.log('Open Chat')} />
          </Box>
        </Box>
      </Container>
    </React.Fragment>
  );
};

export default HomeScreen;
