import React from 'react';
import { ReactComponent as C } from '@assets/C.svg';
import { ReactComponent as S } from '@assets/S.svg';
import { ReactComponent as Gyo } from '@assets/gyo.svg';
import { ReactComponent as Yook } from '@assets/yook.svg';
import { Box, Stack } from '@mui/material';
import { styled } from 'styled-components';

//
//
//

const StyledC = styled(C)`
  width: 4.625rem;
  height: 5rem;
  margin-top: 1.5rem;
  margin-right: 0.5rem;
`;

const ICON_LIST = [StyledC, S, Gyo, Yook];

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
      {ICON_LIST.map((Icon, index) => (
        <Stack key={index}>
          <Icon />
        </Stack>
      ))}
    </Box>
  );
};

export default CSFirstSectionHeader;
