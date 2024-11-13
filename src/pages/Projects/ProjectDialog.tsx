import React from 'react';
import { Box, Dialog, DialogContent, Stack, Typography } from '@mui/material';
import fetcher from '@utils/fetcher';
import {
  CotatoProjectDetailResponse,
  CotatoProjectImageInfoResponseProjectImageTypeEnum,
} from 'cotato-openapi-clients';
import { ReactComponent as LinkIcon } from '@assets/link.svg';
import { ReactComponent as BehanceLightIcon } from '@assets/behance_light.svg';
import { ReactComponent as GithubLightIcon } from '@assets/github_light.svg';
import styled, { useTheme } from 'styled-components';
import useSWR from 'swr';
import { media } from '@theme/media';
import { useBreakpoints } from '@/hooks/useBreakpoints';

import ProjectsLink from './ProjectsServiceLink';

//
//
//

interface ProjectsProps {
  projectId: number;
  open: boolean;
  onClose: () => void;
}

//
//
//

const ProjectDialog = ({ open, onClose, projectId }: ProjectsProps) => {
  if (!projectId) {
    return null;
  }

  const theme = useTheme();
  const { isLandScapeOrSmaller } = useBreakpoints();
  const { data: project } = useSWR<CotatoProjectDetailResponse>(
    `/v2/api/projects/${projectId}`,
    fetcher,
  );

  const imageInfos = project?.imageInfos;

  const thumbNail = imageInfos?.find(
    (imageInfo) =>
      imageInfo.projectImageType === CotatoProjectImageInfoResponseProjectImageTypeEnum.Thumbnail,
  );

  const details = imageInfos?.filter(
    (imageInfo) =>
      imageInfo.projectImageType === CotatoProjectImageInfoResponseProjectImageTypeEnum.Detail,
  );

  const memberPositionMap = {
    BE: isLandScapeOrSmaller ? 'BE' : 'BACK-END',
    FE: isLandScapeOrSmaller ? 'FE' : 'FRONT-END',
    DESIGN: isLandScapeOrSmaller ? 'DE' : 'DESIGN',
    PM: isLandScapeOrSmaller ? 'PM' : 'PRODUCT',
  };

  /**
   *
   */
  const renderLeftPart = () => {
    return (
      <Stack gap="2rem">
        <Stack>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Title>{project?.name}</Title>
            {!isLandScapeOrSmaller ? <Generation>{project?.generationNumber}기</Generation> : null}
          </Stack>
          <Introduction>{project?.introduction}</Introduction>
        </Stack>
        <Stack direction="row" gap="0.5rem" width="auto" flexWrap="wrap">
          <ProjectsLink
            link={project?.projectUrl}
            logo={<LinkIcon />}
            name="링크"
            color={theme.colors.common.black_const}
            bgColor={theme.colors.gray20}
          />
          <ProjectsLink
            link={project?.githubUrl}
            logo={<GithubLightIcon />}
            name="GitHub"
            bgColor={theme.colors.common.black_const}
          />
          <ProjectsLink
            link={project?.behanceUrl}
            logo={<BehanceLightIcon />}
            name="Behance"
            bgColor={theme.colors.sub2[60]}
          />
        </Stack>
      </Stack>
    );
  };

  /**
   *
   */
  const renderRightPart = () => {
    return (
      <Stack
        gap={isLandScapeOrSmaller ? '0rem' : '1rem'}
        alignSelf={isLandScapeOrSmaller ? 'flex-end' : 'center'}
      >
        {Object.entries(memberPositionMap).map(([position, title]) => {
          if (!project?.memberInfos) {
            return null;
          }

          const members = project?.memberInfos.filter((member) => member.position === position);

          return (
            <Stack
              key={position}
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              height="100%"
              gap="1rem"
            >
              <Typography variant="body1" fontWeight={700}>
                {title}
              </Typography>
              <Stack minWidth="5rem">
                <Box
                  display="flex"
                  width="100%"
                  height="100%"
                  justifyContent="flex-end"
                  gap={isLandScapeOrSmaller ? '0.25rem' : '0.5rem'}
                >
                  {members?.map((member) => (
                    <Typography key={member.memberId} variant="body2" fontWeight={700}>
                      {member.name}
                    </Typography>
                  ))}
                </Box>
              </Stack>
            </Stack>
          );
        })}
      </Stack>
    );
  };

  //
  //
  //
  return (
    <Dialog fullWidth open={open} maxWidth="lg" onClose={onClose}>
      <StyledDialogContent>
        {thumbNail && (
          <Box
            display="flex"
            alignItems="flex-start"
            width="100%"
            maxHeight="35rem"
            sx={{
              objectFit: 'cover',
              objectPosition: 'top',
            }}
            component="img"
            src={thumbNail.imageUrl}
            alt="thumbnail"
          />
        )}
        <Box padding="2rem">
          <Stack direction="row" justifyContent="space-between" flexWrap="wrap" gap="2rem">
            {renderLeftPart()}
            {renderRightPart()}
          </Stack>
        </Box>
        <Stack marginTop="1rem">
          {details?.map((detail) => (
            <Box
              key={detail.imageId}
              display="flex"
              alignItems="flex-start"
              width="100%"
              sx={{
                objectFit: 'cover',
                objectPosition: 'top',
              }}
              component="img"
              src={detail.imageUrl}
              alt="detail"
            />
          ))}
        </Stack>
      </StyledDialogContent>
    </Dialog>
  );
};

export default ProjectDialog;

//
//
//

const StyledDialogContent = styled(DialogContent)`
  padding: 0 !important;
`;

const Title = styled.h3`
  margin: 0;
  font-size: 2.4rem;
  font-weight: 700;
  font-family: Pretendard;

  ${media.tablet`
    font-size: 1.8rem;
  `}

  ${media.mobile`
        font-size: 1.6rem;
    `}
`;

const Generation = styled.span`
  font-size: 1.4rem;
  font-weight: 700;
  font-family: Pretendard;

  ${media.tablet`
        font-size: 1.2rem;
    `}

  ${media.mobile`
        font-size: 1rem;
    `}
`;

const Introduction = styled.p`
  font-size: 1rem;
  margin: 1rem 0 0 0;
  font-family: Pretendard;

  ${media.tablet`
            font-size: 0.8rem;
        `}

  ${media.mobile`
            font-size: 0.6rem;
        `}
`;
