import { Box, Card, CardContent, Stack, Typography } from '@mui/material';
import React from 'react';
import styled from 'styled-components';

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
  return (
    <StyledCard imgSrc={imgSrc}>
      <StyledCardContent>
        <Stack gap="1rem">
          <Stack gap="0.5rem" direction="row">
            {icon}
            <Typography variant="h4" fontWeight="700">
              {title}
            </Typography>
          </Stack>
          <Box width="12rem">
            <Typography variant="body1" fontFamily="YComputer">
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

const StyledCard = styled(Card)<{ imgSrc: string }>`
  background-image: url(${(props) => props.imgSrc});
  background-size: cover;
  width: 21rem;
  height: 28rem;
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
