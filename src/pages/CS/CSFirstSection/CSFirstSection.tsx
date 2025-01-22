import React from 'react';
import { Box } from '@mui/material';
import CSFirstSectionHeader from './CSFirstSectionHeader';
import CSFirstSectionMarquee from './CSFirstSectionMarquee';
import CSFirstSectionContent from './CSFirstSectionContent';
import CSFirstSectionButton from './CSFirstSectionButton';

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
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '2.5rem 0',
      }}
    >
      <CSFirstSectionHeader />
      <CSFirstSectionMarquee />
      <CSFirstSectionContent />
      <CSFirstSectionButton />
    </Box>
  );
};

export default CSFirstSection;
