import React, { useState } from 'react';
import { Stack } from '@mui/material';
import MypageMemberManagementContentMemberInfo from './MypageMemberManagementContentMemberInfo';
import MypageMemberManagementContentOMInfo from './MypageMemberManagementContentOMInfo';
import { TagButton } from '../components/member-management/TagButton';
import { ReactComponent as Refresh } from '@/pages/MyPage/tempAsssets/refresh.svg';
import InfoTooltip from '../components/member-management/InfoTooltip';
import SearchBar from '../components/member-management/SearchBar';
import { CotatoMemberEnrollInfoResponse } from 'cotato-openapi-clients';
import { useActiveMemberManagement } from '../hooks/useActiveMemberManagement';
import { useOMManagement } from '../hooks/useOMManagement';

//
//
//

//
//
//

const MypageMemberManagementContent = () => {
  const [currentView, setCurrentView] = useState<'MEMBER' | 'OM'>('MEMBER');
  const { activeMembers } = useActiveMemberManagement();
  const { OMMembers } = useOMManagement();

  /**
   *
   */
  const renderHeader = () => {
    return (
      <Stack direction="row" justifyContent="space-between">
        <Stack direction="row" gap="0.25rem" alignItems="center">
          <TagButton
            isSelected={currentView === 'MEMBER'}
            onClick={() => {
              setCurrentView('MEMBER');
            }}
          >
            활동 부원
          </TagButton>
          <TagButton
            isSelected={currentView === 'OM'}
            onClick={() => {
              setCurrentView('OM');
            }}
          >
            OM
          </TagButton>
          <InfoTooltip />
        </Stack>
        <Stack direction="row" alignItems="center">
          {currentView === 'MEMBER' && (
            <TagButton disabled={true}>
              <Refresh />
              OM으로 전환하기
            </TagButton>
          )}
          {currentView === 'OM' && <SearchBar />}
        </Stack>
      </Stack>
    );
  };

  //
  //
  //

  return (
    <Stack gap="1.5rem">
      {renderHeader()}
      {currentView === 'MEMBER' && <MypageMemberManagementContentMemberInfo data={activeMembers} />}
      {currentView === 'OM' && <MypageMemberManagementContentOMInfo data={OMMembers} />}
    </Stack>
  );
};

export default MypageMemberManagementContent;
