import api from '@/api/api';
import { CotatoMemberInfoResponse } from 'cotato-openapi-clients';
import { useEffect, useState } from 'react';
import { MemberManagementView } from '../member-management/MypageMemberManagementContent';

//
//
//

export const useOMManagement = (view: MemberManagementView) => {
  const [OMMembers, setOMMembers] = useState<CotatoMemberInfoResponse[]>([]);

  /**
   *
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
   * OMMembers Update
   */
  useEffect(() => {
    if (view === 'MEMBER') return;

    fetchOMMembers();
  }, [view]);

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

  const searchOM = () => {};

  return {
    OMMembers,
    searchOM,
    transferMemberIdToActive,
  };
};
