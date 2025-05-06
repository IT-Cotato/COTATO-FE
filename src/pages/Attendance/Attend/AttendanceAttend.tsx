import { useGeneration } from '@/hooks/useGeneration';
import {
  Box,
  CircularProgress,
  Container,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
import React from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import onlineCharacter from '@/assets/online_character.svg';
import offlineTwoCharacter from '@/assets/offline_two_character.svg';
import styled, { useTheme } from 'styled-components';
import { media } from '@theme/media';
import { useBreakpoints } from '@/hooks/useBreakpoints';
import { GEOLOCATION_ERROR_CODE, useGeolocation } from '@/hooks/useGeolocation';
import api from '@/api/api';
import {
  CotatoAttendanceResponse,
  CotatoAttendanceResponseSessionTypeEnum,
  CotatoAttendResponse,
} from 'cotato-openapi-clients';
import useGetAttendances from '@/hooks/useGetAttendances';
import { LoadingIndicator } from '@components/LoadingIndicator';
import CotatoIcon from '@components/CotatoIcon';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import { GEOLOCATION_ERROR_MESSAGE } from '../constants/geolocation';
import CotatoMuiButton from '@components/CotatoMuiButton';

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

const AttendanceAttend: React.FC = () => {
  const theme = useTheme();
  const { sessionId } = useParams<{ sessionId: string }>();
  const navigate = useNavigate();
  const location = useLocation();

  const { isMobileOrSmaller, isLandScapeOrSmaller } = useBreakpoints();
  const { currentGeneration, isGenerationLoading } = useGeneration();

  const {
    location: geoLocation,
    error: geoLocationError,
    retry: retryGeoLocation,
    isLoading: isGeoLocationLoading,
  } = useGeolocation();

  const { currentAttendance, isAttendanceLoading, isAttendanceError } = useGetAttendances({
    generationId: currentGeneration?.generationId,
    sessionId: Number(sessionId),
  });

  const { data: attendanceData } = useSWR<CotatoAttendanceResponse>(
    `/v2/api/attendances/${currentAttendance?.attendanceId}`,
    fetcher,
  );

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

    navigate(`${location.pathname}/${attendanceType.toLowerCase()}/${data?.result?.toLowerCase()}`);
  };

  /**
   *
   */
  const handleSubmit = async () => {
    if (!attendanceType) {
      return;
    }

    if (attendanceType === 'OFFLINE') {
      const data = await postOfflineAttendance();

      if (!data) {
        return;
      }

      handleNavigate(data.data, data?.error, attendanceType);
    } else {
      const data = await postOnlineAttendance();

      if (!data) {
        return;
      }

      handleNavigate(data?.data, data?.error, attendanceType);
    }
  };

  /**
   *
   */
  const postOfflineAttendance = async () => {
    if (!geoLocation) {
      return;
    }

    const result = await api
      .post<CotatoAttendResponse>('/v2/api/attendances/records/offline', {
        attendanceId: currentAttendance?.attendanceId,
        requestTime: getCurrentISOTime(),
        location: {
          latitude: geoLocation.coords.latitude,
          longitude: geoLocation.coords.longitude,
        },
      })
      .then((res) => {
        return { data: res.data, error: null };
      })
      .catch((err) => {
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
        return { data: null, error: err.response.data.code };
      });

    return result;
  };

  /**
   *
   */
  const handleGeoLocationError = (code: number) => {
    switch (code) {
      case GEOLOCATION_ERROR_CODE.PERMISSION_DENIED:
        navigator.permissions.query({ name: 'geolocation' }).then((result) => {
          if (result.state === 'denied') {
            window.alert('위치 정보 제공에 동의하여야 출석이 가능합니다!');
          }
        });
        break;

      case GEOLOCATION_ERROR_CODE.POSITION_UNAVAILABLE:
      case GEOLOCATION_ERROR_CODE.TIMEOUT:
        retryGeoLocation();
        break;

      default:
        break;
    }
  };

  /**
   *
   */
  const renderBackButton = () => {
    if (!isLandScapeOrSmaller) {
      return null;
    }

    return (
      <IconButton
        style={{
          position: 'absolute',
          left: '2rem',
        }}
        onClick={() => navigate(-1)}
      >
        <CotatoIcon icon="angle-left-solid" size="2rem" color={(theme) => theme.colors.primary90} />
      </IconButton>
    );
  };

  /**
   *
   */
  const renderSessionInfo = () => {
    return (
      <Typography variant="h5" color={theme.colors.common.black} fontFamily="YComputer">
        {currentGeneration?.generationNumber}기 {attendanceData?.sessionTitle}
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
        {Object.entries(AttendanceStatusEnum)
          .filter(([key]) => {
            switch (key) {
              case 'OFFLINE':
                return (
                  attendanceData?.sessionType === CotatoAttendanceResponseSessionTypeEnum.All ||
                  attendanceData?.sessionType === CotatoAttendanceResponseSessionTypeEnum.Offline
                );
              case 'ONLINE':
                return (
                  attendanceData?.sessionType === CotatoAttendanceResponseSessionTypeEnum.All ||
                  attendanceData?.sessionType === CotatoAttendanceResponseSessionTypeEnum.Online
                );
              default:
                return false;
            }
          })
          .map(([key, value]) => (
            <StyledBox
              key={key}
              gap="1rem"
              $isSelected={attendanceType === key}
              onClick={() => handleAttendanceClick(key as keyof typeof AttendanceStatusEnum)}
            >
              {attendanceType === key ? (
                <CotatoIcon
                  icon="check-circle-solid"
                  color={(theme) => theme.colors.sub3[40]}
                  size={isMobileOrSmaller ? '1rem' : '2rem'}
                />
              ) : (
                <Box height={isMobileOrSmaller ? '1rem' : '2rem'} />
              )}
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
  const renderGeolocationError = () => {
    switch (true) {
      case !geoLocationError && !geoLocation:
        return '위치를 불러오지 못했습니다. 위치 설정을 확인해주세요.';

      case Boolean(geoLocationError):
        return GEOLOCATION_ERROR_MESSAGE[
          geoLocationError?.code as keyof typeof GEOLOCATION_ERROR_MESSAGE
        ];

      case Boolean(geoLocation):
        return '위치 정보를 성공적으로 불러왔습니다.';

      default:
        return null;
    }
  };

  /**
   *
   */
  const renderActionButton = () => {
    if (isAttendanceLoading || isAttendanceError) {
      return renderLoadingButton();
    }

    const isInvalidLocation = geoLocationError || !geoLocation;

    return (
      <Stack gap="1rem" alignItems="center">
        <Box>
          {isInvalidLocation ? (
            <CotatoMuiButton
              color="primary"
              sx={{ gap: '0.5rem' }}
              onClick={() => handleGeoLocationError(geoLocationError?.code ?? 1)}
            >
              {isGeoLocationLoading && !geoLocationError ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                <>
                  <CotatoIcon icon="refresh-solid" color={theme.colors.gray100} size="1.25rem" />
                  <Typography variant="body2" color={theme.colors.const.black}>
                    위치 정보 다시 불러오기
                  </Typography>
                </>
              )}
            </CotatoMuiButton>
          ) : null}
        </Box>
        <Box display="flex" alignItems="center" gap="0.5rem">
          <CotatoIcon
            icon={isInvalidLocation ? 'exclaimation-solid' : 'check-circle-solid'}
            color={isInvalidLocation ? theme.colors.secondary80 : theme.colors.sub3[40]}
            size="1rem"
          />
          <Typography variant="body2" color={theme.colors.common.black}>
            {renderGeolocationError()}
          </Typography>
        </Box>
        <StyledButton $disabled={!attendanceType} disabled={!attendanceType} onClick={handleSubmit}>
          출석
        </StyledButton>
      </Stack>
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
    if (isGenerationLoading) {
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
  // 위치 정보 제공 동의 여부 확인
  //
  // React.useEffect(() => {
  //   if (geoLocationError) {
  //     navigator.permissions.query({ name: 'geolocation' }).then((result) => {
  //       if (result.state === 'denied') {
  //         window.alert('위치 정보 제공에 동의하여야 출석이 가능합니다!');
  //       }
  //     });
  //   }
  // }, [geoLocationError]);

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
    $isSelected ? theme.colors.primary50 : theme.colors.const.white};
  color: ${({ theme }) => theme.colors.const.black};
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
  color: ${({ theme, $disabled }) => ($disabled ? theme.colors.gray50 : theme.colors.const.black)};
  font-size: 1.25rem;
  cursor: pointer;

  ${media.landscape`
    width: 20rem;
    height: 3rem;
  `}
`;
