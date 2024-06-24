import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import fireMap from '@/public/images/fireMap.png'; // Adjust the path based on your directory structure

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 20px;

`;

const PageContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 1200px;
  width: 100%;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const Section = styled.div`
  flex: 1;
  min-width: 300px; /* Adjust based on your design */
  text-align: left; /* Align text to the left */
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const DoubleSection = styled.div`
  flex: 2; /* Make this section double-sized */
  min-width: 300px; /* Adjust based on your design */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const Heading = styled.h2`
  color: #2c3e50;
  font-size: 2.5em; /* Adjust the size as needed */
  text-align: center;
`;

const List = styled.ul`
  list-style: disc; /* Use bullet points */
  padding-left: 20px; /* Indent bullet points */
  color: #7f8c8d;
  font-size: 1.2em; /* Adjust the size as needed */
`;

const ListItem = styled.li`
  padding: 5px 0;
  color: #2c3e50;
`;

const ImageContainer = styled.div`
  max-width: 80%; /* Ensure image does not overflow */
  overflow: hidden;
`;

const StyledImage = styled(Image)`
  width: 100%;
  height: auto; /* Maintain aspect ratio */
  border-radius: 8px;
`;

const Button = styled.a`
  display: inline-block;
  margin-top: 20px;
  padding: 10px 20px;
  color: #fff;
  background-color: #2c3e50;
  border-radius: 5px;
  text-decoration: none;
  font-size: 1em;

  &:hover {
    background-color: #34495e;
  }
`;

function Incentives() {
  return (
    <Wrapper>
      <PageContainer>
        <Section>
          <Heading>Incentives</Heading>
          <List>
            <ListItem>30% federal tax credit on Solar OR Batteries</ListItem>
            <ListItem>HVAC tax credit for gas to electric $2,000</ListItem>
            <ListItem>Span Smart Panel & Powerwall 3 = $1,300 rebate</ListItem>
            <ListItem>SGIP program for medical plans and high fire risk</ListItem>
            <ListItem>EV charger rebate by utility, approx $500</ListItem>
          </List>
        </Section>
        <DoubleSection>
          <ImageContainer>
            <StyledImage src={fireMap} alt="Fire Map" />
          </ImageContainer>
          <Button href="https://www.arcgis.com/apps/webappviewer/index.html?id=5bdb921d747a46929d9f00dbdb6d0fa2 " target="_blank">View Live Map</Button>

        </DoubleSection>
      </PageContainer>
    </Wrapper>
  );
}

export default Incentives;
