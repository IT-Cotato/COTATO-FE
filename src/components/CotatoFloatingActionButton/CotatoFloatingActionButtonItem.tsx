import { Box, Fab, SvgIcon, Tooltip, useMediaQuery } from '@mui/material';
import { device } from '@theme/media';
import React from 'react';
import styled, { useTheme } from 'styled-components';

//
//
//

interface CotatoFloatingActionButtonItemProps {
  name: string;
  icon: React.ReactNode;
  svgIcon?: React.ReactNode;
  selected?: boolean;
  disabled?: boolean;
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
  svgIcon,
  icon,
  selected,
  disabled,
  onClick,
}) => {
  const theme = useTheme();
  const isMobileOrSmaller = useMediaQuery(`(max-width:${device.mobile})`);

  const iconSize = isMobileOrSmaller
    ? {
        width: '28px',
        height: '28px',
      }
    : {
        width: '30px',
        height: '30px',
      };

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
    <Tooltip arrow title={name} placement="left">
      <div>
        <StyledFab
          isMobileOrSmaller={isMobileOrSmaller}
          disabled={disabled}
          sx={{
            backgroundColor: selected ? theme.colors.primary90 : theme.colors.gray40,
          }}
          onClick={handleClick}
        >
          <Box width="100%" height="1.75rem">
            {svgIcon ? (
              <SvgIcon
                style={{
                  width: iconSize.width,
                  height: iconSize.height,
                  opacity: disabled ? 0.5 : 1,
                }}
              >
                {icon}
              </SvgIcon>
            ) : (
              icon
            )}
          </Box>
        </StyledFab>
      </div>
    </Tooltip>
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
