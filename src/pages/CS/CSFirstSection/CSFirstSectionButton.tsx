import React from 'react';
import CotatoPixelButton from '@components/CotatoPixelButton';
import { ReactComponent as GoQuizTextImg } from '@assets/cs_go_quiz_text.svg';
import { ReactComponent as VVIcon } from '@assets/vv.svg';
import { styled } from 'styled-components';

//
//
//

interface ButtonWrapperProps {
  $isHover: boolean;
}

//
//
//

const CSFirstSectionButton = () => {
  const [isHover, setIsHover] = React.useState(false);

  const handleButtonClick = () => {
    const slideContainer = document.querySelector('#cs-slide-container');

    if (slideContainer) {
      slideContainer.scrollTo({
        top: slideContainer.clientHeight,
        behavior: 'smooth',
      });
    }
  };

  return (
    <ButtonWrapper $isHover={isHover}>
      <VVIcon />
      <div onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}>
        <CotatoPixelButton BtnTextImg={GoQuizTextImg} width="10rem" onClick={handleButtonClick} />
      </div>
    </ButtonWrapper>
  );
};

export default CSFirstSectionButton;

//
//
//

const ButtonWrapper = styled.div<ButtonWrapperProps>`
  position: relative;

  > svg {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: ${({ $isHover }) => ($isHover ? '-5.5rem' : '-4.5rem')};
  }
`;
