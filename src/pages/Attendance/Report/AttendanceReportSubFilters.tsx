import React from 'react';
import { Stack } from '@mui/material';
import AttendanceReportSubFilterActions from './AttendanceReportSubFilterActions';
import AttendanceReportSearch from './AttendanceReportSearch';

//
//
//

const AttendanceReportSubFilters = () => {
  //
  //
  //
  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      width="100%"
      flexWrap="wrap"
      gap="0.75rem"
    >
      <AttendanceReportSubFilterActions />
      <AttendanceReportSearch />
    </Stack>
  );
};

export default AttendanceReportSubFilters;
