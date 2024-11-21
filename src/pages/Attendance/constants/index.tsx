import React from 'react';
import CotatoIcon from '@components/CotatoIcon';
import { ReactComponent as OnlineIcon } from '@assets/attendance_online_icon.svg';
import { ReactComponent as AbsentIcon } from '@assets/attendance_absent_icon.svg';
import {
  CotatoAttendanceRecordResponseResultEnum,
  CotatoAttendanceStatistic,
} from 'cotato-openapi-clients';

export const STATUS_ASSETS = [
  {
    status: 'offline',
    icon: <CotatoIcon icon="user-check-solid" color={(theme) => theme.colors.sub3[40]} />,
    text: '대면',
  },

  {
    status: 'online',
    icon: <OnlineIcon />,
    text: '비대면',
  },

  {
    status: 'late',
    icon: <CotatoIcon icon="bell-exclaimation-solid" color={(theme) => theme.colors.secondary80} />,
    text: '지각',
  },

  {
    status: 'absent',
    icon: <AbsentIcon />,
    text: '결석',
  },
];

export const ATTENDANCE_ASSETS_ICON_MAP: Record<keyof CotatoAttendanceStatistic, JSX.Element> = {
  offline: STATUS_ASSETS[0].icon,
  online: STATUS_ASSETS[1].icon,
  late: STATUS_ASSETS[2].icon,
  absent: STATUS_ASSETS[3].icon,
};

export const ATTENDANCE_ASSETS_TEXT_MAP: Record<
  keyof CotatoAttendanceStatistic & keyof CotatoAttendanceRecordResponseResultEnum,
  string
> = {
  offline: STATUS_ASSETS[0].text,
  online: STATUS_ASSETS[1].text,
  late: STATUS_ASSETS[2].text,
  absent: STATUS_ASSETS[3].text,
  OFFLINE: STATUS_ASSETS[0].text,
  ONLINE: STATUS_ASSETS[1].text,
  LATE: STATUS_ASSETS[2].text,
  ABSENT: STATUS_ASSETS[3].text,
} as const;

export const ATTENDANCE_ASSETS_MAP: Record<
  keyof CotatoAttendanceStatistic,
  { text: string; icon: JSX.Element }
> = {
  offline: {
    text: '대면',
    icon: <CotatoIcon icon="user-check-solid" color={(theme) => theme.colors.sub3[40]} />,
  },
  online: {
    text: '비대면',
    icon: <OnlineIcon />,
  },
  late: {
    text: '지각',
    icon: <CotatoIcon icon="bell-exclaimation-solid" color={(theme) => theme.colors.secondary80} />,
  },
  absent: {
    text: '결석',
    icon: <AbsentIcon />,
  },
};

export const STATISTICS_MAP = {
  offline: '대면',
  online: '비대면',
  late: '지각',
  absent: '결석',
  undefined: '-',
};

export const ATTENDANCE_STATUS_TEXT = ['대면', '비대면', '지각', '결석'];
