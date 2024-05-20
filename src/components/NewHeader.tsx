import React, { useCallback } from 'react';
import styled from 'styled-components';
import { ReactComponent as Logo } from '@/assets/header_logo.svg';
import { ReactComponent as Login } from '@/assets/header_login.svg';
import { ReactComponent as MemberIcon } from '@/assets/header_member_icon.svg';
import { NavLink } from 'react-router-dom';
import fetchUserData from '@utils/fetchUserData';
import { MemberData } from '@/typing/db';

//
//
//

const HeaderWrapper = styled.header`
  display: flex;
  width: 100%;
  padding: 1rem 2.4rem;
  justify-content: space-around;
  align-items: center;
  background: ${({ theme }) => theme.black_white_white};
`;

const LogoLink = styled(NavLink)`
  display: flex;
  align-items: center;
  margin: 0 4.4rem;
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
  color: ${({ theme }) => theme.colors.gray80};
  font-size: ${({ theme }) => theme.fontSize.md};
  padding: ${({ theme }) => theme.size.lg};
  cursor: pointer;

  &.active {
    box-shadow: 0px -4px 0px 0px #315efb inset;
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

//
//
//

const navList = [
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
  const user: MemberData = fetchUserData().data;

  const renderLogo = useCallback(
    () => (
      <LogoLink to={'/'}>
        <Logo />
      </LogoLink>
    ),
    [],
  );

  const renderNav = useCallback(
    () => (
      <NavContainer>
        {navList.map((tab, i) => (
          <NavItem key={i} to={tab.path} className={({ isActive }) => (isActive ? 'active' : '')}>
            {tab.name}
          </NavItem>
        ))}
        {user ? renderMember() : renderLogin()}
      </NavContainer>
    ),
    [user],
  );

  const renderMember = useCallback(() => {
    if (!user) {
      return <></>;
    }

    return (
      <NavItem key={navList.length} to={'/mypage'}>
        <MemberNav>
          <MemberIcon />
          {user.memberName}
        </MemberNav>
      </NavItem>
    );
  }, [user]);

  const renderLogin = useCallback(() => {
    if (user) {
      return <></>;
    }

    return (
      <LoginLink to={'/signin'}>
        <Login />
      </LoginLink>
    );
  }, [user]);

  return (
    <HeaderWrapper>
      {renderLogo()}
      {renderNav()}
    </HeaderWrapper>
  );
};

export default Header;
