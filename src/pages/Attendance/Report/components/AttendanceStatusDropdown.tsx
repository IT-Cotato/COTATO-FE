import api from '@/api/api';
import { MenuItem, Stack, TextField } from '@mui/material';
import { ATTENDANCE_ASSETS_MAP } from '@pages/Attendance/constants';
import React from 'react';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import { useAttendancesAttendanceIdRecordsGet } from '@pages/Attendance/hooks/useAttendancesAttendanceIdRecordsGet';

//
//
//

interface AttendanceStatusDropdownProps {
  status: string;
  attendanceId?: number;
  memberId?: number;
}

//
//
//

const AttendanceStatusDropdown: React.FC<AttendanceStatusDropdownProps> = ({
  status,
  attendanceId,
  memberId,
}) => {
  //
  const { mutateAttendancesAttendanceIdRecords } = useAttendancesAttendanceIdRecordsGet({
    attendanceId: attendanceId ?? 0,
  });

  /**
   *
   */
  const handleStatusChange = async (
    e: React.ChangeEvent<{ value: unknown }>,
    memberId?: number,
  ) => {
    const status = e.target.value as string;

    try {
      await api.patch(`/v2/api/attendances/${attendanceId}/records`, {
        memberId,
        attendanceResult: status.toUpperCase(),
      });

      mutateAttendancesAttendanceIdRecords();
      toast.success('출석 상태가 성공적으로 변경되었습니다.');
    } catch (error) {
      toast.error('출석 상태 변경에 실패했습니다.');
    }
  };

  //
  //
  //

  return (
    <StyledTextField
      select
      defaultValue={status}
      sx={{
        '& fieldset': { border: 'unset' },
      }}
      slotProps={{
        select: {
          renderValue: (value) => {
            const icon = ATTENDANCE_ASSETS_MAP[value as keyof typeof ATTENDANCE_ASSETS_MAP]?.icon;
            const text = ATTENDANCE_ASSETS_MAP[value as keyof typeof ATTENDANCE_ASSETS_MAP]?.text;

            return (
              <Stack
                direction="row"
                height="2.5rem"
                alignItems="center"
                justifyContent="center"
                gap="0.25rem"
              >
                {icon}
                {text}
              </Stack>
            );
          },
          sx: {
            '.MuiSelect-select': {
              padding: '0.25rem',
              height: '2.5rem',
            },
          },
        },
      }}
      onChange={(e) => handleStatusChange(e, memberId)}
    >
      {Object.keys(ATTENDANCE_ASSETS_MAP).map((asset) => {
        const icon = ATTENDANCE_ASSETS_MAP[asset as keyof typeof ATTENDANCE_ASSETS_MAP]?.icon;
        const text = ATTENDANCE_ASSETS_MAP[asset as keyof typeof ATTENDANCE_ASSETS_MAP]?.text;

        return (
          <MenuItem key={asset} value={asset}>
            <Stack
              direction="row"
              gap="0.25rem"
              alignItems="center"
              justifyContent="center"
              height="2.5rem"
            >
              {icon}
              {text}
            </Stack>
          </MenuItem>
        );
      })}
    </StyledTextField>
  );
};

export default AttendanceStatusDropdown;

//
//
//

const StyledTextField = styled(TextField)`
  width: 8.75rem;
  background-color: ${({ theme }) => theme.colors.gray10};
  border-radius: 0.5rem;
`;
