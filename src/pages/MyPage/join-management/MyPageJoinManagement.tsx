import React from 'react';
import MypageCommonLayout from '../components/common/MypageCommonLayout';
import { SizeStateEnum } from '@components/CotatoPanel';
import panelText from '@/assets/join_management_panel_text.svg';
import MyPageJoinManagementContent from './MyPageJoinManagementContent';

const MyPageJoinManagement = () => {
  return (
    <MypageCommonLayout
      slotProps={{
        header: {
          panelSize: SizeStateEnum.LONG,
          textImgSrc: panelText,
        },
      }}
      Content={<MyPageJoinManagementContent />}
    />
  );
};

export default MyPageJoinManagement;
