import React from 'react';
import { ReactComponent as HomeTitleImg } from '@assets/home_title.svg';
import HomeSloganBg from '@assets/home_slogan_bg.svg';
import HomeSloganBgHover from '@assets/home_slogan_bg_hover.svg';
import Fries from '@assets/fries.svg';
import FriesHover from '@assets/fries_hover.svg';
import Join from '@assets/join_us.svg';
import JoinHover from '@assets/join_us_hover.svg';
import JoinPressed from '@assets/join_us_pressed.svg';
import styled from 'styled-components';
import HomeFirstSectionCotato from './HomeFirstSectionCotato';

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
  font-family: 'Ycomputer';
`;

const StyledTitleDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  height: fit-content;
  color: ${({ theme }) => theme.colors.gray80};
  margin-top: 1rem;
`;

const HomeSlogan = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-top: 1rem;
  cursor: pointer;
`;

const HomeSloganImgDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  height: 5.5rem;
  background: url(${HomeSloganBg}) no-repeat center;
  transition: 0.1s;
  animation: anim__spring__default 0.25s ease-in 0.1s;

  div {
    letter-spacing: ${({ theme }) => theme.size.xs};
  }

  &:hover {
    background: url(${HomeSloganBgHover}) no-repeat center;
    animation: anim__spring__hover 0.25s ease-out 0.1s;
    div {
      letter-spacing: ${({ theme }) => theme.size.sm};
    }
    span {
      color: ${({ theme }) => theme.colors.secondary60};
      display: inline-block;
    }
  }

  @keyframes anim__spring__hover {
    0% {
      transform: scaleX(1);
    }
    10% {
      transform: scaleX(1.01);
    }
    30% {
      transform: scaleX(0.99);
    }
    40% {
      transform: scaleX(1.01);
    }
    60% {
      transform: scaleX(0.99);
    }
    100% {
      transform: scaleX(1);
    }
  }

  @keyframes anim__spring__default {
    0% {
      transform: scaleX(1);
    }
    10% {
      transform: scaleX(1.01);
    }
    30% {
      transform: scaleX(0.99);
    }
    80% {
      transform: scaleX(1.01);
    }
    100% {
      transform: scaleX(1);
    }
  }
`;

const HomeSloganText = styled.div`
  font-size: ${({ theme }) => theme.fontSize.xl};
  letter-spacing: ${({ theme }) => theme.size.xs};
  p {
    color: ${({ theme }) => theme.colors.gray80};
    display: inline-block;
  }
  &:hover {
    span {
      color: ${({ theme }) => theme.colors.secondary60};
      display: inline-block;
    }
    letter-spacing: ${({ theme }) => theme.size.sm};
  }
`;

const FryDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  height: 100%;
  margin-top: 1rem;
`;

const StyledFries = styled.div`
  width: 20rem;
  height: 26rem;
  background: url(${Fries}) no-repeat center;
  background-size: contain;
  animation: anim__fries__default 0.2s ease-in-out 0s;
  transition: 20ms;
  &:hover {
    background: url(${FriesHover}) no-repeat center;
    width: 22rem;
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
`;

const StyledJoinDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: fit-content;
  height: 100%;
  margin-top: 1rem;
`;

const StyledJoin = styled.div`
  width: 12rem;
  height: 10rem;
  background: url(${Join}) no-repeat;
  background-size: contain;
  background-position-y: bottom;
  src: url(${Join});
  transition: 20ms;
  &:hover {
    width: 14.25rem;
    height: 11rem;
    background: url(${JoinHover}) no-repeat;
    background-size: contain;
  }
  &:active {
    background: url(${JoinPressed}) no-repeat;
    width: 12rem;
    height: 10rem;
    background-size: contain;
    background-position-y: bottom;
  }
`;

//
//
//

const HomeFirstSection = () => {
  const renderSlogan = () => {
    return (
      <HomeSlogan>
        <HomeSloganImgDiv>
          <HomeSloganText>
            <span>co</span>
            <p>de </p>
            <span> &nbsp;&nbsp;t</span>
            <p>ogether, &nbsp;</p>
            <span>a</span>
            <p>rrive </p>
            <span> &nbsp;to</span>
            <p>gether!</p>
          </HomeSloganText>
        </HomeSloganImgDiv>
      </HomeSlogan>
    );
  };

  const renderTitle = () => {
    return (
      <StyledTitleDiv>
        <HomeTitleImg />
      </StyledTitleDiv>
    );
  };

  const renderFry = () => {
    return (
      <FryDiv>
        <StyledFries />
      </FryDiv>
    );
  };

  const renderCotato = () => {
    return <HomeFirstSectionCotato />;
  };

  const renderJoinButton = () => {
    return (
      <StyledJoinDiv>
        <StyledJoin />
      </StyledJoinDiv>
    );
  };

  return (
    <Wrapper>
      {renderTitle()}
      {renderSlogan()}
      {renderFry()}
      {renderCotato()}
      {renderJoinButton()}
    </Wrapper>
  );
};

export default HomeFirstSection;
