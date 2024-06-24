import React, { useState, useEffect } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import Home from '../components/Home';
import Services from '../components/Services';
import AmbassadorProgram from '../components/AmbassadorProgram';
import Incentives from '../components/Incentives';
import AITool from '../components/AITool';
import Reviews from '../components/Reviews';

const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Helvetica Neue', Arial, sans-serif;
    margin: 0;
    padding: 0;
    background-color: #f4f4f9;
  }
`;

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  padding: 20px;
`;

const Nav = styled.nav`
  margin-bottom: 20px;
`;

const NavList = styled.ul`
  list-style: none;
  padding: 0;
  display: flex;
  justify-content: space-around;
  background-color: #2c3e50;
  border-radius: 8px;
`;

const NavItem = styled.li`
  cursor: pointer;
  padding: 10px 20px;
  color: #ecf0f1;
  &:hover {
    background-color: #34495e;
    border-radius: 8px;
  }
`;

const ContentContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1; /* Take up remaining space */
`;

const BottomContainer = styled.div`
  flex: 0 0 40vh; /* Fixed height for the bottom 40vh */
  display: flex;
  justify-content: center;
  align-items: center;
`;

const componentsMap = {
  home: Home,
  services: Services,
  ambassador: AmbassadorProgram,
  incentives: Incentives,
  aiTool: AITool,
  reviews: Reviews,
};

export default function EAP() {
  const [currentPage, setCurrentPage] = useState('home');

  useEffect(() => {
    const hash = window.location.hash.substring(1);
    if (hash && componentsMap[hash]) {
      setCurrentPage(hash);
    }
  }, []);

  useEffect(() => {
    window.location.hash = currentPage;
  }, [currentPage]);

  const CurrentComponent = componentsMap[currentPage];

  return (
    <AppContainer>
      <GlobalStyle />
      <Nav>
        <NavList>
          <NavItem onClick={() => setCurrentPage('home')}>Home</NavItem>
          <NavItem onClick={() => setCurrentPage('services')}>Our Services</NavItem>
          <NavItem onClick={() => setCurrentPage('ambassador')}>Ambassador Program</NavItem>
          <NavItem onClick={() => setCurrentPage('incentives')}>Incentives</NavItem>
          <NavItem onClick={() => setCurrentPage('aiTool')}>AI Proposal Tool</NavItem>
          <NavItem onClick={() => setCurrentPage('reviews')}>Website & Reviews</NavItem>
        </NavList>
      </Nav>
      {currentPage === 'reviews' ? (
        <BottomContainer>
          <CurrentComponent key={currentPage} />
        </BottomContainer>
      ) : (
        <ContentContainer>
          <CurrentComponent key={currentPage} />
        </ContentContainer>
      )}
    </AppContainer>
  );
}
