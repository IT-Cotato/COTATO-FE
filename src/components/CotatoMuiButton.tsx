import React from 'react';
import { Button, ButtonProps } from '@mui/material';
import { styled } from 'styled-components';

interface CotatoMuiButtonProps extends ButtonProps {
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

const StyledMuiButton = styled(Button)<CotatoMuiButtonProps>(({ theme, color }) => ({
  '&.MuiButton-root': {
    backgroundColor: (() => {
      switch (color) {
        case 'error':
          return theme.colors.secondary80;
        case 'inherit':
          return 'transparent';
        default:
          return theme.colors.primary100_1;
      }
    })(),
    color: (() => {
      switch (color) {
        case 'error':
          return theme.colors.common.white;
        default:
          return theme.colors.common.black;
      }
    })(),
    border: (() => {
      switch (color) {
        case 'error':
          return 'none';
        case 'inherit':
          return `1px solid ${theme.colors.gray30}`;
        default:
          return 'none';
      }
    })(),
    '&:hover': {
      backgroundColor: theme.colors.primary100_2,
    },
    '&:disabled': {
      backgroundColor: theme.colors.gray30,
      color: theme.colors.gray60,
      '& .MuiButton-startIcon': {
        // For CotatoIcon disabled color
        div: {
          backgroundColor: theme.colors.gray60 + ' !important',
        },
      },
    },
  },
}));

export default CotatoMuiButton;
