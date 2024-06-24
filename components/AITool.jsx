import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import auroraImage from '@/public/images/aurora.png'; // Adjust the path based on your directory structure

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
  flex: 1.5; /* Adjust based on your design */
  min-width: 300px; /* Adjust based on your design */
  text-align: left; /* Align text to the left */
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const DoubleSection = styled.div`
  flex: 1.5; /* Make this section match the other section size */
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

const Paragraph = styled.p`
  margin-top: 20px;
  color: #7f8c8d;
  font-size: 1.2em; /* Adjust the size as needed */
  line-height: 1.5em; /* Adjust the line height for readability */
  text-align: left; /* Align text to the left for better readability */
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

function AITool() {
  return (
    <Wrapper>
      <PageContainer>
        <Section>
          <Heading>AI Proposal Tool</Heading>
          <Paragraph>
            Our AI Proposal Tool is an innovative solution designed to streamline and enhance the sales process for solar companies. Here are the key benefits:
          </Paragraph>
          <Paragraph>
            <strong>1. Precision and Accuracy:</strong> Uses satellite imagery and 3D modeling for precise measurements, ensuring tailored proposals.
          </Paragraph>
          <Paragraph>
            <strong>2. Time Efficiency:</strong> Automates proposal generation, reducing creation time and allowing sales teams to focus on customer engagement.
          </Paragraph>
          <Paragraph>
            <strong>3. Enhanced Customer Experience:</strong> Provides visually appealing, detailed proposals that help customers make informed decisions.
          </Paragraph>
          <Paragraph>
            <strong>4. Increased Sales Conversion:</strong> Improves conversion rates with accurate and compelling proposals, enabling prompt customer responses.
          </Paragraph>
          <Paragraph>
            <strong>5. Scalability:</strong> Handles a large volume of proposals, supporting company growth and adapting to varying needs.
          </Paragraph>
          <Paragraph>
            By integrating the Aurora AI Proposal Tool into our sales process, we ensure that our customers receive accurate information, leading to higher satisfaction and more successful solar installations.
          </Paragraph>
        </Section>
        <DoubleSection>
          <ImageContainer>
            <StyledImage src={auroraImage} alt="Aurora AI Proposal Tool" />
          </ImageContainer>
        </DoubleSection>
      </PageContainer>
    </Wrapper>
  );
}

export default AITool;
