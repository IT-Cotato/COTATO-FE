import CotatoSelectBox from '@components/CotatoSelectBox';
import React, { Fragment, useEffect, useState } from 'react';
import styled, { useTheme } from 'styled-components';
import ConfirmButton from '../components/Mypage/ConfirmButton';
import api from '@/api/api';
import { MemberStatus } from '@/enums/MemberStatus';
import { Divider, Stack } from '@mui/material';
import { MEMBER_POSITION } from '../constants';
import EmptyResult from '../components/common/EmptyResult';
import { media } from '@theme/media';
import { useGeneration } from '@/hooks/useGeneration';
import { TableLayout } from '@components/Table';

//
//
//

interface MyPageJoinManagmentRequestListProps {
  generations: {
    generationId: number;
    generationNumber: number;
    startDate: string;
    endDate: string;
  }[];
}

//
//
//

const TablePagination = TableLayout.TablePagination;

//
//
//

const MyPageJoinManagmentRequestList = ({ generations }: MyPageJoinManagmentRequestListProps) => {
  const [requestList, setRequestList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const theme = useTheme();
  const { generations: generationList } = useGeneration();

  /**
   *
   */
  const fetchRequestList = async () => {
    await api.get(`/v1/api/member?status=${MemberStatus.REQUESTED}`).then((res) => {
      setRequestList(res.data.content);
    });
  };

  /**
   *
   */
  const getPosition = (position: string) => {
    switch (position) {
      case '포지션':
        return null;
      case 'PM':
        return 'PM';
      case '디자이너':
        return 'DESIGN';
      case '백엔드':
        return 'BE';
      case '프론트엔드':
        return 'FE';
    }
  };

  /**
   *
   */
  const handlePageChange = (e: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };

  /**
   *
   */
  const handleApproveButtonClick = (
    e: React.MouseEvent<HTMLButtonElement>,
    name: string,
    memberId: number,
  ) => {
    const target = e.target as HTMLButtonElement;
    const targetGenerationId =
      target.previousSibling?.previousSibling?.firstChild?.firstChild?.firstChild?.nextSibling
        ?.textContent;
    const targetPosition = target.previousSibling?.firstChild?.firstChild?.firstChild?.textContent;

    const generationId = Number(targetGenerationId);
    const generationNumber = generationList?.find(
      (_generation) => generationId === _generation.generationId,
    )?.generationNumber;
    const position = getPosition(targetPosition as string);

    if (position === null) {
      alert('포지션을 선택해주세요.');
      return;
    }

    const check = confirm(
      `${name} 님을 ${generationNumber}기 ${targetPosition} 부원으로 승인하시겠습니까?`,
    );
    if (check) {
      api
        .patch(`/v1/api/member/${memberId}/approve`, {
          generationId,
          position,
        })
        .then(() => {
          fetchRequestList();
        });
    }
  };

  /**
   *
   */
  const handleRejectButtonClick = (name: string, memberId: number) => {
    const check = confirm(`${name} 님을 거절하시겠습니까?`);
    if (check) {
      api.patch(`/v1/api/member/${memberId}/reject`);
    }
  };

  /**
   *
   */
  const renderRequestItem = (request: any) => {
    return (
      <ItemWrapper>
        <p>
          {request.name} (<span>{request.backFourNumber}</span>)
        </p>
        <ButtonContainer>
          <CotatoSelectBox
            defaultVal={String(generations.length) + '기'}
            selectList={generations.map((generation) => String(generation.generationNumber) + '기')}
            metaDatas={generations.map((generation) => generation.generationId)}
          />
          <CotatoSelectBox defaultVal="포지션" selectList={MEMBER_POSITION} />
          <ConfirmButton
            isApproval={true}
            text="승인"
            onClick={(e) => handleApproveButtonClick(e, request.name, request.memberId)}
          />
          <ConfirmButton
            isApproval={false}
            text="거절"
            onClick={() => handleRejectButtonClick(request.name, request.memberId)}
          />
        </ButtonContainer>
      </ItemWrapper>
    );
  };

  /**
   *
   */
  const renderPagination = () => {
    return (
      <Stack alignItems="center" mt={'6rem'}>
        <TablePagination
          count={requestList.length}
          page={currentPage}
          onChange={handlePageChange}
          shape="rounded"
        />
      </Stack>
    );
  };

  //
  //
  //
  useEffect(() => {
    fetchRequestList();
  }, []);

  if (requestList.length === 0) {
    return <EmptyResult text="가입 요청이 없습니다." />;
  }

  return (
    <>
      <TableWrapper>
        {requestList?.map((request, i) => (
          <Fragment key={i}>
            {renderRequestItem(request)}
            {i < requestList.length - 1 && (
              <Divider sx={{ width: '100%', height: '2px', background: theme.colors.primary70 }} />
            )}
          </Fragment>
        ))}
      </TableWrapper>
      {renderPagination()}
    </>
  );
};

//
//
//

export const TableWrapper = styled.div`
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: column;
  backgroud: ${({ theme }) => theme.colors.common.white};
  border-radius: 0.25rem;
  border: 2px solid ${({ theme }) => theme.colors.primary70};
`;

export const ItemWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2.25rem;
  background: ${({ theme }) => theme.colors.common.white};
  p {
    font-size: ${({ theme }) => theme.fontSize.md};
    color: ${({ theme }) => theme.colors.common.black};
  }

  ${media.mobile`
      flex-direction: column;
      justify-content: center;
      padding: 0.5rem 1rem;
    `}
`;

export const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;

  ${media.mobile`
    gap: 0.25rem;
    width: 100%;
  `}
`;

export default MyPageJoinManagmentRequestList;
