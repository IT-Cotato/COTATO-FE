import React from 'react';

import { Stack, Typography } from '@mui/material';

import styled from 'styled-components';
import { useAttendanceReportFilter } from '../hooks/useAttendanceReportFilter';
import { useMatch } from 'react-router-dom';
import { STATUS_ASSETS } from '../constants';
import { useBreakpoints } from '@/hooks/useBreakpoints';
import { media } from '@theme/media';

//
//
//

const AttendanceReportSubFilterActions = () => {
  //
  const { currentStatus, toggleStatus } = useAttendanceReportFilter();
  const { isMobileOrSmaller, isLandScapeOrSmaller } = useBreakpoints();

  /**
   *
   */
  const checkIsStatusSelected = (status: string) => {
    return currentStatus.includes(status);
  };

  //
  const match = useMatch('/attendance/report/generation/:generationId/all');

  //
  const disabled = match ? true : false;

  //
  //
  //
  return (
    <Stack direction="row" width={isLandScapeOrSmaller ? '100%' : 'auto'} height="3rem" gap="1rem">
      {STATUS_ASSETS.map(({ status, icon, text }) => (
        <StyledButton
          key={status}
          disabled={disabled}
          $disabled={disabled}
          $selected={checkIsStatusSelected(status)}
          onClick={() => {
            toggleStatus(status);
          }}
        >
          {isMobileOrSmaller ? null : icon}
          <StyledTypography $disabled={disabled}>{text}</StyledTypography>
        </StyledButton>
      ))}
    </Stack>
  );
};

export default AttendanceReportSubFilterActions;

//
//
//

const StyledButton = styled.button<{ $selected?: boolean; $disabled?: boolean }>`
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

  // disabled
  background-color: ${({ theme, $disabled }) => $disabled && theme.colors.gray30};

  &:hover {
    transition: background-color 0.3s;
    ${({ theme, $selected }) => !$selected && `background-color: ${theme.colors.gray20};`}

    // disabled
    ${({ theme, $disabled }) => $disabled && `background-color: ${theme.colors.gray30};`}
  }

  opacity: ${({ $disabled }) => ($disabled ? 0.8 : 1)};
  cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'pointer')};

  ${media.mobile`
    height: 2.25rem;
  `}
`;

const StyledTypography = styled(Typography)<{ $disabled?: boolean }>`
  color: ${({ theme }) => theme.colors.common.black_const};
  color: ${({ theme, $disabled }) =>
    $disabled ? theme.colors.gray10 : theme.colors.common.black_const};

  ${media.mobile`
    font-size: 0.75rem !important;
  `}
`;
