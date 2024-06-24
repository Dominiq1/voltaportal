import React, { useState, useEffect } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Home from '../components/Home';
import Services from '../components/Services';
import AmbassadorProgram from '../components/AmbassadorProgram';
import Incentives from '../components/Incentives';
import AITool from '../components/AITool';
import Reviews from '../components/Reviews';
import SGIP from '../components/SGIP';
import ThankYou from '@/components/Thankyou';

const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Helvetica Neue', Arial, sans-serif;
    margin: 0;
    padding: 0;
    background-color: #D2C5B4;
  }
`;

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  padding: 20px;

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const Nav = styled.nav`
  margin-bottom: 20px;

  @media (max-width: 768px) {
    margin-bottom: 10px;
  }
`;

const NavList = styled.ul`
  list-style: none;
  padding: 0;
  display: flex;
  justify-content: space-around;
  background-color: #2C3E50;
  background-color: #000000;
  border-radius: 8px;
  border: 2px solid #fff;
  font-weight: bold;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const NavItem = styled.li`
  cursor: pointer;
  padding: 10px 20px;
  color: #ecf0f1;
  transition: background-color 0.3s, color 0.3s;
  
  &:hover {
    background-color: #34495e;
    border-radius: 8px;
    color: #fff;
  }

  @media (max-width: 768px) {
    padding: 10px 0;
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

const FadeContainer = styled.div`
  &.fade-enter {
    opacity: 0;
  }
  &.fade-enter-active {
    opacity: 1;
    transition: opacity 0.5s ease-in;
  }
  &.fade-exit {
    opacity: 1;
  }
  &.fade-exit-active {
    opacity: 0;
    transition: opacity 0.5s ease-out;
  }
`;

const componentsMap = {
  home: Home,
  services: Services,
  ambassador: AmbassadorProgram,
  incentives: Incentives,
  aiTool: AITool,
  reviews: Reviews,
  sgip: SGIP,
  final: ThankYou
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
          <NavItem onClick={() => setCurrentPage('sgip')}>SGIP</NavItem>
          <NavItem onClick={() => setCurrentPage('ambassador')}>Ambassador Program</NavItem>
          <NavItem onClick={() => setCurrentPage('incentives')}>Incentives</NavItem>
          <NavItem onClick={() => setCurrentPage('aiTool')}>AI Proposal Tool</NavItem>
          <NavItem onClick={() => setCurrentPage('reviews')}>Website & Reviews</NavItem>
          <NavItem onClick={() => setCurrentPage('final')}>Final</NavItem>
        </NavList>
      </Nav>
      <TransitionGroup component={null}>
        <CSSTransition key={currentPage} classNames="fade" timeout={500}>
          <FadeContainer>
            {currentPage === 'reviews' ? (
              <BottomContainer>
                <CurrentComponent />
              </BottomContainer>
            ) : (
              <ContentContainer>
                <CurrentComponent />
              </ContentContainer>
            )}
          </FadeContainer>
        </CSSTransition>
      </TransitionGroup>
    </AppContainer>
  );
}
