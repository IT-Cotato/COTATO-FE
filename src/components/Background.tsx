import React from 'react';
import { Box, Stack } from '@mui/material';
import { THEME_CHANGE_TRANSITION } from '@theme/constants/constants';
import { useTheme } from 'styled-components';
import lightBackgroundImage from '@/assets/light_background.svg';
import darkBackgroundImage from '@/assets/dark_background.svg';
import csBackgroundImage from '@assets/cs_tinroduce_background.png';
import useCotatoTheme from '@/hooks/useCotatoTheme';
import { useIsInCSThirdSection } from '@/zustand-stores/useInCSThirdSection';

//
//
//

const Background = () => {
  const theme = useTheme();

  //
  const { theme: cotatoTheme } = useCotatoTheme();

  //
  const { isInCSThridSecion } = useIsInCSThirdSection();

  return (
    <Stack
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100vh',
        zIndex: -1,
        backgroundColor: theme.colors.common.white,
        transition: THEME_CHANGE_TRANSITION,
      }}
    >
      <Box
        component="img"
        src={cotatoTheme === 'light' ? lightBackgroundImage : darkBackgroundImage}
        sx={{
          position: 'absolute' as const,
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          opacity: isInCSThridSecion ? 0 : 1,
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          opacity: isInCSThridSecion ? 1 : 0,
          transition: 'opacity 0.2s ease-in-out',
        }}
      >
        <Box
          component="img"
          src={csBackgroundImage}
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: theme.colors.common.white,
            opacity: 0.8,
          }}
        />
      </Box>
    </Stack>
  );
};

export default Background;
