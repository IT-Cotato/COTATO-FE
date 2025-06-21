import React from 'react';
import CotatoPixelButton from '@components/CotatoPixelButton';
import { useBreakpoints } from '@/hooks/useBreakpoints';
import { styled } from 'styled-components';
import { media } from '@theme/media';
import { ReactComponent as JoinusText } from '@assets/joinus_text_svg.svg';
import { useJoinusModalOpenStore } from '@/zustand-stores/useJoinusModalOpenStore';
import useSWRImmutable from 'swr/immutable';
import fetcher from '@utils/fetcher';
import { CotatoRecruitmentInfoResponse } from 'cotato-openapi-clients';

//
//
//

const HomeFirstSectionJoinus = () => {
  const { data: recreuitmentStaus, isLoading } = useSWRImmutable<CotatoRecruitmentInfoResponse>(
    '/v2/api/recruitments',
    fetcher,
  );

  const { isJoinusModalOpen, setIsJoinusModalOpen } = useJoinusModalOpenStore();

  const { isLandScapeOrSmaller } = useBreakpoints();

  /**
   *
   */
  const handleJoinusButtonClick = () => {
    if (isLoading) {
      return;
    }

    if (recreuitmentStaus?.isOpened) {
      window.open(recreuitmentStaus.recruitmentUrl, '_blank', 'noopener noreferrer');

      return;
    }

    setIsJoinusModalOpen(!isJoinusModalOpen);
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

export default HomeFirstSectionJoinus;

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
