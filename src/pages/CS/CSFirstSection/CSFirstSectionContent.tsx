import React from 'react';
import { Box } from '@mui/material';
import CSFirstSectionContentBoard from './components/CSFirstSectionContentBoard';
import styled, { useTheme } from 'styled-components';
import CSFirstSectionContentStatus from './components/CSFirstSectionContentStatus';
import { ReactComponent as BulletListSolidIcon } from '@assets/bullet_list_solid.svg';
import { ReactComponent as CSIcon } from '@assets/cs_icon.svg';
import { media, device } from '@theme/media';
import { useBreakpoints } from '@/hooks/useBreakpoints';
import fetcher from '@utils/fetcher';
import useSWRImmutable from 'swr/immutable';
import { CotatoEducationCountResponse } from 'cotato-openapi-clients';
import { DESKTOP_HEIGHT } from './constants';

const CSFirstSectionContent = () => {
  const { data: statusValue } = useSWRImmutable<CotatoEducationCountResponse>(
    'v1/api/education/counts',
    fetcher,
  );

  const theme = useTheme();
  const { isTabletOrSmaller } = useBreakpoints();

  return (
    <ContentWrapper>
      <Box
        sx={{
          paddingTop: isTabletOrSmaller ? '0' : '4.5rem',
          marginBottom: isTabletOrSmaller ? '-1.75rem' : '0',
          marginRight: isTabletOrSmaller ? '4.25rem' : '0',
        }}
      >
        <CSFirstSectionContentBoard text="코테이토 교육팀은 CS 주제를 선정해 교육 자료와 퀴즈를 직접 제작해요." />
      </Box>
      <StatusBox>
        <CSFirstSectionContentStatus
          icon={<BulletListSolidIcon />}
          status={statusValue?.quizCount ?? 0}
          unit="개"
          title="전체 문제 수"
        />
        <CSFirstSectionContentStatus
          icon={<CSIcon />}
          status={statusValue?.educationCount ?? 0}
          unit="회"
          title="교육 횟수"
        />
      </StatusBox>
      <Box
        sx={{
          paddingTop: isTabletOrSmaller ? '0.25rem' : '0',
          marginLeft: isTabletOrSmaller ? '4.25rem' : '0',
        }}
      >
        <CSFirstSectionContentBoard
          flip
          color={theme.colors.secondary60}
          text="이를 통해 부원들이 지식을 공유하고 함께 성장할 수 있는 기회를 제공해요."
        />
      </Box>
    </ContentWrapper>
  );
};

export default CSFirstSectionContent;

//
//
//

const ContentWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  gap: 2.5rem;
  margin-bottom: -3rem;
  width: 100%;
  max-width: ${device.wide};
  flex: 1;

  @media (max-height: ${DESKTOP_HEIGHT}) {
    justify-content: center;
    gap: 4rem;
  }

  ${media.desktop`
      justify-content: center;
      gap: 1.5rem;
  `}

  ${media.tablet`
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    width: 100%;
    margin-bottom: 0;
  `}
`;

const StatusBox = styled.div`
  display: flex;
  gap: 2rem;

  ${media.desktop`
      gap: 1rem;
  `}
`;
