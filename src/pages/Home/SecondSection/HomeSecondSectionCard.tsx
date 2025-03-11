import { Box, Card, CardContent, Stack, Typography } from '@mui/material';
import { media } from '@theme/media';
import { CotatoDarkTheme } from '@theme/theme';
import React from 'react';
import styled, { ThemeProvider, useTheme } from 'styled-components';

//
//
//

interface HomeSecondSectionCardProps {
  imgSrc: string;
  icon: React.ReactElement;
  title: string;
  description: string;
}

//
//
//

const HomeSecondSectionCard = ({
  imgSrc,
  icon,
  title,
  description,
}: HomeSecondSectionCardProps) => {
  const theme = useTheme();

  /**
   * ref: https://www.youtube.com/watch?v=YDCCauu4lIk&t=341s
   */
  const onMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const card = event.currentTarget;

    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const rotateY = (-1 / 50) * x + 2;
    const rotateX = (1 / 100) * y - 2;

    card.style.transition = 'transform 0.1s';
    card.style.transform = `perspective(350px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };

  /***
   *
   */
  const onMouseLeave = (event: React.MouseEvent<HTMLDivElement>) => {
    const card = event.currentTarget;
    card.style.transition = 'transform 0.5s ease';
    card.style.transform = 'perspective(400px) rotateX(0deg) rotateY(0deg)';
  };

  //
  //
  //

  return (
    <StyledCard
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      sx={{
        backgroundImage: `url(${imgSrc})`,
        backgroundColor: 'transparent',
      }}
    >
      <StyledCardContent>
        <Stack gap="1rem" padding="0rem 1.5rem 0.5rem 1.5rem">
          <Stack gap="0.5rem" direction="row" alignItems="center">
            <ThemeProvider theme={CotatoDarkTheme}>{icon}</ThemeProvider>
            <Typography variant="h4" fontWeight="700" color={theme.colors.common.black}>
              {title}
            </Typography>
          </Stack>
          <Box width="100%">
            <Typography color={theme.colors.gray80_1} fontSize="0.875rem" lineHeight="1.2rem">
              {description}
            </Typography>
          </Box>
        </Stack>
      </StyledCardContent>
    </StyledCard>
  );
};

//
//
//

const StyledCard = styled(Card)`
  background-size: cover;
  width: 21rem;
  height: 28rem;
  border-radius: 0.625rem !important;

  ${media.tablet`
    width: 18rem;
    height: 24rem;
  `}

  ${media.mobile`
    width: 16rem;
    height: 22rem;
  `}
`;

const StyledCardContent = styled(CardContent)`
  width: 100%;
  height: 100%;
  position: relative;
  justify-content: flex-start;
  display: flex;
  align-items: flex-end;
  color: ${({ theme }) => theme.colors.common.white};
`;

export default HomeSecondSectionCard;
