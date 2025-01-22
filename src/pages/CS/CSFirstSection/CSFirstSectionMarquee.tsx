import React from 'react';
import Marquee from 'react-fast-marquee';
import { styled, useTheme } from 'styled-components';
import { ReactComponent as BrowserIcon } from '@assets/cs_subject_browser.svg';
import { ReactComponent as MonitorIcon } from '@assets/cs_subject_monitor.svg';
import { ReactComponent as CodeIcon } from '@assets/cs_subject_code.svg';
import { ReactComponent as KeyboadIcon } from '@assets/cs_subject_keyboard.svg';
import { ReactComponent as CloudIcon } from '@assets/cs_subject_cloud.svg';
import { ReactComponent as NetworkIcon } from '@assets/cs_subject_network.svg';
import { ReactComponent as MonitorWifiIcon } from '@assets/cs_subject_monitor_wifi.svg';
import { ReactComponent as DesktopIcon } from '@assets/cs_subject_desktop.svg';
import { ReactComponent as DownloadIcon } from '@assets/cs_subject_download.svg';
import { ReactComponent as BoardIcon } from '@assets/cs_subject_board.svg';
import { ReactComponent as WebCodeIcon } from '@assets/cs_subject_web_code.svg';
import { ReactComponent as WebSiteIcon } from '@assets/cs_subject_web_site.svg';
import { ReactComponent as ModuleIcon } from '@assets/cs_subject_module.svg';

//
//
//

interface MarqueeItemProps {
  $color: string;
  $padding: string;
}

//
//
//

const CSFirstSectionMarquee = () => {
  const theme = useTheme();

  const MARQUEE_ITEM_LIST = [
    {
      icon: <BrowserIcon />,
      color: theme.colors.primary100,
    },
    {
      icon: <MonitorIcon />,
      title: 'CSR과 SSR',
      color: `linear-gradient(90deg, ${theme.colors.primary100} 0%, ${theme.colors.secondary60} 100%)`,
    },
    {
      icon: <CodeIcon />,
      color: theme.colors.secondary60,
    },
    { icon: <KeyboadIcon />, title: '객체지향 프로그래밍', color: theme.colors.secondary60 },
    {
      icon: <CloudIcon />,
      title: 'REST API',
      color: `linear-gradient(90deg, ${theme.colors.secondary60} 0%, ${theme.colors.sub3[20]} 100%)`,
    },
    {
      icon: <NetworkIcon />,
      color: theme.colors.sub3[20],
    },
    {
      icon: <MonitorWifiIcon />,
      title: '브라우저 렌더링',
      color: theme.colors.sub3[20],
    },
    { icon: <DesktopIcon />, color: theme.colors.sub2[60] },
    {
      icon: <DownloadIcon />,
      title: '블로킹과 논블로킹',
      color: theme.colors.sub2[60],
    },
    {
      icon: <BoardIcon />,
      title: 'CPU 스케줄링',
      color: `linear-gradient(90deg, ${theme.colors.sub2[60]} 0%, ${theme.colors.primary80} 100%)`,
    },
    {
      icon: <WebCodeIcon />,
      color: theme.colors.primary80,
    },
    {
      icon: <WebSiteIcon />,
      title: '대칭키와 비대칭키 암호화',
      color: theme.colors.primary80,
    },
    {
      icon: <ModuleIcon />,
      title: 'CORS',
      color: `linear-gradient(90deg, ${theme.colors.primary80} 0%, ${theme.colors.primary100} 100%)`,
    },
  ];

  return (
    <StyledMarquee>
      {MARQUEE_ITEM_LIST.map(({ icon, title, color }, index) => (
        <MarqueeItem key={index} $color={color} $padding={title ? '1rem' : '0.5rem'}>
          {icon}
          {title}
        </MarqueeItem>
      ))}
    </StyledMarquee>
  );
};

export default CSFirstSectionMarquee;

//
//
//

const StyledMarquee = styled(Marquee)`
  padding: 1rem 0;
  overflow: hidden;
`;

const MarqueeItem = styled.div<MarqueeItemProps>`
  position: relative;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.25rem;
  margin: 0.75rem;
  padding: ${({ $padding }) => $padding};
  height: 3rem;
  background: ${({ theme }) => theme.colors.common.white};
  font-family: Pretendard;
  font-size: 1rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.common.black};

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${({ $color }) => $color};
    border-radius: 1rem;
    z-index: 0;
    padding: 2px;
    -webkit-mask:
      linear-gradient(#fff 0 0) content-box,
      linear-gradient(#fff 0 0);
    mask:
      linear-gradient(#fff 0 0) content-box,
      linear-gradient(#fff 0 0);
    -webkit-mask-composite: destination-out;
    mask-composite: exclude;
  }
`;
