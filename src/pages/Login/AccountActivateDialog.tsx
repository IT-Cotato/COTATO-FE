import CotatoButton from '@components/CotatoButton';
import { CotatoDialog, CotatoDialogContent, CotatoDialogTitle } from '@components/CotatoDialog';
import { Stack } from '@mui/material';
import React from 'react';

//
//
//

interface AccountActivateDialogProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

//
//
//

const AccountActivateDialog = ({ isOpen, setIsOpen }: AccountActivateDialogProps) => {
  /**
   *
   */
  const handleClose = () => {
    setIsOpen(false);
  };

  /**
   *
   */
  const handleClick = () => {
    // TODO: 계정 활성화 API 호출
  };

  return (
    <CotatoDialog
      disableBackdropClick={true}
      maxWidth="xs"
      PaperProps={{
        sx: {
          borderRadius: '0.625rem',
        },
      }}
      open={isOpen}
      onClose={handleClose}
    >
      <CotatoDialogTitle alignCenter>계정 활성화</CotatoDialogTitle>
      <CotatoDialogContent>
        <Stack width="auto" spacing={2.25} alignItems="center">
          <div>
            <p>현재 회원님의 계정은 비활성화 상태입니다.</p>
            <p>
              계정을 다시 활성화하면 COTATO 서비스를 정상적으로
              <br />
              이용할 수 있습니다. 활성화를 진행하시겠습니까?
            </p>
          </div>
          <CotatoButton isEnabled={true} buttonStyle="filled" text="활성화" onClick={handleClick} />
        </Stack>
      </CotatoDialogContent>
    </CotatoDialog>
  );
};

export default AccountActivateDialog;
