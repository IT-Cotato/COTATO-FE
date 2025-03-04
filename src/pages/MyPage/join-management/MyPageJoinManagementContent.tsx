import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import MyPageJoinManagmentRequestList from './MyPageJoinManagmentRequestList';
import MyPageJoinManagementRejectedList from './MyPageJoinManagementRejectedList';
import api from '@/api/api';

//
//
//

const MyPageJoinManagementContent = () => {
  const [selectedTab, setSelectedTab] = useState(0); // 0: 가입 요청, 1: 거절 항목
  const [generations, setGenerations] = useState<
    {
      generationId: number;
      generationNumber: number;
      startDate: string;
      endDate: string;
    }[]
  >([]);

  /**
   *
   */
  const getGenerations = () => {
    api.get('/v1/api/generations').then((res) => {
      setGenerations(res.data);
    });
  };

  /**
   *
   */
  const renderTabs = () => {
    return (
      <>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
          <Tab active={selectedTab === 0} onClick={() => setSelectedTab(0)}>
            가입 요청
          </Tab>
          <Tab active={selectedTab === 1} onClick={() => setSelectedTab(1)}>
            거절 항목
          </Tab>
        </Box>
      </>
    );
  };

  /**
   *
   */
  const renderContent = () => {
    switch (selectedTab) {
      case 0:
        return <MyPageJoinManagmentRequestList generations={generations} />;
      case 1:
        return <MyPageJoinManagementRejectedList generations={generations} />;
      default:
        return <MyPageJoinManagmentRequestList generations={generations} />;
    }
  };

  //
  //
  //
  useEffect(() => {
    getGenerations();
  }, []);

  return (
    <Box>
      {renderTabs()}
      <div style={{ height: '1.5rem' }} />
      {renderContent()}
    </Box>
  );
};

//
//
//

const Tab = styled.div<{ active: boolean }>`
  width: 6rem;
  height: 2.5rem;
  display: flex;
  padding: 10px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 4px;
  cursor: pointer;
  ${({ active, theme }) =>
    active
      ? `
        background: ${theme.colors.primary100_1};
        color: ${theme.colors.common.theme.colors.const.black};
      `
      : `
        background: ${theme.colors.gray30};
        color: ${theme.colors.gray90};
      `}
`;

export default MyPageJoinManagementContent;
