import React from 'react';
import { useThemeMode } from '@/hooks/useThemeMode';
import { Box, Stack } from '@mui/material';
import { THEME_CHANGE_TRANSITION } from '@theme/constants/constants';
import { useTheme } from 'styled-components';
import lightBackgroundImage from '@/assets/light_background.svg';
import darkBackgroundImage from '@/assets/dark_background.svg';

//
//
//

const Background = () => {
  const theme = useTheme();

  //
  const { mode } = useThemeMode();

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
        height: '200vh',
        zIndex: -1,
        backgroundRepeat: 'repeat',
        backgroundSize: 'cover',
        backgroundColor: theme.colors.common.white,
        transition: THEME_CHANGE_TRANSITION,
      }}
    >
      <Box
        component="img"
        src={mode === 'light' ? lightBackgroundImage : darkBackgroundImage}
        sx={{
          objectFit: 'cover',
        }}
      />
    </Stack>
  );
};

export default Background;
