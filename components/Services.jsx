import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 800px; /* Set the width to match other components */
  margin: 0 auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const Heading = styled.h2`
  color: #2c3e50;
  font-size: 2.5em; /* Adjust the size as needed */
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
  padding-left: 5%;
  padding-top: 30px;
  color: #7f8c8d;
  font-size: 1.5em; /* Adjust the size as needed */
  text-align: left; /* Align text to the left for better readability */
`;

const ListItem = styled.li`
  padding: 5px 0;
  color: ${props => props.gray ? 'gray' : '#2c3e50'};
`;

const SubList = styled.ul`
  list-style: disc;
  padding-left: 20px;
  margin-top: 5px;
  font-size: 1em; /* Adjust the size as needed */
  color: #7f8c8d;
`;

const SubListItem = styled.li`
  padding: 5px 0;
  color: #2c3e50;
`;

const Paragraph = styled.p`
  margin-top: 20px;
  color: #7f8c8d;
  font-size: 1.2em; /* Adjust the size as needed */
  line-height: 1.5em; /* Adjust the line height for readability */
  text-align: left; /* Align text to the left for better readability */
`;

function Services() {
  return (
    <Container>
      <Heading>What Do We Offer?</Heading>
      <List>
        <ListItem gray>ADUs - Coming soon</ListItem>
        <ListItem>Solar</ListItem>
        <ListItem>Batteries</ListItem>
        <ListItem>Solar Carports</ListItem>
        <ListItem>HVAC</ListItem>
        <ListItem>Roofing</ListItem>
        <ListItem>Span Smart Electrical Panels</ListItem>
        <ListItem>QuietCool Fans</ListItem>
        <ListItem>
          EV Chargers
          <SubList>
            <SubListItem>In House Service Department</SubListItem>
            <SubListItem>24/7 Monitoring for Production & Consumption</SubListItem>
          </SubList>
        </ListItem>
      </List>
      <Paragraph>
        We offer our services to Residential, Commercial, and Utility Scale projects in California and Texas.
      </Paragraph>
    </Container>
  );
}

export default Services;
