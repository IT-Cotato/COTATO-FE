import React from 'react';
import { ReactComponent as C } from '@assets/C.svg';
import { ReactComponent as S } from '@assets/S.svg';
import { ReactComponent as Gyo } from '@assets/gyo.svg';
import { ReactComponent as Yook } from '@assets/yook.svg';
import { Box, Stack, styled } from '@mui/material';

//
//
//

const CSFirstSectionHeader = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Stack
        sx={{
          marginRight: '0.5rem',
          marginTop: '1.25rem',
        }}
      >
        <StyledC />
      </Stack>
      <Stack>
        <S />
      </Stack>
      <Stack>
        <Gyo />
      </Stack>
      <Stack>
        <Yook />
      </Stack>
    </Box>
  );
};

export default CSFirstSectionHeader;

//
//
//

const StyledC = styled(C)`
  width: 74px;
  height: 80px;
`;
