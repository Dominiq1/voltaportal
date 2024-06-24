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
  width: 100vwe;
  overflow: hidden; /* Prevent widget overflow */
`;

const TestimonialSection = () => {
  useEffect(() => {
    // Create a script element
    const script = document.createElement('script');
    script.src = 'https://static.elfsight.com/platform/platform.js';
    script.setAttribute('data-use-service-core', '');
    script.defer = true;

    // Append the script to the body
    document.body.appendChild(script);

    // Function to hide the review count
    const hideReviewCount = () => {
      const reviewCountElement = document.querySelector('.elfsight-app-3c302946-faab-4be0-b6ed-d965d47d6177 [data-test-id="rating-count"]');
      if (reviewCountElement) {
        reviewCountElement.style.display = 'none';
      }
    };

    // Use MutationObserver to detect changes in the DOM
    const observer = new MutationObserver(hideReviewCount);
    observer.observe(document.body, { childList: true, subtree: true });

    // Clean up the script and observer when the component unmounts
    return () => {
      document.body.removeChild(script);
      observer.disconnect();
    };
  }, []);

  return (
    <TestimonialContainer>
    
      <WidgetContainer>
        <div className="elfsight-app-3c302946-faab-4be0-b6ed-d965d47d6177" data-elfsight-app-lazy></div>
      </WidgetContainer>
    </TestimonialContainer>
  );
};

export default TestimonialSection;
