import React from 'react';
import { DialogTitle, DialogTitleProps, styled } from '@mui/material';

//
//
//

interface CotatoDialogTitleProps extends DialogTitleProps {
  alignCenter?: boolean;
}

//
//
//

const CotatoDialogTitle = ({
  children,
  alignCenter = false,
  ...DialogTitleProps
}: CotatoDialogTitleProps) => {
  return (
    <StyledDialogTitle {...DialogTitleProps} sx={{ textAlign: alignCenter ? 'center' : 'left' }}>
      {children}
    </StyledDialogTitle>
  );
};

export default CotatoDialogTitle;

const StyledDialogTitle = styled(DialogTitle)`
  font-size: 1.125rem;
  font-weight: 700;
  padding: 1.5rem !important;
`;
