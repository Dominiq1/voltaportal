import React, { useState, useEffect } from 'react';
import { Container, CssBaseline, Box } from '@mui/material';
import axios from 'axios';
import QuickContact from '../Homeportal/Contact';
import ProgressTracker from '../Homeportal/Progress';
import UserInfo from '../Homeportal/UserInfo';

const HomeScreen = ({ projectID }) => {
    const [userData, setUserData] = useState(null);
    const [currentStep, setCurrentStep] = useState(Array(10).fill("")); // 10 steps, initially empty

    useEffect(() => {
        fetchProjectData();
    }, [projectID]);

    const fetchProjectData = async () => {
        const API_URL = "https://api.quickbase.com/v1/records/query";
        const USER_TOKEN = "QB-USER-TOKEN b7738j_qjt3_0_dkaew43bvzcxutbu9q4e6crw3ei3";
        const QB_DOMAIN = "voltaic.quickbase.com";

        const requestBody = {
            from: "br5cqr4r3",
            select: [105, 90, 92, 1510, 1641, 1643, 1645, 1654, 1656, 1659, 1664, 1670, 2888],
            where: `({3.EX.'${projectID}'})`,
            options: { skip: 0, top: 1, compareWithAppLocalTime: false }
        };

        const headers = {
            Authorization: USER_TOKEN,
            "QB-Realm-Hostname": QB_DOMAIN,
            "Content-Type": "application/json",
        };

        try {
            const response = await axios.post(API_URL, requestBody, { headers });
            if (response.data && response.data.data && response.data.data.length > 0) {
                const data = response.data.data[0];
                setCurrentStep([
                    "", // New Sale doesn't have a direct field
                    data['1510']?.value, // Welcome Call
                    data['1641']?.value, // Site Survey
                    data['1643']?.value, // NTP
                    data['1645']?.value, // QC Check
                    "", // Plans doesn't have a direct field
                    data['1654']?.value, // FLA
                    data['1659']?.value, // Solar Install
                    data['1664']?.value, // Final Inspection
                    data['1670']?.value, // PTO



                ]);

                setUserData({
                    name: data['105'].value,
                    email: data['90'].value,
                    address: data['92'].value,
                    HomeownerLayout: data['2888'].value
                    
                });
            }
        } catch (error) {
            console.error('Failed to fetch project data:', error);
        }
    };

    return (


        <div style={{
            width: '100%', // Ensures it fills the available width
            padding: 0,
            margin: 0,
            backgroundColor: '#ffffff' // Ensuring background is white or matches your company theme
          }}> 


        <Container maxWidth="lg" sx={{ height: '100vh', display: 'flex', flexDirection: 'column', bgcolor: '#f8f9fa', overflow: 'hidden' }}>
            <CssBaseline />
            {userData && <UserInfo userData={userData} />}
            <Box sx={{ display: 'flex', flexGrow: 1, flexDirection: 'row' }}>
                <ProgressTracker currentStep={currentStep} />
                <QuickContact onChatClick={() => console.log('Open Chat')} />
            </Box>
        </Container>
        </div>
    );
};

export default HomeScreen;
