import React from 'react';
import styled from 'styled-components';
import { ReactComponent as Logo } from '@/assets/header_logo.svg';
import { ReactComponent as Login } from '@/assets/login.svg';
import { NavLink, useLocation } from 'react-router-dom';
import fetchUserData from '@utils/fetchUserData';
import { v4 as uuid } from 'uuid';
import { getMemberRoleIcon } from '@utils/getMemberRoleIcon';
import { device, media } from '@theme/media';
import { CotatoThemeType } from '@theme/theme';
import useMediaQuery from '@mui/material/useMediaQuery';
import MobileSideMenuDrawerButton from './MobileSideMenuDrawerButton';
import { Box, CircularProgress, Typography } from '@mui/material';
import { ThemeContext } from '@theme/context/CotatoThemeProvider';
import { COTATO_LIGHT_THEME, THEME_CHANGE_TRANSITION } from '@theme/constants/constants';
import CotatoThemeToggleSwitch from './CotatoToggleSwitch';
import CotatoIcon from './CotatoIcon';
import { useIsInCSThirdSection } from '@/zustand-stores/useInCSThirdSection';

//
//
//

interface HeaderWrapperProps {
  $isInCSThirdSecion?: boolean;
}

type NavItemName = 'Home' | 'About us' | 'Project' | 'Session' | 'FAQ' | 'CS Quiz';

type NavItem = {
  name: NavItemName;
  path: string;
};

const NAV_LIST: NAV_LIST_TYPE = Object.freeze([
  { name: 'Home', path: '/' },
  { name: 'About us', path: '/about' },
  { name: 'Project', path: '/projects' },
  { name: 'Session', path: '/session' },
  { name: 'FAQ', path: '/faq' },
  { name: 'CS Quiz', path: '/cs/introduce' },
]);

export type NAV_LIST_TYPE = ReadonlyArray<Readonly<NavItem>>;

//
//
//

const Header = () => {
  const { data: user, isLoading: isUserLoading } = fetchUserData();
  const location = useLocation();
  const isTabletOrSmaller = useMediaQuery(`(max-width:${device.tablet})`);
  const { DefaultTheme, onChangeTheme } = React.useContext(ThemeContext);

  //
  const { isInCSThridSecion } = useIsInCSThirdSection();

  /**
   *
   */
  const renderLogo = () => (
    <LogoLink to={'/'}>
      <Logo />
    </LogoLink>
  );

  /**
   *
   */
  const renderNav = () => (
    <NavContainer>
      {NAV_LIST.map((navItem) => (
        <NavItem key={uuid()} to={navItem.path}>
          <Typography variant="body2" fontFamily="YComputer">
            {navItem.name}
          </Typography>
        </NavItem>
      ))}
      {renderProfile()}
      <StyledSwitchDiv>
        {DefaultTheme === COTATO_LIGHT_THEME ? (
          <CotatoIcon icon="sun-solid" color={(theme) => theme.colors.primary100} size="1.5rem" />
        ) : (
          <CotatoIcon icon="star-crescent-solid" size="1.5rem" />
        )}

        <CotatoThemeToggleSwitch
          checked={DefaultTheme === COTATO_LIGHT_THEME}
          onChange={onChangeTheme}
        />
      </StyledSwitchDiv>
    </NavContainer>
  );

  /**
   *
   */
  const renderProfile = () => {
    if (isUserLoading) {
      return (
        <Box minWidth="5.5rem" height="1rem">
          <CircularProgress size="1rem" />
        </Box>
      );
    }

    if (!user) {
      return (
        <LoginLink to={'/signin'}>
          <Login width={90} style={{ marginTop: '0.2rem' }} />
        </LoginLink>
      );
    }

    return (
      <NavItem key={uuid()} to={'/mypage'}>
        <MemberNav>
          <MemberRoleIcon src={getMemberRoleIcon(user?.role)} />
          <Typography variant="body2" fontFamily="YComputer">
            {user?.name}
          </Typography>
        </MemberNav>
      </NavItem>
    );
  };

  const renderHeader = () => {
    if (isTabletOrSmaller) {
      return null;
    }

    return (
      <HeaderWrapper $isInCSThirdSecion={isInCSThridSecion}>
        {renderLogo()}
        {renderNav()}
      </HeaderWrapper>
    );
  };

  /**
   *
   */
  const renderMobileHeader = () => {
    if (!isTabletOrSmaller) {
      return null;
    }
    return <MobileSideMenuDrawerButton navList={NAV_LIST} />;
  };

  //
  //
  //
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  //
  //
  //

  return (
    <>
      {renderHeader()}
      {renderMobileHeader()}
    </>
  );
};

export default Header;

//
//
//

const HeaderWrapper = styled.header<HeaderWrapperProps>`
  display: flex;
  width: 100%;
  padding: 0.5rem 6rem;
  align-items: center;
  justify-content: space-between;
  background: ${({ theme, $isInCSThirdSecion }) =>
    $isInCSThirdSecion ? 'transparent' : theme.colors.common.white};
  position: fixed;
  top: 0;
  z-index: 100;
  transition: ${THEME_CHANGE_TRANSITION};
  ${media.desktop`
    padding: 0.5rem 4rem;
`}
  ${media.laptop`
    padding: 0.5rem 2rem;
  `}
`;

const LogoLink = styled(NavLink)`
  display: flex;
  align-items: center;
`;

const NavContainer = styled.div`
  display: flex;
  align-self: stretch;
  width: 100%;
  height: 3.5rem;
  padding: 0 6rem;
  justify-content: space-evenly;
  margin: auto;
  align-items: center;
  gap: 2rem;
`;

const NavItem = styled(NavLink)`
  min-width: fit-content;
  text-decoration: none;
  text-align: center;
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
  ${media.desktop`
    padding: 0.5rem;
    font-size: ${({ theme }: { theme: CotatoThemeType }) => theme.fontSize.sm};
`}
  ${media.laptop`
    padding: 0rem;
    font-size: ${({ theme }: { theme: CotatoThemeType }) => theme.fontSize.sm};
  `}
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

const StyledSwitchDiv = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 0.5rem;
  align-items: center;
  width: fit-content;

  > label {
    margin-bottom: 0.5rem;
  }
`;
