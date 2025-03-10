import React from 'react';
import styled from 'styled-components';
import { CotatoMemberAttendResponse } from 'cotato-openapi-clients';
import { Stack } from '@mui/material';
import AttendanceCardStatus from '@components/attendance/attedance-card/AttendanceCardStatus';
import { media } from '@theme/media';
import dayjs from 'dayjs';

//
//
//

interface AttendanceCardProps {
  attendance: CotatoMemberAttendResponse;
  generationNumber: number;
  onClick: (attendance: CotatoMemberAttendResponse) => void;
}

//
//
//

const AttendanceGridCard: React.FC<AttendanceCardProps> = ({
  attendance,
  generationNumber,
  onClick,
}) => {
  return (
    <Container onClick={() => onClick(attendance)}>
      <Stack gap="0.25rem">
        <DateText>{dayjs(attendance.sessionDateTime).format('YYYY.MM.DD')}</DateText>
        <TitleText>
          {generationNumber}기 {attendance.sessionTitle}
        </TitleText>
      </Stack>
      <AttendanceCardStatus
        openStatus={attendance.openStatus}
        attendanceResult={attendance.result}
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
  background: ${({ theme }) => theme.colors.const.white};
  box-shadow: 1px 1px 20px 5px rgba(255, 160, 0, 0.15);
  cursor: pointer;

  ${media.tablet`
    width: 9.5rem;
    height: 9.5rem;
    gap: 0.125rem;
  `}
`;

const DateText = styled.p`
  margin: 0;
  font-family: Ycomputer;
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.gray60};

  ${media.tablet`
    font-size: 0.75rem;
  `}
`;

const TitleText = styled.p`
  margin: 0;
  font-family: Ycomputer;
  font-size: 1.125rem;
  color: ${({ theme }) => theme.colors.const.black};

  ${media.tablet`
    font-size: 1rem;
  `}
`;

export default AttendanceGridCard;
