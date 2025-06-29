import React from 'react';
import { Outlet, RouteObject } from 'react-router-dom';
import { AccountDeletion, MyPage, PolicyCheck } from './contents';
import {
  MypageGenerationManagement,
  MypageGenerationManagementDetail,
} from './generation-management';
import { MypageMemberManagement } from './member-management';
import MyPageJoinManagement from './join-management/MyPageJoinManagement';
import { MypageRecruitmentManagement } from './recruitment-management';

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
  RECRUITMENT_MANAGEMENT: 'recruitment-management',
} as const;

export const COMMON_PATH = {
  GENERATION: 'generations/:generationId',
} as const;

//
//
//

const MyPageLayout = () => {
  return <Outlet />;
};

// Route configuration as an array of objects
const MyPageRouter: RouteObject[] = [
  {
    element: <MyPageLayout />,
    children: [
      {
        path: MY_PAGE_PATH.MYPAGE,
        element: <MyPage />,
      },
      {
        path: MY_PAGE_PATH.POLICY.INFO,
        element: <PolicyCheck />,
      },
      {
        path: `${MY_PAGE_PATH.POLICY.INFO}/${MY_PAGE_PATH.POLICY.DELETION}`,
        element: <AccountDeletion />,
      },
      {
        path: MY_PAGE_PATH.GENERATION_MANAGEMENT,
        element: <MypageGenerationManagement />,
      },
      {
        path: `${MY_PAGE_PATH.GENERATION_MANAGEMENT}/${COMMON_PATH.GENERATION}`,
        element: <MypageGenerationManagementDetail />,
      },
      {
        path: MY_PAGE_PATH.MEMBERS,
        element: <MypageMemberManagement />,
      },
      {
        path: MY_PAGE_PATH.REGISTRATION,
        element: <MyPageJoinManagement />,
      },
      {
        path: MY_PAGE_PATH.RECRUITMENT_MANAGEMENT,
        element: <MypageRecruitmentManagement />,
      },
    ],
  },
];

export default MyPageRouter;
