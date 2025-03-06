import { HEADER_HEIGHT } from '@theme/constants/constants';
import { media } from '@theme/media';
import React from 'react';
import styled, { useTheme } from 'styled-components';
import ProjectDialog from './ProjectDialog';
import { Grid2, Skeleton, Stack, Typography } from '@mui/material';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import { CotatoProjectSummaryResponse } from 'cotato-openapi-clients';
import ProjectsCard from './ProjectsCard';
import { ReactComponent as CotatoChip } from '@assets/cotato_chip.svg';
import ReadyState from '@components/ReadyState';
import CotatoPanel from '@components/CotatoPanel';
import PanelText from '@assets/project_panel_text.svg';

const Projects = () => {
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
          <Grid2 key={index} alignItems="center" justifyContent="center">
            <Skeleton key={index} variant="rectangular" width="18rem" height="22rem" />
          </Grid2>
        );
      });
    }

    if (!projects) {
      return <ReadyState />;
    }

    return projects?.map((project) => (
      <Grid2 key={project.projectId} size={{ xs: 10, sm: 6, md: 6, lg: 4, xl: 4 }}>
        <ProjectsCard
          {...project}
          onClick={() => setSelectedId((project.projectId as number).toString())}
        />
      </Grid2>
    ));
  };

  return (
    <Wrapper>
      <CotatoPanel size="short" textImgSrc={PanelText} />
      {renderSubtitle()}
      <Grid2
        container
        spacing={{ xs: 4, sm: 6, md: 6, lg: 6, xl: 8 }}
        columns={{ xs: 10, sm: 12, md: 18, lg: 16, xl: 16 }}
      >
        {renderProjects()}
      </Grid2>
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
  padding: 4rem 4em;
  gap: 2.5rem;
  min-height: calc(100vh - ${HEADER_HEIGHT});

  ${media.tablet`
    padding: 2rem;
    min-height: 100vh;
  `}
`;

export default Projects;
