import React, { useEffect, useState } from 'react';
import { Box, Button, Stack, Typography } from '@mui/material';
import styled, { useTheme } from 'styled-components';
import { useGeneration } from '@/hooks/useGeneration';
import CotatoDropBox from '@components/CotatoDropBox';
import { CotatoAttendanceResponse, CotatoGenerationInfoResponse } from 'cotato-openapi-clients';
import { useMatch, useNavigate, useParams } from 'react-router-dom';
import CotatoIcon from '@components/CotatoIcon';
import { useBreakpoints } from '@/hooks/useBreakpoints';
import useGetAttendances from '@/hooks/useGetAttendances';
import { getAttendanceReportPath } from '../utils/util';

//
//
//

const REPORT_ALL_ID = 0;

//
//
//

const AttendanceReportHeader = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isReportAllMatch = useMatch('/attendance/report/generation/:generationId/all');
  const { isLandScapeOrSmaller } = useBreakpoints();

  const { generationId, attendanceId } = useParams();

  const [selectedGenerationId, setSelectedGenerationId] = useState<number>(Number(generationId));
  const [selectedAttendanceId, setSelectedAttendanceId] = useState<number>(Number(attendanceId));
  const [attendanceListWithAll, setAttendanceListWithAll] = useState<CotatoAttendanceResponse[]>(
    [],
  );

  const { generations, targetGeneration } = useGeneration({
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
  const handleGenerationChange = (generation: CotatoGenerationInfoResponse) => {
    setSelectedGenerationId(generation.generationId!);
  };

  /**
   *
   */
  const handleAttendanceChange = (attendance: CotatoAttendanceResponse) => {
    setSelectedAttendanceId(attendance.attendanceId!);
    if (attendance.attendanceId !== REPORT_ALL_ID) {
      navigate(
        getAttendanceReportPath({
          generationId: selectedGenerationId,
          sessionId: attendance.sessionId!,
          attendanceId: attendance.attendanceId!,
        }),
      );
    } else {
      navigate(`/attendance/report/generation/${selectedGenerationId}/all`);
    }
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
    if (!attendances?.attendances) {
      return;
    }

    const newAttendaceList: CotatoAttendanceResponse[] = [...attendances.attendances];
    newAttendaceList.push({
      attendanceId: REPORT_ALL_ID,
      sessionId: REPORT_ALL_ID,
      sessionTitle: '전체',
    });
    setAttendanceListWithAll(newAttendaceList);

    const selectedAttendance = attendances?.attendances?.find(
      (attendance) => attendance.attendanceId === selectedAttendanceId,
    );

    if (isReportAllMatch) {
      setSelectedAttendanceId(REPORT_ALL_ID);
    } else if (!selectedAttendance) {
      const latestAttendance = attendances?.attendances?.at(-1);
      setSelectedAttendanceId(latestAttendance?.attendanceId ?? 0);
      navigate(
        getAttendanceReportPath({
          generationId: selectedGenerationId,
          sessionId: latestAttendance?.sessionId,
          attendanceId: latestAttendance?.attendanceId,
        }),
      );
    }
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
              defaultItem={targetGeneration}
              color="yellow"
            />
          )}
          {attendanceListWithAll && (
            <CotatoDropBox
              list={attendanceListWithAll}
              onChange={handleAttendanceChange}
              defaultItem={attendanceListWithAll.find(
                (attendance) => attendance.attendanceId === selectedAttendanceId,
              )}
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
