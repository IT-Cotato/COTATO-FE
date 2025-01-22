import React from 'react';
import CotatoPixelButton from '@components/CotatoPixelButton';
import { ReactComponent as GoQuizTextImage } from '@assets/cs_go_quiz_text.svg';
import { ReactComponent as VVIcon } from '@assets/vv.svg';
import { styled } from 'styled-components';
import { media } from '@theme/media';
import { useBreakpoints } from '@/hooks/useBreakpoints';

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

  const { isDesktopOrSmaller, isTabletOrSmaller } = useBreakpoints();

  const handleButtonClick = () => {
    const slideContainer = document.querySelector('#cs-slide-container');
    console.log(slideContainer);
    if (slideContainer) {
      slideContainer.scrollTo({
        top: slideContainer.clientHeight,
        behavior: 'smooth',
      });
    }
  };

  const getButtonWidth = () => {
    if (isTabletOrSmaller) {
      return '7rem';
    } else if (isDesktopOrSmaller) {
      return '8.5rem';
    } else {
      return '10rem';
    }
  };

  return (
    <ButtonWrapper $isHover={isHover}>
      <VVIcon onClick={isTabletOrSmaller ? handleButtonClick : undefined} />
      {!isTabletOrSmaller && (
        <div onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}>
          <CotatoPixelButton
            BtnTextImg={StyledTextImage}
            width={getButtonWidth()}
            onClick={handleButtonClick}
          />
        </div>
      )}
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

  ${media.desktop`
    > svg {
      top: ${({ $isHover }: { $isHover: boolean }) => ($isHover ? '-4.75rem' : '-3.75rem')};
    }
  `}

  ${media.tablet`
    > svg {
      top: ${({ $isHover }: { $isHover: boolean }) => ($isHover ? '-3.75rem' : '-2.75rem')};
      top: -2rem;
      width: 1.875rem;
    }
  `}
`;

const StyledTextImage = styled(GoQuizTextImage)`
  width: 8rem;

  ${media.desktop`
    width: 6.5rem;
  `}

  ${media.tablet`
    width: 5.5rem;
  `}
`;
