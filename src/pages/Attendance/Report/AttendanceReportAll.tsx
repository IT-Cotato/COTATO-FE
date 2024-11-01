import { Container, Stack } from '@mui/material';
import React from 'react';
import AttendanceReportSubFilters from './AttendanceReportSubFilters';
import AttendanceReportAllTable from './AttendanceReportAllTable';

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
      <Stack gap="0.5rem">
        <AttendanceReportSubFilters />
        <AttendanceReportAllTable />
      </Stack>
    </Container>
  );
};

export default AttendanceReportAll;
