import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';
import solarProject from '@/public/images/solarProject.png'; // Adjust the path based on your directory structure

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const Heading = styled.h2`
  color: #2c3e50;
  font-size: 2.5em;
`;

const Paragraph = styled.p`
  margin-top: 20px;
  color: #7f8c8d;
  font-size: 1.2em;
  line-height: 1.5em;
`;

const ImageWrapper = styled.div`
  margin-top: 20px;
`;

function ThankYou() {
  const { width, height } = useWindowSize();

  return (
    <Container>
      <Confetti
        width={width}
        height={height}
        numberOfPieces={300}
        recycle={false}
      />
      <Heading>Thank You!</Heading>
      <Paragraph>
        We sincerely appreciate your presence and participation.
      </Paragraph>
      <ImageWrapper>
        <Image
          src={solarProject}
          alt="Thank You Image"
          width={600}
          height={400}
          objectFit="cover"
        />
      </ImageWrapper>
    </Container>
  );
}

export default ThankYou;
