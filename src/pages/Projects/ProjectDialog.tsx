import React from 'react';
import { Box, Dialog, DialogContent, Stack, Typography } from '@mui/material';
import fetcher from '@utils/fetcher';
import {
  CotatoProjectDetailResponse,
  CotatoProjectImageInfoResponseProjectImageTypeEnum,
} from 'cotato-openapi-clients';
import { ReactComponent as LinkIcon } from '@assets/link.svg';

import styled, { useTheme } from 'styled-components';
import useSWR from 'swr';
import { media } from '@theme/media';
import { useBreakpoints } from '@/hooks/useBreakpoints';

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
  const { isMobileOrSmaller, isTabletOrSmaller, isLandScapeOrSmaller } = useBreakpoints();
  const { data: project } = useSWR<CotatoProjectDetailResponse>(
    `/v2/api/projects/${projectId}`,
    fetcher,
  );

  const imageInfos = project?.imageInfos;

  const thumbNail = imageInfos?.find(
    (imageInfo) =>
      imageInfo.projectImageType === CotatoProjectImageInfoResponseProjectImageTypeEnum.Thumbnail,
  );

  // TODO: add details bottom the dialog
  //   const details = imageInfos?.filter(
  //     (imageInfo) =>
  //       imageInfo.projectImageType === CotatoProjectImageInfoResponseProjectImageTypeEnum.Detail,
  //   );

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
      <>
        <Stack>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Title>{project?.name}</Title>
            {!isLandScapeOrSmaller ? <Generation>{project?.generationNumber}기</Generation> : null}
          </Stack>
          <Introduction>{project?.introduction}</Introduction>
        </Stack>
        {project?.projectUrl ? (
          <Box
            display="flex"
            alignItems="center"
            bgcolor={theme.colors.gray20}
            width="4.5rem"
            height="2rem"
            padding="0.5rem"
            borderRadius="0.25rem"
            gap="0.5rem"
            sx={{
              cursor: 'pointer',
            }}
            onClick={() => {
              window.open(project?.projectUrl, '_blank');
            }}
          >
            <LinkIcon />
            <Typography>링크</Typography>
          </Box>
        ) : (
          <Box height="2rem" />
        )}
      </>
    );
  };

  /**
   *
   */
  const renderRightPart = () => {
    return Object.entries(memberPositionMap).map(([position, title]) => {
      if (!project?.memberInfos) {
        return null;
      }

      const members = project?.memberInfos.filter((member) => member.position === position);

      return (
        <Stack
          key={position}
          direction="row"
          justifyContent={isLandScapeOrSmaller ? 'auto' : 'space-between'}
          alignItems={isLandScapeOrSmaller ? 'flex-end' : 'center'}
          height="100%"
          gap="1rem"
        >
          <Typography
            fontSize={isMobileOrSmaller ? '0.75rem' : isLandScapeOrSmaller ? '0.8rem' : '1rem'}
            fontWeight={700}
          >
            {title}
          </Typography>
          <Stack minWidth="7.5rem">
            <Box display="flex" width="100%" gap={isLandScapeOrSmaller ? '0.25rem' : '0.5rem'}>
              {members?.map((member) => (
                <Typography
                  key={member.memberId}
                  fontWeight={700}
                  flexWrap="wrap"
                  fontSize={isLandScapeOrSmaller ? '0.7rem' : isTabletOrSmaller ? '0.8rem' : '1rem'}
                >
                  {member.name}
                </Typography>
              ))}
            </Box>
          </Stack>
        </Stack>
      );
    });
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
            maxHeight="34rem"
            sx={{
              objectFit: 'cover',
              objectPosition: 'top',
            }}
            component="img"
            src={thumbNail.imageUrl}
            alt="thumbnail"
          />
        )}
        <Box
          height={isLandScapeOrSmaller ? '12rem' : '15rem'}
          padding={
            isLandScapeOrSmaller
              ? '1.8rem 0 0 1.5rem'
              : isTabletOrSmaller
              ? '2rem 1.8rem'
              : '3rem 3.5rem'
          }
        >
          <Stack direction="row" justifyContent="space-between">
            <Stack
              width={isLandScapeOrSmaller ? '8rem' : isTabletOrSmaller ? '10rem' : '18rem'}
              gap="2rem"
            >
              {renderLeftPart()}
            </Stack>

            <Stack
              width="fit-content"
              gap={isLandScapeOrSmaller ? '0rem' : '1rem'}
              height="fit-content"
              alignSelf={isLandScapeOrSmaller ? 'flex-end' : 'center'}
            >
              {renderRightPart()}
            </Stack>
          </Stack>
        </Box>
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
