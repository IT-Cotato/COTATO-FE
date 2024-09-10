import React from 'react';

import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { Container, Stack } from '@mui/system';
import fetcherWithParams from '@utils/fetcherWithParams';
import { CotatoAttendanceRecordResponse, CotatoAttendanceStatistic } from 'cotato-openapi-clients';

import { useParams } from 'react-router-dom';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import useGetAttendances from '@/hooks/useGetAttendances';
import { useSession } from '@/hooks/useSession';

//
//
//

const STATISTICS_MAP = {
  offline: '대면',
  online: '비대면',
  late: '지각',
  absent: '결석',
} as unknown as CotatoAttendanceStatistic;

//
//
//

const AttendanceReport = () => {
  const { generationId, month } = useParams();

  const { sessions } = useSession({ generationId: Number(generationId) });
  const latestSession = sessions?.at(-1);

  const { currentAttendance } = useGetAttendances({
    generationId: Number(generationId),
    sessionId: latestSession?.sessionId,
  });

  // data for month
  const { data: monthRecords } = useSWR<CotatoAttendanceRecordResponse[]>(
    '/v2/api/attendances/records',
    (url: string) =>
      fetcherWithParams(url, {
        generationId,
        month,
      }),
    {
      revalidateOnFocus: false,
    },
  );

  // data for latest session
  const { data: currentRecord } = useSWR<CotatoAttendanceRecordResponse[]>(
    `/v2/api/attendances/${currentAttendance?.attendanceId}/records`,
    fetcher,
    {
      revalidateOnFocus: false,
    },
  );

  /**
   * Get current statistic
   */
  const getCurrentStatistic = (report: CotatoAttendanceRecordResponse) => {
    const currentStatistics = currentRecord?.find(
      (record) => record.memberInfo?.memberId === report.memberInfo?.memberId,
    )?.statistic;

    // online, offline, late, absent
    const keys = Object.keys(currentStatistics || {});

    // 0이 아닌 값이 있는 인덱스 == online, offline, late, absent 중 하나
    const currentInfoIndex = Object.values(currentStatistics || {}).findIndex(
      (value) => value !== 0,
    );

    const currentStatistic = keys[currentInfoIndex] as keyof CotatoAttendanceStatistic;

    return currentStatistic;
  };

  /**
   *
   */
  const renderTableHead = () => {
    return (
      <TableHead>
        <TableRow>
          <TableCell>
            <Typography>멤버</Typography>
          </TableCell>

          <TableCell>최근 세션 </TableCell>

          <TableCell>
            <Typography>대면</Typography>
          </TableCell>
          <TableCell>
            <Typography>비대면</Typography>
          </TableCell>
          <TableCell>
            <Typography>지각</Typography>
          </TableCell>
          <TableCell>
            <Typography>결석</Typography>
          </TableCell>
        </TableRow>
      </TableHead>
    );
  };

  //
  //
  //

  return (
    <Container
      sx={{
        height: '100%',
      }}
    >
      <Stack component={Paper} minHeight="90vh">
        <Stack alignItems="center" padding="3rem">
          <Typography variant="h4" fontWeight="bold">
            임시 출석 현황
          </Typography>
        </Stack>
        <TableContainer
          sx={{
            padding: '1rem',
          }}
        >
          <Table>
            {renderTableHead()}
            <TableBody>
              {monthRecords?.map((report) => {
                const currentStatistic = getCurrentStatistic(report);

                return (
                  <TableRow key={report.memberInfo?.memberId}>
                    {/* 멤버 */}
                    <TableCell key={report.memberInfo?.memberId}>
                      <Typography fontWeight="bold">{report.memberInfo?.name}</Typography>
                    </TableCell>

                    {/* 최근 세션 */}
                    <TableCell>
                      <Typography>
                        {typeof currentStatistic === 'string'
                          ? STATISTICS_MAP[currentStatistic]
                          : '--'}
                      </Typography>
                    </TableCell>

                    {/* 대면 */}
                    <TableCell>
                      <Typography>{report.statistic?.offline}</Typography>
                    </TableCell>

                    {/* 비대면 */}
                    <TableCell>
                      <Typography>{report.statistic?.online}</Typography>
                    </TableCell>

                    {/* 지각 */}
                    <TableCell>{report.statistic?.late}</TableCell>

                    {/* 결석 */}
                    <TableCell>{report.statistic?.online}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Stack>
    </Container>
  );
};

export default AttendanceReport;
