import React from 'react';
import { styled, useTheme } from 'styled-components';
import status_background from '@assets/cs_status_background.svg';
import { Box, Typography } from '@mui/material';
import { media } from '@theme/media';

//
//
//

const BOX_WIDTH = 10.125;
const BOX_HEIGHT = 10.625;
const BOX_WIDTH_MEDIUM = 7.5;
const BOX_HEIGHT_MEDIUM = 7.875;

// desktop box size to pixel
// 10.125rem * 0.875 = 8.859375rem
// 10.625rem * 0.875 = 9.265625rem
// 8.859375 * 16 = 141.75px

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
  background-size: cover;
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

  ${media.desktop`
    width: ${BOX_WIDTH_MEDIUM}rem;
    height: ${BOX_HEIGHT_MEDIUM}rem;
    padding-bottom: 0.375rem;

    > span {
      font-size: 1.25rem;
      font-weight: 600;
    }
  `}
`;

const StyledTypo = styled.h2`
  font-family: Ycomputer;
  font-size: 1.25rem;
  font-weight: 400;
  text-align: center;
  color: ${({ theme }) => theme.colors.common.black};

  ${media.desktop`
    font-size: 1rem;
  `}
`;
