import React from 'react';
import { ReactComponent as SpeachBubble } from '@assets/speach_bubble.svg';
import { styled, useTheme } from 'styled-components';
import { ReactComponent as AbsentIcon } from '@assets/attendance_absent_icon.svg';
import { ReactComponent as OnlineIcon } from '@assets/attendance_online_icon.svg';
import CotatoIcon from '@components/CotatoIcon';
import {
  CotatoMemberAttendResponseOpenStatusEnum,
  CotatoMemberAttendResponseResultEnum,
} from 'cotato-openapi-clients';

//
//
//

interface AttendaceStatusProps {
  openStatus?: CotatoMemberAttendResponseOpenStatusEnum;
  attendanceResult?: CotatoMemberAttendResponseResultEnum | null;
}

//
//
//

const AttendaceCardStatus: React.FC<AttendaceStatusProps> = ({ openStatus, attendanceResult }) => {
  const theme = useTheme();

  const getStatusStyle = () => {
    if (openStatus === CotatoMemberAttendResponseOpenStatusEnum.Before) {
      return {
        backgroundColor: theme.colors.gray40,
        icon: null,
        textColor: theme.colors.const.white,
        text: '출석예정',
      };
    } else if (
      openStatus === CotatoMemberAttendResponseOpenStatusEnum.Open &&
      attendanceResult === null
    ) {
      return {
        backgroundColor: theme.colors.primary80,
        icon: null,
        textColor: theme.colors.const.white,
        text: '출석중',
      };
    } else if (attendanceResult === CotatoMemberAttendResponseResultEnum.Offline) {
      return {
        backgroundColor: theme.colors.gray10,
        icon: <CotatoIcon icon="user-check-solid" color={(theme) => theme.colors.sub3[40]} />,
        textColor: theme.colors.const.black,
        text: '출석',
      };
    } else if (attendanceResult === CotatoMemberAttendResponseResultEnum.Online) {
      return {
        backgroundColor: theme.colors.gray10,
        icon: <OnlineIcon />,
        textColor: theme.colors.const.black,
        text: '출석',
      };
    } else if (attendanceResult === CotatoMemberAttendResponseResultEnum.Late) {
      return {
        backgroundColor: theme.colors.gray10,
        icon: (
          <CotatoIcon icon="bell-exclaimation-solid" color={(theme) => theme.colors.secondary80} />
        ),
        textColor: theme.colors.const.black,
        text: '지각',
      };
    } else if (
      openStatus === CotatoMemberAttendResponseOpenStatusEnum.Closed &&
      attendanceResult === null
    ) {
      return {
        backgroundColor: theme.colors.gray10,
        icon: null,
        textColor: theme.colors.const.black,
        text: '미입력',
      };
    } else if (attendanceResult === CotatoMemberAttendResponseResultEnum.Absent) {
      return {
        backgroundColor: theme.colors.gray10,
        icon: <AbsentIcon />,
        textColor: theme.colors.const.black,
        text: '결석',
      };
    }

    return {
      backgroundColor: '',
      icon: null,
      textColor: '',
      text: '',
    };
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
