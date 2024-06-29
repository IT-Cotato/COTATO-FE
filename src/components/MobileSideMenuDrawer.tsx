import React, { useLayoutEffect } from 'react';
import { NAV_LIST_TYPE } from './Header';
import styled from 'styled-components';
import Divider from '@mui/material/Divider';
import { Link, List, ListItem, ListItemButton, Tooltip } from '@mui/material';
import { ReactComponent as MenuHome } from '@/assets/menu_home.svg';
import { ReactComponent as MenuAbout } from '@/assets/menu_about_us.svg';
import { ReactComponent as MenuProject } from '@/assets/menu_project.svg';
import { ReactComponent as MenuSession } from '@/assets/menu_session.svg';
import { ReactComponent as MenuCSQuiz } from '@/assets/menu_cs_quiz.svg';
import { ReactComponent as MenuFAQ } from '@/assets/menu_faq.svg';
import { ReactComponent as ThemeDark } from '@/assets/theme_dark_icon.svg';
import { ReactComponent as ThemeLight } from '@/assets/theme_light_icon.svg';
import CotatoToggleSwitch from './CotatoToggleSwitch';
import LoginIconSvgComponent from './LoginIconSvgComponent';
import { ThemeContext } from '@theme/context/CotatoThemeProvider';
import { COTATO_LIGHT_THEME, THEME_CHANGE_TRANSITION } from '@theme/constants/constants';
import fetchUserData from '@utils/fetchUserData';
import { getMemberRoleIcon } from '@utils/getMemberRoleIcon';

//
//
//

interface MobileSideMenuDrawerProps {
  navList: NAV_LIST_TYPE;
  open: boolean;
  onClose: () => void;
}

//
//
//

const MENU_ICON_MAP = {
  Home: MenuHome,
  'About us': MenuAbout,
  Project: MenuProject,
  Session: MenuSession,
  'CS Quiz': MenuCSQuiz,
  FAQ: MenuFAQ,
};

//
//
//

const MobileSideMenuDrawer: React.FC<MobileSideMenuDrawerProps> = ({ navList, open, onClose }) => {
  const { data: user } = fetchUserData();
  const [isAnimating, setIsAnimating] = React.useState<boolean>(false);
  const drawerRef = React.useRef<HTMLDivElement>(null);
  const { DefaultTheme, onChangeTheme } = React.useContext(ThemeContext);

  /**
   *
   */
  const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (drawerRef.current && drawerRef.current.contains(e.target as Node)) {
      return;
    }
    setIsAnimating(true);

    setTimeout(() => {
      onClose();
    }, 400);
  };

  /**
   *
   */
  const renderTitle = () => {
    return <StyledTitle>MENU</StyledTitle>;
  };

  /**
   * render member component if user is logged in
   */
  const renderMember = () => {
    if (!user) {
      return null;
    }

    return (
      <Link component={Link} href="/mypage" underline="none">
        <ListItem
          sx={{
            gap: '0.5rem',
          }}
        >
          <MemberRoleIcon src={getMemberRoleIcon(user.role)} />
          <StyledLinkTypography>{user.memberName}</StyledLinkTypography>
        </ListItem>
      </Link>
    );
  };

  /**
   * render login component if user is not logged in
   */
  const renderLogin = () => {
    return (
      <Link component={Link} href="/signin" underline="none">
        <ListItem
          sx={{
            gap: '0.5rem',
          }}
        >
          <LoginIconSvgComponent />
          <StyledLinkTypography>로그인</StyledLinkTypography>
        </ListItem>
      </Link>
    );
  };

  /**
   *
   */
  const renderMenuList = () => {
    return (
      <>
        <List>
          {navList.map((navItem) => (
            <StyledListItemButton key={navItem.name}>
              <Link component={Link} href={navItem.path} underline="none">
                <ListItem
                  sx={{
                    gap: '0.5rem',
                  }}
                >
                  {React.createElement(MENU_ICON_MAP[navItem.name])}
                  <StyledLinkTypography>{navItem.name}</StyledLinkTypography>
                </ListItem>
              </Link>
            </StyledListItemButton>
          ))}
        </List>
        <StyledDivider
          sx={{
            margin: 'auto',
          }}
        />
        <StyledListItemButton>{user ? renderMember() : renderLogin()}</StyledListItemButton>
        <StyledSwitchDiv>
          <Tooltip arrow title="실험적 기능으로 아직 완벽하지 않을 수 있습니다." placement="top">
            {DefaultTheme === COTATO_LIGHT_THEME ? (
              <ThemeLight width={24} />
            ) : (
              <ThemeDark width={24} />
            )}
          </Tooltip>

          <CotatoToggleSwitch
            checked={DefaultTheme === COTATO_LIGHT_THEME}
            onChange={onChangeTheme}
          />
        </StyledSwitchDiv>
      </>
    );
  };

  /**
   *
   */
  useLayoutEffect(() => {
    if (open) {
      setIsAnimating(false);
    }
  }, [open]);

  //
  //
  //

  if (!open) {
    return null;
  }

  return (
    <StyledDiv onClick={handleOutsideClick}>
      <StyledMobileSideMenuDrawer ref={drawerRef} isAnimating={isAnimating}>
        {renderTitle()}
        <StyledDivider
          sx={{
            margin: 'auto',
          }}
        />
        {renderMenuList()}
      </StyledMobileSideMenuDrawer>
    </StyledDiv>
  );
};

export default MobileSideMenuDrawer;

//
//
//

const StyledDiv = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  background-color: rgba(0, 0, 0, 0.1);
`;

const StyledMobileSideMenuDrawer = styled.div<{ isAnimating: boolean }>`
  display: flex;
  width: 12.5rem;
  padding: 0.75rem;
  position: fixed;
  top: 3.5rem;
  right: 0;
  flex-direction: column;
  align-items: flex-start;
  background: ${({ theme }) => theme.colors.common.white};
  border-radius: 1rem 0rem 0rem 1rem;
  box-shadow: 4px 6px 10px 0px rgba(0, 0, 0, 0.25);
  transition: ${THEME_CHANGE_TRANSITION};
  animation: ${({ isAnimating }) =>
    isAnimating
      ? 'anim__drawer__slide__out 0.5s forwards'
      : 'anim__drawer__slide__in 0.4s forwards'};
  @keyframes anim__drawer__slide__in {
    from {
      right: -12.5rem;
    }
    to {
      right: 0;
    }
  }

  @keyframes anim__drawer__slide__out {
    from {
      right: 0;
    }
    to {
      right: -12.5rem;
    }
  }
`;

const StyledTitle = styled.div`
  display: flex;
  height: 3.5rem;
  padding: 0.5rem 0.5rem 0.5rem 1rem;
  font-size: 1.125rem;
  color: ${({ theme }) => theme.colors.gray60};
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 0.625rem;
`;

const StyledListItemButton = styled(ListItemButton)`
  width: 100%;
  height: 3.5rem;
  padding: 1rem 1.5rem 1rem 1rem;
`;

const StyledLinkTypography = styled.p`
  color: ${({ theme }) => theme.colors.gray60};
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 400;
`;

const StyledDivider = styled(Divider)`
  width: 90%;
  padding: 0.625rem 1rem;
`;

const StyledSwitchDiv = styled.div`
  display: flex;
  justify-content: flex-start;
  padding: 0 0 0 2rem;
  gap: 0.5rem;
  align-items: center;
  width: 100%;

  > label {
    margin-bottom: 0.5rem;
  }
`;

const MemberRoleIcon = styled.img`
  width: 1.5rem;
  height: 1.5rem;
`;
