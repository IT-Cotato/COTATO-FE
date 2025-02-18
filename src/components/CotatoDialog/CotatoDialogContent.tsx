import React from 'react';
import { DialogContent, DialogContentProps } from '@mui/material';

//
//
//

interface CotatoDialogContentProps extends DialogContentProps {}

//
//
//

const CotatoDialogContent = ({ children, ...DialogContentProps }: CotatoDialogContentProps) => {
  return <DialogContent {...DialogContentProps}>{children}</DialogContent>;
};

export default CotatoDialogContent;
