import React, { useEffect } from 'react';
import styled from 'styled-components';

const TestimonialContainer = styled.section`
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  max-width: 100%;
  margin: 0 auto; /* Center the container */
  overflow: hidden; /* Prevent overflow */
`;

const TestimonialHeading = styled.h2`
  color: #2c3e50;
`;

const WidgetContainer = styled.div`
  width: 100%;
  overflow: hidden; /* Prevent widget overflow */
`;

const TestimonialSection = () => {
  useEffect(() => {
    // Create a script element
    const script = document.createElement('script');
    script.src = 'https://widgets.sociablekit.com/google-reviews/widget.js';
    script.async = true;
    script.defer = true;

    // Append the script to the body
    document.body.appendChild(script);

    // Clean up the script when the component unmounts
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <TestimonialContainer>
      <TestimonialHeading>What Our Customers Say</TestimonialHeading>
      <WidgetContainer>
        <div className="sk-ww-google-reviews" data-embed-id="25361293"></div>
      </WidgetContainer>
    </TestimonialContainer>
  );
};

export default TestimonialSection;
