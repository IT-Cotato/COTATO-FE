import React from 'react';
import { HEADER_HEIGHT } from '@theme/constants/constants';
import styled from 'styled-components';

//
//
//

const CSSlide = () => {
  return (
    <SlideContainer>
      <SlideSection>
        <div>slide1</div>
      </SlideSection>
      <SlideSection>
        <div>slide2</div>
      </SlideSection>
    </SlideContainer>
  );
};

export default CSSlide;

//
//
//

const SlideContainer = styled.div`
  width: 100vw;
  height: calc(100vh - ${HEADER_HEIGHT});
  overflow-y: scroll;
  scroll-snap-type: y mandatory;

  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
`;

const SlideSection = styled.section`
  scroll-snap-align: center;
  width: 100%;
  height: calc(100vh - ${HEADER_HEIGHT});
`;
