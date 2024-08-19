import { useBreakpoints } from '@/hooks/useBreakpoints';
import { Box, Stack, Typography } from '@mui/material';
import React from 'react';
import { useTheme } from 'styled-components';

//
//
//

interface AboutLayoutProps {
  dividerIcon: string;
  title: string;
  content: React.ReactNode;
}

//
//
//

const AboutLayout: React.FC<AboutLayoutProps> = ({ dividerIcon, title, content }) => {
  const theme = useTheme();
  const { isMobileOrSmaller, isLandScapeOrSmaller } = useBreakpoints();

  //
  //
  //
  return (
    <Stack width="100%" justifyContent="center" alignItems="center">
      <Stack
        width="100%"
        direction="row"
        alignItems="center"
        gap={isMobileOrSmaller ? '0.25rem' : '0.5rem'}
        padding={isMobileOrSmaller ? '1rem' : isLandScapeOrSmaller ? '2rem' : '5rem'}
      >
        <Box
          component="img"
          src={dividerIcon}
          width={isMobileOrSmaller ? '2rem' : '3rem'}
          height={isMobileOrSmaller ? '2rem' : '3rem'}
          paddingBottom={isMobileOrSmaller ? '0.25rem' : '0.5rem'}
        />
        <Box>
          <Typography
            color={theme.colors.common.black}
            variant={isLandScapeOrSmaller ? 'h6' : 'h4'}
            fontFamily="YComputer"
            width="100%"
          >
            {title}
          </Typography>
        </Box>
        <div
          style={{
            height: '3px',
            backgroundColor: theme.colors.primary100_1,
            flex: 1,
          }}
        />
      </Stack>
      <Stack padding="5rem">{content}</Stack>
    </Stack>
  );
};

export default AboutLayout;
