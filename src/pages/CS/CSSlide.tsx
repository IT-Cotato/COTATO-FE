import React from 'react';
import { HEADER_HEIGHT } from '@theme/constants/constants';
import styled from 'styled-components';
import CSFirstSection from './CSFirstSection/CSFirstSection';
import { media } from '@theme/media';

//
//
//

const CSSlide = () => {
  return (
    <SlideContainer id="cs-slide-container">
      <SlideSection>
        <CSFirstSection />
      </SlideSection>
      {/* <SlideSection>
        <div>slide2</div>
      </SlideSection> */}
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

  ${media.tablet`
    height: 100dvh;
  `}
`;

const SlideSection = styled.section`
  scroll-snap-align: center;
  width: 100%;
  height: 100%;
`;
