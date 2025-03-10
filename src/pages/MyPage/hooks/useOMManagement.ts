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
   * Update FilteredOMMembers when search value changes
   */
  useEffect(() => {
    if (searchValue.trim()) {
      filterBySearchValue(searchValue);
    } else if (view === 'OM') {
      fetchOMMembers(currentPage - 1);
    }
  }, [searchValue]);

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
   * Update FilteredOMMembers by searchValue
   * 검색 API가 추가되면 이 부분을 수정해야 함
   * @param searchValue string
   */
  const filterBySearchValue = (searchValue: string) => {
    if (!searchValue.trim()) {
      setFilteredOMMembers(OMMembers);
      return;
    }

    // 임시: 클라이언트 측 필터링
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
