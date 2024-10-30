import React from 'react';

import { Container } from '@mui/system';
import AttendanceReportSubFilters from './AttendanceReportSubFilters';
import AttendanceReportHeader from './AttendanceReportHeader';

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
      <AttendanceReportHeader />
      {/* <AttendanceReportHeaderActions /> */}
      <AttendanceReportSubFilters />
      {/* <AttendanceReportTable /> */}
    </Container>
  );
};

export default AttendanceReport;
