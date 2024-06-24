import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 800px; /* Reduce the width */
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

function AITool() {
  return (
    <Container>
      <Heading>AI Proposal Tool</Heading>
      <Paragraph>
        Our Aurora AI Proposal Tool is an innovative solution designed to streamline and enhance the sales process for solar companies. Here are the key benefits:
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
    </Container>
  );
}

export default AITool;
