import React from 'react';
import { CotatoDialog, CotatoDialogActions, CotatoDialogTitle } from '@components/CotatoDialog';
import CotatoMuiButton from '@components/CotatoMuiButton';
import { Typography } from '@mui/material';

//
//
//

interface MypageGenerationManagementMemberDeleteDialogProps {
  open: boolean;
  onClose: () => void;
  onDelete: () => void;
}

//
//
//

const MypageGenerationManagementMemberDeleteDialog: React.FC<
  MypageGenerationManagementMemberDeleteDialogProps
> = ({ open, onClose, onDelete }) => {
  return (
    <CotatoDialog maxWidth="xs" open={open} onClose={onClose}>
      <CotatoDialogTitle alignCenter>
        <Typography fontWeight="700">해당 정보를 삭제하시겠습니까?</Typography>
      </CotatoDialogTitle>

      <CotatoDialogActions>
        <CotatoMuiButton
          fullWidth
          color="error"
          onClick={() => {
            onDelete();
            onClose();
          }}
        >
          삭제
        </CotatoMuiButton>
        <CotatoMuiButton fullWidth color="inherit" onClick={onClose}>
          취소
        </CotatoMuiButton>
      </CotatoDialogActions>
    </CotatoDialog>
  );
};

export default MypageGenerationManagementMemberDeleteDialog;
