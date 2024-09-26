import React from 'react';
import { ReactComponent as CompetitionRatio } from '@assets/competition_ratio.svg';
import { ReactComponent as UniversityNumber } from '@assets/university_number.svg';
import { ReactComponent as MemberNumber } from '@assets/member_number.svg';
import styled from 'styled-components';
import AboutLine from '@components/About/AboutLine';
import { useBreakpoints } from '@/hooks/useBreakpoints';
import { media } from '@theme/media';

//
//
//

const AboutStatus = () => {
  const { isLaptopOrSmaller, isTabletOrSmaller } = useBreakpoints();

  return (
    <Wrapper>
      <CompetitionRatio />
      <UniversityNumber />
      <MemberNumber />
      {!isTabletOrSmaller && (
        <LineWrapper>
          <AboutLine width={isLaptopOrSmaller ? '48rem' : '62rem'} />
        </LineWrapper>
      )}
    </Wrapper>
  );
};

//
//
//

const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10rem;

  ${media.laptop`
    gap: 5rem;
  `}

  ${media.tablet`
  flex-direction: column;
  `}
`;

const LineWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: -1;
`;

export default AboutStatus;
