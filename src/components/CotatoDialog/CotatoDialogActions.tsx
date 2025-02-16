import React from 'react';
import { DialogActions, DialogActionsProps } from '@mui/material';

//
//
//

interface CotatoDialogActionsProps extends DialogActionsProps {
  alignCenter?: boolean;
}

//
//
//

const CotatoDialogActions = ({
  children,
  alignCenter = false,
  ...DialogActionsProps
}: CotatoDialogActionsProps) => {
  return (
    <DialogActions
      sx={{ justifyContent: alignCenter ? 'center' : 'flex-end', padding: '1.5rem' }}
      {...DialogActionsProps}
    >
      {children}
    </DialogActions>
  );
};

export default CotatoDialogActions;
