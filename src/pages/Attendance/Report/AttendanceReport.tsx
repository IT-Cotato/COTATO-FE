import React from 'react';

import { Container, Stack } from '@mui/system';
import AttendanceReportSubFilters from './AttendanceReportSubFilters';
import AttendanceReportTable from './AttendanceReportTable';

//
//
//

const AttendanceReport = () => {
  //
  //
  //

  return (
    <Container
      sx={{
        height: '100%',
      }}
    >
      {/* <AttendanceReportHeader /> */}
      {/* <AttendanceReportHeaderActions /> */}
      <Stack gap="0.5rem">
        <AttendanceReportSubFilters />
        <AttendanceReportTable />
      </Stack>
    </Container>
  );
};

export default AttendanceReport;
