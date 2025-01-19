import React from 'react';
import { Box } from '@mui/material';
import CSFirstSectionHeader from './CSFirstSectionHeader';

//
//
//

const CSFirstSection = () => {
  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        backgroundColor: 'lightblue',
        display: 'flex',
        flexDirection: 'column',
        alignContent: 'center',
        padding: '2.5rem 0',
      }}
    >
      <CSFirstSectionHeader />
    </Box>
  );
};

export default CSFirstSection;
