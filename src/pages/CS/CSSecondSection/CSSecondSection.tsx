import { Box } from '@mui/material';
import React from 'react';
import CSSecondSectionHeader from './CSSecondSectionHeader';

//
//
//

const CSSecondSection = () => {
  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        gap: '2.5rem',
        padding: '2.5rem 0',
      }}
    >
      <CSSecondSectionHeader />
    </Box>
  );
};

//
//
//

export default CSSecondSection;
