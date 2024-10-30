import React from 'react';
import CotatoIcon from '@components/CotatoIcon';
import { ReactComponent as OnlineIcon } from '@assets/attendance_online_icon.svg';
import { ReactComponent as AbsentIcon } from '@assets/attendance_absent_icon.svg';

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
