import React, { useState } from 'react';
import styled, { useTheme } from 'styled-components';
import btnDefault from '@assets/pixel_button_default.svg';
import btnHover from '@assets/pixel_button_hover.svg';
import btnClicked from '@assets/pixel_button_clicked.svg';

//
//
//

type btnStateType = 'default' | 'hover' | 'clicked';

interface Props {
  BtnTextImg: React.FC<React.SVGProps<SVGSVGElement>>;
  width?: string;
  onClick?: () => void;
}

//
//
//

/**
 * @param {React.FC<React.SVGProps<SVGSVGElement>>} BtnTextImg button text image(.svg) imported as React component
 * @returns pixel button component with animation
 */
const CotatoPixelButton: React.FC<Props> = ({ BtnTextImg, width, onClick }) => {
  const [btnState, setBtnState] = useState<btnStateType>('default');

  const theme = useTheme();

  /**
   *
   */
  const handleClick = () => {
    setBtnState('clicked');

    if (onClick) {
      onClick();
    }
  };

  /**
   *
   */
  const getImgSrcByState = (state: btnStateType) => {
    switch (state) {
      case 'default':
        return btnDefault;
      case 'hover':
        return btnHover;
      case 'clicked':
        return btnClicked;
      default:
        return btnDefault;
    }
  };

  /**
   *
   */
  const getTextColorByState = (state: btnStateType) => {
    if (state === 'hover') {
      return theme.colors.secondary70;
    } else {
      return theme.colors.gray100;
    }
  };

  /**
   *
   */
  const getTextPositionByState = (state: btnStateType) => {
    switch (state) {
      case 'default':
        return '34%';
      case 'hover':
        return '28%';
      case 'clicked':
        return '40%';
      default:
        return '34%';
    }
  };

  return (
    <Wrapper>
      <Container
        type="submit"
        onMouseOver={() => setBtnState('hover')}
        onMouseLeave={() => setBtnState('default')}
        onClick={handleClick}
      >
        <BtnImg src={getImgSrcByState(btnState)} $width={width} />
        <BtnTextDiv $btnState={btnState} $getTextPositionByState={getTextPositionByState}>
          <BtnTextImg fill={getTextColorByState(btnState)} />
        </BtnTextDiv>
      </Container>
    </Wrapper>
  );
};

//
//
//

const Wrapper = styled.div`
  height: 5rem;
  display: flex;
  align-items: end;
`;

const Container = styled.button`
  background: none;
  border: none;
  position: relative;
  &:hover {
    animation: spring 0.1s ease-out 0.1s;
  }
  @keyframes spring {
    0% {
      transform: scaleY(1);
    }
    40% {
      transform: scaleY(0.99);
    }
    60% {
      transform: scaleY(1.01);
    }
    100% {
      transform: scaleY(1);
    }
  }
`;

const BtnImg = styled.img<{ $width?: string }>`
  width: ${({ $width }) => $width || '120px'};
`;

const BtnTextDiv = styled.div<{
  $btnState: btnStateType;
  $getTextPositionByState: (btnState: btnStateType) => string;
}>`
  position: absolute;
  top: ${({ $btnState, $getTextPositionByState }) => $getTextPositionByState($btnState)};
  left: 50%;
  transform: translate(-50%, -50%);
`;

export default CotatoPixelButton;
