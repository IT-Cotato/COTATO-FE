import React from 'react';
import { useThemeMode } from '@/hooks/useThemeMode';
import { Stack } from '@mui/material';
import { THEME_CHANGE_TRANSITION } from '@theme/constants/constants';
import { useTheme } from 'styled-components';

//
//
//

const LIGHT_BACKGROUND_IMAGE =
  'url(https://velog.velcdn.com/images/ea_st_ring/post/9e527755-de25-4053-a4bf-fc868e2d1665/image.svg)';
const DARK_BACKGROUND_IMAGE =
  'url(https://velog.velcdn.com/images/ea_st_ring/post/31b2dd04-99e8-4274-bf1a-071f66b3b9f1/image.svg)';

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
        backgroundImage: mode === 'light' ? LIGHT_BACKGROUND_IMAGE : DARK_BACKGROUND_IMAGE,
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        backgroundRepeat: 'repeat',
        backgroundSize: 'cover',
        backgroundColor: theme.colors.common.white,
        transition: THEME_CHANGE_TRANSITION,
      }}
    />
  );
};

export default Background;
