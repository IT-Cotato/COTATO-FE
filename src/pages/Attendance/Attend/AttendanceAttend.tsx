import { useGeneration } from '@/hooks/useGeneration';
import { useSession } from '@/hooks/useSession';
import { LoadingIndicator } from '@components/LoadingIndicator';
import { Box, Container, Stack, Typography } from '@mui/material';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import CharacterLaptop from '@/assets/character_laptop.svg';
import CharacterAttendance from '@/assets/attendance_attend.svg';
import ArrowBack from '@/assets/arrow_back.svg';
import Check from '@/assets/check.svg';
import styled, { useTheme } from 'styled-components';
import { media } from '@theme/media';
import { useBreakpoints } from '@/hooks/useBreakpoints';

//
//
//

const AttendanceStatusEnum = {
  ATTEND: '대면',
  REMOTE: '비대면',
};

//
//
//

const AttendanceAttend: React.FC = () => {
  const theme = useTheme();
  const params = useParams();
  const navigate = useNavigate();

  const { isMobileOrSmaller, isLandScapeOrSmaller } = useBreakpoints();

  const sessionId = Number(params.sessionId);
  const { currentGeneration, isGenerationLoading } = useGeneration();
  const { sessions, isSessionLoading } = useSession({
    generationId: currentGeneration?.generationId,
  });

  const sessionNumber = sessions?.find((session) => session.sessionId === sessionId)?.sessionNumber;

  const [attendance, setAttendance] = React.useState<keyof typeof AttendanceStatusEnum | null>(
    null,
  );

  /**
   *
   */
  const handleAttendanceClick = (status: keyof typeof AttendanceStatusEnum) => {
    setAttendance(status);
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
        {currentGeneration?.generationNumber}기 {sessionNumber}주차 세션
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
            $isSelected={attendance === key}
            onClick={() => handleAttendanceClick(key as keyof typeof AttendanceStatusEnum)}
          >
            <Box
              component={attendance === key ? 'img' : 'div'}
              src={attendance === key ? Check : ''}
              alt="Check"
              width={isMobileOrSmaller ? '1rem' : '2rem'}
              height={isMobileOrSmaller ? '1rem' : '2rem'}
            />

            <Box
              component="img"
              src={key === 'ATTEND' ? CharacterAttendance : CharacterLaptop}
              alt={key === 'ATTEND' ? 'CharacterAttendance' : 'CharacterLaptop'}
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
    return (
      <StyledButton $disabled={!attendance} disabled={!attendance}>
        출석
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

    console.log('sessions', sessions);

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
