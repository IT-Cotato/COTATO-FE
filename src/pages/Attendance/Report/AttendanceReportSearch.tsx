import React, { useEffect } from 'react';
import CotatoTextField from '@components/CotatoTextField/CotatoTextField';
import { Box } from '@mui/material';
import { useDebounce } from 'react-use';
import { useAttendanceReportFilter } from '../hooks/useAttendanceReportFilter';

//
//
//

const DEBOUNCE_TIME = 500;

//
//
//

const AttendanceReportSearch = () => {
  //
  const { updateSearchParams } = useAttendanceReportFilter();

  //
  const [searchValue, setSearchValue] = React.useState('');
  const [debouncedSearchValue, setDebouncedSearchValue] = React.useState('');

  //
  //
  //
  useDebounce(
    () => {
      setDebouncedSearchValue(searchValue);
    },
    DEBOUNCE_TIME,
    [searchValue],
  );

  //
  //
  //
  useEffect(() => {
    // if (!debouncedSearchValue) {
    //   updateSearchParams('');
    // }

    updateSearchParams(debouncedSearchValue);
  }, [debouncedSearchValue]);

  //
  //
  //

  return (
    <Box width="18rem">
      <CotatoTextField
        value={searchValue}
        variant="standard"
        fullWidth
        placeholder="어떤 부원 이름 찾으세요?"
        onChange={(e) => {
          setSearchValue(e.target.value);
        }}
      />
    </Box>
  );
};

export default AttendanceReportSearch;
