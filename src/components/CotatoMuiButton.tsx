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
  ...props
}) => {
  return (
    <StyledMuiButton
      sx={{
        height: height ?? '2.25rem',
        fontFamily: fontFamily ?? 'Prentard',
        fontSize: fontSize ?? '1rem',
      }}
      {...props}
    />
  );
};

const StyledMuiButton = styled(Button)<ButtonProps>(({ theme }) => ({
  '&.MuiButton-root': {
    backgroundColor: `${theme.colors.primary100_1}`,
    color: theme.colors.common.black,
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
