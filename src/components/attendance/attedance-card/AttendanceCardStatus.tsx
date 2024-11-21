import React from 'react';
import { ReactComponent as SpeachBubble } from '@assets/speach_bubble.svg';
import { styled, useTheme } from 'styled-components';
import { ReactComponent as AbsentIcon } from '@assets/attendance_absent_icon.svg';
import { ReactComponent as OnlineIcon } from '@assets/attendance_online_icon.svg';
import CotatoIcon from '@components/CotatoIcon';
import {
  CotatoAttendanceResponseOpenStatusEnum,
  CotatoAttendanceRecordResponseResultEnum,
} from 'cotato-openapi-clients';

//
//
//

interface AttendaceStatusProps {
  isOpened?: CotatoAttendanceResponseOpenStatusEnum;
  attendanceResult?: CotatoAttendanceRecordResponseResultEnum | null;
}

enum AttendanceStatus {
  Before,
  Open,
  PresentOffline,
  PresentOnline,
  LateOffline,
  LateOnline,
  Absent,
}

//
//
//

const AttendaceCardStatus: React.FC<AttendaceStatusProps> = ({ isOpened, attendanceResult }) => {
  const theme = useTheme();

  /**
   *
   */
  const getAttendanceStatus = () => {
    // if (isOpened === AttendResponseIsOpenedEnum.Before) {
    if (isOpened === CotatoAttendanceResponseOpenStatusEnum.Before) {
      return AttendanceStatus.Before;
    } else if (
      isOpened === CotatoAttendanceResponseOpenStatusEnum.Open &&
      attendanceResult === null
    ) {
      return AttendanceStatus.Open;
    } else if (attendanceResult === CotatoAttendanceRecordResponseResultEnum.Offline) {
      return AttendanceStatus.PresentOffline;
    } else if (attendanceResult === CotatoAttendanceRecordResponseResultEnum.Online) {
      return AttendanceStatus.PresentOnline;
    } else if (attendanceResult === CotatoAttendanceRecordResponseResultEnum.Late) {
      return AttendanceStatus.LateOffline;
    }

    return AttendanceStatus.Absent;
  };

  const getStatusStyle = () => {
    switch (getAttendanceStatus()) {
      case AttendanceStatus.Before:
        return {
          backgroundColor: theme.colors.gray40,
          icon: null,
          textColor: theme.colors.common.white_const,
          text: '출석예정',
        };
      case AttendanceStatus.Open:
        return {
          backgroundColor: theme.colors.primary80,
          icon: null,
          textColor: theme.colors.common.white_const,
          text: '출석중',
        };
      case AttendanceStatus.PresentOffline:
        return {
          backgroundColor: theme.colors.gray10,
          icon: <CotatoIcon icon="user-check-solid" color={(theme) => theme.colors.sub3[40]} />,
          textColor: theme.colors.common.black_const,
          text: '출석',
        };
      case AttendanceStatus.PresentOnline:
        return {
          backgroundColor: theme.colors.gray10,
          icon: <OnlineIcon />,
          textColor: theme.colors.common.black_const,
          text: '출석',
        };
      case AttendanceStatus.LateOffline:
        return {
          backgroundColor: theme.colors.gray10,
          icon: <CotatoIcon icon="user-check-solid" color={(theme) => theme.colors.sub3[40]} />,
          textColor: theme.colors.common.black_const,
          text: '출석',
        };
      case AttendanceStatus.Absent:
        return {
          backgroundColor: theme.colors.gray10,
          icon: <AbsentIcon />,
          textColor: theme.colors.common.black_const,
          text: '결석',
        };
    }
  };

  const { backgroundColor, icon, textColor, text } = getStatusStyle();

  return (
    <Wrapper>
      <StyledSpeachBubble $color={backgroundColor} />
      <StatusContainer $textColor={textColor}>
        <span>{text}</span>
        {icon}
      </StatusContainer>
    </Wrapper>
  );
};

//
//
//

const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 5rem;
  height: 4rem;
`;

const StyledSpeachBubble = styled(SpeachBubble)<{ $color: string }>`
  position: absolute;
  top: 4px;
  left: 0;
  width: 100%;
  height: 100%;

  > path {
    fill: ${({ $color }) => $color};
  }
`;

const StatusContainer = styled.div<{ $textColor: string }>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.375rem;
  width: 100%;
  height: 100%;

  > span {
    font-size: 1rem;
    color: ${({ $textColor }) => $textColor};
  }

  > svg {
    width: 1.25rem;
    height: 1.25rem;
  }
`;

export default AttendaceCardStatus;
