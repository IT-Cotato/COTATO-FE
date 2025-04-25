import api from '@/api/api';
import {
  CotatoMemberInfoResponse,
  CotatoAddableMemberInfoPositionEnum,
} from 'cotato-openapi-clients';
import { useEffect, useState } from 'react';
import { MemberManagementView } from '../member-management/MypageMemberManagementContent';

//
//
//
interface SearchParams {
  generationNumber: number | null;
  position: CotatoAddableMemberInfoPositionEnum | null;
  name: string;
}

//
//
//

export const useOMManagement = (view: MemberManagementView, searchParams: SearchParams) => {
  const [OMMembers, setOMMembers] = useState<CotatoMemberInfoResponse[]>([]);
  const [filteredOMMembers, setFilteredOMMembers] = useState<CotatoMemberInfoResponse[]>([]);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize] = useState<number>(20);

  /**
   * Update OMMembers
   */
  useEffect(() => {
    if (view === 'MEMBER') return;
    fetchOMMembers(currentPage - 1); // API는 0부터 시작
  }, [view, currentPage]);

  /**
   * Init FilteredOMMembers
   */
  useEffect(() => {
    setFilteredOMMembers(OMMembers);
  }, [OMMembers]);

  /**
   * Update FilteredOMMembers when search params change
   */
  useEffect(() => {
    if (searchParams.name.trim() || searchParams.position || searchParams.generationNumber) {
      filterBySearchParams(searchParams);
    } else if (view === 'OM') {
      fetchOMMembers(currentPage - 1);
    }
  }, [searchParams]);

  /**
   * Fetch OMMembers with pagination
   */
  const fetchOMMembers = async (page: number) => {
    try {
      const response = await api.get(`/v1/api/member`, {
        params: {
          status: 'RETIRED',
          page: page,
          size: pageSize,
          sort: [],
        },
      });

      setOMMembers(response.data.content);
      setFilteredOMMembers(response.data.content);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error('Failed to fetch OM members:', error);
    }
  };

  /**
   * Handle page change
   */
  const handlePageChange = (e: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };

  /**
   * Update FilteredOMMembers by searchParams
   * 검색 API로 요청하여 필터링된 결과를 가져옴
   * @param searchParams SearchParams
   */
  const filterBySearchParams = (searchParams: SearchParams) => {
    if (!searchParams.name.trim() && !searchParams.position && !searchParams.generationNumber) {
      setFilteredOMMembers(OMMembers);
      return;
    }

    fetchFilteredMembers(searchParams);
  };

  /**
   * Fetch filtered members from API
   */
  const fetchFilteredMembers = async (searchParams: SearchParams) => {
    try {
      const response = await api.get(`/v1/api/member/search`, {
        params: {
          status: 'RETIRED',
          page: currentPage - 1,
          size: pageSize,
          sort: [],
          passedGenerationNumber: searchParams.generationNumber || undefined,
          position: searchParams.position || undefined,
          name: searchParams.name || undefined,
        },
      });

      setFilteredOMMembers(response.data.content);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error('Failed to fetch filtered members:', error);
    }
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
      await fetchOMMembers(currentPage - 1);
    } catch (error) {
      console.error('Failed to patch old member to active member:', error);
    }
  };

  //
  //
  //

  return {
    filteredOMMembers,
    transferMemberIdToActive,
    totalPages,
    currentPage,
    pageSize,
    handlePageChange,
  };
};
