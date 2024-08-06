import { Box, Fab, Stack, SvgIcon, Typography, useMediaQuery } from '@mui/material';
import { device } from '@theme/media';
import React from 'react';
import styled, { useTheme } from 'styled-components';

//
//
//

interface CotatoFloatingActionButtonItemProps {
  name: string;
  icon: React.ReactNode;
  selected?: boolean;
  onClick: () => void;
}

//
//
//

const FAB_ITEM_WEB_SIZE = '3.75rem';
const FAB_ITEM_MOBILE_SIZE = '3.2rem';

//
//
//

const CotatoFloatingActionButtonItem: React.FC<CotatoFloatingActionButtonItemProps> = ({
  name,
  icon,
  selected,
  onClick,
}) => {
  const theme = useTheme();
  const isMobileOrSmaller = useMediaQuery(`(max-width:${device.mobile})`);

  /**
   *
   */
  const handleClick = () => {
    if (typeof onClick !== 'function') {
      return;
    }

    onClick();
  };

  //
  //
  //
  return (
    <StyledFab
      isMobileOrSmaller={isMobileOrSmaller}
      sx={{
        backgroundColor: selected ? theme.colors.primary90 : theme.colors.gray40,
      }}
      onClick={handleClick}
    >
      <Stack>
        <Box width="100%" height="1.5rem">
          <SvgIcon>{icon}</SvgIcon>
        </Box>
        <StyledTypography
          fontSize="0.8rem"
          sx={{
            wordBreak: 'keep-all',
          }}
        >
          {name}
        </StyledTypography>
      </Stack>
    </StyledFab>
  );
};

export default CotatoFloatingActionButtonItem;

//
//
//

const StyledFab = styled(Fab)<{ isMobileOrSmaller: boolean }>`
  width: ${({ isMobileOrSmaller }) =>
    isMobileOrSmaller ? FAB_ITEM_MOBILE_SIZE : FAB_ITEM_WEB_SIZE} !important;
  height: ${({ isMobileOrSmaller }) =>
    isMobileOrSmaller ? FAB_ITEM_MOBILE_SIZE : FAB_ITEM_WEB_SIZE} !important;
  background-color: ${({ theme }) => theme.colors.gray40};

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary90} !important;
  }
`;

const StyledTypography = styled(Typography)`
  color: #fff;
  font-weight: 500;
  font-family: 'YComputer' !important;
  line-height: 1 !important;
`;
