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

const Paragraph = styled.p`
  margin-top: 20px;
  color: #7f8c8d;
  font-size: 1.2em; /* Adjust the size as needed */
  line-height: 1.5em; /* Adjust the line height for readability */
  text-align: left; /* Align text to the left for better readability */
`;

const List = styled.ul`
  list-style: disc inside; /* Use disc bullets */
  padding: 0;
  padding-left: 5%;
  padding-top: 30px;
  color: #7f8c8d;
  font-size: 1.2em; /* Adjust the size as needed */
  text-align: left; /* Align text to the left for better readability */
`;

const ListItem = styled.li`
  padding: 5px 0;
  color: #2c3e50;
`;

function SGIP() {
  return (
    <Container>
      <Heading>Self-Generation Incentive Program (SGIP)</Heading>
      <Paragraph>
        The Self-Generation Incentive Program (SGIP) in California offers rebates for installing energy storage technologies at residential and non-residential facilities. The amount of the rebate depends on the budget category and the capacity of the system:
      </Paragraph>
      <List>
        <ListItem>General Market: $150–$200 per kilowatt-hour (kWh) for residential customers and $180–$300 per kWh for non-residential customers</ListItem>
        <ListItem>Equity: $850 per kWh</ListItem>
        <ListItem>Equity Resiliency: $1,000 per kWh</ListItem>
        <ListItem>Large Storage: $0.50, $0.40, $0.35, $0.30, and $0.25 per step</ListItem>
        <ListItem>Renewable Generation: $2.00 per watt (W) and a $2.50 per W resiliency adder for projects with critical resiliency needs</ListItem>
      </List>
    </Container>
  );
}

export default SGIP;
