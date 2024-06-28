import React from 'react';
import { ReactComponent as HomeTitleSvg } from '@assets/home_title.svg';
import Fries from '@assets/fries.svg';
import FriesHover from '@assets/fries_hover.svg';
// import Join from '@assets/join_us.svg';
// import JoinHover from '@assets/join_us_hover.svg';
// import JoinPressed from '@assets/join_us_pressed.svg';
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

  /**
   *
   */
  // const renderJoinButton = () => {
  //   return (
  //     <StyledJoinDiv>
  //       <StyledJoin />
  //     </StyledJoinDiv>
  //   );
  // };

  return (
    <Wrapper>
      {renderTitle()}
      {renderSlogan()}
      {renderFry()}
      {renderCotato()}
      {/* {renderJoinButton()} */}
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
  margin-top: 6rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  font-family: 'Ycomputer';
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

// const StyledJoinDiv = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: flex-start;
//   width: fit-content;
//   height: 100px;
// `;

// const StyledJoin = styled.div`
//   width: 10rem;
//   height: 10rem;
//   background: url(${Join}) no-repeat;
//   background-size: contain;
//   background-position-y: bottom;
//   src: url(${Join});
//   transition: 50ms;
//   animation: anim__fries__default 0.5s ease 0.1s;
//   &:hover {
//     animation: anim__fries__hover 0.5s ease 0s;
//     width: 11.5rem;
//     transition: 0ms;
//     margin-top: 0.25rem;
//     height: 10rem;
//     background: url(${JoinHover}) no-repeat;
//     background-position-y: bottom;
//     background-size: contain;
//   }
//   &:active {
//     animation: anim__fries__default 0.5s ease 0.1s;
//     background: url(${JoinPressed}) no-repeat;
//     width: 10.25rem;
//     height: 10rem;
//     background-size: contain;
//     background-position-y: bottom;
//   }

//   ${media.landscape`
//     width: 10rem;
//     height: 8rem;
//     &:hover{
//       width: 11.25rem;
//       height: 8rem;
//     }
//     &:active{
//       width: 10rem;
//       height: 8rem;
//     }
//   `}
//   ${media.mobile`
//     width: 8rem;
//     height: 6rem;
//     &:hover{
//       width: 8.25rem;
//       height: 6rem;
//     }
//     &:active{
//       width: 8rem;
//       height: 6rem;
//     }
//   `}
// `;
