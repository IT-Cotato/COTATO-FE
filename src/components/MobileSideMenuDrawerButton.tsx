import React from 'react';
import styled from 'styled-components';
import { ReactComponent as MenuIcon } from '@/assets/menu.svg';
import { NAV_LIST_TYPE } from './Header';
import MobileSideMenuDrawer from './MobileSideMenuDrawer';

//
//
//

interface MobileSideMenuDrawerProps {
  navList: NAV_LIST_TYPE;
}

//
//
//

const MobileSideMenuDrawerButton = ({ navList }: MobileSideMenuDrawerProps) => {
  const [open, setOpen] = React.useState<boolean>(false);

  /**
   *
   */
  const handleMenuDrawerButtonClick = () => {
    setOpen(true);
  };

  /**
   *
   */
  const renderButton = () => {
    return (
      <StyledMobileSideMenuDrawerButton
        $slidein={Boolean(open)}
        onClick={handleMenuDrawerButtonClick}
      >
        <MenuIcon />
      </StyledMobileSideMenuDrawerButton>
    );
  };

  /**
   *
   */
  const renderMenuDrawer = () => {
    return <MobileSideMenuDrawer open={open} navList={navList} onClose={() => setOpen(false)} />;
  };

  return (
    <>
      {renderButton()}
      {renderMenuDrawer()}
    </>
  );
};

export default MobileSideMenuDrawerButton;

//
//
//

const StyledMobileSideMenuDrawerButton = styled.div<{ $slidein: boolean }>`
  position: sticky;
  top: 3.5rem;
  left: 100%;
  display: flex;
  width: 3rem;
  height: 4rem;
  padding: 0.75rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 1rem 0rem 0rem 1rem;
  background-color: ${({ theme }) => theme.colors.primary60};
  z-index: 1000;
  cursor: pointer;
  animation: ${({ $slidein }) =>
    $slidein ? 'anim__slide__in 0.5s forwards' : 'anim__slide__out 0.5s forwards'};

  @keyframes anim__slide__in {
    from {
      right: 0rem;
    }
    to {
      right: -3rem;
    }
  }

  @keyframes anim__slide__out {
    from {
      right: -3rem;
    }
    to {
      right: 0;
    }
  }
`;
