import React from 'react';
import { Box } from '@mui/material';
import CSFirstSectionHeader from './CSFirstSectionHeader';
import CSFirstSectionMarquee from './CSFirstSectionMarquee';
import CSFirstSectionContent from './CSFirstSectionContent';
// import CSFirstSectionButton from './CSFirstSectionButton';
import { useBreakpoints } from '@/hooks/useBreakpoints';

//
//
//

const CSFirstSection = () => {
  const { isTabletOrSmaller } = useBreakpoints();

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
        padding: isTabletOrSmaller ? '1rem 0' : '2.5rem 0',
      }}
    >
      <CSFirstSectionHeader />
      <CSFirstSectionMarquee />
      <CSFirstSectionContent />
      {/* <CSFirstSectionButton /> */}
    </Box>
  );
};

export default CSFirstSection;
