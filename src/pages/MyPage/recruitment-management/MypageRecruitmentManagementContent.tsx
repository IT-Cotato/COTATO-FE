import React from 'react';
import MypageRecruitmentManagementContentLayout from './MypageRecruitmentManagementContentLayout';
import MypageRecruitmentManagementContentManage from './MypageRecruitmentManagementContentManage';
import MypageRecruitmentManagementContentSendRecord from './MypageRecruitmentManagementContentSendRecord';

//
//
//

const COMMON_DESCRIPTION = '추가 문의가 있으신 경우 COTATO-TEAM에게 남겨주세요.';

//
//
//

const MypageRecruitmentManagementContent = () => {
  return (
    <>
      <MypageRecruitmentManagementContentLayout
        title="신입 기수 모집 중"
        description={COMMON_DESCRIPTION}
      >
        <MypageRecruitmentManagementContentManage />
      </MypageRecruitmentManagementContentLayout>
      <MypageRecruitmentManagementContentLayout title="전송 기록" description={COMMON_DESCRIPTION}>
        <MypageRecruitmentManagementContentSendRecord />
      </MypageRecruitmentManagementContentLayout>
    </>
  );
};

//
//
//

export default MypageRecruitmentManagementContent;
