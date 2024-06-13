import React from 'react';
import styled from 'styled-components';
import { NavListType } from './Header';

//
//
//

interface MobileHeaderProps {
  navList: NavListType;
}

//
//
//

const MobileHeader = ({ navList }: MobileHeaderProps) => {
  /**
   *
   */
  const renderButton = () => {
    return <StyledMenuButton>MENU</StyledMenuButton>;
  };

  return <>{renderButton()}</>;
};

//
//
//

const Wrapper = styled.div`
  position: fixed;
  top: 70px;
  right: 0;
`;

const StyledMenuButton = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  position: fixed;
  top: 70px;
  right: 0;
  width: 6.5rem;
  height: 4rem;
  padding: 0.75rem;
  border-radius: 1rem 0rem 0rem 1rem;
  background: var(--black-white-white, #fafafa);
  box-shadow: 4px 6px 10px 0px rgba(0, 0, 0, 0.25);
  font-family: 'Ycomputer';
  font-size: 1.125rem;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.gray60};
  cursor: pointer;

  &:hover {
    width: 7.5rem;

    transition: all 0.3s ease-in-out;
  }
`;

export default MobileHeader;
