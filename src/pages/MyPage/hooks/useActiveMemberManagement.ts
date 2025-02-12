import api from '@/api/api';
import {
  CotatoMemberEnrollInfoResponse,
  CotatoMemberEnrollInfoResponseRoleEnum,
} from 'cotato-openapi-clients';
import { useEffect, useState } from 'react';

//
//
//

export const useActiveMemberManagement = () => {
  const [activeMembers, setActiveMembers] = useState<CotatoMemberEnrollInfoResponse[]>([]);

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

  const updateMemberRole = (memberId: number, newRole: CotatoMemberEnrollInfoResponseRoleEnum) => {
    try {
      api.patch(`/v1/api/member/${memberId}/role`, { memberId: memberId, role: newRole });
    } catch (error) {
      console.error('Failed to patch member role:', error);
    }
  };

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
