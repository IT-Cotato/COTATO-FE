import React from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { CotatoProjectSummaryResponse } from 'cotato-openapi-clients';
import { ReactComponent as Github } from '@assets/github.svg';
import { ReactComponent as Behance } from '@assets/behance.svg';
import styled, { useTheme } from 'styled-components';
import { useBreakpoints } from '@/hooks/useBreakpoints';
import CotatoTooltip from '@components/CotatoTooltip';

//
//
//

interface ProjectsCardProps extends CotatoProjectSummaryResponse {
  onClick?: () => void;
}

//
//
//

const ProjectsCard = ({
  projectId,
  name,
  introduction,
  generationNumber,
  logoUrl,
  githubUrl,
  behanceUrl,
  onClick,
}: ProjectsCardProps) => {
  const theme = useTheme();
  const { isLaptopOrSmaller, isTabletOrSmaller } = useBreakpoints();

  /**
   *
   */
  const handleClick = () => {
    if (typeof onClick !== 'function') {
      return;
    }

    onClick();
  };

  /**
   *
   */
  const renderInfo = () => {
    return (
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        fontFamily="Pretendard"
        gap="0.5rem"
      >
        <Typography
          variant={isTabletOrSmaller ? 'h6' : isLaptopOrSmaller ? 'h5' : 'h4'}
          color={theme.colors.common.black_const}
          fontWeight="700"
        >
          {name}
        </Typography>
        <Typography
          variant={isTabletOrSmaller ? 'body1' : isLaptopOrSmaller ? 'h6' : 'h5'}
          fontWeight="700"
        >
          {generationNumber}기
        </Typography>
      </Stack>
    );
  };

  /**
   *
   */
  const renderLogo = () => {
    return (
      <>
        {githubUrl ? <Github /> : null}
        {behanceUrl ? <Behance /> : null}
      </>
    );
  };

  /**
   *
   */
  const renderImage = () => {
    return (
      <Box height="15rem" width="100%">
        <img
          src={logoUrl ?? ''}
          alt={name}
          width="100%"
          height="100%"
          style={{
            borderTopLeftRadius: '0.625rem',
            borderTopRightRadius: '0.625rem',
            objectFit: 'cover',
          }}
        />
      </Box>
    );
  };

  /**
   *
   */
  const renderIntroduction = () => {
    return (
      <CotatoTooltip title={introduction} placement="top" arrow>
        <Typography
          noWrap
          variant={isTabletOrSmaller ? 'body2' : isLaptopOrSmaller ? 'body2' : 'body1'}
          color={theme.colors.common.black_const}
          padding="0"
          sx={{
            fontFamily: 'Pretendard',
          }}
        >
          {introduction}
        </Typography>
      </CotatoTooltip>
    );
  };

  //
  //
  //
  return (
    <StyledStack
      id={projectId?.toString()}
      justifyContent="center"
      width="100%"
      gap="0.75rem"
      bgcolor={theme.colors.common.real_white}
      borderRadius="0.625rem"
      onClick={handleClick}
    >
      {renderImage()}
      <Stack padding="0.25rem 1.5rem 1.5rem">
        <Stack gap="1.5rem">
          {renderInfo()}
          {renderIntroduction()}
        </Stack>
        <Stack direction="row" gap="0.5rem" minWidth="2.25rem" minHeight="2.25rem" marginTop="1rem">
          {renderLogo()}
        </Stack>
      </Stack>
    </StyledStack>
  );
};

export default ProjectsCard;

const StyledStack = styled(Stack)`
  cursor: pointer;
  transition: transform 0.2s;
  &:hover {
    transform: translateY(-0.5rem);
  }
  box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.15);
`;
