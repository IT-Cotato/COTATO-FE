import React from 'react';
import { Container, Stack } from '@mui/material';
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
        padding: '2rem',
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
