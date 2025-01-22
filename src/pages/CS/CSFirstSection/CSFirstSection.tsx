import React from 'react';
import { Box } from '@mui/material';
import CSFirstSectionHeader from './CSFirstSectionHeader';
import CSFirstSectionMarquee from './CSFirstSectionMarquee';
import CSFirstSectionContent from './CSFirstSectionContent';

//
//
//

const CSFirstSection = () => {
  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        padding: '2.5rem 0',
        gap: '2.5rem',
      }}
    >
      <CSFirstSectionHeader />
      <CSFirstSectionMarquee />
      <CSFirstSectionContent />
    </Box>
  );
};

export default CSFirstSection;
