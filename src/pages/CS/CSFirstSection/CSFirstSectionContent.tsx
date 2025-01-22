import React from 'react';
import { Box } from '@mui/material';
import CSFirstSectionContentBoard from './components/CSFirstSectionContentBoard';
import styled, { useTheme } from 'styled-components';
import CSFirstSectionContentStatus from './components/CSFirstSectionContentStatus';
import { ReactComponent as BulletListSolidIcon } from '@assets/bullet_list_solid.svg';
import { media } from '@theme/media';
import { useBreakpoints } from '@/hooks/useBreakpoints';

const CSFirstSectionContent = () => {
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
          status={9999}
          title="전체 문제 수"
        />
        <CSFirstSectionContentStatus
          icon={<BulletListSolidIcon />}
          status={9999}
          title="전체 문제 수"
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
  justify-content: center;
  gap: 2.5rem;

  ${media.desktop`
      gap: 1.5rem;
  `}

  ${media.tablet`
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    width: 100%;
  `}
`;

const StatusBox = styled.div`
  display: flex;
  gap: 2rem;

  ${media.desktop`
      gap: 1rem;
  `}
`;
