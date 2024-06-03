import React from 'react';
import styled from 'styled-components';
import { ReactComponent as Logo } from '@/assets/header_logo.svg';
import { ReactComponent as Login } from '@/assets/login.svg';
import { NavLink } from 'react-router-dom';
import fetchUserData from '@utils/fetchUserData';
import { v4 as uuid } from 'uuid';
import { getMemberRoleIcon } from '@utils/getMemberRoleIcon';

//
//
//

const NAV_LIST = [
  { name: 'Home', path: '/' },
  { name: 'About us', path: '/about' },
  { name: 'Project', path: '/projects' },
  { name: 'Session', path: '/session' },
  { name: 'FAQ', path: '/faq' },
  { name: 'CS Quiz', path: '/cs' },
];

//
//
//

const Header = () => {
  const { data: user } = fetchUserData();

  const renderLogo = () => (
    <LogoLink to={'/'}>
      <Logo />
    </LogoLink>
  );

  const renderNav = () => (
    <NavContainer>
      {NAV_LIST.map((navItem) => (
        <NavItem key={uuid()} to={navItem.path}>
          {navItem.name}
        </NavItem>
      ))}
      {user ? renderMember() : renderLogin()}
    </NavContainer>
  );

  const renderMember = () => {
    if (!user) {
      return null;
    }

    return (
      <NavItem key={uuid()} to={'/mypage'}>
        <MemberNav>
          <MemberRoleIcon src={getMemberRoleIcon(user.role)} />
          {user.memberName}
        </MemberNav>
      </NavItem>
    );
  };

  const renderLogin = () => {
    if (user) {
      return null;
    }

    return (
      <LoginLink to={'/signin'}>
        <Login width={90} style={{ marginTop: '0.2rem' }} />
      </LoginLink>
    );
  };

  return (
    <HeaderWrapper>
      {renderLogo()}
      {renderNav()}
    </HeaderWrapper>
  );
};

export default Header;

//
//
//

//
//
//

const HeaderWrapper = styled.header`
  display: flex;
  width: 100%;
  padding: 0.5rem 2rem;
  justify-content: space-around;
  align-items: center;
  background: ${({ theme }) => theme.colors.common.white};
  position: absolute;
  top: 0;
  z-index: 100;
`;

const LogoLink = styled(NavLink)`
  display: flex;
  align-items: center;
  margin: 0rem;
`;

const NavContainer = styled.div`
  display: flex;
  height: 3.5rem;
  align-items: center;
  gap: 2.25rem;
  margin: 0 2rem;
`;

const NavItem = styled(NavLink)`
  text-decoration: none;
  font-family: Ycomputer;
  color: ${({ theme }) => theme.colors.gray80_2};
  font-size: ${({ theme }) => theme.fontSize.md};
  padding: ${({ theme }) => theme.size.lg};
  transition: 0.2s;
  cursor: pointer;
  &:hover,
  &.active {
    color: ${({ theme }) => theme.colors.common.black};
    box-shadow: ${({ theme }) => theme.colors.sub2[60]} inset 0px -3px 0px 0px;
  }
`;

const LoginLink = styled(NavLink)`
  padding: 0 ${({ theme }) => theme.size.xs};
`;

const MemberNav = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.size.sm};
`;

const MemberRoleIcon = styled.img`
  width: 1.5rem;
  height: 1.5rem;
`;
