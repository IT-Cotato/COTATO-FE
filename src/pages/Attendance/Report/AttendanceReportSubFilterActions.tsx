import React from 'react';
import CotatoIcon from '@components/CotatoIcon';
import { Stack, Typography } from '@mui/material';
import { ReactComponent as OnlineIcon } from '@assets/attendance_online_icon.svg';
import { ReactComponent as AbsentIcon } from '@assets/attendance_absent_icon.svg';
import styled from 'styled-components';
import { useAttendanceReportFilter } from '../hooks/useAttendanceReportFilter';

//
//
//

const STATUS_BUTTONS = [
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

//
//
//

const AttendanceReportSubFilterActions = () => {
  //
  const { currentStatus, toggleStatus } = useAttendanceReportFilter();

  /**
   *
   */
  const checkIsStatusSelected = (status: string) => {
    return currentStatus.includes(status);
  };

  //
  //
  //
  return (
    <Stack direction="row" width="100%" height="3rem" gap="1rem">
      {STATUS_BUTTONS.map(({ status, icon, text }) => (
        <StyledButton
          key={status}
          $selected={checkIsStatusSelected(status)}
          onClick={() => {
            toggleStatus(status);
          }}
        >
          {icon}
          <StyledTypography>{text}</StyledTypography>
        </StyledButton>
      ))}
    </Stack>
  );
};

export default AttendanceReportSubFilterActions;

//
//
//

const StyledButton = styled.button<{ $selected?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 8rem;
  height: 2.75rem;
  gap: 0.75rem;
  outline: none;
  border: none;
  border-radius: 0.5rem;
  background-color: ${({ theme, $selected }) =>
    $selected ? theme.colors.primary80 : theme.colors.gray10};
  cursor: pointer;

  &:hover {
    transition: background-color 0.3s;
    ${({ theme, $selected }) => !$selected && `background-color: ${theme.colors.gray20};`}
  }
`;

const StyledTypography = styled(Typography)`
  color: ${({ theme }) => theme.colors.common.black_const};
`;
