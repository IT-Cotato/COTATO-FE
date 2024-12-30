import React from 'react';
import { Box, Stack } from '@mui/material';
import { THEME_CHANGE_TRANSITION } from '@theme/constants/constants';
import { useTheme } from 'styled-components';
import lightBackgroundImage from '@/assets/light_background.svg';
import darkBackgroundImage from '@/assets/dark_background.svg';
import useCotatoTheme from '@/hooks/useCotatoTheme';

//
//
//

const Background = () => {
  const theme = useTheme();

  //
  const { DefaultTheme } = useCotatoTheme();

  //
  //
  //

  return (
    <Stack
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100vh',
        zIndex: -1,
        backgroundRepeat: 'repeat',
        backgroundSize: 'cover',
        backgroundColor: theme.colors.common.white,
        transition: THEME_CHANGE_TRANSITION,
      }}
    >
      <Box
        component="img"
        src={DefaultTheme === 'light' ? lightBackgroundImage : darkBackgroundImage}
        sx={{
          objectFit: 'cover',
          height: '100vh',
        }}
      />
    </Stack>
  );
};

export default Background;
