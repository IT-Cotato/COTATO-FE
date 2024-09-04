import React from 'react';
import { ReactComponent as HomeTitleSvg } from '@assets/home_title.svg';
import Fries from '@assets/fries.svg';
import FriesHover from '@assets/fries_hover.svg';
import styled, { useTheme } from 'styled-components';
import HomeFirstSectionCotato from './HomeFirstSectionCotato';
import { media } from '@theme/media';
import SloganSvgComponent from './SvgComponent/SloganSvgComponent';

//
//
//

const HomeFirstSection = () => {
  const theme = useTheme();

  /**
   *
   */
  const renderSlogan = () => {
    return (
      <HomeSlogan>
        <SloganSvgComponent />
      </HomeSlogan>
    );
  };

  /**
   *
   */
  const renderTitle = () => {
    return (
      <StyledTitleDiv>
        <HomeTitleSvg fill={theme.colors.gray80_2} />
      </StyledTitleDiv>
    );
  };

  /**
   *
   */
  const renderFry = () => {
    return (
      <FryDiv>
        <StyledFries />
      </FryDiv>
    );
  };

  /**
   *
   */
  const renderCotato = () => {
    return <HomeFirstSectionCotato />;
  };

  return (
    <Wrapper>
      {renderTitle()}
      {renderSlogan()}
      {renderFry()}
      {renderCotato()}
    </Wrapper>
  );
};

export default HomeFirstSection;

//
//
//

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  padding: 2rem 10rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  ${media.laptop`
    padding: 2rem 5rem;
  `}
  ${media.tablet`
    padding: 4rem 0rem;
  `}
`;

const StyledTitleDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  height: fit-content;
  color: ${({ theme }) => theme.colors.gray80_2};
  margin-top: 1rem;
  ${media.landscape`
    margin-top: 0;
  `}
`;

const HomeSlogan = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 126px;
  margin-top: 0.5rem;
  cursor: pointer;
  ${media.landscape`
    min-height: 100px;
    height: 100px;
  `}
`;

const FryDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  height: 24rem;
  ${media.mobile`
    width: 12rem;
    height: 20rem;
  `}
`;

const StyledFries = styled.div`
  width: 18rem;
  height: 24rem;
  background: url(${Fries}) no-repeat center;
  background-size: contain;
  animation: anim__fries__default 0.2s ease-in-out 0s;
  transition: 20ms;
  &:hover {
    background: url(${FriesHover}) no-repeat center;
    width: 26rem;
    background-size: contain;
    animation: anim__fries__hover 0.2s ease-in-out 0s;
  }

  @keyframes anim__fries__hover {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(-0.5deg);
    }
  }

  @keyframes anim__fries__default {
    0% {
      transform: rotate(-0.5deg);
    }
    100% {
      transform: rotate(0deg);
    }
  }

  ${media.landscape`
    width: 15rem;
    height: 25rem;    
  `}
  ${media.mobile`
    width: 12rem;
    height: 18rem;
  `}
`;
