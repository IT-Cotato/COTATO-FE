import React from 'react';
import MypageCommonLayout from '../components/common/MypageCommonLayout';
import { SizeStateEnum } from '@components/CotatoPanel';
import GenerationManagementImage from '@/pages/MyPage/tempAsssets/generation_management.svg';
import MypageGenerationManagementDetailContent from './MypageGenerationManagementDetailContent';

//
//
//

const MypageGenerationManagementDetail = () => {
  //
  return (
    <MypageCommonLayout
      slotProps={{
        header: { panelSize: SizeStateEnum.LONG, textImgSrc: GenerationManagementImage },
      }}
      Content={<MypageGenerationManagementDetailContent />}
    />
  );
};

export default MypageGenerationManagementDetail;
