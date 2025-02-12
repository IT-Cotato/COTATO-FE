import api from '@/api/api';
import { CotatoMemberInfoResponse, CotatoMemberInfoResponseRoleEnum } from 'cotato-openapi-clients';
import { useEffect, useState } from 'react';

//
//
//

export const useActiveMemberManagement = () => {
  const [activeMembers, setActiveMembers] = useState<CotatoMemberInfoResponse[]>([]);

  /**
   * activeMembers Init
   */
  useEffect(() => {
    const fetchActiveMembers = async () => {
      try {
        const response = await api.get(`/v1/api/admin/active-members`);
        setActiveMembers(response.data);
      } catch (error) {
        console.error('Failed to fetch active members:', error);
      }
    };

    fetchActiveMembers();
  }, []);

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
   * memberIds 배열을 모두 OM으로 변경
   * @param memberIds number[]
   */
  const transferMemberIdsToOM = (memberIds: number[]) => {
    try {
      api.patch('/v1/api/admin/status', { memberIds: memberIds });
    } catch (error) {
      console.error('Failed to patch active members to old members:', error);
    }
  };

  return {
    activeMembers,
    updateMemberRole,
    transferMemberIdsToOM,
  };
};
