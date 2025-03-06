import api from '@/api/api';
import { CotatoMemberInfoResponse } from 'cotato-openapi-clients';
import { useEffect, useState } from 'react';
import { MemberManagementView } from '../member-management/MypageMemberManagementContent';

//
//
//

export const useOMManagement = (view: MemberManagementView, searchValue: string) => {
  const [OMMembers, setOMMembers] = useState<CotatoMemberInfoResponse[]>([]);
  const [filteredOMMembers, setFilteredOMMembers] = useState<CotatoMemberInfoResponse[]>([]);

  /**
   * Update OMMembers
   */
  useEffect(() => {
    if (view === 'MEMBER') return;
    fetchOMMembers();
  }, [view]);

  /**
   * Init FilteredOMMembers
   */
  useEffect(() => {
    setFilteredOMMembers(OMMembers);
  }, [OMMembers]);

  /**
   * Update FilteredOMMembers
   */
  useEffect(() => {
    filterBySearchValue(searchValue);
  }, [searchValue, OMMembers]);

  /**
   * Fetch OMMembers
   */
  const fetchOMMembers = async () => {
    try {
      const response = await api.get(`/v1/api/member`, { params: { status: 'RETIRED' } });
      setOMMembers(response.data);
    } catch (error) {
      console.error('Failed to fetch old members:', error);
    }
  };

  /**
   * Update FilteredOMMembers by searchValue
   * 검색 api 나오면 수정 필요
   * @param searchValue string
   */
  const filterBySearchValue = (searchValue: string) => {
    if (!searchValue.trim()) {
      setFilteredOMMembers(OMMembers);
      return;
    }

    const searchLower = searchValue.toLowerCase();

    const filtered = OMMembers.filter(
      (member) =>
        member.name?.toLowerCase().includes(searchLower) ||
        member.position?.toLowerCase().includes(searchLower),
    );

    setFilteredOMMembers(filtered);
  };

  /**
   * memberId를 활동 멤버로 변경
   * @param memberId number
   */
  const transferMemberIdToActive = async (memberId: number) => {
    try {
      await api.patch(`/v1/api/member/${memberId}/status`, null, {
        params: { target: 'APPROVED' },
      });
      await fetchOMMembers();
    } catch (error) {
      console.error('Failed to patch old member to active member:', error);
    }
  };

  //
  //
  //

  return {
    OMMembers,
    filteredOMMembers,
    transferMemberIdToActive,
  };
};
