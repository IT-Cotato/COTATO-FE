import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { AccountDeletion, MyPage, PolicyCheck } from './contents';
import {
  MypageGenerationManagement,
  MypageGenerationManagementDetail,
} from './generation-management';
import { MypageMemberManagement } from './member-management';
import MyPageJoinManagement from './join-management/MyPageJoinManagement';

//
//
//

export const MY_PAGE_PATH = {
  MYPAGE: '',
  POLICY: {
    INFO: 'policy',
    DELETION: 'delete',
  },
  MEMBERS: 'members',
  REGISTRATION: 'registration',
  GENERATION_MANAGEMENT: 'generation-management',
} as const;

export const COMMON_PATH = {
  GENERATION: 'generations/:generationId',
} as const;

//
//
//

const MyPageRouter = () => {
  return (
    <Routes>
      <Route path={MY_PAGE_PATH.MYPAGE} element={<MyPage />} />
      <Route path={MY_PAGE_PATH.POLICY.INFO} element={<PolicyCheck />} />
      <Route
        path={`${MY_PAGE_PATH.POLICY.INFO}/${MY_PAGE_PATH.POLICY.DELETION}`}
        element={<AccountDeletion />}
      />
      <Route path={MY_PAGE_PATH.GENERATION_MANAGEMENT} element={<MypageGenerationManagement />} />
      <Route
        path={`${MY_PAGE_PATH.GENERATION_MANAGEMENT}/${COMMON_PATH.GENERATION}`}
        element={<MypageGenerationManagementDetail />}
      />

      <Route path={MY_PAGE_PATH.MEMBERS} element={<MypageMemberManagement />} />
      <Route path={MY_PAGE_PATH.REGISTRATION} element={<MyPageJoinManagement />} />
    </Routes>
  );
};

export default MyPageRouter;
