import api from '@/api/api';
import { CotatoMemberInfoResponse, CotatoMemberInfoResponseRoleEnum } from 'cotato-openapi-clients';
import { useEffect, useState } from 'react';
import { MemberManagementView } from '../member-management/MypageMemberManagementContent';

//
//
//

export const useActiveMemberManagement = (view: MemberManagementView) => {
  const [activeMembers, setActiveMembers] = useState<CotatoMemberInfoResponse[]>([]);

  /**
   *
   */
  const fetchActiveMembers = async () => {
    try {
      const response = await api.get(`/v1/api/member`, {
        params: {
          status: 'APPROVED',
          page: 0,
          size: 100,
          sort: [],
        },
      });

      setActiveMembers(response.data.content);
    } catch (error) {
      console.error('Failed to fetch active members:', error);
    }
  };

  /**
   * activeMembers update
   */
  useEffect(() => {
    if (view === 'OM') return;

    fetchActiveMembers();
  }, [view]);

  /**
   * memberId 의 role 변경
   * @param memberId number
   * @param newRole CotatoMemberInfoResponseRoleEnum
   */
  const updateMemberRole = (memberId: number, newRole: CotatoMemberInfoResponseRoleEnum) => {
    try {
      api.patch(`/v1/api/member/${memberId}/role`, { memberId: memberId, role: newRole });
    } catch (error) {
      const apiError = error as { message: string };
      alert(apiError.message || '권한 변경에 실패했습니다.');
      console.error('Failed to patch member role:', error);
    }
  };

  /**
   * memberIds 배열을 모두 OM으로 변경 후 업데이트
   * @param memberIds number[]
   */
  const transferMemberIdsToOM = async (
    memberIds: number[],
    setMemberIds: React.Dispatch<React.SetStateAction<number[]>>,
  ) => {
    try {
      await api.patch(
        '/v1/api/member/status',
        { memberIds: memberIds },
        { params: { target: 'RETIRE' } },
      );
      await fetchActiveMembers();
      setMemberIds([]);
    } catch (error) {
      console.error('Failed to patch active members to old members:', error);
    }
  };

  //
  //
  //

  return {
    activeMembers,
    updateMemberRole,
    transferMemberIdsToOM,
  };
};
