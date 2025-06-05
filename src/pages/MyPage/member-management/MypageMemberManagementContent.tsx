import React, { useState } from 'react';
import { Stack } from '@mui/material';
import MypageMemberManagementContentMemberInfo from './MypageMemberManagementContentMemberInfo';
import MypageMemberManagementContentOMInfo from './MypageMemberManagementContentOMInfo';
import { TagButton } from '../components/member-management/TagButton';
import { ReactComponent as Refresh } from '@/pages/MyPage/tempAsssets/refresh.svg';
import InfoTooltip from '../components/member-management/InfoTooltip';
import SearchBar from '../components/member-management/SearchBar';
import { useActiveMemberManagement } from '../hooks/useActiveMemberManagement';
import { useOMManagement } from '../hooks/useOMManagement';
import { CotatoMemberInfoResponsePositionEnum } from 'cotato-openapi-clients';

//
//
//

interface SearchParams {
  generationNumber: number | null;
  position: CotatoMemberInfoResponsePositionEnum | null;
  name: string;
}

export type MemberManagementView = 'MEMBER' | 'OM';

//
//
//

const MypageMemberManagementContent = () => {
  const [currentView, setCurrentView] = useState<MemberManagementView>('MEMBER');
  const [memberIds, setMemberIds] = useState<number[]>([]);
  const [searchParams, setSearchParams] = useState<SearchParams>({
    generationNumber: null,
    position: 'NONE',
    name: '',
  });

  const { activeMembers, updateMemberRole, transferMemberIdsToOM } =
    useActiveMemberManagement(currentView);
  const {
    filteredOMMembers,
    transferMemberIdToActive,
    totalPages,
    currentPage,
    pageSize,
    handlePageChange,
  } = useOMManagement(currentView, searchParams);

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
            <TagButton
              isSelected={memberIds.length > 0}
              disabled={memberIds.length <= 0}
              onClick={() => transferMemberIdsToOM(memberIds, setMemberIds)}
            >
              <Refresh />
              OM으로 전환하기
            </TagButton>
          )}
          {currentView === 'OM' && (
            <SearchBar searchParams={searchParams} setSearchParams={setSearchParams} />
          )}
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
      {currentView === 'MEMBER' && (
        <MypageMemberManagementContentMemberInfo
          data={activeMembers}
          updateMemberRole={updateMemberRole}
          memberIds={memberIds}
          setMemberIds={setMemberIds}
        />
      )}
      {currentView === 'OM' && (
        <MypageMemberManagementContentOMInfo
          data={filteredOMMembers}
          transferMemberIdToActive={transferMemberIdToActive}
          totalPages={totalPages}
          page={currentPage}
          pageSize={pageSize}
          onPageChange={handlePageChange}
        />
      )}
    </Stack>
  );
};

export default MypageMemberManagementContent;
