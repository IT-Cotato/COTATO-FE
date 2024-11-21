import React from 'react';
import { ReactComponent as SpeachBubble } from '@assets/speach_bubble.svg';
import { styled, useTheme } from 'styled-components';
import { AttendResponseIsOpenedEnum } from '@/enums/attend/AttendResponseIsOpenedEnum';
import { AttendResponseAttendanceTypeEnum } from '@/enums/attend/AttendResponseAttendanceTypeEnum';
import { AttendResponseAttendanceResultEnum } from '@/enums/attend/AttendResponseAttendanceResultEnum';
import { ReactComponent as AbsentIcon } from '@assets/attendance_absent_icon.svg';
import { ReactComponent as OnlineIcon } from '@assets/attendance_online_icon.svg';
import CotatoIcon from '@components/CotatoIcon';

//
//
//

interface AttendaceStatusProps {
  isOpened?: AttendResponseIsOpenedEnum;
  attendanceType: AttendResponseAttendanceTypeEnum | null;
  attendanceResult?: AttendResponseAttendanceResultEnum | null;
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

const AttendaceCardStatus: React.FC<AttendaceStatusProps> = ({
  isOpened,
  attendanceType,
  attendanceResult,
}) => {
  const theme = useTheme();

  /**
   *
   */
  const getAttendanceStatus = () => {
    if (isOpened === AttendResponseIsOpenedEnum.Before) {
      return AttendanceStatus.Before;
    } else if (isOpened === AttendResponseIsOpenedEnum.Open && attendanceResult === null) {
      return AttendanceStatus.Open;
    } else if (
      attendanceResult === AttendResponseAttendanceResultEnum.Present &&
      attendanceType === AttendResponseAttendanceTypeEnum.Offline
    ) {
      return AttendanceStatus.PresentOffline;
    } else if (
      attendanceResult === AttendResponseAttendanceResultEnum.Present &&
      attendanceType === AttendResponseAttendanceTypeEnum.Online
    ) {
      return AttendanceStatus.PresentOnline;
    } else if (
      attendanceResult === AttendResponseAttendanceResultEnum.Late &&
      attendanceType === AttendResponseAttendanceTypeEnum.Offline
    ) {
      return AttendanceStatus.LateOffline;
    } else if (
      attendanceResult === AttendResponseAttendanceResultEnum.Late &&
      attendanceType === AttendResponseAttendanceTypeEnum.Online
    ) {
      return AttendanceStatus.LateOnline;
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
      case AttendanceStatus.LateOnline:
        return {
          backgroundColor: theme.colors.gray10,
          icon: <OnlineIcon />,
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
