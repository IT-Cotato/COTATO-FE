import { Stack, Typography } from '@mui/material';
import { media } from '@theme/media';
import fetchUserData from '@utils/fetchUserData';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

//
//
//

interface AttendanceAttendResultLayoutProps {
  status: any;
  attendanceType?: 'ONLINE' | 'OFFLINE';
}

//
//
//

const AttendanceAttendResultLayout: React.FC<AttendanceAttendResultLayoutProps> = ({
  status,
  attendanceType,
}) => {
  const { data: user } = fetchUserData();

  const navigate = useNavigate();
  const location = useLocation();
  const error = location.state?.error;

  const getErrorText = () => {
    switch (error) {
      case 'AT-101':
        return (
          <>
            출석에 실패하였습니다.
            <br />
            현재 위치를 다시 확인해주세요.
          </>
        );
      case 'AT-102':
        return (
          <>
            출석에 실패하였습니다.
            <br />
            출석 가능한 시간이 아닙니다.
          </>
        );
      case 'AT-301':
        return (
          <>
            출석에 실패하였습니다.
            <br />
            이미 출석 기록이 존재합니다.
          </>
        );
      case 'AT-401':
        return (
          <>
            출석 시간이 아닙니다.
            <br />
            다시 확인해주세요.
          </>
        );
      default:
        return (
          <>
            인증에 실패하였습니다.
            <br />
            다시 시도해주시기 바랍니다.
          </>
        );
    }
  };

  /**
   *
   */
  const getStatusText = () => {
    switch (status) {
      case 'PRESENT':
        return '출석 처리되었습니다.';
      case 'LATE':
        return '지각 처리되었습니다.';
      case 'ABSENT':
        return '결석 처리되었습니다.';
      default:
        return getErrorText();
    }
  };

  /**
   *
   */
  const getAttendanceTypeText = () => {
    switch (attendanceType) {
      case 'OFFLINE':
        return '대면';
      case 'ONLINE':
        return '비대면';
      default:
        return '';
    }
  };

  /**
   *
   */
  const handleNavigateByStatus = () => {
    if (status === 'error') {
      navigate(-1);
      return;
    }

    navigate('/');
  };

  //
  //
  //

  return (
    <Stack>
      <Typography>
        {user?.memberName}님,{getAttendanceTypeText()} {getStatusText()}
      </Typography>
      <Typography></Typography>
      <StyledButton onClick={handleNavigateByStatus}>확인</StyledButton>
    </Stack>
  );
};

export default AttendanceAttendResultLayout;

//
//
//

const StyledButton = styled.button`
  border-radius: 2rem;
  width: 25rem;
  height: 4rem;
  border: none;
  background-color: ${({ theme }) => theme.colors.primary80};
  box-shadow: 1px 1px 15px 3px rgba(255, 160, 0, 0.15);
  color: ${({ theme }) => theme.colors.common.black_const};
  font-size: 1.25rem;
  cursor: pointer;

  ${media.landscape`
    width: 20rem;
    height: 3rem;
  `}
`;
