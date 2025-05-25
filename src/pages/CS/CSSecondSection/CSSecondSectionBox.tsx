import React from 'react';
import { Box, Typography } from '@mui/material';
import { useTheme } from 'styled-components';
import { useBreakpoints } from '@/hooks/useBreakpoints';

//
//
//

interface CSSecondSectionBoxProps {
  title: string;
  description: string;
  caption?: string;
}

//
//
//

const CSSecondSectionBox = ({ title, description, caption }: CSSecondSectionBoxProps) => {
  const theme = useTheme();

  const { isTabletOrSmaller } = useBreakpoints();

  return (
    <Box
      sx={{
        display: 'flex',
        padding: isTabletOrSmaller ? '1.25rem 1.5rem' : '1.875rem 2.375rem',
        alignItems: 'center',
        backgroundColor: theme.colors.common.white,
        borderRadius: '0.3125rem',
        border: `1px solid ${theme.colors.primary80}`,
      }}
    >
      <Typography
        variant="body1"
        sx={{
          fontWeight: 600,
          width: isTabletOrSmaller ? '10rem' : '16rem',
        }}
      >
        {title}
      </Typography>
      <Typography
        variant="body1"
        sx={{
          fontWeight: 500,
          width: isTabletOrSmaller ? '10rem' : '28.5rem',
        }}
      >
        {description}
      </Typography>
      {caption && !isTabletOrSmaller && (
        <Typography
          variant="caption"
          sx={{
            color: theme.colors.gray50,
          }}
        >
          {caption}
        </Typography>
      )}
    </Box>
  );
};

export default CSSecondSectionBox;
