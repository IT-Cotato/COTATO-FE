import api from '@/api/api';
import { CotatoMemberEnrollInfoResponse } from 'cotato-openapi-clients';
import { useEffect, useState } from 'react';

//
//
//

export const useOMManagement = () => {
  const [OMMembers, setOMMembers] = useState<CotatoMemberEnrollInfoResponse[]>([]);

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
