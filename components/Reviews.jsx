import React from 'react';
import styled from 'styled-components';
import TestimonialSection from './Testimonial';
import InstallMaps from '@/components/InstallMaps'
import { useQuery } from '@apollo/client'

import bolt from '../public/images/bolt.png'
import { GET_MAP_DATA } from '@/gql/mutations/InstallMap'
import { Box } from '@mui/material';
import { Height } from '@mui/icons-material';

const Container = styled.div`
  width: 80vw;
  margin: 0 auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  height: 100%; /* Ensure it takes up the full height of the BottomContainer */
  overflow: auto; /* Allow scrolling if content overflows */
`;

const Heading = styled.h2`
  color: #2c3e50;
`;

const Paragraph = styled.p`
  margin-top: 20px;
  color: #7f8c8d;
`;

function Reviews() {
  const { loading, error, data } = useQuery(GET_MAP_DATA);


  console.log("GraphQL Data:", data); // Add this line


  const formatDataForMarkers = (mapData) => {
    return mapData.map(item => ({
      color: item.color,
      position: {
        lat: parseFloat(item.position.lat.replace(/"/g, '')),
        lng: parseFloat(item.position.lng.replace(/"/g, '')),
      },
      label: {
        text: item.label.text.replace(/"/g, ''),
        color: 'red',
       //color: item.label.color.replace(/"/g, '').toLowerCase()
      },
      image: {
        url: bolt, // Replace with the actual image URL
        alt:bolt,
      },
      projectURL: item.projectURL.replace(/"/g, '')
      // Add other fields as needed
    }));
  };
  



  console.log("Formatted Data:", formatDataForMarkers); // Add this line



  const markers = loading ? [] : (data?.GetMapData ? formatDataForMarkers(data.GetMapData) : []);


  console.log("markers", markers)
  













  return (
    <Container>
      <Heading>Website & Google Reviews</Heading>
      <Paragraph>Check out our website and read our Google Reviews.</Paragraph>

      <Box sx={{height:'30vh'}}> 
 <InstallMaps markers={markers}/>

      </Box>
     
      <TestimonialSection />
    </Container>
  );
}

export default Reviews;
