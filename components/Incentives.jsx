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
  color: #2c3e50;
`;

function Incentives() {
  return (
    <Container>
      <Heading>Incentives</Heading>
      <List>
        <ListItem>30% federal tax credit on Solar OR Batteries</ListItem>
        <ListItem>HVAC tax credit for gas to electric $2,000</ListItem>
        <ListItem>Span Smart Panel & Powerwall 3 = $1,300 rebate</ListItem>
        <ListItem>SGIP program for medical plans and high fire risk</ListItem>
        <ListItem>EV charger rebate by utility, approx $500</ListItem>
      </List>
    </Container>
  );
}

export default Incentives;
