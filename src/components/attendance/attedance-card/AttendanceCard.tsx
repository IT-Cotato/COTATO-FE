import { Box, Card, CardContent, Stack, Typography } from '@mui/material';
import React from 'react';
import styled, { useTheme } from 'styled-components';
import { ReactComponent as CharacterEyeClose } from '@/assets/character_eye_close.svg';
import AttendaceStatus from '@components/attendance/attedance-card/AttendanceCardStatus';
import { CotatoMemberAttendResponse } from 'cotato-openapi-clients';
import { AttendResponseIsOpenedEnum } from '@/enums/attend/AttendResponseIsOpenedEnum';
import { AttendResponseAttendanceTypeEnum } from '@/enums/attend/AttendResponseAttendanceTypeEnum';
import { AttendResponseAttendanceResultEnum } from '@/enums/attend/AttendResponseAttendanceResultEnum';
import { ReactComponent as LateIcon } from '@assets/attendance_late_icon.svg';

//
//
//

interface AttendanceCardProps {
  attendance: CotatoMemberAttendResponse;
  backgroundColor: string;
  generationNumber?: number;
}

//
//
//

const AttendanceCard: React.FC<AttendanceCardProps> = ({
  attendance,
  backgroundColor,
  generationNumber,
}) => {
  const theme = useTheme();

  /**
   *
   */
  const getBoxColor = () => {
    switch (backgroundColor) {
      case theme.colors.pastelTone.yellow[100]:
        return {
          cardBoxShadow: 'rgba(255, 160, 0, 0.15)',
          imageBorderColor: theme.colors.primary60,
          imageBoxShaodwColor: 'rgba(255, 200, 0, 0.50)',
        };

      case theme.colors.pastelTone.pink[100]:
        return {
          cardBoxShadow: 'rgba(228, 73, 177, 0.15)',
          imageBorderColor: theme.colors.sub1[10],
          imageBoxShaodwColor: '#FF96E8',
        };

      case theme.colors.pastelTone.blue[100]:
        return {
          cardBoxShadow: 'rgba(48, 91, 207, 0.15)',
          imageBorderColor: theme.colors.sub2[20],
          imageBoxShaodwColor: 'rgba(48, 91, 207, 0.50)',
        };

      default:
        return {
          cardBoxShadow: 'rgba(255, 160, 0, 0.15)',
          imageBorderColor: theme.colors.primary60,
          imageBoxShaodwColor: 'rgba(255, 200, 0, 0.50)',
        };
    }
  };

  /**
   *
   */
  const renderAttendanceInfo = () => {
    return (
      <Stack>
        <StyledTypography variant="h6" fontSize="1.125rem">
          {generationNumber}기 {attendance.sessionTitle}
        </StyledTypography>
        <StyledTypography variant="body2" fontSize="0.875rem" color={theme.colors.gray50}>
          {attendance.sessionDate}
        </StyledTypography>
      </Stack>
    );
  };

  //
  //
  //
  return (
    <StyledCard elevation={0} boxShadowColor={getBoxColor().cardBoxShadow}>
      <ImageBackground
        bgcolor={backgroundColor}
        sx={{ border: `1px solid ${getBoxColor().imageBorderColor}` }}
        boxShadow={`1px 1px 10px 0px ${getBoxColor().imageBoxShaodwColor}`}
      >
        <ImageBox>
          {attendance.attendanceResult === AttendResponseAttendanceResultEnum.Late && (
            <StyledLateIcon />
          )}
          <CharacterEyeClose style={{ width: '100%', height: '100%' }} />
        </ImageBox>
      </ImageBackground>
      <Box width="100%" padding="1.5rem 0.5rem 1rem">
        <Stack direction="row" justifyContent="space-between" alignItems="center" width="100%">
          {renderAttendanceInfo()}
          <AttendaceStatus
            isOpened={attendance.isOpened as AttendResponseIsOpenedEnum}
            attendanceType={attendance.attendanceType as AttendResponseAttendanceTypeEnum}
            attendanceResult={attendance.attendanceResult as AttendResponseAttendanceResultEnum}
          />
        </Stack>
      </Box>
    </StyledCard>
  );
};

export default AttendanceCard;

//
//
//

const StyledCard = styled(Card)<{ boxShadowColor: string }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.75rem;
  border-radius: 2.25rem !important;
  box-shadow: 1px 1px 10px 10px ${({ boxShadowColor }) => boxShadowColor} !important;
`;

const StyledTypography = styled(Typography)`
  font-family: 'Ycomputer' !important;
`;

const ImageBackground = styled(Box)`
  border-radius: 2rem;
  box-shadow: 1px 1px 20px 0px rgba(255, 200, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ImageBox = styled(Box)`
  position: relative;
  width: 16rem;
  height: 17.5em;
  padding: 3rem;
`;

const StyledLateIcon = styled(LateIcon)`
  position: absolute;
  top: 1rem;
  right: 1rem;
`;
