import { Box, Card, CardContent, Stack, Typography } from '@mui/material';
import React from 'react';
import styled, { useTheme } from 'styled-components';
import { ReactComponent as CharacterEyeClose } from '@/assets/character_eye_close.svg';

//
//
//

interface AttendanceCardProps {
  title: string;
  date: string;
  generationId: string;
  sessionId: string;
  generationNum: string;
  sessionNum: string;
  attendanceStatus: string;
  backgroundColor: string;
}

//
//
//

const AttendanceCard: React.FC<AttendanceCardProps> = ({
  title,
  date,
  generationId,
  sessionId,
  generationNum,
  sessionNum,
  attendanceStatus,
  backgroundColor,
}) => {
  const theme = useTheme();

  const getBorderColor = () => {
    switch (backgroundColor) {
      case theme.colors.pastelTone.yellow[100]:
        return theme.colors.primary60;

      case theme.colors.pastelTone.pink[100]:
        return theme.colors.sub1[60];

      case theme.colors.pastelTone.blue[100]:
        return theme.colors.sub2[20];
      default:
        return theme.colors.gray50;
    }
  };

  /**
   *
   */
  const renderAttendanceInfo = () => {
    return (
      <Stack>
        <StyledTypography variant="h6" fontSize="1.175rem">
          {generationNum}기 {sessionNum}주차 세션
        </StyledTypography>
        <StyledTypography variant="body2" fontSize="1rem" color={theme.colors.gray50}>
          {date}
        </StyledTypography>
      </Stack>
    );
  };

  /**
   *
   */
  const renderAttendanceStatus = () => {
    return <div>{attendanceStatus}</div>;
  };

  //
  //
  //
  return (
    <StyledCard elevation={0}>
      <ImageBackground bgcolor={backgroundColor} sx={{ border: `1px solid ${getBorderColor()}` }}>
        <ImageBox>
          <CharacterEyeClose style={{ width: '100%', height: '100%' }} />
        </ImageBox>
      </ImageBackground>
      <Box width="100%" padding="1.75rem 0.75rem">
        <Stack direction="row" justifyContent="space-between" alignItems="center" width="100%">
          {renderAttendanceInfo()}
          {renderAttendanceStatus()}
        </Stack>
      </Box>
    </StyledCard>
  );
};

export default AttendanceCard;

//
//
//

const StyledCard = styled(Card)`
  width: 20rem;
  height: 27rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem 1rem 0 1rem;
  border-radius: 2.25rem !important;
`;

const StyledCardContent = styled(CardContent)`
  width: 100%;
`;

const StyledTypography = styled(Typography)`
  font-family: 'Ycomputer' !important;
`;

const ImageBackground = styled(Box)`
  width: 18rem;
  height: 18rem;
  border-radius: 2rem;
  box-shadow: 1px 1px 20px 0px rgba(255, 200, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ImageBox = styled(Box)`
  width: 11.5rem;
  height: 13.5rem;
`;
