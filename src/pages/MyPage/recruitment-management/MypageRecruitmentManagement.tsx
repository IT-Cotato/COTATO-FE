import React from 'react';
import MypageCommonLayout from '../components/common/MypageCommonLayout';
import RecruitmentManagementText from '@assets/mypage_recruitment_management_text.svg';
import { SizeStateEnum } from '@components/CotatoPanel';
import MypageRecruitmentManagementContent from './MypageRecruitmentManagementContent';

const MypageRecruitmentManagement = () => {
  return (
    <MypageCommonLayout
      slotProps={{
        header: {
          panelSize: SizeStateEnum.LONG,
          textImgSrc: RecruitmentManagementText,
        },
      }}
      Content={<MypageRecruitmentManagementContent />}
    />
  );
};

export default MypageRecruitmentManagement;
