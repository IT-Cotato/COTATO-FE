import { useBreakpoints } from '@/hooks/useBreakpoints';
import { HEADER_HEIGHT } from '@theme/constants/constants';
import { media } from '@theme/media';
import { ReactComponent as ProjectTag } from '@assets/project.svg';
import React from 'react';
import styled, { useTheme } from 'styled-components';
import ProjectDialog from './ProjectDialog';
import { Box, Grid, Skeleton, Stack, Typography } from '@mui/material';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import { CotatoProjectSummaryResponse } from 'cotato-openapi-clients';
import ProjectsCard from './ProjectsCard';
import { ReactComponent as CotatoChip } from '@assets/cotato_chip.svg';
import ReadyState from '@components/ReadyState';

const Projects = () => {
  const { isTabletOrSmaller } = useBreakpoints();
  const theme = useTheme();

  const [selectedId, setSelectedId] = React.useState<string | null>(null);

  const { data: projects, isLoading } = useSWR<CotatoProjectSummaryResponse[]>(
    '/v2/api/projects',
    fetcher,
  );

  /**
   *
   */
  const handleClose = () => {
    setSelectedId(null);
  };

  /**
   *
   */
  const renderSubtitle = () => {
    return (
      <Stack alignItems="center" gap="1.25rem">
        <CotatoChip />
        <Typography fontSize="2rem" fontFamily="YComputer" color={theme.colors.common.black}>
          코테이토의 프로젝트
        </Typography>
      </Stack>
    );
  };

  /**
   *
   */
  const renderProjects = () => {
    if (isLoading) {
      return Array.from({ length: 3 }).map((_, index) => {
        return (
          <StyledGrid item key={index} xl={3} alignItems="center" justifyContent="center">
            <Skeleton key={index} variant="rectangular" width="18rem" height="22rem" />
          </StyledGrid>
        );
      });
    }

    if (!projects) {
      return <ReadyState />;
    }

    return projects?.map((project) => (
      <StyledGrid item key={project.projectId} xl={3} alignItems="center" justifyContent="center">
        <ProjectsCard
          {...project}
          onClick={() => setSelectedId((project.projectId as number).toString())}
        />
      </StyledGrid>
    ));
  };

  return (
    <Wrapper>
      <ProjectTag width={isTabletOrSmaller ? '8.8rem' : '10rem'} />
      <Box>
        {renderSubtitle()}
        <Grid padding="1rem" container spacing={6}>
          {renderProjects()}
        </Grid>
      </Box>
      <ProjectDialog projectId={Number(selectedId)} open={!!selectedId} onClose={handleClose} />
    </Wrapper>
  );
};

//
//
//

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 4rem 8rem;
  gap: 2.5rem;
  min-height: calc(100vh - ${HEADER_HEIGHT});

  ${media.tablet`
    padding: 2rem 0;
    min-height: 100vh;
  `}
`;

const StyledGrid = styled(Grid)`
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
`;

export default Projects;
