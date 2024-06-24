import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import logo from '@/public/images/logo.png'; // Adjust the path based on your directory structure
import { Box } from '@mui/material';

const Container = styled.div`
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const Heading = styled.h1`
  color: #2c3e50;
`;

const Paragraph = styled.p`
  margin-top: 20px;
  color: #7f8c8d;
  width: 60vw;
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

    </Container>
  );
}

export default Home;
