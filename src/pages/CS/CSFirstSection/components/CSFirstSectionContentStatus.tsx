import React from 'react';
import { styled, useTheme } from 'styled-components';
import status_background from '@assets/cs_status_background.svg';
import { Box, Typography } from '@mui/material';

//
//
//

const BOX_WIDTH = 10.125;
const BOX_HEIGHT = 10.625;

interface CSFirstSectionContentStatusProps {
  icon: React.ReactNode;
  status: string | number;
  title: string;
}

//
//
//

const CSFirstSectionContentStatus = ({ icon, status, title }: CSFirstSectionContentStatusProps) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '0.25rem',
      }}
    >
      <StatusBox>
        {icon}
        <span>{status}회+</span>
      </StatusBox>
      <Typography
        variant="h2"
        fontFamily="Ycomputer"
        fontSize="1.25rem"
        fontWeight={400}
        textAlign="center"
        color={theme.colors.common.black}
      >
        {title}
      </Typography>
    </Box>
  );
};

export default CSFirstSectionContentStatus;

//
//
//

const StatusBox = styled.div`
  background-image: url(${status_background});
  width: ${BOX_WIDTH}rem;
  height: ${BOX_HEIGHT}rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 0.75rem;
  padding-bottom: 0.5rem;

  > span {
    font-family: Pretendard;
    color: ${({ theme }) => theme.colors.gray100};
    font-size: 2rem;
    font-weight: 700;
  }
`;
