import React from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { CotatoProjectSummaryResponse } from 'cotato-openapi-clients';
import { ReactComponent as Github } from '@assets/github.svg';
import { ReactComponent as Behance } from '@assets/behance.svg';
import styled, { useTheme } from 'styled-components';

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
      <>
        <Title>{name}</Title>
        <Introduction>{generationNumber}기</Introduction>
      </>
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

  //
  //
  //
  return (
    <StyledStack
      id={projectId?.toString()}
      justifyContent="center"
      padding="1.5rem"
      gap="2rem"
      bgcolor={theme.colors.common.real_white}
      borderRadius="0.625rem"
      onClick={handleClick}
    >
      <Box
        component="img"
        src={logoUrl ?? ''}
        alt={name}
        width="15rem"
        height="15rem"
        borderRadius="0.625rem"
        sx={{
          objectFit: 'contain',
        }}
      />
      <Stack>
        <Stack gap="0.5rem">
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            fontFamily="Pretendard"
          >
            {renderInfo()}
          </Stack>
          <Typography fontSize="1rem" color={theme.colors.gray80_2}>
            {introduction}
          </Typography>
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

const Title = styled.h3`
  margin: 0;
  font-size: 2.5rem;
  font-family: Pretendard;
  color: ${({ theme }) => theme.colors.common.black_const};
`;

const Introduction = styled.p`
  margin: 0;
  font-size: 1.5rem;
  font-family: Pretendard;
  color: ${({ theme }) => theme.colors.common.black_const};
`;
