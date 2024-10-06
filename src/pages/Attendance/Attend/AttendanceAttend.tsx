import { useGeneration } from '@/hooks/useGeneration';
import { useSession } from '@/hooks/useSession';
import { Box, CircularProgress, Container, Stack, Tooltip, Typography } from '@mui/material';
import React from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import onlineCharacter from '@/assets/online_character.svg';
import offlineTwoCharacter from '@/assets/offline_two_character.svg';
import ArrowBack from '@/assets/arrow_back.svg';
import Check from '@/assets/check.svg';
import styled, { useTheme } from 'styled-components';
import { media } from '@theme/media';
import { useBreakpoints } from '@/hooks/useBreakpoints';
import { useGeolocation } from 'react-use';
import api from '@/api/api';
import { CotatoAttendResponse } from 'cotato-openapi-clients';
import useGetAttendances from '@/hooks/useGetAttendances';
import { LoadingIndicator } from '@components/LoadingIndicator';

//
//
//

const AttendanceStatusEnum = {
  OFFLINE: '대면',
  ONLINE: '비대면',
};

//
//
//

const USER_DENIED_ERROR_CODE = 1;

//
//
//

const AttendanceAttend: React.FC = () => {
  const theme = useTheme();
  const params = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const { isMobileOrSmaller, isLandScapeOrSmaller } = useBreakpoints();

  const geolocationOptions = {
    enableHighAccuracy: true,
    timeout: 1000 * 10,
  };

  const sessionId = Number(params.sessionId);
  const { currentGeneration, isGenerationLoading } = useGeneration();
  const { latitude, longitude, error: geoLocationError } = useGeolocation(geolocationOptions);

  const { sessions, isSessionLoading } = useSession({
    generationId: currentGeneration?.generationId,
  });
  const { currentAttendance, isAttendanceLoading, isAttendanceError } = useGetAttendances({
    generationId: currentGeneration?.generationId,
    sessionId: sessionId,
  });

  const sessionTitle = sessions?.find((session) => session.sessionId === sessionId)?.title;

  const [attendanceType, setAttendanceType] = React.useState<
    keyof typeof AttendanceStatusEnum | null
  >(null);

  /**
   *
   */
  const getCurrentISOTime = () => {
    const offset = new Date().getTimezoneOffset() * 60000;
    const now = new Date(Date.now() - offset);

    return now.toISOString();
  };

  /**
   *
   */
  const handleAttendanceClick = (status: keyof typeof AttendanceStatusEnum) => {
    setAttendanceType(status);
  };

  /**
   *
   */
  const handleNavigate = (
    data: CotatoAttendResponse | null,
    error: string | null,
    attendanceType: keyof typeof AttendanceStatusEnum,
  ) => {
    if (isAttendanceLoading || isAttendanceError) {
      return;
    }

    if (error) {
      navigate(`${location.pathname}/${attendanceType.toLowerCase()}/error`, {
        state: { error: error },
      });
      return;
    }

    navigate(`${location.pathname}/${attendanceType.toLowerCase()}/${data?.status?.toLowerCase()}`);
  };

  /**
   *
   */
  const checkGeolocationExists = () => {
    if (!latitude || !longitude) {
      navigator.geolocation.getCurrentPosition(
        () => {
          return true;
        },
        (error) => {
          if (error.code === USER_DENIED_ERROR_CODE) {
            alert('위치 정보를 허용해주세요!');
          }

          return false;
        },
        geolocationOptions,
      );

      return Boolean(latitude && longitude);
    }

    return true;
  };

  /**
   *
   */
  const handleSubmit = async () => {
    if (!attendanceType) {
      return;
    }

    if (attendanceType === 'OFFLINE') {
      const geolocation = checkGeolocationExists();

      if (!geolocation) {
        console.log(geoLocationError);
        return;
      }

      const data = await postOfflineAttendance();
      handleNavigate(data.data, data.error, attendanceType);
    } else {
      const data = await postOnlineAttendance();
      handleNavigate(data.data, data.error, attendanceType);
    }
  };

  /**
   *
   */
  const postOfflineAttendance = async () => {
    const result = await api
      .post<CotatoAttendResponse>('/v2/api/attendances/records/offline', {
        attendanceId: currentAttendance?.attendanceId,
        requestTime: getCurrentISOTime(),
        location: {
          latitude: latitude,
          longitude: longitude,
        },
      })
      .then((res) => {
        return { data: res.data, error: null };
      })
      .catch((err) => {
        console.error(err);
        return { data: null, error: err.response.data.code };
      });

    return result;
  };

  /**
   *
   */
  const postOnlineAttendance = async () => {
    const result = await api
      .post('/v2/api/attendances/records/online', {
        attendanceId: currentAttendance?.attendanceId,
        requestTime: getCurrentISOTime(),
      })
      .then((res) => {
        return { data: res.data, error: null };
      })
      .catch((err) => {
        console.error(err);
        return { data: null, error: err.response.data.code };
      });

    return result;
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
  const renderSessionInfo = () => {
    return (
      <Typography variant="h5" color={theme.colors.common.black} fontFamily="YComputer">
        {currentGeneration?.generationNumber}기 {sessionTitle}
      </Typography>
    );
  };

  /**
   *
   */
  const renderAttendanceOptions = () => {
    return (
      <StyledStack
        direction="row"
        position={isLandScapeOrSmaller ? 'absolute' : 'unset'}
        top={isLandScapeOrSmaller ? '48%' : 'unset'}
        left={isLandScapeOrSmaller ? '48%' : 'unset'}
        sx={{
          transform: isLandScapeOrSmaller ? 'translate(-48%, -48%)' : 'unset',
        }}
        padding="0"
      >
        {Object.entries(AttendanceStatusEnum).map(([key, value]) => (
          <StyledBox
            key={key}
            gap="1rem"
            $isSelected={attendanceType === key}
            onClick={() => handleAttendanceClick(key as keyof typeof AttendanceStatusEnum)}
          >
            <Box
              component={attendanceType === key ? 'img' : 'div'}
              src={attendanceType === key ? Check : ''}
              alt="Check"
              width={isMobileOrSmaller ? '1rem' : '2rem'}
              height={isMobileOrSmaller ? '1rem' : '2rem'}
            />
            <Box
              component="img"
              src={key === 'ONLINE' ? onlineCharacter : offlineTwoCharacter}
              alt={key === 'ONLINE' ? 'onlineCharacter' : 'offlineTwoCharacter'}
              width={isMobileOrSmaller ? '3rem' : '5rem'}
              height={isMobileOrSmaller ? '2.5rem' : '4rem'}
            />
            <Typography
              variant="h5"
              fontFamily="YComputer"
              fontSize={isMobileOrSmaller ? '1.2rem' : '1.5rem'}
            >
              {value}
            </Typography>
          </StyledBox>
        ))}
      </StyledStack>
    );
  };

  /**
   *
   */
  const renderActionButton = () => {
    if (isSessionLoading || isAttendanceLoading || isAttendanceError) {
      return renderLoadingButton();
    }

    return (
      <StyledButton $disabled={!attendanceType} disabled={!attendanceType} onClick={handleSubmit}>
        출석
      </StyledButton>
    );
  };

  /**
   *
   */
  const renderLoadingButton = () => {
    return (
      <StyledButton $disabled={true}>
        <Tooltip arrow title="로딩이 계속되면 새로고침해주세요." placement="top">
          <CircularProgress size={24} color="inherit" />
        </Tooltip>
      </StyledButton>
    );
  };

  /**
   *
   */
  const renderInfoText = () => {
    return (
      <Typography fontSize="0.75rem" color={theme.colors.common.black}>
        대면 출석 인증이 안되는 경우 운영진에게 문의해주세요
      </Typography>
    );
  };

  /**
   *
   */
  const renderContents = () => {
    if (isGenerationLoading || isSessionLoading) {
      return <LoadingIndicator />;
    }

    return (
      <>
        <Stack
          width="100%"
          marginBottom="5rem"
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          {renderBackButton()}
          {renderSessionInfo()}
        </Stack>
        <Stack gap="5.75rem" alignItems="center" height="100%">
          {renderAttendanceOptions()}
          <Stack
            gap={isLandScapeOrSmaller ? '1rem' : '2rem'}
            alignItems="center"
            justifyContent={isLandScapeOrSmaller ? 'flex-end' : 'unset'}
            height="100%"
          >
            {renderActionButton()}
            {renderInfoText()}
          </Stack>
        </Stack>
      </>
    );
  };

  //
  //
  //

  return (
    <StyledContainer>
      <Stack height="100%" alignItems="center" justifyContent="flex-start">
        {renderContents()}
      </Stack>
    </StyledContainer>
  );
};

export default AttendanceAttend;

//
//
//

const StyledContainer = styled(Container)`
  padding-top: 4rem;
  padding-bottom: 4rem;
  height: 100vh;

  ${media.mobile`
    padding-top: 2rem;
    padding-bottom: 2rem;
  `};
`;

const StyledStack = styled(Stack)`
  gap: 2.5rem;

  ${media.landscape`
    gap: 1.5rem;
  `}

  ${media.mobile`
    padding: 0 1rem;
  `};
`;

const StyledBox = styled(Box)<{ $isSelected: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 15rem;
  height: 15rem;
  background-color: ${({ theme, $isSelected }) =>
    $isSelected ? theme.colors.primary50 : theme.colors.common.white_const};
  color: ${({ theme }) => theme.colors.common.black_const};
  border-radius: 2rem;
  box-shadow: 1.5px 1.5px 23px 15px rgba(255, 160, 0, 0.15);
  cursor: pointer;

  ${media.landscape`
    width: 11rem;
    height: 11rem;
  `}

  ${media.mobile`
    width: 9rem;
    height: 9rem;
  `}
`;

const StyledButton = styled.button<{ $disabled: boolean }>`
  border-radius: 2rem;
  width: 25rem;
  height: 4rem;
  border: none;
  background-color: ${({ theme, $disabled }) =>
    $disabled ? theme.colors.gray30 : theme.colors.primary80};
  box-shadow: ${({ $disabled }) =>
    $disabled ? 'none' : '1px 1px 15px 3px rgba(255, 160, 0, 0.15)'};
  color: ${({ theme, $disabled }) =>
    $disabled ? theme.colors.gray50 : theme.colors.common.black_const};
  font-size: 1.25rem;
  cursor: pointer;

  ${media.landscape`
    width: 20rem;
    height: 3rem;
  `}
`;
