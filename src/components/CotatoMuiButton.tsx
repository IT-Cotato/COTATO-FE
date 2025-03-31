import React from 'react';
import { Button, ButtonProps } from '@mui/material';
import { styled } from 'styled-components';

interface CotatoMuiButtonProps extends ButtonProps {
  dark?: boolean;
  height?: string;
  fontFamily?: string;
  fontSize?: string;
}

//
//
//

const CotatoMuiButton: React.FC<CotatoMuiButtonProps> = ({
  height,
  fontFamily,
  fontSize,
  sx,
  ...props
}) => {
  return (
    <StyledMuiButton
      sx={{
        height: height ?? '2.25rem',
        fontFamily: fontFamily ?? 'Prentard',
        fontSize: fontSize ?? '1rem',
        ...sx,
      }}
      {...props}
    />
  );
};

const StyledMuiButton = styled(Button)<CotatoMuiButtonProps>(({ theme, color, dark, variant }) => ({
  '&.MuiButton-root': {
    backgroundColor: (() => {
      switch (color) {
        case 'info':
          return theme.colors.const.sub2[20];
        case 'error':
          return dark ? theme.colors.secondary80 : theme.colors.const.secondary80;
        case 'inherit':
          return 'transparent';
        default:
          if (variant === 'outlined') {
            return 'transparent';
          }

          return dark ? theme.colors.primary100_1 : theme.colors.const.primary100_1;
      }
    })(),
    color: (() => {
      switch (color) {
        case 'error':
          return dark ? theme.colors.const.white : theme.colors.const.black;
        case 'inherit':
          return theme.colors.const.black;

        default:
          return dark ? theme.colors.const.black : theme.colors.const.white;
      }
    })(),
    border: (() => {
      switch (color) {
        case 'error':
          return 'none';
        case 'inherit':
          return `1px solid ${dark ? theme.colors.gray30 : theme.colors.const.gray30}`;
        default:
          if (variant === 'outlined') {
            return `1px solid ${dark ? theme.colors.primary50 : theme.colors.const.primary70}`;
          }

          return 'none';
      }
    })(),
    '&:hover': (() => {
      switch (color) {
        case 'info':
          return 'none';
        case 'error':
          return 'none';
        default:
          return dark ? theme.colors.primary100_2 : theme.colors.const.primary100_2;
      }
    })(),
    '&:disabled': {
      backgroundColor: dark ? theme.colors.gray30 : theme.colors.const.gray30,
      color: dark ? theme.colors.const.gray60 : theme.colors.const.gray60,
      '& .MuiButton-startIcon': {
        // For CotatoIcon disabled color
        div: {
          backgroundColor: dark
            ? theme.colors.const.gray60
            : theme.colors.const.gray60 + ' !important',
        },
      },
    },
  },
}));

export default CotatoMuiButton;
