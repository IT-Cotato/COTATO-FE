import React, { useState } from 'react';
import CotatoIcon from '@components/CotatoIcon';
import { Button } from '@mui/material';
import { useTheme } from 'styled-components';
import MypageGenerationManagementAddDialog from './MypageGenerationManagementAddDialog';

//
//
//

const MypageGenerationManagementAddButton = () => {
  const theme = useTheme();

  //
  const [open, setOpen] = useState(false);

  //
  //
  //
  return (
    <>
      <Button
        startIcon={
          <CotatoIcon icon="plus-solid" size="1.25rem" color={theme.colors.common.white} />
        }
        sx={{
          backgroundColor: theme.colors.primary100_1,
          color: theme.colors.common.white,
          fontFamily: 'Ycomputer',
          fontSize: '1.125rem',
        }}
        onClick={() => setOpen(true)}
      >
        기수 추가하기
      </Button>
      <MypageGenerationManagementAddDialog open={open} onClose={() => setOpen(false)} />
    </>
  );
};

export default MypageGenerationManagementAddButton;
