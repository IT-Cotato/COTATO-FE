import React, { Fragment, useEffect, useState } from 'react';
import { ButtonContainer, ItemWrapper, TableWrapper } from './MyPageJoinManagmentRequestList';
import { Divider } from '@mui/material';
import CotatoSelectBox from '@components/CotatoSelectBox';
import ConfirmButton from '../components/Mypage/ConfirmButton';
import { MEMBER_POSITION } from '../constants';
import api from '@/api/api';
import { MemberStatus } from '@/enums/MemberStatus';
import { useTheme } from 'styled-components';
import EmptyResult from '../components/common/EmptyResult';

//
//
//

interface MyPageJoinManagmentRejectedListProps {
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

const MyPageJoinManagementRejectedList = ({
  generations,
}: MyPageJoinManagmentRejectedListProps) => {
  const [rejectedList, setRejectedList] = useState([]);

  const theme = useTheme();

  /**
   *
   */
  const fetchRejectedList = async () => {
    await api.get(`/v1/api/member?status=${MemberStatus.REJECTED}`).then((res) => {
      console.log(res.data);
      setRejectedList(res.data);
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
  const handleReapproveButtonClick = (
    e: React.MouseEvent<HTMLButtonElement>,
    name: string,
    memberId: number,
  ) => {
    const target = e.target as HTMLButtonElement;
    const targetGeneration =
      target.previousSibling?.previousSibling?.firstChild?.firstChild?.firstChild?.nextSibling
        ?.textContent;
    const targetPosition = target.previousSibling?.firstChild?.firstChild?.firstChild?.textContent;

    const generation = Number(targetGeneration);
    const position = getPosition(targetPosition as string);

    if (position === null) {
      alert('포지션을 선택해주세요.');
      return;
    }

    const check = confirm(
      `${name} 님을 ${targetGeneration} ${targetPosition} 부원으로 승인하시겠습니까?`,
    );
    if (check) {
      api
        .patch(`/v1/api/member/${memberId}/approve`, {
          generationId: generation,
          position: position,
        })
        .then(() => {
          fetchRejectedList();
        });
    }
  };

  /**
   *
   */
  const renderRejectedItem = (request: any) => {
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
            text="재승인"
            onClick={(e) => handleReapproveButtonClick(e, request.name, request.memberId)}
          />
        </ButtonContainer>
      </ItemWrapper>
    );
  };

  /**
   *
   */
  const renderList = () => {
    if (!rejectedList.length) {
      return <EmptyResult text="거절된 항목이 없습니다." />;
    }

    return (
      <TableWrapper>
        {rejectedList.map((rejected, i) => (
          <Fragment key={i}>
            {renderRejectedItem(rejected)}
            {i < rejectedList.length - 1 && (
              <Divider sx={{ width: '100%', height: '2px', background: theme.colors.primary70 }} />
            )}
          </Fragment>
        ))}
      </TableWrapper>
    );
  };

  //
  //
  //
  useEffect(() => {
    fetchRejectedList();
  }, []);

  return <>{renderList()}</>;
};

export default MyPageJoinManagementRejectedList;
