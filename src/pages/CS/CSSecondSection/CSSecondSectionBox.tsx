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
  const { isLaptopOrSmaller, isTabletOrSmaller } = useBreakpoints();

  /**
   *
   */
  const getPadding = () => {
    if (isTabletOrSmaller) {
      return '1.25rem 1.5rem';
    }

    if (isLaptopOrSmaller) {
      return '1.5rem 2rem';
    }

    return '1.875rem 2.375rem';
  };

  /**
   *
   */
  const getTitleWidth = () => {
    if (isTabletOrSmaller) {
      return '10rem';
    }

    if (isLaptopOrSmaller) {
      return '12rem';
    }

    return '16rem';
  };

  /**
   *
   */
  const getDescriptionWidth = () => {
    if (isTabletOrSmaller) {
      return '10rem';
    }

    if (isLaptopOrSmaller) {
      return '20rem';
    }

    return '28.5rem';
  };

  return (
    <Box
      sx={{
        display: 'flex',
        padding: getPadding(),
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
          width: getTitleWidth(),
        }}
      >
        {title}
      </Typography>
      <Typography
        variant="body1"
        sx={{
          fontWeight: 500,
          width: getDescriptionWidth(),
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
