import { Container, Stack } from '@mui/material';
import React from 'react';
import AttendanceReportSubFilters from './AttendanceReportSubFilters';
import AttendanceReportAllTable from './AttendanceReportAllTable';
import AttendanceReportHeader from './AttendanceReportHeader';

//
//
//

const AttendanceReportAll = () => {
  return (
    <Container
      sx={{
        height: '100%',
      }}
    >
      <AttendanceReportHeader />
      <Stack gap="0.5rem">
        <AttendanceReportSubFilters />
        <AttendanceReportAllTable />
      </Stack>
    </Container>
  );
};

export default AttendanceReportAll;
