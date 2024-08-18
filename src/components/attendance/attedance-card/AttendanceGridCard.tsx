import React from 'react';
import styled, { useTheme } from 'styled-components';
import { CotatoMemberAttendResponse } from 'cotato-openapi-clients';
import { Stack, Typography } from '@mui/material';
import AttendanceCardStatus from '@components/attendance/attedance-card/AttendanceCardStatus';
import {
  AttendResponseAttendanceResultEnum,
  AttendResponseAttendanceTypeEnum,
  AttendResponseIsOpenedEnum,
} from '@/enums/attend';
import { ReactComponent as LateIcon } from '@assets/attendance_late_icon.svg';

//
//
//

interface AttendanceCardProps {
  attendance: CotatoMemberAttendResponse;
  generationNumber?: number;
}

//
//
//

const AttendanceGridCard: React.FC<AttendanceCardProps> = ({ attendance, generationNumber }) => {
  const theme = useTheme();

  return (
    <Container>
      {attendance.attendanceResult === AttendResponseAttendanceResultEnum.Late && (
        <StyledLateIcon />
      )}
      <Stack gap="0.25rem">
        <Typography
          variant="body2"
          color={theme.colors.gray60}
          fontSize="0.875rem"
          sx={{ fontFamily: 'Ycomputer' }}
        >
          {attendance.sessionDate}
        </Typography>
        <Typography
          variant="h4"
          color={theme.colors.common.black_const}
          fontSize="1.125rem"
          sx={{ fontFamily: 'Ycomputer' }}
        >
          {generationNumber}기 {attendance.sessionTitle}
        </Typography>
      </Stack>
      <AttendanceCardStatus
        isOpened={attendance.isOpened as AttendResponseIsOpenedEnum}
        attendanceType={attendance.attendanceType as AttendResponseAttendanceTypeEnum}
        attendanceResult={attendance.attendanceResult as AttendResponseAttendanceResultEnum}
      />
    </Container>
  );
};

//
//
//

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
  width: 10.5rem;
  height: 10.5rem;
  padding: 1rem;
  border-radius: 1.5rem;
  border: 1px solid ${({ theme }) => theme.colors.primary70};
  background: ${({ theme }) => theme.colors.common.white_const};
  box-shadow: 1px 1px 20px 5px rgba(255, 160, 0, 0.15);
`;

const StyledLateIcon = styled(LateIcon)`
  position: absolute;
  top: 0.625rem;
  right: 0.625rem;
  width: 1rem;
  height: 1rem;
`;

export default AttendanceGridCard;
