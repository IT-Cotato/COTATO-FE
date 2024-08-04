import React from 'react';
import styled from 'styled-components';
import HomeSlide from './HomeSilde';

//
//
//

const Home = () => {
  const body: HTMLBodyElement | null = document.querySelector('body');

  if (body) {
    body.style.overflowX = 'hidden';
  }

  return (
    <Wrapper>
      <HomeSlide />
    </Wrapper>
  );
};

export default Home;

//
//
//

const Wrapper = styled.div`
  width: 100vw;
  max-width: 100vw;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: rgba(255, 255, 255, 0);
`;
