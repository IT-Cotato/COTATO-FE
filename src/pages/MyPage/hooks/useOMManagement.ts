import api from '@/api/api';
import { CotatoMemberInfoResponse } from 'cotato-openapi-clients';
import { useEffect, useState } from 'react';

//
//
//

export const useOMManagement = () => {
  const [OMMembers, setOMMembers] = useState<CotatoMemberInfoResponse[]>([]);

  /**
   * OMMembers Init
   */
  useEffect(() => {
    const fetchOMMembers = async () => {
      try {
        const response = await api.get(`/v1/api/admin/old-members`);
        setOMMembers(response.data);
      } catch (error) {
        console.error('Failed to fetch old members:', error);
      }
    };

    fetchOMMembers();
  }, []);

  /**
   * memberId를 활동 멤버로 변경
   * @param memberId number
   */
  const transferMemberIdToActive = (memberId: number) => {
    try {
      api.patch(`/v1/api/member/${memberId}/status`);
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
