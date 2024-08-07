import { Box, Fab, List, Stack, Typography, useMediaQuery } from '@mui/material';
import React from 'react';
import { ReactComponent as FabExpandIcon } from '@assets/fab_expand.svg';
import styled from 'styled-components';
import { useSpring, animated } from 'react-spring';
import { device } from '@theme/media';

//
//
//

interface CotatoFloatingActionButtonProps {
  name: string;
  children: React.ReactNode;
}

//
//
//

const FAB_WEB_SIZE = '4.25rem';
const FAB_MOBILE_SIZE = '3.5rem';

//
//
//

const CotatoFloatingActionButton: React.FC<CotatoFloatingActionButtonProps> = ({
  name,
  children,
}) => {
  const [isFabOpen, setIsFabOpen] = React.useState(false);
  const itemLength = React.Children.count(children);
  const isMobileOrSmaller = useMediaQuery(`(max-width:${device.mobile})`);

  /**
   *
   */
  const animationFormula = (itemLength: number) => {
    return isMobileOrSmaller ? itemLength * 4.25 + 0.75 : itemLength * 5 + 1;
  };

  const animationProps = useSpring({
    height: isFabOpen ? `${animationFormula(itemLength)}rem` : '0rem',
    opacity: isFabOpen ? 1 : 0,
    config: { tension: 240, friction: 20 },
  });

  //
  //
  //
  return (
    <Stack>
      <StyledAnimatedList
        isMobileOrSmaller={isMobileOrSmaller}
        style={animationProps}
        sx={{
          backgroundColor: 'white',
          boxShadow: isFabOpen ? '0px 0px 10px 1px rgba(0, 0, 0, 0.25)' : 'none',
        }}
      >
        {children}
      </StyledAnimatedList>
      <StyledFab
        isMobileOrSmaller={isMobileOrSmaller}
        onClick={() => {
          setIsFabOpen(!isFabOpen);
        }}
      >
        <Stack gap="0.25rem">
          <Box width="100%" height="1.5rem">
            <FabExpandIcon width="100%" height="100%" />
          </Box>
          <StyledTypography fontSize={isMobileOrSmaller ? '0.75rem' : '0.8rem'}>
            {name}
          </StyledTypography>
        </Stack>
      </StyledFab>
    </Stack>
  );
};

export default CotatoFloatingActionButton;

//
//
//

const StyledFab = styled(Fab)<{ isMobileOrSmaller: boolean }>`
  position: fixed !important;
  z-index: 1000;
  bottom: 2rem;
  right: 2rem;
  width: ${({ isMobileOrSmaller }) =>
    isMobileOrSmaller ? FAB_MOBILE_SIZE : FAB_WEB_SIZE} !important;
  height: ${({ isMobileOrSmaller }) =>
    isMobileOrSmaller ? FAB_MOBILE_SIZE : FAB_WEB_SIZE} !important;
  background-color: ${({ theme }) => theme.colors.primary100_2} !important;
  box-shadow: 0px 2.5px 20px 0px #b5a465 !important;
`;

const StyledTypography = styled(Typography)`
  color: #fff;
  font-weight: 500;
`;

const StyledList = styled(List)<{ isMobileOrSmaller: boolean }>`
  position: fixed !important;
  border-radius: 6.25rem 6.25rem 0rem 0rem;
  bottom: ${({ isMobileOrSmaller }) => (isMobileOrSmaller ? '3.75rem' : '4.25rem')} !important;
  right: 2rem;
  display: flex;
  width: ${({ isMobileOrSmaller }) =>
    isMobileOrSmaller ? FAB_MOBILE_SIZE : FAB_WEB_SIZE} !important;
  gap: 0.75rem;
  z-index: 1000;
  padding-bottom: ${({ isMobileOrSmaller }) =>
    isMobileOrSmaller ? '1.25rem' : '2.75rem'} !important;
  padding-top: 0.25rem !important;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
`;

const StyledAnimatedList = animated(StyledList);
