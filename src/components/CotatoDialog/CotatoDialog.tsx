import React from 'react';
import { Dialog, DialogProps } from '@mui/material';
import { ReactComponent as CloseIcon } from '@assets/close_dotted.svg';
import { styled } from 'styled-components';

//
//
//

interface CotatoDialogProps extends DialogProps {
  hideCloseButton?: boolean;
  disableBackdropClick?: boolean;
  open: boolean;
  onClose: () => void;
}

//
//
//

const CotatoDialog = ({
  hideCloseButton = false,
  disableBackdropClick = false,
  children,
  onClose,
  ...DialogProps
}: CotatoDialogProps) => {
  return (
    <Dialog
      fullWidth
      onClose={(_, reason) => {
        if (disableBackdropClick && reason === 'backdropClick') {
          return;
        }
        onClose();
      }}
      {...DialogProps}
    >
      {hideCloseButton ? null : <StyledCloseIcon onClick={() => onClose()} />}
      {children}
    </Dialog>
  );
};

export default CotatoDialog;

const StyledCloseIcon = styled(CloseIcon)`
  position: absolute;
  top: 1.25rem;
  right: 1.5rem;
  width: 2.25rem;
  height: 2.25rem;
  padding: 0.2rem;
  border-radius: 50%;
  transition: background-color 0.3s ease;
  cursor: pointer;
  &:hover {
    background-color: ${({ theme }) => theme.colors.gray20};
    opacity: 0.8;
  }
`;
