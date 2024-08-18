import React from 'react';
import { ReactComponent as SpeachBubble } from '@assets/speach_bubble.svg';
import { styled, useTheme } from 'styled-components';
import { AttendResponseIsOpenedEnum } from '@/enums/attend/AttendResponseIsOpenedEnum';
import { AttendResponseAttendanceTypeEnum } from '@/enums/attend/AttendResponseAttendanceTypeEnum';
import { AttendResponseAttendanceResultEnum } from '@/enums/attend/AttendResponseAttendanceResultEnum';
import { ReactComponent as AbsetIcon } from '@assets/attendance_absent_icon.svg';
import { ReactComponent as OfflineIcon } from '@assets/attendance_offline_icon.svg';
import { ReactComponent as OnlineIcon } from '@assets/attendance_online_icon.svg';

//
//
//

interface AttendaceStatusProps {
  isOpened?: AttendResponseIsOpenedEnum;
  attendanceType: AttendResponseAttendanceTypeEnum | null;
  attendanceResult?: AttendResponseAttendanceResultEnum | null;
}

//
//
//

const AttendaceStatus: React.FC<AttendaceStatusProps> = ({
  isOpened,
  attendanceType,
  attendanceResult,
}) => {
  const theme = useTheme();

  const getSpeachBubbleColor = () => {
    if (isOpened === AttendResponseIsOpenedEnum.Before) {
      return theme.colors.gray40;
    } else if (isOpened === AttendResponseIsOpenedEnum.Open && attendanceResult === null) {
      return theme.colors.primary80;
    }
    return theme.colors.gray10;
  };

  const getTextColor = () => {
    if (isOpened === AttendResponseIsOpenedEnum.Before) {
      return theme.colors.common.white_const;
    } else if (isOpened === AttendResponseIsOpenedEnum.Open && attendanceResult === null) {
      return theme.colors.common.white_const;
    }
    return theme.colors.common.black_const;
  };

  const getStatusText = () => {
    if (isOpened === AttendResponseIsOpenedEnum.Before) {
      return '출석예정';
    } else if (isOpened === AttendResponseIsOpenedEnum.Open && attendanceResult === null) {
      return '출석중';
    } else if (attendanceResult === AttendResponseAttendanceResultEnum.Absent) {
      return '결석';
    }
    return '출석';
  };

  const getAttendanceIcon = () => {
    if (attendanceResult === AttendResponseAttendanceResultEnum.Absent) {
      return <AbsetIcon />;
    } else if (attendanceType === AttendResponseAttendanceTypeEnum.Online) {
      return <OnlineIcon />;
    } else if (attendanceType === AttendResponseAttendanceTypeEnum.Offline) {
      return <OfflineIcon />;
    }
    return null;
  };

  return (
    <Wrapper>
      <StyledSpeachBubble $color={getSpeachBubbleColor()} />
      <StatusContainer $textColor={getTextColor()}>
        <span>{getStatusText()}</span>
        {getAttendanceIcon()}
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

export default AttendaceStatus;
