import React from 'react';
import GenerationManagementImage from '@/pages/MyPage/tempAsssets/member_management.svg';
import MypageCommonLayout from '../components/common/MypageCommonLayout';
import { SizeStateEnum } from '@components/CotatoPanel';
import MypageMemberManagementContent from './MypageMemberManagementContent';

//
//
//

const MypageMemberManagement = () => {
  return (
    <MypageCommonLayout
      slotProps={{
        header: { panelSize: SizeStateEnum.LONG, textImgSrc: GenerationManagementImage },
      }}
      Content={<MypageMemberManagementContent />}
    />
  );
};

export default MypageMemberManagement;
