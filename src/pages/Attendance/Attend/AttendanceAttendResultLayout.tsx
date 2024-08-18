import { Box, Stack, Typography } from '@mui/material';
import { media } from '@theme/media';
import fetchUserData from '@utils/fetchUserData';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled, { useTheme } from 'styled-components';
import crown from '@assets/crown.svg';
import crownCharacter from '@assets/crown_character.svg';
import warning from '@assets/warning.svg';
import ArrowBack from '@/assets/arrow_back.svg';
import onlineCharacter from '@assets/online_character.svg';
import failCharacter from '@assets/fail_character.svg';
import { useBreakpoints } from '@/hooks/useBreakpoints';

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

  const theme = useTheme();
  const { isLandScapeOrSmaller } = useBreakpoints();

  const navigate = useNavigate();
  const location = useLocation();
  const error = location.state?.error;

  /**
   *
   */
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
  const getIcon = () => {
    switch (status) {
      case 'PRESENT':
        return crown;
      case 'LATE':
        return warning;
      case 'ABSENT':
        return warning;
      default:
        return warning;
    }
  };

  /**
   *
   */
  const getCharacter = () => {
    if (status === 'error') {
      return failCharacter;
    }

    switch (attendanceType) {
      case 'OFFLINE':
        return crownCharacter;
      case 'ONLINE':
        return onlineCharacter;
      default:
        return failCharacter;
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

  /**
   *
   */
  const renderText = () => {
    return (
      <Stack gap="1rem" justifyContent="center" alignItems="center">
        <Typography
          fontFamily="YComputer"
          fontSize={isLandScapeOrSmaller ? '1.2rem' : '1.6rem'}
          color={theme.colors.primary100_1}
        >
          {user?.memberName} 님!
        </Typography>
        <Typography fontFamily="YComputer" fontSize={isLandScapeOrSmaller ? '1.0rem' : '1.2rem'}>
          {getAttendanceTypeText()} {getStatusText()}
        </Typography>
      </Stack>
    );
  };

  /**
   *
   */
  const renderBackButton = () => {
    if (!isLandScapeOrSmaller) {
      return null;
    }

    return (
      <Box
        component="img"
        width="0.625rem"
        height="1rem"
        src={ArrowBack}
        alt="ArrowBack"
        justifyContent="flex-start"
        position="absolute"
        left="2rem"
        top="2rem"
        sx={{
          cursor: 'pointer',
        }}
        onClick={() => navigate(-1)}
      />
    );
  };

  /**
   *
   */
  const renderCharacter = () => {
    return (
      <>
        <Box component="img" src={getIcon()} alt="icon" width="5rem" height="5rem" />
        <Box component="img" src={getCharacter()} alt="character" width="10rem" height="10rem" />
      </>
    );
  };

  //
  //
  //

  return (
    <Stack height="100vh" justifyContent="flex-start" alignItems="center">
      <Stack gap="4rem">
        {renderBackButton()}

        <StyledStack>{renderCharacter()}</StyledStack>
        <StyledBox>{renderText()}</StyledBox>
        <Box>
          <StyledButton onClick={handleNavigateByStatus}>확인</StyledButton>
        </Box>
      </Stack>
    </Stack>
  );
};

export default AttendanceAttendResultLayout;

//
//
//

const StyledBox = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 25rem;
  height: 12rem;
  gap: 4rem;
  background-color: ${({ theme }) => theme.colors.common.white_const};
  color: ${({ theme }) => theme.colors.common.black_const};
  border-radius: 2rem;
  box-shadow: 1.5px 1.5px 23px 15px rgba(255, 160, 0, 0.15);

  ${media.landscape`
    width: 20rem;
  `}
`;

const StyledButton = styled.button`
  border-radius: 2rem;
  width: 25rem;
  height: 4rem;
  border: none;
  background-color: ${({ theme }) => theme.colors.common.white_const};
  box-shadow: 1px 1px 15px 3px rgba(255, 160, 0, 0.15);
  color: ${({ theme }) => theme.colors.common.black_const};
  font-size: 1.25rem;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary80};
  }

  ${media.landscape`
    width: 20rem;
    height: 3rem;
  `}
`;

const StyledStack = styled(Stack)`
  position: relative;
  top: 5rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
`;
