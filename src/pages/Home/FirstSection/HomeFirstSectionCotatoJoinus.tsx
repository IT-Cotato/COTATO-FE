import React from 'react';
import CotatoPixelButton from '@components/CotatoPixelButton';
import { useBreakpoints } from '@/hooks/useBreakpoints';
import { styled } from 'styled-components';
import { media } from '@theme/media';
import { ReactComponent as JoinusText } from '@assets/joinus_text_svg.svg';

//
//
//

const FORM_LINK = 'https://forms.gle/hGQyVwQexVbYDP2B6';

//
//
//

const HomeFirstSectionCotatoJoinus = () => {
  const { isLandScapeOrSmaller } = useBreakpoints();

  /**
   *
   */
  const handleJoinusButtonClick = () => {
    open(FORM_LINK);
  };

  return (
    <JoinusButtonWrapper>
      <CotatoPixelButton
        BtnTextImg={StyledJoinText}
        width={isLandScapeOrSmaller ? '9rem' : '10rem'}
        onClick={handleJoinusButtonClick}
      />
    </JoinusButtonWrapper>
  );
};

export default HomeFirstSectionCotatoJoinus;

//
//
//

const JoinusButtonWrapper = styled.div`
  position: absolute;
  top: 8.5rem;

  ${media.tablet`
    top: 8rem;
  `}

  ${media.landscape`
    top: 7.5rem;
  `}
`;

const StyledJoinText = styled(JoinusText)`
  width: 8rem;

  ${media.landscape`
    width: 7rem;
  `}
`;
