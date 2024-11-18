import React, { useEffect, useState } from 'react';
import { Box, Button, Stack, Typography } from '@mui/material';
import styled, { useTheme } from 'styled-components';
import { useGeneration } from '@/hooks/useGeneration';
import CotatoDropBox from '@components/CotatoDropBox';
import {
  CotatoAttendanceResponse,
  CotatoGenerationInfoResponse,
  CotatoSessionListResponse,
} from 'cotato-openapi-clients';
import { useNavigate, useParams } from 'react-router-dom';
import { useSession } from '@/hooks/useSession';
import CotatoIcon from '@components/CotatoIcon';
import { useBreakpoints } from '@/hooks/useBreakpoints';
import useGetAttendances from '@/hooks/useGetAttendances';

//
//
//

const AttendanceReportHeader = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { isLandScapeOrSmaller } = useBreakpoints();

  const { generationId, sessionId, attendanceId } = useParams();

  const [selectedGenerationId, setSelectedGenerationId] = useState<number>(Number(generationId));
  const [selectedSessionId, setSelectedSessionId] = useState<number>(Number(sessionId));
  const [selectedAttendanceId, setSelectedAttendanceId] = useState<number>(Number(attendanceId));

  const { generations } = useGeneration({
    generationId: selectedGenerationId.toString(),
  });

  const { attendances } = useGetAttendances({
    generationId: selectedGenerationId,
  });

  /**
   *
   */
  const handlePreviousClick = () => {
    navigate('/attendance');
  };

  /**
   *
   */
  const handleGenerationChange = (generations: CotatoGenerationInfoResponse) => {
    setSelectedGenerationId(generations.generationId!);
  };

  /**
   *
   */
  const handleAttendanceChange = (attendance: CotatoAttendanceResponse) => {
    setSelectedSessionId(attendance.sessionId!);
    setSelectedAttendanceId(attendance.attendanceId!);
    navigate(
      `/attendance/report/generation/${selectedGenerationId}/session/${attendance.sessionId}/attendance/${attendance.attendanceId}`,
    );
  };

  /**
   *
   */
  const handleExportExcelClick = () => {
    alert('출시 예정입니다 :)');
  };

  /**
   *
   */
  useEffect(() => {
    if (
      attendances?.attendances?.find(
        (attendance) => attendance.attendanceId === selectedAttendanceId,
      )
    ) {
      return;
    }

    const latestAttendance = attendances?.attendances?.at(-1);
    setSelectedSessionId(latestAttendance?.sessionId ?? 0);
    setSelectedAttendanceId(latestAttendance?.attendanceId ?? 0);
    navigate(
      `/attendance/report/generation/${selectedGenerationId}/session/${latestAttendance?.sessionId ?? 0}/attendance/${latestAttendance?.attendanceId ?? 0}`,
    );
  }, [attendances]);

  return (
    <Stack
      direction="column"
      spacing="3rem"
      padding="2.5rem 0"
      sx={{
        width: '100%',
      }}
    >
      <Box sx={{ position: 'relative' }}>
        <StyledIcon
          icon="chevron-down-solid"
          color={theme.colors.primary90}
          onClick={handlePreviousClick}
        />
        <Typography
          align="center"
          color={theme.colors.common.black}
          sx={{
            fontFamily: 'Ycomputer',
            fontSize: '1.75rem',
          }}
        >
          출석부 확인하기
        </Typography>
      </Box>
      <Stack direction="row" justifyContent="space-between" gap="1rem">
        <Stack direction="row" spacing="1rem">
          {generations && (
            <CotatoDropBox
              list={generations}
              onChange={handleGenerationChange}
              defaultItemId={selectedGenerationId}
              color="yellow"
            />
          )}
          {attendances?.attendances && (
            <CotatoDropBox
              list={attendances.attendances}
              onChange={handleAttendanceChange}
              defaultItemId={selectedAttendanceId}
              width="12rem"
              color="yellow"
            />
          )}
        </Stack>
        <Stack direction="column-reverse">
          <Button
            disableElevation
            disabled
            variant="contained"
            onClick={handleExportExcelClick}
            startIcon={
              <CotatoIcon icon="upload-alt-solid" color={theme.colors.common.black_const} />
            }
            sx={{
              backgroundColor: theme.colors.primary80,
              borderRadius: '0.325rem',
            }}
          >
            <Typography
              color={theme.colors.common.black_const}
              sx={{
                fontFamily: 'Ycomputer',
                fontSize: '1rem',
              }}
            >
              {!isLandScapeOrSmaller && '엑셀로 내보내기'}
            </Typography>
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default AttendanceReportHeader;

//
//
//

const StyledIcon = styled(CotatoIcon)`
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateX(-50%);
  rotate: 90deg;
  width: 2rem !important;
  height: 2rem !important;
  cursor: pointer;
`;
