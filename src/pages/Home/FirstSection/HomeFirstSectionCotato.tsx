import React from 'react';
import styled from 'styled-components';
import DefaultC from '@assets/C.svg';
import DefaultO from '@assets/O.svg';
import DefaultT from '@assets/T.svg';
import DefaultA from '@assets/A.svg';
import HoverC from '@assets/C_hover.svg';
import HoverO from '@assets/O_hover.svg';
import HoverT from '@assets/T_hover.svg';
import HoverA from '@assets/A_hover.svg';

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
      <DefaultCharacter src={DefaultT} hoversrc={HoverT} margin="0 0 0 0" scale={1.3} />
      <DefaultCharacter src={DefaultO} hoversrc={HoverO} margin="120px 0 0 0" />
    </Wrapper>
  );
};

export default HomeFirstSectionCotato;
