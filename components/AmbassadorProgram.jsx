import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
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
  color: #7f8c8d;
  font-size: 1.2em; /* Adjust the size as needed */
`;

const ListItem = styled.li`
  padding: 5px 0;
  color: ${props => props.gray ? 'gray' : '#2c3e50'};
`;

function AmbassadorProgram() {
  return (
    <Container>
      <Heading>Energy Ambassador Program</Heading>
      <List>
        <ListItem gray>ADU $1,000 - Coming soon</ListItem>
        <ListItem>Solar $500</ListItem>
        <ListItem>Battery $500</ListItem>
        <ListItem>HVAC $500</ListItem>
        <ListItem>Roofing $500</ListItem>
        <ListItem>Span Smart Electrical Panel $500</ListItem>
        <ListItem>QuietCool Fan $250</ListItem>
        <ListItem>EV Charger $250</ListItem>
      </List>
    </Container>
  );
}

export default AmbassadorProgram;
