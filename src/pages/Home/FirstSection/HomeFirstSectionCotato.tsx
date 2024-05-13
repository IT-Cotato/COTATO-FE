import React from 'react';
import styled from 'styled-components';
import DefaultC from '@assets/C.svg';
import DefaultO from '@assets/O.svg';
import DefaultT from '@assets/T2.svg';
import DefaultA from '@assets/A.svg';
import HoverC from '@assets/C_hover.svg';
import HoverO from '@assets/O_hover.svg';
import HoverT from '@assets/T_hover.svg';
import HoverA from '@assets/A_hover.svg';
import { media } from '@theme/media';

//
//
//

interface CharacterProps {
  src: string;
  hoversrc: string;
  margin: string;
  scale: number;
}

//
//
//

const Wrapper = styled.div`
  width: 100%;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin-top: 50px;
  ${media.tablet`
    margin-top: 20px;
  `}
  ${media.landscape`
    margin-top: 0px;
    transform: translate(-50%, -50%);
  `}
`;

const Character = styled.div<CharacterProps>`
  width: 150px;
  height: 200px;
  margin: ${({ margin }) => margin};
  background: ${({ src }) => `url(${src}) no-repeat center`};
  background-size: ${({ scale }) => `${150 * scale}px ${150 * scale}px`};
  background-position-y: 0;
  animation: spring_end 0.15s ease-out 0.05s;
  transition: 15ms;
  &:hover {
    height: 299px;
    background: ${({ hoversrc }) => `url(${hoversrc}) no-repeat top`};
    background-size: ${({ scale }) => `${250 * scale}px ${299 * scale}px`};
    animation: spring 0.15s ease-out 0.05s;
  }
  & + & {
    margin-left: 30px;
  }
  @keyframes spring {
    0% {
      transform: scaleY(1);
    }
    10% {
      transform: scaleY(1.01);
    }
    30% {
      transform: scaleY(0.99);
    }
    40% {
      transform: scaleY(1.01);
    }
    60% {
      transform: scaleY(0.99);
    }
    100% {
      transform: scaleY(1);
    }
  }
  @keyframes spring_end {
    0% {
      transform: scaleY(1);
    }
    10% {
      transform: scaleY(1.01);
    }
    30% {
      transform: scaleY(0.99);
    }
    80% {
      transform: scaleY(1.01);
    }
    100% {
      transform: scaleY(1);
    }
  }
  ${media.laptop`
    width: 105px;
    height: 140px;
    background-size: 105px 105px;
    margin-left: 5px !important;
    margin-right: 5px !important;
    &:hover {
      height: 200px;
      background-size: 180px 200px;      
    }
  `}

  ${media.tablet`
    width: 90px;
    height: 120px;
    background-size: 90px 90px;
    margin-left: 0px !important;
    margin-right: 0px !important;
    &:hover {
      height: 180px;
      background-size: 150px 180px;
    }
  `}
  ${media.landscape`
    width: 75px;
    height: 100px;
    background-size: 75px 75px;
    &:hover {
      height: 150px;
      background-size: 120px 150px;
    }
  `}
  ${media.mobile`
    width: 60px;
    height: 80px;
    background-size: 60px 60px;
    &:hover {
      height: 120px;
      background-size: 90px 120px;
    }
  `}
`;

//
//
//

const HomeFirstSectionCotato = () => {
  const DefaultCharacter = ({ src, hoversrc, margin, scale }: CharacterProps) => {
    return <Character src={src} hoversrc={hoversrc} margin={margin} scale={scale} />;
  };

  DefaultCharacter.defaultProps = {
    scale: 1,
  };

  return (
    <Wrapper>
      <DefaultCharacter src={DefaultC} hoversrc={HoverC} margin="100px 0 0 0" />
      <DefaultCharacter src={DefaultO} hoversrc={HoverO} margin="30px 0 0 30px" />
      <DefaultCharacter src={DefaultT} hoversrc={HoverT} margin="60px 0 0 0" scale={1.3} />
      <DefaultCharacter src={DefaultA} hoversrc={HoverA} margin="140px 0 0 0" />
      <DefaultCharacter src={DefaultT} hoversrc={HoverT} margin="20px 0 0 0" scale={1.3} />
      <DefaultCharacter src={DefaultO} hoversrc={HoverO} margin="120px 0 0 0" />
    </Wrapper>
  );
};

export default HomeFirstSectionCotato;
