import React from 'react';
import { Stack } from '@mui/material';
import MypageGenerationManagementAddButton from './MypageGenerationManagementAddButton';
import MypageGenerationManagementContent from './MypageGenerationManagementContent';
import GenerationManagementImage from '@/pages/MyPage/tempAsssets/generation_management.svg';
import MypageCommonLayout from '../components/common/MypageCommonLayout';

//
//
//

const MypageGenerationManagement = () => {
  return (
    <MypageCommonLayout
      slotProps={{
        header: {
          panelSize: 'long',
          textImgSrc: GenerationManagementImage,
        },
      }}
      Content={
        <Stack gap="3rem" width="100%">
          <Stack direction="row" justifyContent="flex-end">
            <MypageGenerationManagementAddButton />
          </Stack>
          <MypageGenerationManagementContent />
        </Stack>
      }
    />
  );
};

export default MypageGenerationManagement;
