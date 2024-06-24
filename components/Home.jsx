import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import logo from '@/public/images/logo.png'; // Adjust the path based on your directory structure
import solarProject2 from '@/public/images/solarProject2.png'; // Adjust the path based on your directory structure
import { Box } from '@mui/material';

const Container = styled.div`
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
`;

const Heading = styled.h1`
  color: #2c3e50;
`;

const Paragraph = styled.p`
  margin-top: 20px;
  color: #7f8c8d;
  margin-bottom: 50px;
  text-align: center;
`;

function Home() {
  return (
    <Container>
      <Box sx={{ mb: 3 }}>
        <Image src={logo} alt="Voltaic Logo" width={320} height={150} objectFit="contain" />
      </Box>
      <Heading>Energy Ambassador Program</Heading>
      <Paragraph>
        Welcome to Voltaic Construction&apos;s Energy Ambassador Program. Learn more about our services and incentives.
      </Paragraph>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Image src={solarProject2} alt="Voltaic Project" width={520} height={450} objectFit="contain" />
      </Box>
    </Container>
  );
}

export default Home;
