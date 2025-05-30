import { Box, Typography } from '@mui/material';
import React from 'react';
import { useTheme } from 'styled-components';

//
//
//

const CSSecondSectionHeader = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '1rem',
        padding: '0 3rem',
        textAlign: 'center',
        color: theme.colors.common.black,
      }}
    >
      <Typography
        variant="h1"
        sx={{
          fontFamily: 'YComputer',
          fontSize: '2.5rem',
        }}
      >
        CS교육 커리큘럼
      </Typography>
      <Typography
        variant="subtitle1"
        sx={{
          fontWeight: '400',
          fontSize: {
            xs: '0.875rem',
          },
        }}
      >
        코테이토 교육팀은 주요 CS 주제를 선정하여 교육 자료와 퀴즈를 직접 제작해요.
      </Typography>
    </Box>
  );
};

//
//
//

export default CSSecondSectionHeader;
