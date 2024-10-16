import React from 'react';
import { THEME_CHANGE_TRANSITION } from '@theme/constants/constants';
import { useTheme } from 'styled-components';
import { useWindowSize } from 'react-use';
import { useLocation } from 'react-router-dom';

//
//
//

const GlobalBackgroundSvgComponent = () => {
  const theme = useTheme();
  const location = useLocation();
  const { width, height } = useWindowSize();
  const [viewPort, setViewPort] = React.useState({ width: 0, height: 0 });
  const viewPortHeight = document.body.clientHeight;

  const dotColor = theme.colors.primary30;
  const pinkStarColor = theme.colors.sub1[20];
  const blueStarColor = theme.colors.sub2[20];
  const greenStarColor = theme.colors.sub3[20];
  const yellowStarColor = theme.colors.primary60;
  const orangeStarColor = theme.colors.secondary40;

  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;

  //
  //
  //
  React.useLayoutEffect(() => {
    if (width < windowWidth || height < windowHeight) {
      setViewPort({
        width: windowWidth,
        height: windowHeight,
      });
      return;
    }

    setViewPort({
      width,
      height: viewPortHeight,
    });
  }, [width, height, viewPortHeight, location.pathname]);

  //
  //
  //

  return (
    <svg
      width={viewPort.width}
      height={viewPort.height}
      viewBox={`0 0 ${viewPort.width < windowWidth ? windowWidth : viewPort.width} ${
        viewPort.height < windowHeight ? windowHeight : viewPort.height
      }`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        position: 'fixed',
        width: '100vw !important',
        height: '100vh !important',
        minWidth: '100vw',
        minHeight: '100vh',
        zIndex: -1,
        background: theme.colors.common.white,
        transition: THEME_CHANGE_TRANSITION,
      }}
    >
      <circle cx="27" cy="4" r="4" fill={dotColor} />
      <circle cx="27" cy="69" r="4" fill={dotColor} />
      <circle cx="27" cy="134" r="4" fill={dotColor} />
      <circle cx="27" cy="199" r="4" fill={dotColor} />
      <circle cx="27" cy="264" r="4" fill={dotColor} />
      <circle cx="27" cy="329" r="4" fill={dotColor} />
      <circle cx="27" cy="394" r="4" fill={dotColor} />
      <circle cx="27" cy="459" r="4" fill={dotColor} />
      <circle cx="27" cy="524" r="4" fill={dotColor} />
      <circle cx="27" cy="589" r="4" fill={dotColor} />
      <circle cx="27" cy="654" r="4" fill={dotColor} />
      <circle cx="27" cy="719" r="4" fill={dotColor} />
      <circle cx="27" cy="784" r="4" fill={dotColor} />
      <circle cx="27" cy="849" r="4" fill={dotColor} />
      <circle cx="27" cy="914" r="4" fill={dotColor} />
      <circle cx="27" cy="979" r="4" fill={dotColor} />
      <circle cx="27" cy="1044" r="4" fill={dotColor} />
      <circle cx="27" cy="1109" r="4" fill={dotColor} />
      <circle cx="27" cy="1174" r="4" fill={dotColor} />
      <circle cx="27" cy="1239" r="4" fill={dotColor} />
      <circle cx="27" cy="1304" r="4" fill={dotColor} />
      <circle cx="27" cy="1369" r="4" fill={dotColor} />
      <circle cx="27" cy="1434" r="4" fill={dotColor} />
      <circle cx="27" cy="1499" r="4" fill={dotColor} />
      <circle cx="27" cy="1564" r="4" fill={dotColor} />
      <circle cx="27" cy="1629" r="4" fill={dotColor} />
      <circle cx="27" cy="1694" r="4" fill={dotColor} />
      <circle cx="27" cy="1759" r="4" fill={dotColor} />
      <circle cx="27" cy="1824" r="4" fill={dotColor} />
      <circle cx="27" cy="1889" r="4" fill={dotColor} />
      <circle cx="27" cy="1954" r="4" fill={dotColor} />
      <circle cx="27" cy="2019" r="4" fill={dotColor} />
      <circle cx="27" cy="2084" r="4" fill={dotColor} />
      <circle cx="27" cy="2149" r="4" fill={dotColor} />
      <circle cx="27" cy="2214" r="4" fill={dotColor} />
      <circle cx="27" cy="2279" r="4" fill={dotColor} />
      <circle cx="27" cy="2344" r="4" fill={dotColor} />
      <circle cx="27" cy="2409" r="4" fill={dotColor} />
      <circle cx="27" cy="2474" r="4" fill={dotColor} />
      <circle cx="27" cy="2539" r="4" fill={dotColor} />
      <circle cx="27" cy="2604" r="4" fill={dotColor} />
      <circle cx="27" cy="2669" r="4" fill={dotColor} />
      <circle cx="27" cy="2734" r="4" fill={dotColor} />
      <circle cx="27" cy="2799" r="4" fill={dotColor} />
      <circle cx="27" cy="2864" r="4" fill={dotColor} />
      <circle cx="27" cy="2929" r="4" fill={dotColor} />
      <circle cx="27" cy="2994" r="4" fill={dotColor} />
      <circle cx="27" cy="3059" r="4" fill={dotColor} />
      <circle cx="27" cy="3124" r="4" fill={dotColor} />
      <circle cx="27" cy="3189" r="4" fill={dotColor} />
      <circle cx="27" cy="3254" r="4" fill={dotColor} />
      <circle cx="85" cy="4" r="4" fill={dotColor} />
      <circle cx="85" cy="69" r="4" fill={dotColor} />
      <circle cx="85" cy="134" r="4" fill={dotColor} />
      <circle cx="85" cy="199" r="4" fill={dotColor} />
      <circle cx="85" cy="264" r="4" fill={dotColor} />
      <circle cx="85" cy="329" r="4" fill={dotColor} />
      <circle cx="85" cy="394" r="4" fill={dotColor} />
      <circle cx="85" cy="459" r="4" fill={dotColor} />
      <circle cx="85" cy="524" r="4" fill={dotColor} />
      <circle cx="85" cy="589" r="4" fill={dotColor} />
      <circle cx="85" cy="654" r="4" fill={dotColor} />
      <circle cx="85" cy="719" r="4" fill={dotColor} />
      <circle cx="85" cy="784" r="4" fill={dotColor} />
      <circle cx="85" cy="849" r="4" fill={dotColor} />
      <circle cx="85" cy="914" r="4" fill={dotColor} />
      <circle cx="85" cy="979" r="4" fill={dotColor} />
      <circle cx="85" cy="1044" r="4" fill={dotColor} />
      <circle cx="85" cy="1109" r="4" fill={dotColor} />
      <circle cx="85" cy="1174" r="4" fill={dotColor} />
      <circle cx="85" cy="1239" r="4" fill={dotColor} />
      <circle cx="85" cy="1304" r="4" fill={dotColor} />
      <circle cx="85" cy="1369" r="4" fill={dotColor} />
      <circle cx="85" cy="1434" r="4" fill={dotColor} />
      <circle cx="85" cy="1499" r="4" fill={dotColor} />
      <circle cx="85" cy="1564" r="4" fill={dotColor} />
      <circle cx="85" cy="1629" r="4" fill={dotColor} />
      <circle cx="85" cy="1694" r="4" fill={dotColor} />
      <circle cx="85" cy="1759" r="4" fill={dotColor} />
      <circle cx="85" cy="1824" r="4" fill={dotColor} />
      <circle cx="85" cy="1889" r="4" fill={dotColor} />
      <circle cx="85" cy="1954" r="4" fill={dotColor} />
      <circle cx="85" cy="2019" r="4" fill={dotColor} />
      <circle cx="85" cy="2084" r="4" fill={dotColor} />
      <circle cx="85" cy="2149" r="4" fill={dotColor} />
      <circle cx="85" cy="2214" r="4" fill={dotColor} />
      <circle cx="85" cy="2279" r="4" fill={dotColor} />
      <circle cx="85" cy="2344" r="4" fill={dotColor} />
      <circle cx="85" cy="2409" r="4" fill={dotColor} />
      <circle cx="85" cy="2474" r="4" fill={dotColor} />
      <circle cx="85" cy="2539" r="4" fill={dotColor} />
      <circle cx="85" cy="2604" r="4" fill={dotColor} />
      <circle cx="85" cy="2669" r="4" fill={dotColor} />
      <circle cx="85" cy="2734" r="4" fill={dotColor} />
      <circle cx="85" cy="2799" r="4" fill={dotColor} />
      <circle cx="85" cy="2864" r="4" fill={dotColor} />
      <circle cx="85" cy="2929" r="4" fill={dotColor} />
      <circle cx="85" cy="2994" r="4" fill={dotColor} />
      <circle cx="85" cy="3059" r="4" fill={dotColor} />
      <circle cx="85" cy="3124" r="4" fill={dotColor} />
      <circle cx="85" cy="3189" r="4" fill={dotColor} />
      <circle cx="85" cy="3254" r="4" fill={dotColor} />
      <circle cx="143" cy="4" r="4" fill={dotColor} />
      <circle cx="143" cy="69" r="4" fill={dotColor} />
      <circle cx="143" cy="134" r="4" fill={dotColor} />
      <circle cx="143" cy="199" r="4" fill={dotColor} />
      <circle cx="143" cy="264" r="4" fill={dotColor} />
      <circle cx="143" cy="329" r="4" fill={dotColor} />
      <circle cx="143" cy="394" r="4" fill={dotColor} />
      <circle cx="143" cy="459" r="4" fill={dotColor} />
      <circle cx="143" cy="524" r="4" fill={dotColor} />
      <circle cx="143" cy="589" r="4" fill={dotColor} />
      <circle cx="143" cy="654" r="4" fill={dotColor} />
      <circle cx="143" cy="719" r="4" fill={dotColor} />
      <circle cx="143" cy="784" r="4" fill={dotColor} />
      <circle cx="143" cy="849" r="4" fill={dotColor} />
      <circle cx="143" cy="914" r="4" fill={dotColor} />
      <circle cx="143" cy="979" r="4" fill={dotColor} />
      <circle cx="143" cy="1044" r="4" fill={dotColor} />
      <circle cx="143" cy="1109" r="4" fill={dotColor} />
      <circle cx="143" cy="1174" r="4" fill={dotColor} />
      <circle cx="143" cy="1239" r="4" fill={dotColor} />
      <circle cx="143" cy="1304" r="4" fill={dotColor} />
      <circle cx="143" cy="1369" r="4" fill={dotColor} />
      <circle cx="143" cy="1434" r="4" fill={dotColor} />
      <circle cx="143" cy="1499" r="4" fill={dotColor} />
      <circle cx="143" cy="1564" r="4" fill={dotColor} />
      <circle cx="143" cy="1629" r="4" fill={dotColor} />
      <circle cx="143" cy="1694" r="4" fill={dotColor} />
      <circle cx="143" cy="1759" r="4" fill={dotColor} />
      <circle cx="143" cy="1824" r="4" fill={dotColor} />
      <circle cx="143" cy="1889" r="4" fill={dotColor} />
      <circle cx="143" cy="1954" r="4" fill={dotColor} />
      <circle cx="143" cy="2019" r="4" fill={dotColor} />
      <circle cx="143" cy="2084" r="4" fill={dotColor} />
      <circle cx="143" cy="2149" r="4" fill={dotColor} />
      <circle cx="143" cy="2214" r="4" fill={dotColor} />
      <circle cx="143" cy="2279" r="4" fill={dotColor} />
      <circle cx="143" cy="2344" r="4" fill={dotColor} />
      <circle cx="143" cy="2409" r="4" fill={dotColor} />
      <circle cx="143" cy="2474" r="4" fill={dotColor} />
      <circle cx="143" cy="2539" r="4" fill={dotColor} />
      <circle cx="143" cy="2604" r="4" fill={dotColor} />
      <circle cx="143" cy="2669" r="4" fill={dotColor} />
      <circle cx="143" cy="2734" r="4" fill={dotColor} />
      <circle cx="143" cy="2799" r="4" fill={dotColor} />
      <circle cx="143" cy="2864" r="4" fill={dotColor} />
      <circle cx="143" cy="2929" r="4" fill={dotColor} />
      <circle cx="143" cy="2994" r="4" fill={dotColor} />
      <circle cx="143" cy="3059" r="4" fill={dotColor} />
      <circle cx="143" cy="3124" r="4" fill={dotColor} />
      <circle cx="143" cy="3189" r="4" fill={dotColor} />
      <circle cx="143" cy="3254" r="4" fill={dotColor} />
      <circle cx="201" cy="4" r="4" fill={dotColor} />
      <circle cx="201" cy="69" r="4" fill={dotColor} />
      <circle cx="201" cy="134" r="4" fill={dotColor} />
      <circle cx="201" cy="199" r="4" fill={dotColor} />
      <circle cx="201" cy="264" r="4" fill={dotColor} />
      <circle cx="201" cy="329" r="4" fill={dotColor} />
      <circle cx="201" cy="394" r="4" fill={dotColor} />
      <circle cx="201" cy="459" r="4" fill={dotColor} />
      <circle cx="201" cy="524" r="4" fill={dotColor} />
      <circle cx="201" cy="589" r="4" fill={dotColor} />
      <circle cx="201" cy="654" r="4" fill={dotColor} />
      <circle cx="201" cy="719" r="4" fill={dotColor} />
      <circle cx="201" cy="784" r="4" fill={dotColor} />
      <circle cx="201" cy="849" r="4" fill={dotColor} />
      <circle cx="201" cy="914" r="4" fill={dotColor} />
      <circle cx="201" cy="979" r="4" fill={dotColor} />
      <circle cx="201" cy="1044" r="4" fill={dotColor} />
      <circle cx="201" cy="1109" r="4" fill={dotColor} />
      <circle cx="201" cy="1174" r="4" fill={dotColor} />
      <circle cx="201" cy="1239" r="4" fill={dotColor} />
      <circle cx="201" cy="1304" r="4" fill={dotColor} />
      <circle cx="201" cy="1369" r="4" fill={dotColor} />
      <circle cx="201" cy="1434" r="4" fill={dotColor} />
      <circle cx="201" cy="1499" r="4" fill={dotColor} />
      <circle cx="201" cy="1564" r="4" fill={dotColor} />
      <circle cx="201" cy="1629" r="4" fill={dotColor} />
      <circle cx="201" cy="1694" r="4" fill={dotColor} />
      <circle cx="201" cy="1759" r="4" fill={dotColor} />
      <circle cx="201" cy="1824" r="4" fill={dotColor} />
      <circle cx="201" cy="1889" r="4" fill={dotColor} />
      <circle cx="201" cy="1954" r="4" fill={dotColor} />
      <circle cx="201" cy="2019" r="4" fill={dotColor} />
      <circle cx="201" cy="2084" r="4" fill={dotColor} />
      <circle cx="201" cy="2149" r="4" fill={dotColor} />
      <circle cx="201" cy="2214" r="4" fill={dotColor} />
      <circle cx="201" cy="2279" r="4" fill={dotColor} />
      <circle cx="201" cy="2344" r="4" fill={dotColor} />
      <circle cx="201" cy="2409" r="4" fill={dotColor} />
      <circle cx="201" cy="2474" r="4" fill={dotColor} />
      <circle cx="201" cy="2539" r="4" fill={dotColor} />
      <circle cx="201" cy="2604" r="4" fill={dotColor} />
      <circle cx="201" cy="2669" r="4" fill={dotColor} />
      <circle cx="201" cy="2734" r="4" fill={dotColor} />
      <circle cx="201" cy="2799" r="4" fill={dotColor} />
      <circle cx="201" cy="2864" r="4" fill={dotColor} />
      <circle cx="201" cy="2929" r="4" fill={dotColor} />
      <circle cx="201" cy="2994" r="4" fill={dotColor} />
      <circle cx="201" cy="3059" r="4" fill={dotColor} />
      <circle cx="201" cy="3124" r="4" fill={dotColor} />
      <circle cx="201" cy="3189" r="4" fill={dotColor} />
      <circle cx="201" cy="3254" r="4" fill={dotColor} />
      <circle cx="259" cy="4" r="4" fill={dotColor} />
      <circle cx="259" cy="69" r="4" fill={dotColor} />
      <circle cx="259" cy="134" r="4" fill={dotColor} />
      <circle cx="259" cy="199" r="4" fill={dotColor} />
      <circle cx="259" cy="264" r="4" fill={dotColor} />
      <circle cx="259" cy="329" r="4" fill={dotColor} />
      <circle cx="259" cy="394" r="4" fill={dotColor} />
      <circle cx="259" cy="459" r="4" fill={dotColor} />
      <circle cx="259" cy="524" r="4" fill={dotColor} />
      <circle cx="259" cy="589" r="4" fill={dotColor} />
      <circle cx="259" cy="654" r="4" fill={dotColor} />
      <circle cx="259" cy="719" r="4" fill={dotColor} />
      <circle cx="259" cy="784" r="4" fill={dotColor} />
      <circle cx="259" cy="849" r="4" fill={dotColor} />
      <circle cx="259" cy="914" r="4" fill={dotColor} />
      <circle cx="259" cy="979" r="4" fill={dotColor} />
      <circle cx="259" cy="1044" r="4" fill={dotColor} />
      <circle cx="259" cy="1109" r="4" fill={dotColor} />
      <circle cx="259" cy="1174" r="4" fill={dotColor} />
      <circle cx="259" cy="1239" r="4" fill={dotColor} />
      <circle cx="259" cy="1304" r="4" fill={dotColor} />
      <circle cx="259" cy="1369" r="4" fill={dotColor} />
      <circle cx="259" cy="1434" r="4" fill={dotColor} />
      <circle cx="259" cy="1499" r="4" fill={dotColor} />
      <circle cx="259" cy="1564" r="4" fill={dotColor} />
      <circle cx="259" cy="1629" r="4" fill={dotColor} />
      <circle cx="259" cy="1694" r="4" fill={dotColor} />
      <circle cx="259" cy="1759" r="4" fill={dotColor} />
      <circle cx="259" cy="1824" r="4" fill={dotColor} />
      <circle cx="259" cy="1889" r="4" fill={dotColor} />
      <circle cx="259" cy="1954" r="4" fill={dotColor} />
      <circle cx="259" cy="2019" r="4" fill={dotColor} />
      <circle cx="259" cy="2084" r="4" fill={dotColor} />
      <circle cx="259" cy="2149" r="4" fill={dotColor} />
      <circle cx="259" cy="2214" r="4" fill={dotColor} />
      <circle cx="259" cy="2279" r="4" fill={dotColor} />
      <circle cx="259" cy="2344" r="4" fill={dotColor} />
      <circle cx="259" cy="2409" r="4" fill={dotColor} />
      <circle cx="259" cy="2474" r="4" fill={dotColor} />
      <circle cx="259" cy="2539" r="4" fill={dotColor} />
      <circle cx="259" cy="2604" r="4" fill={dotColor} />
      <circle cx="259" cy="2669" r="4" fill={dotColor} />
      <circle cx="259" cy="2734" r="4" fill={dotColor} />
      <circle cx="259" cy="2799" r="4" fill={dotColor} />
      <circle cx="259" cy="2864" r="4" fill={dotColor} />
      <circle cx="259" cy="2929" r="4" fill={dotColor} />
      <circle cx="259" cy="2994" r="4" fill={dotColor} />
      <circle cx="259" cy="3059" r="4" fill={dotColor} />
      <circle cx="259" cy="3124" r="4" fill={dotColor} />
      <circle cx="259" cy="3189" r="4" fill={dotColor} />
      <circle cx="259" cy="3254" r="4" fill={dotColor} />
      <circle cx="317" cy="4" r="4" fill={dotColor} />
      <circle cx="317" cy="69" r="4" fill={dotColor} />
      <circle cx="317" cy="134" r="4" fill={dotColor} />
      <circle cx="317" cy="199" r="4" fill={dotColor} />
      <circle cx="317" cy="264" r="4" fill={dotColor} />
      <circle cx="317" cy="329" r="4" fill={dotColor} />
      <circle cx="317" cy="394" r="4" fill={dotColor} />
      <circle cx="317" cy="459" r="4" fill={dotColor} />
      <circle cx="317" cy="524" r="4" fill={dotColor} />
      <circle cx="317" cy="589" r="4" fill={dotColor} />
      <circle cx="317" cy="654" r="4" fill={dotColor} />
      <circle cx="317" cy="719" r="4" fill={dotColor} />
      <circle cx="317" cy="784" r="4" fill={dotColor} />
      <circle cx="317" cy="849" r="4" fill={dotColor} />
      <circle cx="317" cy="914" r="4" fill={dotColor} />
      <circle cx="317" cy="979" r="4" fill={dotColor} />
      <circle cx="317" cy="1044" r="4" fill={dotColor} />
      <circle cx="317" cy="1109" r="4" fill={dotColor} />
      <circle cx="317" cy="1174" r="4" fill={dotColor} />
      <circle cx="317" cy="1239" r="4" fill={dotColor} />
      <circle cx="317" cy="1304" r="4" fill={dotColor} />
      <circle cx="317" cy="1369" r="4" fill={dotColor} />
      <circle cx="317" cy="1434" r="4" fill={dotColor} />
      <circle cx="317" cy="1499" r="4" fill={dotColor} />
      <circle cx="317" cy="1564" r="4" fill={dotColor} />
      <circle cx="317" cy="1629" r="4" fill={dotColor} />
      <circle cx="317" cy="1694" r="4" fill={dotColor} />
      <circle cx="317" cy="1759" r="4" fill={dotColor} />
      <circle cx="317" cy="1824" r="4" fill={dotColor} />
      <circle cx="317" cy="1889" r="4" fill={dotColor} />
      <circle cx="317" cy="1954" r="4" fill={dotColor} />
      <circle cx="317" cy="2019" r="4" fill={dotColor} />
      <circle cx="317" cy="2084" r="4" fill={dotColor} />
      <circle cx="317" cy="2149" r="4" fill={dotColor} />
      <circle cx="317" cy="2214" r="4" fill={dotColor} />
      <circle cx="317" cy="2279" r="4" fill={dotColor} />
      <circle cx="317" cy="2344" r="4" fill={dotColor} />
      <circle cx="317" cy="2409" r="4" fill={dotColor} />
      <circle cx="317" cy="2474" r="4" fill={dotColor} />
      <circle cx="317" cy="2539" r="4" fill={dotColor} />
      <circle cx="317" cy="2604" r="4" fill={dotColor} />
      <circle cx="317" cy="2669" r="4" fill={dotColor} />
      <circle cx="317" cy="2734" r="4" fill={dotColor} />
      <circle cx="317" cy="2799" r="4" fill={dotColor} />
      <circle cx="317" cy="2864" r="4" fill={dotColor} />
      <circle cx="317" cy="2929" r="4" fill={dotColor} />
      <circle cx="317" cy="2994" r="4" fill={dotColor} />
      <circle cx="317" cy="3059" r="4" fill={dotColor} />
      <circle cx="317" cy="3124" r="4" fill={dotColor} />
      <circle cx="317" cy="3189" r="4" fill={dotColor} />
      <circle cx="317" cy="3254" r="4" fill={dotColor} />
      <circle cx="375" cy="4" r="4" fill={dotColor} />
      <circle cx="375" cy="69" r="4" fill={dotColor} />
      <circle cx="375" cy="134" r="4" fill={dotColor} />
      <circle cx="375" cy="199" r="4" fill={dotColor} />
      <circle cx="375" cy="264" r="4" fill={dotColor} />
      <circle cx="375" cy="329" r="4" fill={dotColor} />
      <circle cx="375" cy="394" r="4" fill={dotColor} />
      <circle cx="375" cy="459" r="4" fill={dotColor} />
      <circle cx="375" cy="524" r="4" fill={dotColor} />
      <circle cx="375" cy="589" r="4" fill={dotColor} />
      <circle cx="375" cy="654" r="4" fill={dotColor} />
      <circle cx="375" cy="719" r="4" fill={dotColor} />
      <circle cx="375" cy="784" r="4" fill={dotColor} />
      <circle cx="375" cy="849" r="4" fill={dotColor} />
      <circle cx="375" cy="914" r="4" fill={dotColor} />
      <circle cx="375" cy="979" r="4" fill={dotColor} />
      <circle cx="375" cy="1044" r="4" fill={dotColor} />
      <circle cx="375" cy="1109" r="4" fill={dotColor} />
      <circle cx="375" cy="1174" r="4" fill={dotColor} />
      <circle cx="375" cy="1239" r="4" fill={dotColor} />
      <circle cx="375" cy="1304" r="4" fill={dotColor} />
      <circle cx="375" cy="1369" r="4" fill={dotColor} />
      <circle cx="375" cy="1434" r="4" fill={dotColor} />
      <circle cx="375" cy="1499" r="4" fill={dotColor} />
      <circle cx="375" cy="1564" r="4" fill={dotColor} />
      <circle cx="375" cy="1629" r="4" fill={dotColor} />
      <circle cx="375" cy="1694" r="4" fill={dotColor} />
      <circle cx="375" cy="1759" r="4" fill={dotColor} />
      <circle cx="375" cy="1824" r="4" fill={dotColor} />
      <circle cx="375" cy="1889" r="4" fill={dotColor} />
      <circle cx="375" cy="1954" r="4" fill={dotColor} />
      <circle cx="375" cy="2019" r="4" fill={dotColor} />
      <circle cx="375" cy="2084" r="4" fill={dotColor} />
      <circle cx="375" cy="2149" r="4" fill={dotColor} />
      <circle cx="375" cy="2214" r="4" fill={dotColor} />
      <circle cx="375" cy="2279" r="4" fill={dotColor} />
      <circle cx="375" cy="2344" r="4" fill={dotColor} />
      <circle cx="375" cy="2409" r="4" fill={dotColor} />
      <circle cx="375" cy="2474" r="4" fill={dotColor} />
      <circle cx="375" cy="2539" r="4" fill={dotColor} />
      <circle cx="375" cy="2604" r="4" fill={dotColor} />
      <circle cx="375" cy="2669" r="4" fill={dotColor} />
      <circle cx="375" cy="2734" r="4" fill={dotColor} />
      <circle cx="375" cy="2799" r="4" fill={dotColor} />
      <circle cx="375" cy="2864" r="4" fill={dotColor} />
      <circle cx="375" cy="2929" r="4" fill={dotColor} />
      <circle cx="375" cy="2994" r="4" fill={dotColor} />
      <circle cx="375" cy="3059" r="4" fill={dotColor} />
      <circle cx="375" cy="3124" r="4" fill={dotColor} />
      <circle cx="375" cy="3189" r="4" fill={dotColor} />
      <circle cx="375" cy="3254" r="4" fill={dotColor} />
      <circle cx="433" cy="4" r="4" fill={dotColor} />
      <circle cx="433" cy="69" r="4" fill={dotColor} />
      <circle cx="433" cy="134" r="4" fill={dotColor} />
      <circle cx="433" cy="199" r="4" fill={dotColor} />
      <circle cx="433" cy="264" r="4" fill={dotColor} />
      <circle cx="433" cy="329" r="4" fill={dotColor} />
      <circle cx="433" cy="394" r="4" fill={dotColor} />
      <circle cx="433" cy="459" r="4" fill={dotColor} />
      <circle cx="433" cy="524" r="4" fill={dotColor} />
      <circle cx="433" cy="589" r="4" fill={dotColor} />
      <circle cx="433" cy="654" r="4" fill={dotColor} />
      <circle cx="433" cy="719" r="4" fill={dotColor} />
      <circle cx="433" cy="784" r="4" fill={dotColor} />
      <circle cx="433" cy="849" r="4" fill={dotColor} />
      <circle cx="433" cy="914" r="4" fill={dotColor} />
      <circle cx="433" cy="979" r="4" fill={dotColor} />
      <circle cx="433" cy="1044" r="4" fill={dotColor} />
      <circle cx="433" cy="1109" r="4" fill={dotColor} />
      <circle cx="433" cy="1174" r="4" fill={dotColor} />
      <circle cx="433" cy="1239" r="4" fill={dotColor} />
      <circle cx="433" cy="1304" r="4" fill={dotColor} />
      <circle cx="433" cy="1369" r="4" fill={dotColor} />
      <circle cx="433" cy="1434" r="4" fill={dotColor} />
      <circle cx="433" cy="1499" r="4" fill={dotColor} />
      <circle cx="433" cy="1564" r="4" fill={dotColor} />
      <circle cx="433" cy="1629" r="4" fill={dotColor} />
      <circle cx="433" cy="1694" r="4" fill={dotColor} />
      <circle cx="433" cy="1759" r="4" fill={dotColor} />
      <circle cx="433" cy="1824" r="4" fill={dotColor} />
      <circle cx="433" cy="1889" r="4" fill={dotColor} />
      <circle cx="433" cy="1954" r="4" fill={dotColor} />
      <circle cx="433" cy="2019" r="4" fill={dotColor} />
      <circle cx="433" cy="2084" r="4" fill={dotColor} />
      <circle cx="433" cy="2149" r="4" fill={dotColor} />
      <circle cx="433" cy="2214" r="4" fill={dotColor} />
      <circle cx="433" cy="2279" r="4" fill={dotColor} />
      <circle cx="433" cy="2344" r="4" fill={dotColor} />
      <circle cx="433" cy="2409" r="4" fill={dotColor} />
      <circle cx="433" cy="2474" r="4" fill={dotColor} />
      <circle cx="433" cy="2539" r="4" fill={dotColor} />
      <circle cx="433" cy="2604" r="4" fill={dotColor} />
      <circle cx="433" cy="2669" r="4" fill={dotColor} />
      <circle cx="433" cy="2734" r="4" fill={dotColor} />
      <circle cx="433" cy="2799" r="4" fill={dotColor} />
      <circle cx="433" cy="2864" r="4" fill={dotColor} />
      <circle cx="433" cy="2929" r="4" fill={dotColor} />
      <circle cx="433" cy="2994" r="4" fill={dotColor} />
      <circle cx="433" cy="3059" r="4" fill={dotColor} />
      <circle cx="433" cy="3124" r="4" fill={dotColor} />
      <circle cx="433" cy="3189" r="4" fill={dotColor} />
      <circle cx="433" cy="3254" r="4" fill={dotColor} />
      <circle cx="491" cy="4" r="4" fill={dotColor} />
      <circle cx="491" cy="69" r="4" fill={dotColor} />
      <circle cx="491" cy="134" r="4" fill={dotColor} />
      <circle cx="491" cy="199" r="4" fill={dotColor} />
      <circle cx="491" cy="264" r="4" fill={dotColor} />
      <circle cx="491" cy="329" r="4" fill={dotColor} />
      <circle cx="491" cy="394" r="4" fill={dotColor} />
      <circle cx="491" cy="459" r="4" fill={dotColor} />
      <circle cx="491" cy="524" r="4" fill={dotColor} />
      <circle cx="491" cy="589" r="4" fill={dotColor} />
      <circle cx="491" cy="654" r="4" fill={dotColor} />
      <circle cx="491" cy="719" r="4" fill={dotColor} />
      <circle cx="491" cy="784" r="4" fill={dotColor} />
      <circle cx="491" cy="849" r="4" fill={dotColor} />
      <circle cx="491" cy="914" r="4" fill={dotColor} />
      <circle cx="491" cy="979" r="4" fill={dotColor} />
      <circle cx="491" cy="1044" r="4" fill={dotColor} />
      <circle cx="491" cy="1109" r="4" fill={dotColor} />
      <circle cx="491" cy="1174" r="4" fill={dotColor} />
      <circle cx="491" cy="1239" r="4" fill={dotColor} />
      <circle cx="491" cy="1304" r="4" fill={dotColor} />
      <circle cx="491" cy="1369" r="4" fill={dotColor} />
      <circle cx="491" cy="1434" r="4" fill={dotColor} />
      <circle cx="491" cy="1499" r="4" fill={dotColor} />
      <circle cx="491" cy="1564" r="4" fill={dotColor} />
      <circle cx="491" cy="1629" r="4" fill={dotColor} />
      <circle cx="491" cy="1694" r="4" fill={dotColor} />
      <circle cx="491" cy="1759" r="4" fill={dotColor} />
      <circle cx="491" cy="1824" r="4" fill={dotColor} />
      <circle cx="491" cy="1889" r="4" fill={dotColor} />
      <circle cx="491" cy="1954" r="4" fill={dotColor} />
      <circle cx="491" cy="2019" r="4" fill={dotColor} />
      <circle cx="491" cy="2084" r="4" fill={dotColor} />
      <circle cx="491" cy="2149" r="4" fill={dotColor} />
      <circle cx="491" cy="2214" r="4" fill={dotColor} />
      <circle cx="491" cy="2279" r="4" fill={dotColor} />
      <circle cx="491" cy="2344" r="4" fill={dotColor} />
      <circle cx="491" cy="2409" r="4" fill={dotColor} />
      <circle cx="491" cy="2474" r="4" fill={dotColor} />
      <circle cx="491" cy="2539" r="4" fill={dotColor} />
      <circle cx="491" cy="2604" r="4" fill={dotColor} />
      <circle cx="491" cy="2669" r="4" fill={dotColor} />
      <circle cx="491" cy="2734" r="4" fill={dotColor} />
      <circle cx="491" cy="2799" r="4" fill={dotColor} />
      <circle cx="491" cy="2864" r="4" fill={dotColor} />
      <circle cx="491" cy="2929" r="4" fill={dotColor} />
      <circle cx="491" cy="2994" r="4" fill={dotColor} />
      <circle cx="491" cy="3059" r="4" fill={dotColor} />
      <circle cx="491" cy="3124" r="4" fill={dotColor} />
      <circle cx="491" cy="3189" r="4" fill={dotColor} />
      <circle cx="491" cy="3254" r="4" fill={dotColor} />
      <circle cx="549" cy="4" r="4" fill={dotColor} />
      <circle cx="549" cy="69" r="4" fill={dotColor} />
      <circle cx="549" cy="134" r="4" fill={dotColor} />
      <circle cx="549" cy="199" r="4" fill={dotColor} />
      <circle cx="549" cy="264" r="4" fill={dotColor} />
      <circle cx="549" cy="329" r="4" fill={dotColor} />
      <circle cx="549" cy="394" r="4" fill={dotColor} />
      <circle cx="549" cy="459" r="4" fill={dotColor} />
      <circle cx="549" cy="524" r="4" fill={dotColor} />
      <circle cx="549" cy="589" r="4" fill={dotColor} />
      <circle cx="549" cy="654" r="4" fill={dotColor} />
      <circle cx="549" cy="719" r="4" fill={dotColor} />
      <circle cx="549" cy="784" r="4" fill={dotColor} />
      <circle cx="549" cy="849" r="4" fill={dotColor} />
      <circle cx="549" cy="914" r="4" fill={dotColor} />
      <circle cx="549" cy="979" r="4" fill={dotColor} />
      <circle cx="549" cy="1044" r="4" fill={dotColor} />
      <circle cx="549" cy="1109" r="4" fill={dotColor} />
      <circle cx="549" cy="1174" r="4" fill={dotColor} />
      <circle cx="549" cy="1239" r="4" fill={dotColor} />
      <circle cx="549" cy="1304" r="4" fill={dotColor} />
      <circle cx="549" cy="1369" r="4" fill={dotColor} />
      <circle cx="549" cy="1434" r="4" fill={dotColor} />
      <circle cx="549" cy="1499" r="4" fill={dotColor} />
      <circle cx="549" cy="1564" r="4" fill={dotColor} />
      <circle cx="549" cy="1629" r="4" fill={dotColor} />
      <circle cx="549" cy="1694" r="4" fill={dotColor} />
      <circle cx="549" cy="1759" r="4" fill={dotColor} />
      <circle cx="549" cy="1824" r="4" fill={dotColor} />
      <circle cx="549" cy="1889" r="4" fill={dotColor} />
      <circle cx="549" cy="1954" r="4" fill={dotColor} />
      <circle cx="549" cy="2019" r="4" fill={dotColor} />
      <circle cx="549" cy="2084" r="4" fill={dotColor} />
      <circle cx="549" cy="2149" r="4" fill={dotColor} />
      <circle cx="549" cy="2214" r="4" fill={dotColor} />
      <circle cx="549" cy="2279" r="4" fill={dotColor} />
      <circle cx="549" cy="2344" r="4" fill={dotColor} />
      <circle cx="549" cy="2409" r="4" fill={dotColor} />
      <circle cx="549" cy="2474" r="4" fill={dotColor} />
      <circle cx="549" cy="2539" r="4" fill={dotColor} />
      <circle cx="549" cy="2604" r="4" fill={dotColor} />
      <circle cx="549" cy="2669" r="4" fill={dotColor} />
      <circle cx="549" cy="2734" r="4" fill={dotColor} />
      <circle cx="549" cy="2799" r="4" fill={dotColor} />
      <circle cx="549" cy="2864" r="4" fill={dotColor} />
      <circle cx="549" cy="2929" r="4" fill={dotColor} />
      <circle cx="549" cy="2994" r="4" fill={dotColor} />
      <circle cx="549" cy="3059" r="4" fill={dotColor} />
      <circle cx="549" cy="3124" r="4" fill={dotColor} />
      <circle cx="549" cy="3189" r="4" fill={dotColor} />
      <circle cx="549" cy="3254" r="4" fill={dotColor} />
      <circle cx="607" cy="4" r="4" fill={dotColor} />
      <circle cx="607" cy="69" r="4" fill={dotColor} />
      <circle cx="607" cy="134" r="4" fill={dotColor} />
      <circle cx="607" cy="199" r="4" fill={dotColor} />
      <circle cx="607" cy="264" r="4" fill={dotColor} />
      <circle cx="607" cy="329" r="4" fill={dotColor} />
      <circle cx="607" cy="394" r="4" fill={dotColor} />
      <circle cx="607" cy="459" r="4" fill={dotColor} />
      <circle cx="607" cy="524" r="4" fill={dotColor} />
      <circle cx="607" cy="589" r="4" fill={dotColor} />
      <circle cx="607" cy="654" r="4" fill={dotColor} />
      <circle cx="607" cy="719" r="4" fill={dotColor} />
      <circle cx="607" cy="784" r="4" fill={dotColor} />
      <circle cx="607" cy="849" r="4" fill={dotColor} />
      <circle cx="607" cy="914" r="4" fill={dotColor} />
      <circle cx="607" cy="979" r="4" fill={dotColor} />
      <circle cx="607" cy="1044" r="4" fill={dotColor} />
      <circle cx="607" cy="1109" r="4" fill={dotColor} />
      <circle cx="607" cy="1174" r="4" fill={dotColor} />
      <circle cx="607" cy="1239" r="4" fill={dotColor} />
      <circle cx="607" cy="1304" r="4" fill={dotColor} />
      <circle cx="607" cy="1369" r="4" fill={dotColor} />
      <circle cx="607" cy="1434" r="4" fill={dotColor} />
      <circle cx="607" cy="1499" r="4" fill={dotColor} />
      <circle cx="607" cy="1564" r="4" fill={dotColor} />
      <circle cx="607" cy="1629" r="4" fill={dotColor} />
      <circle cx="607" cy="1694" r="4" fill={dotColor} />
      <circle cx="607" cy="1759" r="4" fill={dotColor} />
      <circle cx="607" cy="1824" r="4" fill={dotColor} />
      <circle cx="607" cy="1889" r="4" fill={dotColor} />
      <circle cx="607" cy="1954" r="4" fill={dotColor} />
      <circle cx="607" cy="2019" r="4" fill={dotColor} />
      <circle cx="607" cy="2084" r="4" fill={dotColor} />
      <circle cx="607" cy="2149" r="4" fill={dotColor} />
      <circle cx="607" cy="2214" r="4" fill={dotColor} />
      <circle cx="607" cy="2279" r="4" fill={dotColor} />
      <circle cx="607" cy="2344" r="4" fill={dotColor} />
      <circle cx="607" cy="2409" r="4" fill={dotColor} />
      <circle cx="607" cy="2474" r="4" fill={dotColor} />
      <circle cx="607" cy="2539" r="4" fill={dotColor} />
      <circle cx="607" cy="2604" r="4" fill={dotColor} />
      <circle cx="607" cy="2669" r="4" fill={dotColor} />
      <circle cx="607" cy="2734" r="4" fill={dotColor} />
      <circle cx="607" cy="2799" r="4" fill={dotColor} />
      <circle cx="607" cy="2864" r="4" fill={dotColor} />
      <circle cx="607" cy="2929" r="4" fill={dotColor} />
      <circle cx="607" cy="2994" r="4" fill={dotColor} />
      <circle cx="607" cy="3059" r="4" fill={dotColor} />
      <circle cx="607" cy="3124" r="4" fill={dotColor} />
      <circle cx="607" cy="3189" r="4" fill={dotColor} />
      <circle cx="607" cy="3254" r="4" fill={dotColor} />
      <circle cx="665" cy="4" r="4" fill={dotColor} />
      <circle cx="665" cy="69" r="4" fill={dotColor} />
      <circle cx="665" cy="134" r="4" fill={dotColor} />
      <circle cx="665" cy="199" r="4" fill={dotColor} />
      <circle cx="665" cy="264" r="4" fill={dotColor} />
      <circle cx="665" cy="329" r="4" fill={dotColor} />
      <circle cx="665" cy="394" r="4" fill={dotColor} />
      <circle cx="665" cy="459" r="4" fill={dotColor} />
      <circle cx="665" cy="524" r="4" fill={dotColor} />
      <circle cx="665" cy="589" r="4" fill={dotColor} />
      <circle cx="665" cy="654" r="4" fill={dotColor} />
      <circle cx="665" cy="719" r="4" fill={dotColor} />
      <circle cx="665" cy="784" r="4" fill={dotColor} />
      <circle cx="665" cy="849" r="4" fill={dotColor} />
      <circle cx="665" cy="914" r="4" fill={dotColor} />
      <circle cx="665" cy="979" r="4" fill={dotColor} />
      <circle cx="665" cy="1044" r="4" fill={dotColor} />
      <circle cx="665" cy="1109" r="4" fill={dotColor} />
      <circle cx="665" cy="1174" r="4" fill={dotColor} />
      <circle cx="665" cy="1239" r="4" fill={dotColor} />
      <circle cx="665" cy="1304" r="4" fill={dotColor} />
      <circle cx="665" cy="1369" r="4" fill={dotColor} />
      <circle cx="665" cy="1434" r="4" fill={dotColor} />
      <circle cx="665" cy="1499" r="4" fill={dotColor} />
      <circle cx="665" cy="1564" r="4" fill={dotColor} />
      <circle cx="665" cy="1629" r="4" fill={dotColor} />
      <circle cx="665" cy="1694" r="4" fill={dotColor} />
      <circle cx="665" cy="1759" r="4" fill={dotColor} />
      <circle cx="665" cy="1824" r="4" fill={dotColor} />
      <circle cx="665" cy="1889" r="4" fill={dotColor} />
      <circle cx="665" cy="1954" r="4" fill={dotColor} />
      <circle cx="665" cy="2019" r="4" fill={dotColor} />
      <circle cx="665" cy="2084" r="4" fill={dotColor} />
      <circle cx="665" cy="2149" r="4" fill={dotColor} />
      <circle cx="665" cy="2214" r="4" fill={dotColor} />
      <circle cx="665" cy="2279" r="4" fill={dotColor} />
      <circle cx="665" cy="2344" r="4" fill={dotColor} />
      <circle cx="665" cy="2409" r="4" fill={dotColor} />
      <circle cx="665" cy="2474" r="4" fill={dotColor} />
      <circle cx="665" cy="2539" r="4" fill={dotColor} />
      <circle cx="665" cy="2604" r="4" fill={dotColor} />
      <circle cx="665" cy="2669" r="4" fill={dotColor} />
      <circle cx="665" cy="2734" r="4" fill={dotColor} />
      <circle cx="665" cy="2799" r="4" fill={dotColor} />
      <circle cx="665" cy="2864" r="4" fill={dotColor} />
      <circle cx="665" cy="2929" r="4" fill={dotColor} />
      <circle cx="665" cy="2994" r="4" fill={dotColor} />
      <circle cx="665" cy="3059" r="4" fill={dotColor} />
      <circle cx="665" cy="3124" r="4" fill={dotColor} />
      <circle cx="665" cy="3189" r="4" fill={dotColor} />
      <circle cx="665" cy="3254" r="4" fill={dotColor} />
      <circle cx="723" cy="4" r="4" fill={dotColor} />
      <circle cx="723" cy="69" r="4" fill={dotColor} />
      <circle cx="723" cy="134" r="4" fill={dotColor} />
      <circle cx="723" cy="199" r="4" fill={dotColor} />
      <circle cx="723" cy="264" r="4" fill={dotColor} />
      <circle cx="723" cy="329" r="4" fill={dotColor} />
      <circle cx="723" cy="394" r="4" fill={dotColor} />
      <circle cx="723" cy="459" r="4" fill={dotColor} />
      <circle cx="723" cy="524" r="4" fill={dotColor} />
      <circle cx="723" cy="589" r="4" fill={dotColor} />
      <circle cx="723" cy="654" r="4" fill={dotColor} />
      <circle cx="723" cy="719" r="4" fill={dotColor} />
      <circle cx="723" cy="784" r="4" fill={dotColor} />
      <circle cx="723" cy="849" r="4" fill={dotColor} />
      <circle cx="723" cy="914" r="4" fill={dotColor} />
      <circle cx="723" cy="979" r="4" fill={dotColor} />
      <circle cx="723" cy="1044" r="4" fill={dotColor} />
      <circle cx="723" cy="1109" r="4" fill={dotColor} />
      <circle cx="723" cy="1174" r="4" fill={dotColor} />
      <circle cx="723" cy="1239" r="4" fill={dotColor} />
      <circle cx="723" cy="1304" r="4" fill={dotColor} />
      <circle cx="723" cy="1369" r="4" fill={dotColor} />
      <circle cx="723" cy="1434" r="4" fill={dotColor} />
      <circle cx="723" cy="1499" r="4" fill={dotColor} />
      <circle cx="723" cy="1564" r="4" fill={dotColor} />
      <circle cx="723" cy="1629" r="4" fill={dotColor} />
      <circle cx="723" cy="1694" r="4" fill={dotColor} />
      <circle cx="723" cy="1759" r="4" fill={dotColor} />
      <circle cx="723" cy="1824" r="4" fill={dotColor} />
      <circle cx="723" cy="1889" r="4" fill={dotColor} />
      <circle cx="723" cy="1954" r="4" fill={dotColor} />
      <circle cx="723" cy="2019" r="4" fill={dotColor} />
      <circle cx="723" cy="2084" r="4" fill={dotColor} />
      <circle cx="723" cy="2149" r="4" fill={dotColor} />
      <circle cx="723" cy="2214" r="4" fill={dotColor} />
      <circle cx="723" cy="2279" r="4" fill={dotColor} />
      <circle cx="723" cy="2344" r="4" fill={dotColor} />
      <circle cx="723" cy="2409" r="4" fill={dotColor} />
      <circle cx="723" cy="2474" r="4" fill={dotColor} />
      <circle cx="723" cy="2539" r="4" fill={dotColor} />
      <circle cx="723" cy="2604" r="4" fill={dotColor} />
      <circle cx="723" cy="2669" r="4" fill={dotColor} />
      <circle cx="723" cy="2734" r="4" fill={dotColor} />
      <circle cx="723" cy="2799" r="4" fill={dotColor} />
      <circle cx="723" cy="2864" r="4" fill={dotColor} />
      <circle cx="723" cy="2929" r="4" fill={dotColor} />
      <circle cx="723" cy="2994" r="4" fill={dotColor} />
      <circle cx="723" cy="3059" r="4" fill={dotColor} />
      <circle cx="723" cy="3124" r="4" fill={dotColor} />
      <circle cx="723" cy="3189" r="4" fill={dotColor} />
      <circle cx="723" cy="3254" r="4" fill={dotColor} />
      <circle cx="781" cy="4" r="4" fill={dotColor} />
      <circle cx="781" cy="69" r="4" fill={dotColor} />
      <circle cx="781" cy="134" r="4" fill={dotColor} />
      <circle cx="781" cy="199" r="4" fill={dotColor} />
      <circle cx="781" cy="264" r="4" fill={dotColor} />
      <circle cx="781" cy="329" r="4" fill={dotColor} />
      <circle cx="781" cy="394" r="4" fill={dotColor} />
      <circle cx="781" cy="459" r="4" fill={dotColor} />
      <circle cx="781" cy="524" r="4" fill={dotColor} />
      <circle cx="781" cy="589" r="4" fill={dotColor} />
      <circle cx="781" cy="654" r="4" fill={dotColor} />
      <circle cx="781" cy="719" r="4" fill={dotColor} />
      <circle cx="781" cy="784" r="4" fill={dotColor} />
      <circle cx="781" cy="849" r="4" fill={dotColor} />
      <circle cx="781" cy="914" r="4" fill={dotColor} />
      <circle cx="781" cy="979" r="4" fill={dotColor} />
      <circle cx="781" cy="1044" r="4" fill={dotColor} />
      <circle cx="781" cy="1109" r="4" fill={dotColor} />
      <circle cx="781" cy="1174" r="4" fill={dotColor} />
      <circle cx="781" cy="1239" r="4" fill={dotColor} />
      <circle cx="781" cy="1304" r="4" fill={dotColor} />
      <circle cx="781" cy="1369" r="4" fill={dotColor} />
      <circle cx="781" cy="1434" r="4" fill={dotColor} />
      <circle cx="781" cy="1499" r="4" fill={dotColor} />
      <circle cx="781" cy="1564" r="4" fill={dotColor} />
      <circle cx="781" cy="1629" r="4" fill={dotColor} />
      <circle cx="781" cy="1694" r="4" fill={dotColor} />
      <circle cx="781" cy="1759" r="4" fill={dotColor} />
      <circle cx="781" cy="1824" r="4" fill={dotColor} />
      <circle cx="781" cy="1889" r="4" fill={dotColor} />
      <circle cx="781" cy="1954" r="4" fill={dotColor} />
      <circle cx="781" cy="2019" r="4" fill={dotColor} />
      <circle cx="781" cy="2084" r="4" fill={dotColor} />
      <circle cx="781" cy="2149" r="4" fill={dotColor} />
      <circle cx="781" cy="2214" r="4" fill={dotColor} />
      <circle cx="781" cy="2279" r="4" fill={dotColor} />
      <circle cx="781" cy="2344" r="4" fill={dotColor} />
      <circle cx="781" cy="2409" r="4" fill={dotColor} />
      <circle cx="781" cy="2474" r="4" fill={dotColor} />
      <circle cx="781" cy="2539" r="4" fill={dotColor} />
      <circle cx="781" cy="2604" r="4" fill={dotColor} />
      <circle cx="781" cy="2669" r="4" fill={dotColor} />
      <circle cx="781" cy="2734" r="4" fill={dotColor} />
      <circle cx="781" cy="2799" r="4" fill={dotColor} />
      <circle cx="781" cy="2864" r="4" fill={dotColor} />
      <circle cx="781" cy="2929" r="4" fill={dotColor} />
      <circle cx="781" cy="2994" r="4" fill={dotColor} />
      <circle cx="781" cy="3059" r="4" fill={dotColor} />
      <circle cx="781" cy="3124" r="4" fill={dotColor} />
      <circle cx="781" cy="3189" r="4" fill={dotColor} />
      <circle cx="781" cy="3254" r="4" fill={dotColor} />
      <circle cx="839" cy="4" r="4" fill={dotColor} />
      <circle cx="839" cy="69" r="4" fill={dotColor} />
      <circle cx="839" cy="134" r="4" fill={dotColor} />
      <circle cx="839" cy="199" r="4" fill={dotColor} />
      <circle cx="839" cy="264" r="4" fill={dotColor} />
      <circle cx="839" cy="329" r="4" fill={dotColor} />
      <circle cx="839" cy="394" r="4" fill={dotColor} />
      <circle cx="839" cy="459" r="4" fill={dotColor} />
      <circle cx="839" cy="524" r="4" fill={dotColor} />
      <circle cx="839" cy="589" r="4" fill={dotColor} />
      <circle cx="839" cy="654" r="4" fill={dotColor} />
      <circle cx="839" cy="719" r="4" fill={dotColor} />
      <circle cx="839" cy="784" r="4" fill={dotColor} />
      <circle cx="839" cy="849" r="4" fill={dotColor} />
      <circle cx="839" cy="914" r="4" fill={dotColor} />
      <circle cx="839" cy="979" r="4" fill={dotColor} />
      <circle cx="839" cy="1044" r="4" fill={dotColor} />
      <circle cx="839" cy="1109" r="4" fill={dotColor} />
      <circle cx="839" cy="1174" r="4" fill={dotColor} />
      <circle cx="839" cy="1239" r="4" fill={dotColor} />
      <circle cx="839" cy="1304" r="4" fill={dotColor} />
      <circle cx="839" cy="1369" r="4" fill={dotColor} />
      <circle cx="839" cy="1434" r="4" fill={dotColor} />
      <circle cx="839" cy="1499" r="4" fill={dotColor} />
      <circle cx="839" cy="1564" r="4" fill={dotColor} />
      <circle cx="839" cy="1629" r="4" fill={dotColor} />
      <circle cx="839" cy="1694" r="4" fill={dotColor} />
      <circle cx="839" cy="1759" r="4" fill={dotColor} />
      <circle cx="839" cy="1824" r="4" fill={dotColor} />
      <circle cx="839" cy="1889" r="4" fill={dotColor} />
      <circle cx="839" cy="1954" r="4" fill={dotColor} />
      <circle cx="839" cy="2019" r="4" fill={dotColor} />
      <circle cx="839" cy="2084" r="4" fill={dotColor} />
      <circle cx="839" cy="2149" r="4" fill={dotColor} />
      <circle cx="839" cy="2214" r="4" fill={dotColor} />
      <circle cx="839" cy="2279" r="4" fill={dotColor} />
      <circle cx="839" cy="2344" r="4" fill={dotColor} />
      <circle cx="839" cy="2409" r="4" fill={dotColor} />
      <circle cx="839" cy="2474" r="4" fill={dotColor} />
      <circle cx="839" cy="2539" r="4" fill={dotColor} />
      <circle cx="839" cy="2604" r="4" fill={dotColor} />
      <circle cx="839" cy="2669" r="4" fill={dotColor} />
      <circle cx="839" cy="2734" r="4" fill={dotColor} />
      <circle cx="839" cy="2799" r="4" fill={dotColor} />
      <circle cx="839" cy="2864" r="4" fill={dotColor} />
      <circle cx="839" cy="2929" r="4" fill={dotColor} />
      <circle cx="839" cy="2994" r="4" fill={dotColor} />
      <circle cx="839" cy="3059" r="4" fill={dotColor} />
      <circle cx="839" cy="3124" r="4" fill={dotColor} />
      <circle cx="839" cy="3189" r="4" fill={dotColor} />
      <circle cx="839" cy="3254" r="4" fill={dotColor} />
      <circle cx="897" cy="4" r="4" fill={dotColor} />
      <circle cx="897" cy="69" r="4" fill={dotColor} />
      <circle cx="897" cy="134" r="4" fill={dotColor} />
      <circle cx="897" cy="199" r="4" fill={dotColor} />
      <circle cx="897" cy="264" r="4" fill={dotColor} />
      <circle cx="897" cy="329" r="4" fill={dotColor} />
      <circle cx="897" cy="394" r="4" fill={dotColor} />
      <circle cx="897" cy="459" r="4" fill={dotColor} />
      <circle cx="897" cy="524" r="4" fill={dotColor} />
      <circle cx="897" cy="589" r="4" fill={dotColor} />
      <circle cx="897" cy="654" r="4" fill={dotColor} />
      <circle cx="897" cy="719" r="4" fill={dotColor} />
      <circle cx="897" cy="784" r="4" fill={dotColor} />
      <circle cx="897" cy="849" r="4" fill={dotColor} />
      <circle cx="897" cy="914" r="4" fill={dotColor} />
      <circle cx="897" cy="979" r="4" fill={dotColor} />
      <circle cx="897" cy="1044" r="4" fill={dotColor} />
      <circle cx="897" cy="1109" r="4" fill={dotColor} />
      <circle cx="897" cy="1174" r="4" fill={dotColor} />
      <circle cx="897" cy="1239" r="4" fill={dotColor} />
      <circle cx="897" cy="1304" r="4" fill={dotColor} />
      <circle cx="897" cy="1369" r="4" fill={dotColor} />
      <circle cx="897" cy="1434" r="4" fill={dotColor} />
      <circle cx="897" cy="1499" r="4" fill={dotColor} />
      <circle cx="897" cy="1564" r="4" fill={dotColor} />
      <circle cx="897" cy="1629" r="4" fill={dotColor} />
      <circle cx="897" cy="1694" r="4" fill={dotColor} />
      <circle cx="897" cy="1759" r="4" fill={dotColor} />
      <circle cx="897" cy="1824" r="4" fill={dotColor} />
      <circle cx="897" cy="1889" r="4" fill={dotColor} />
      <circle cx="897" cy="1954" r="4" fill={dotColor} />
      <circle cx="897" cy="2019" r="4" fill={dotColor} />
      <circle cx="897" cy="2084" r="4" fill={dotColor} />
      <circle cx="897" cy="2149" r="4" fill={dotColor} />
      <circle cx="897" cy="2214" r="4" fill={dotColor} />
      <circle cx="897" cy="2279" r="4" fill={dotColor} />
      <circle cx="897" cy="2344" r="4" fill={dotColor} />
      <circle cx="897" cy="2409" r="4" fill={dotColor} />
      <circle cx="897" cy="2474" r="4" fill={dotColor} />
      <circle cx="897" cy="2539" r="4" fill={dotColor} />
      <circle cx="897" cy="2604" r="4" fill={dotColor} />
      <circle cx="897" cy="2669" r="4" fill={dotColor} />
      <circle cx="897" cy="2734" r="4" fill={dotColor} />
      <circle cx="897" cy="2799" r="4" fill={dotColor} />
      <circle cx="897" cy="2864" r="4" fill={dotColor} />
      <circle cx="897" cy="2929" r="4" fill={dotColor} />
      <circle cx="897" cy="2994" r="4" fill={dotColor} />
      <circle cx="897" cy="3059" r="4" fill={dotColor} />
      <circle cx="897" cy="3124" r="4" fill={dotColor} />
      <circle cx="897" cy="3189" r="4" fill={dotColor} />
      <circle cx="897" cy="3254" r="4" fill={dotColor} />
      <circle cx="955" cy="4" r="4" fill={dotColor} />
      <circle cx="955" cy="69" r="4" fill={dotColor} />
      <circle cx="955" cy="134" r="4" fill={dotColor} />
      <circle cx="955" cy="199" r="4" fill={dotColor} />
      <circle cx="955" cy="264" r="4" fill={dotColor} />
      <circle cx="955" cy="329" r="4" fill={dotColor} />
      <circle cx="955" cy="394" r="4" fill={dotColor} />
      <circle cx="955" cy="459" r="4" fill={dotColor} />
      <circle cx="955" cy="524" r="4" fill={dotColor} />
      <circle cx="955" cy="589" r="4" fill={dotColor} />
      <circle cx="955" cy="654" r="4" fill={dotColor} />
      <circle cx="955" cy="719" r="4" fill={dotColor} />
      <circle cx="955" cy="784" r="4" fill={dotColor} />
      <circle cx="955" cy="849" r="4" fill={dotColor} />
      <circle cx="955" cy="914" r="4" fill={dotColor} />
      <circle cx="955" cy="979" r="4" fill={dotColor} />
      <circle cx="955" cy="1044" r="4" fill={dotColor} />
      <circle cx="955" cy="1109" r="4" fill={dotColor} />
      <circle cx="955" cy="1174" r="4" fill={dotColor} />
      <circle cx="955" cy="1239" r="4" fill={dotColor} />
      <circle cx="955" cy="1304" r="4" fill={dotColor} />
      <circle cx="955" cy="1369" r="4" fill={dotColor} />
      <circle cx="955" cy="1434" r="4" fill={dotColor} />
      <circle cx="955" cy="1499" r="4" fill={dotColor} />
      <circle cx="955" cy="1564" r="4" fill={dotColor} />
      <circle cx="955" cy="1629" r="4" fill={dotColor} />
      <circle cx="955" cy="1694" r="4" fill={dotColor} />
      <circle cx="955" cy="1759" r="4" fill={dotColor} />
      <circle cx="955" cy="1824" r="4" fill={dotColor} />
      <circle cx="955" cy="1889" r="4" fill={dotColor} />
      <circle cx="955" cy="1954" r="4" fill={dotColor} />
      <circle cx="955" cy="2019" r="4" fill={dotColor} />
      <circle cx="955" cy="2084" r="4" fill={dotColor} />
      <circle cx="955" cy="2149" r="4" fill={dotColor} />
      <circle cx="955" cy="2214" r="4" fill={dotColor} />
      <circle cx="955" cy="2279" r="4" fill={dotColor} />
      <circle cx="955" cy="2344" r="4" fill={dotColor} />
      <circle cx="955" cy="2409" r="4" fill={dotColor} />
      <circle cx="955" cy="2474" r="4" fill={dotColor} />
      <circle cx="955" cy="2539" r="4" fill={dotColor} />
      <circle cx="955" cy="2604" r="4" fill={dotColor} />
      <circle cx="955" cy="2669" r="4" fill={dotColor} />
      <circle cx="955" cy="2734" r="4" fill={dotColor} />
      <circle cx="955" cy="2799" r="4" fill={dotColor} />
      <circle cx="955" cy="2864" r="4" fill={dotColor} />
      <circle cx="955" cy="2929" r="4" fill={dotColor} />
      <circle cx="955" cy="2994" r="4" fill={dotColor} />
      <circle cx="955" cy="3059" r="4" fill={dotColor} />
      <circle cx="955" cy="3124" r="4" fill={dotColor} />
      <circle cx="955" cy="3189" r="4" fill={dotColor} />
      <circle cx="955" cy="3254" r="4" fill={dotColor} />
      <circle cx="1013" cy="4" r="4" fill={dotColor} />
      <circle cx="1013" cy="69" r="4" fill={dotColor} />
      <circle cx="1013" cy="134" r="4" fill={dotColor} />
      <circle cx="1013" cy="199" r="4" fill={dotColor} />
      <circle cx="1013" cy="264" r="4" fill={dotColor} />
      <circle cx="1013" cy="329" r="4" fill={dotColor} />
      <circle cx="1013" cy="394" r="4" fill={dotColor} />
      <circle cx="1013" cy="459" r="4" fill={dotColor} />
      <circle cx="1013" cy="524" r="4" fill={dotColor} />
      <circle cx="1013" cy="589" r="4" fill={dotColor} />
      <circle cx="1013" cy="654" r="4" fill={dotColor} />
      <circle cx="1013" cy="719" r="4" fill={dotColor} />
      <circle cx="1013" cy="784" r="4" fill={dotColor} />
      <circle cx="1013" cy="849" r="4" fill={dotColor} />
      <circle cx="1013" cy="914" r="4" fill={dotColor} />
      <circle cx="1013" cy="979" r="4" fill={dotColor} />
      <circle cx="1013" cy="1044" r="4" fill={dotColor} />
      <circle cx="1013" cy="1109" r="4" fill={dotColor} />
      <circle cx="1013" cy="1174" r="4" fill={dotColor} />
      <circle cx="1013" cy="1239" r="4" fill={dotColor} />
      <circle cx="1013" cy="1304" r="4" fill={dotColor} />
      <circle cx="1013" cy="1369" r="4" fill={dotColor} />
      <circle cx="1013" cy="1434" r="4" fill={dotColor} />
      <circle cx="1013" cy="1499" r="4" fill={dotColor} />
      <circle cx="1013" cy="1564" r="4" fill={dotColor} />
      <circle cx="1013" cy="1629" r="4" fill={dotColor} />
      <circle cx="1013" cy="1694" r="4" fill={dotColor} />
      <circle cx="1013" cy="1759" r="4" fill={dotColor} />
      <circle cx="1013" cy="1824" r="4" fill={dotColor} />
      <circle cx="1013" cy="1889" r="4" fill={dotColor} />
      <circle cx="1013" cy="1954" r="4" fill={dotColor} />
      <circle cx="1013" cy="2019" r="4" fill={dotColor} />
      <circle cx="1013" cy="2084" r="4" fill={dotColor} />
      <circle cx="1013" cy="2149" r="4" fill={dotColor} />
      <circle cx="1013" cy="2214" r="4" fill={dotColor} />
      <circle cx="1013" cy="2279" r="4" fill={dotColor} />
      <circle cx="1013" cy="2344" r="4" fill={dotColor} />
      <circle cx="1013" cy="2409" r="4" fill={dotColor} />
      <circle cx="1013" cy="2474" r="4" fill={dotColor} />
      <circle cx="1013" cy="2539" r="4" fill={dotColor} />
      <circle cx="1013" cy="2604" r="4" fill={dotColor} />
      <circle cx="1013" cy="2669" r="4" fill={dotColor} />
      <circle cx="1013" cy="2734" r="4" fill={dotColor} />
      <circle cx="1013" cy="2799" r="4" fill={dotColor} />
      <circle cx="1013" cy="2864" r="4" fill={dotColor} />
      <circle cx="1013" cy="2929" r="4" fill={dotColor} />
      <circle cx="1013" cy="2994" r="4" fill={dotColor} />
      <circle cx="1013" cy="3059" r="4" fill={dotColor} />
      <circle cx="1013" cy="3124" r="4" fill={dotColor} />
      <circle cx="1013" cy="3189" r="4" fill={dotColor} />
      <circle cx="1013" cy="3254" r="4" fill={dotColor} />
      <circle cx="1071" cy="4" r="4" fill={dotColor} />
      <circle cx="1071" cy="69" r="4" fill={dotColor} />
      <circle cx="1071" cy="134" r="4" fill={dotColor} />
      <circle cx="1071" cy="199" r="4" fill={dotColor} />
      <circle cx="1071" cy="264" r="4" fill={dotColor} />
      <circle cx="1071" cy="329" r="4" fill={dotColor} />
      <circle cx="1071" cy="394" r="4" fill={dotColor} />
      <circle cx="1071" cy="459" r="4" fill={dotColor} />
      <circle cx="1071" cy="524" r="4" fill={dotColor} />
      <circle cx="1071" cy="589" r="4" fill={dotColor} />
      <circle cx="1071" cy="654" r="4" fill={dotColor} />
      <circle cx="1071" cy="719" r="4" fill={dotColor} />
      <circle cx="1071" cy="784" r="4" fill={dotColor} />
      <circle cx="1071" cy="849" r="4" fill={dotColor} />
      <circle cx="1071" cy="914" r="4" fill={dotColor} />
      <circle cx="1071" cy="979" r="4" fill={dotColor} />
      <circle cx="1071" cy="1044" r="4" fill={dotColor} />
      <circle cx="1071" cy="1109" r="4" fill={dotColor} />
      <circle cx="1071" cy="1174" r="4" fill={dotColor} />
      <circle cx="1071" cy="1239" r="4" fill={dotColor} />
      <circle cx="1071" cy="1304" r="4" fill={dotColor} />
      <circle cx="1071" cy="1369" r="4" fill={dotColor} />
      <circle cx="1071" cy="1434" r="4" fill={dotColor} />
      <circle cx="1071" cy="1499" r="4" fill={dotColor} />
      <circle cx="1071" cy="1564" r="4" fill={dotColor} />
      <circle cx="1071" cy="1629" r="4" fill={dotColor} />
      <circle cx="1071" cy="1694" r="4" fill={dotColor} />
      <circle cx="1071" cy="1759" r="4" fill={dotColor} />
      <circle cx="1071" cy="1824" r="4" fill={dotColor} />
      <circle cx="1071" cy="1889" r="4" fill={dotColor} />
      <circle cx="1071" cy="1954" r="4" fill={dotColor} />
      <circle cx="1071" cy="2019" r="4" fill={dotColor} />
      <circle cx="1071" cy="2084" r="4" fill={dotColor} />
      <circle cx="1071" cy="2149" r="4" fill={dotColor} />
      <circle cx="1071" cy="2214" r="4" fill={dotColor} />
      <circle cx="1071" cy="2279" r="4" fill={dotColor} />
      <circle cx="1071" cy="2344" r="4" fill={dotColor} />
      <circle cx="1071" cy="2409" r="4" fill={dotColor} />
      <circle cx="1071" cy="2474" r="4" fill={dotColor} />
      <circle cx="1071" cy="2539" r="4" fill={dotColor} />
      <circle cx="1071" cy="2604" r="4" fill={dotColor} />
      <circle cx="1071" cy="2669" r="4" fill={dotColor} />
      <circle cx="1071" cy="2734" r="4" fill={dotColor} />
      <circle cx="1071" cy="2799" r="4" fill={dotColor} />
      <circle cx="1071" cy="2864" r="4" fill={dotColor} />
      <circle cx="1071" cy="2929" r="4" fill={dotColor} />
      <circle cx="1071" cy="2994" r="4" fill={dotColor} />
      <circle cx="1071" cy="3059" r="4" fill={dotColor} />
      <circle cx="1071" cy="3124" r="4" fill={dotColor} />
      <circle cx="1071" cy="3189" r="4" fill={dotColor} />
      <circle cx="1071" cy="3254" r="4" fill={dotColor} />
      <circle cx="1129" cy="4" r="4" fill={dotColor} />
      <circle cx="1129" cy="69" r="4" fill={dotColor} />
      <circle cx="1129" cy="134" r="4" fill={dotColor} />
      <circle cx="1129" cy="199" r="4" fill={dotColor} />
      <circle cx="1129" cy="264" r="4" fill={dotColor} />
      <circle cx="1129" cy="329" r="4" fill={dotColor} />
      <circle cx="1129" cy="394" r="4" fill={dotColor} />
      <circle cx="1129" cy="459" r="4" fill={dotColor} />
      <circle cx="1129" cy="524" r="4" fill={dotColor} />
      <circle cx="1129" cy="589" r="4" fill={dotColor} />
      <circle cx="1129" cy="654" r="4" fill={dotColor} />
      <circle cx="1129" cy="719" r="4" fill={dotColor} />
      <circle cx="1129" cy="784" r="4" fill={dotColor} />
      <circle cx="1129" cy="849" r="4" fill={dotColor} />
      <circle cx="1129" cy="914" r="4" fill={dotColor} />
      <circle cx="1129" cy="979" r="4" fill={dotColor} />
      <circle cx="1129" cy="1044" r="4" fill={dotColor} />
      <circle cx="1129" cy="1109" r="4" fill={dotColor} />
      <circle cx="1129" cy="1174" r="4" fill={dotColor} />
      <circle cx="1129" cy="1239" r="4" fill={dotColor} />
      <circle cx="1129" cy="1304" r="4" fill={dotColor} />
      <circle cx="1129" cy="1369" r="4" fill={dotColor} />
      <circle cx="1129" cy="1434" r="4" fill={dotColor} />
      <circle cx="1129" cy="1499" r="4" fill={dotColor} />
      <circle cx="1129" cy="1564" r="4" fill={dotColor} />
      <circle cx="1129" cy="1629" r="4" fill={dotColor} />
      <circle cx="1129" cy="1694" r="4" fill={dotColor} />
      <circle cx="1129" cy="1759" r="4" fill={dotColor} />
      <circle cx="1129" cy="1824" r="4" fill={dotColor} />
      <circle cx="1129" cy="1889" r="4" fill={dotColor} />
      <circle cx="1129" cy="1954" r="4" fill={dotColor} />
      <circle cx="1129" cy="2019" r="4" fill={dotColor} />
      <circle cx="1129" cy="2084" r="4" fill={dotColor} />
      <circle cx="1129" cy="2149" r="4" fill={dotColor} />
      <circle cx="1129" cy="2214" r="4" fill={dotColor} />
      <circle cx="1129" cy="2279" r="4" fill={dotColor} />
      <circle cx="1129" cy="2344" r="4" fill={dotColor} />
      <circle cx="1129" cy="2409" r="4" fill={dotColor} />
      <circle cx="1129" cy="2474" r="4" fill={dotColor} />
      <circle cx="1129" cy="2539" r="4" fill={dotColor} />
      <circle cx="1129" cy="2604" r="4" fill={dotColor} />
      <circle cx="1129" cy="2669" r="4" fill={dotColor} />
      <circle cx="1129" cy="2734" r="4" fill={dotColor} />
      <circle cx="1129" cy="2799" r="4" fill={dotColor} />
      <circle cx="1129" cy="2864" r="4" fill={dotColor} />
      <circle cx="1129" cy="2929" r="4" fill={dotColor} />
      <circle cx="1129" cy="2994" r="4" fill={dotColor} />
      <circle cx="1129" cy="3059" r="4" fill={dotColor} />
      <circle cx="1129" cy="3124" r="4" fill={dotColor} />
      <circle cx="1129" cy="3189" r="4" fill={dotColor} />
      <circle cx="1129" cy="3254" r="4" fill={dotColor} />
      <circle cx="1187" cy="4" r="4" fill={dotColor} />
      <circle cx="1187" cy="69" r="4" fill={dotColor} />
      <circle cx="1187" cy="134" r="4" fill={dotColor} />
      <circle cx="1187" cy="199" r="4" fill={dotColor} />
      <circle cx="1187" cy="264" r="4" fill={dotColor} />
      <circle cx="1187" cy="329" r="4" fill={dotColor} />
      <circle cx="1187" cy="394" r="4" fill={dotColor} />
      <circle cx="1187" cy="459" r="4" fill={dotColor} />
      <circle cx="1187" cy="524" r="4" fill={dotColor} />
      <circle cx="1187" cy="589" r="4" fill={dotColor} />
      <circle cx="1187" cy="654" r="4" fill={dotColor} />
      <circle cx="1187" cy="719" r="4" fill={dotColor} />
      <circle cx="1187" cy="784" r="4" fill={dotColor} />
      <circle cx="1187" cy="849" r="4" fill={dotColor} />
      <circle cx="1187" cy="914" r="4" fill={dotColor} />
      <circle cx="1187" cy="979" r="4" fill={dotColor} />
      <circle cx="1187" cy="1044" r="4" fill={dotColor} />
      <circle cx="1187" cy="1109" r="4" fill={dotColor} />
      <circle cx="1187" cy="1174" r="4" fill={dotColor} />
      <circle cx="1187" cy="1239" r="4" fill={dotColor} />
      <circle cx="1187" cy="1304" r="4" fill={dotColor} />
      <circle cx="1187" cy="1369" r="4" fill={dotColor} />
      <circle cx="1187" cy="1434" r="4" fill={dotColor} />
      <circle cx="1187" cy="1499" r="4" fill={dotColor} />
      <circle cx="1187" cy="1564" r="4" fill={dotColor} />
      <circle cx="1187" cy="1629" r="4" fill={dotColor} />
      <circle cx="1187" cy="1694" r="4" fill={dotColor} />
      <circle cx="1187" cy="1759" r="4" fill={dotColor} />
      <circle cx="1187" cy="1824" r="4" fill={dotColor} />
      <circle cx="1187" cy="1889" r="4" fill={dotColor} />
      <circle cx="1187" cy="1954" r="4" fill={dotColor} />
      <circle cx="1187" cy="2019" r="4" fill={dotColor} />
      <circle cx="1187" cy="2084" r="4" fill={dotColor} />
      <circle cx="1187" cy="2149" r="4" fill={dotColor} />
      <circle cx="1187" cy="2214" r="4" fill={dotColor} />
      <circle cx="1187" cy="2279" r="4" fill={dotColor} />
      <circle cx="1187" cy="2344" r="4" fill={dotColor} />
      <circle cx="1187" cy="2409" r="4" fill={dotColor} />
      <circle cx="1187" cy="2474" r="4" fill={dotColor} />
      <circle cx="1187" cy="2539" r="4" fill={dotColor} />
      <circle cx="1187" cy="2604" r="4" fill={dotColor} />
      <circle cx="1187" cy="2669" r="4" fill={dotColor} />
      <circle cx="1187" cy="2734" r="4" fill={dotColor} />
      <circle cx="1187" cy="2799" r="4" fill={dotColor} />
      <circle cx="1187" cy="2864" r="4" fill={dotColor} />
      <circle cx="1187" cy="2929" r="4" fill={dotColor} />
      <circle cx="1187" cy="2994" r="4" fill={dotColor} />
      <circle cx="1187" cy="3059" r="4" fill={dotColor} />
      <circle cx="1187" cy="3124" r="4" fill={dotColor} />
      <circle cx="1187" cy="3189" r="4" fill={dotColor} />
      <circle cx="1187" cy="3254" r="4" fill={dotColor} />
      <circle cx="1245" cy="4" r="4" fill={dotColor} />
      <circle cx="1245" cy="69" r="4" fill={dotColor} />
      <circle cx="1245" cy="134" r="4" fill={dotColor} />
      <circle cx="1245" cy="199" r="4" fill={dotColor} />
      <circle cx="1245" cy="264" r="4" fill={dotColor} />
      <circle cx="1245" cy="329" r="4" fill={dotColor} />
      <circle cx="1245" cy="394" r="4" fill={dotColor} />
      <circle cx="1245" cy="459" r="4" fill={dotColor} />
      <circle cx="1245" cy="524" r="4" fill={dotColor} />
      <circle cx="1245" cy="589" r="4" fill={dotColor} />
      <circle cx="1245" cy="654" r="4" fill={dotColor} />
      <circle cx="1245" cy="719" r="4" fill={dotColor} />
      <circle cx="1245" cy="784" r="4" fill={dotColor} />
      <circle cx="1245" cy="849" r="4" fill={dotColor} />
      <circle cx="1245" cy="914" r="4" fill={dotColor} />
      <circle cx="1245" cy="979" r="4" fill={dotColor} />
      <circle cx="1245" cy="1044" r="4" fill={dotColor} />
      <circle cx="1245" cy="1109" r="4" fill={dotColor} />
      <circle cx="1245" cy="1174" r="4" fill={dotColor} />
      <circle cx="1245" cy="1239" r="4" fill={dotColor} />
      <circle cx="1245" cy="1304" r="4" fill={dotColor} />
      <circle cx="1245" cy="1369" r="4" fill={dotColor} />
      <circle cx="1245" cy="1434" r="4" fill={dotColor} />
      <circle cx="1245" cy="1499" r="4" fill={dotColor} />
      <circle cx="1245" cy="1564" r="4" fill={dotColor} />
      <circle cx="1245" cy="1629" r="4" fill={dotColor} />
      <circle cx="1245" cy="1694" r="4" fill={dotColor} />
      <circle cx="1245" cy="1759" r="4" fill={dotColor} />
      <circle cx="1245" cy="1824" r="4" fill={dotColor} />
      <circle cx="1245" cy="1889" r="4" fill={dotColor} />
      <circle cx="1245" cy="1954" r="4" fill={dotColor} />
      <circle cx="1245" cy="2019" r="4" fill={dotColor} />
      <circle cx="1245" cy="2084" r="4" fill={dotColor} />
      <circle cx="1245" cy="2149" r="4" fill={dotColor} />
      <circle cx="1245" cy="2214" r="4" fill={dotColor} />
      <circle cx="1245" cy="2279" r="4" fill={dotColor} />
      <circle cx="1245" cy="2344" r="4" fill={dotColor} />
      <circle cx="1245" cy="2409" r="4" fill={dotColor} />
      <circle cx="1245" cy="2474" r="4" fill={dotColor} />
      <circle cx="1245" cy="2539" r="4" fill={dotColor} />
      <circle cx="1245" cy="2604" r="4" fill={dotColor} />
      <circle cx="1245" cy="2669" r="4" fill={dotColor} />
      <circle cx="1245" cy="2734" r="4" fill={dotColor} />
      <circle cx="1245" cy="2799" r="4" fill={dotColor} />
      <circle cx="1245" cy="2864" r="4" fill={dotColor} />
      <circle cx="1245" cy="2929" r="4" fill={dotColor} />
      <circle cx="1245" cy="2994" r="4" fill={dotColor} />
      <circle cx="1245" cy="3059" r="4" fill={dotColor} />
      <circle cx="1245" cy="3124" r="4" fill={dotColor} />
      <circle cx="1245" cy="3189" r="4" fill={dotColor} />
      <circle cx="1245" cy="3254" r="4" fill={dotColor} />
      <circle cx="1303" cy="4" r="4" fill={dotColor} />
      <circle cx="1303" cy="69" r="4" fill={dotColor} />
      <circle cx="1303" cy="134" r="4" fill={dotColor} />
      <circle cx="1303" cy="199" r="4" fill={dotColor} />
      <circle cx="1303" cy="264" r="4" fill={dotColor} />
      <circle cx="1303" cy="329" r="4" fill={dotColor} />
      <circle cx="1303" cy="394" r="4" fill={dotColor} />
      <circle cx="1303" cy="459" r="4" fill={dotColor} />
      <circle cx="1303" cy="524" r="4" fill={dotColor} />
      <circle cx="1303" cy="589" r="4" fill={dotColor} />
      <circle cx="1303" cy="654" r="4" fill={dotColor} />
      <circle cx="1303" cy="719" r="4" fill={dotColor} />
      <circle cx="1303" cy="784" r="4" fill={dotColor} />
      <circle cx="1303" cy="849" r="4" fill={dotColor} />
      <circle cx="1303" cy="914" r="4" fill={dotColor} />
      <circle cx="1303" cy="979" r="4" fill={dotColor} />
      <circle cx="1303" cy="1044" r="4" fill={dotColor} />
      <circle cx="1303" cy="1109" r="4" fill={dotColor} />
      <circle cx="1303" cy="1174" r="4" fill={dotColor} />
      <circle cx="1303" cy="1239" r="4" fill={dotColor} />
      <circle cx="1303" cy="1304" r="4" fill={dotColor} />
      <circle cx="1303" cy="1369" r="4" fill={dotColor} />
      <circle cx="1303" cy="1434" r="4" fill={dotColor} />
      <circle cx="1303" cy="1499" r="4" fill={dotColor} />
      <circle cx="1303" cy="1564" r="4" fill={dotColor} />
      <circle cx="1303" cy="1629" r="4" fill={dotColor} />
      <circle cx="1303" cy="1694" r="4" fill={dotColor} />
      <circle cx="1303" cy="1759" r="4" fill={dotColor} />
      <circle cx="1303" cy="1824" r="4" fill={dotColor} />
      <circle cx="1303" cy="1889" r="4" fill={dotColor} />
      <circle cx="1303" cy="1954" r="4" fill={dotColor} />
      <circle cx="1303" cy="2019" r="4" fill={dotColor} />
      <circle cx="1303" cy="2084" r="4" fill={dotColor} />
      <circle cx="1303" cy="2149" r="4" fill={dotColor} />
      <circle cx="1303" cy="2214" r="4" fill={dotColor} />
      <circle cx="1303" cy="2279" r="4" fill={dotColor} />
      <circle cx="1303" cy="2344" r="4" fill={dotColor} />
      <circle cx="1303" cy="2409" r="4" fill={dotColor} />
      <circle cx="1303" cy="2474" r="4" fill={dotColor} />
      <circle cx="1303" cy="2539" r="4" fill={dotColor} />
      <circle cx="1303" cy="2604" r="4" fill={dotColor} />
      <circle cx="1303" cy="2669" r="4" fill={dotColor} />
      <circle cx="1303" cy="2734" r="4" fill={dotColor} />
      <circle cx="1303" cy="2799" r="4" fill={dotColor} />
      <circle cx="1303" cy="2864" r="4" fill={dotColor} />
      <circle cx="1303" cy="2929" r="4" fill={dotColor} />
      <circle cx="1303" cy="2994" r="4" fill={dotColor} />
      <circle cx="1303" cy="3059" r="4" fill={dotColor} />
      <circle cx="1303" cy="3124" r="4" fill={dotColor} />
      <circle cx="1303" cy="3189" r="4" fill={dotColor} />
      <circle cx="1303" cy="3254" r="4" fill={dotColor} />
      <circle cx="1361" cy="4" r="4" fill={dotColor} />
      <circle cx="1361" cy="69" r="4" fill={dotColor} />
      <circle cx="1361" cy="134" r="4" fill={dotColor} />
      <circle cx="1361" cy="199" r="4" fill={dotColor} />
      <circle cx="1361" cy="264" r="4" fill={dotColor} />
      <circle cx="1361" cy="329" r="4" fill={dotColor} />
      <circle cx="1361" cy="394" r="4" fill={dotColor} />
      <circle cx="1361" cy="459" r="4" fill={dotColor} />
      <circle cx="1361" cy="524" r="4" fill={dotColor} />
      <circle cx="1361" cy="589" r="4" fill={dotColor} />
      <circle cx="1361" cy="654" r="4" fill={dotColor} />
      <circle cx="1361" cy="719" r="4" fill={dotColor} />
      <circle cx="1361" cy="784" r="4" fill={dotColor} />
      <circle cx="1361" cy="849" r="4" fill={dotColor} />
      <circle cx="1361" cy="914" r="4" fill={dotColor} />
      <circle cx="1361" cy="979" r="4" fill={dotColor} />
      <circle cx="1361" cy="1044" r="4" fill={dotColor} />
      <circle cx="1361" cy="1109" r="4" fill={dotColor} />
      <circle cx="1361" cy="1174" r="4" fill={dotColor} />
      <circle cx="1361" cy="1239" r="4" fill={dotColor} />
      <circle cx="1361" cy="1304" r="4" fill={dotColor} />
      <circle cx="1361" cy="1369" r="4" fill={dotColor} />
      <circle cx="1361" cy="1434" r="4" fill={dotColor} />
      <circle cx="1361" cy="1499" r="4" fill={dotColor} />
      <circle cx="1361" cy="1564" r="4" fill={dotColor} />
      <circle cx="1361" cy="1629" r="4" fill={dotColor} />
      <circle cx="1361" cy="1694" r="4" fill={dotColor} />
      <circle cx="1361" cy="1759" r="4" fill={dotColor} />
      <circle cx="1361" cy="1824" r="4" fill={dotColor} />
      <circle cx="1361" cy="1889" r="4" fill={dotColor} />
      <circle cx="1361" cy="1954" r="4" fill={dotColor} />
      <circle cx="1361" cy="2019" r="4" fill={dotColor} />
      <circle cx="1361" cy="2084" r="4" fill={dotColor} />
      <circle cx="1361" cy="2149" r="4" fill={dotColor} />
      <circle cx="1361" cy="2214" r="4" fill={dotColor} />
      <circle cx="1361" cy="2279" r="4" fill={dotColor} />
      <circle cx="1361" cy="2344" r="4" fill={dotColor} />
      <circle cx="1361" cy="2409" r="4" fill={dotColor} />
      <circle cx="1361" cy="2474" r="4" fill={dotColor} />
      <circle cx="1361" cy="2539" r="4" fill={dotColor} />
      <circle cx="1361" cy="2604" r="4" fill={dotColor} />
      <circle cx="1361" cy="2669" r="4" fill={dotColor} />
      <circle cx="1361" cy="2734" r="4" fill={dotColor} />
      <circle cx="1361" cy="2799" r="4" fill={dotColor} />
      <circle cx="1361" cy="2864" r="4" fill={dotColor} />
      <circle cx="1361" cy="2929" r="4" fill={dotColor} />
      <circle cx="1361" cy="2994" r="4" fill={dotColor} />
      <circle cx="1361" cy="3059" r="4" fill={dotColor} />
      <circle cx="1361" cy="3124" r="4" fill={dotColor} />
      <circle cx="1361" cy="3189" r="4" fill={dotColor} />
      <circle cx="1361" cy="3254" r="4" fill={dotColor} />
      <circle cx="1419" cy="4" r="4" fill={dotColor} />
      <circle cx="1419" cy="69" r="4" fill={dotColor} />
      <circle cx="1419" cy="134" r="4" fill={dotColor} />
      <circle cx="1419" cy="199" r="4" fill={dotColor} />
      <circle cx="1419" cy="264" r="4" fill={dotColor} />
      <circle cx="1419" cy="329" r="4" fill={dotColor} />
      <circle cx="1419" cy="394" r="4" fill={dotColor} />
      <circle cx="1419" cy="459" r="4" fill={dotColor} />
      <circle cx="1419" cy="524" r="4" fill={dotColor} />
      <circle cx="1419" cy="589" r="4" fill={dotColor} />
      <circle cx="1419" cy="654" r="4" fill={dotColor} />
      <circle cx="1419" cy="719" r="4" fill={dotColor} />
      <circle cx="1419" cy="784" r="4" fill={dotColor} />
      <circle cx="1419" cy="849" r="4" fill={dotColor} />
      <circle cx="1419" cy="914" r="4" fill={dotColor} />
      <circle cx="1419" cy="979" r="4" fill={dotColor} />
      <circle cx="1419" cy="1044" r="4" fill={dotColor} />
      <circle cx="1419" cy="1109" r="4" fill={dotColor} />
      <circle cx="1419" cy="1174" r="4" fill={dotColor} />
      <circle cx="1419" cy="1239" r="4" fill={dotColor} />
      <circle cx="1419" cy="1304" r="4" fill={dotColor} />
      <circle cx="1419" cy="1369" r="4" fill={dotColor} />
      <circle cx="1419" cy="1434" r="4" fill={dotColor} />
      <circle cx="1419" cy="1499" r="4" fill={dotColor} />
      <circle cx="1419" cy="1564" r="4" fill={dotColor} />
      <circle cx="1419" cy="1629" r="4" fill={dotColor} />
      <circle cx="1419" cy="1694" r="4" fill={dotColor} />
      <circle cx="1419" cy="1759" r="4" fill={dotColor} />
      <circle cx="1419" cy="1824" r="4" fill={dotColor} />
      <circle cx="1419" cy="1889" r="4" fill={dotColor} />
      <circle cx="1419" cy="1954" r="4" fill={dotColor} />
      <circle cx="1419" cy="2019" r="4" fill={dotColor} />
      <circle cx="1419" cy="2084" r="4" fill={dotColor} />
      <circle cx="1419" cy="2149" r="4" fill={dotColor} />
      <circle cx="1419" cy="2214" r="4" fill={dotColor} />
      <circle cx="1419" cy="2279" r="4" fill={dotColor} />
      <circle cx="1419" cy="2344" r="4" fill={dotColor} />
      <circle cx="1419" cy="2409" r="4" fill={dotColor} />
      <circle cx="1419" cy="2474" r="4" fill={dotColor} />
      <circle cx="1419" cy="2539" r="4" fill={dotColor} />
      <circle cx="1419" cy="2604" r="4" fill={dotColor} />
      <circle cx="1419" cy="2669" r="4" fill={dotColor} />
      <circle cx="1419" cy="2734" r="4" fill={dotColor} />
      <circle cx="1419" cy="2799" r="4" fill={dotColor} />
      <circle cx="1419" cy="2864" r="4" fill={dotColor} />
      <circle cx="1419" cy="2929" r="4" fill={dotColor} />
      <circle cx="1419" cy="2994" r="4" fill={dotColor} />
      <circle cx="1419" cy="3059" r="4" fill={dotColor} />
      <circle cx="1419" cy="3124" r="4" fill={dotColor} />
      <circle cx="1419" cy="3189" r="4" fill={dotColor} />
      <circle cx="1419" cy="3254" r="4" fill={dotColor} />
      <path
        d="M214.677 571.313C214.677 571.313 216.736 575.969 218.456 578.447C220.177 580.924 223.41 583.888 223.41 583.888C223.41 583.888 220.177 586.853 218.456 589.33C216.736 591.808 214.677 596.463 214.677 596.463C214.677 596.463 212.618 591.808 210.898 589.33C209.177 586.853 205.944 583.888 205.944 583.888C205.944 583.888 209.177 580.924 210.898 578.447C212.618 575.969 214.677 571.313 214.677 571.313Z"
        fill={orangeStarColor}
      />
      <path
        d="M1112.42 2532.54C1112.42 2532.54 1110.36 2527.88 1108.64 2525.4C1106.92 2522.93 1103.69 2519.96 1103.69 2519.96C1103.69 2519.96 1106.92 2517 1108.64 2514.52C1110.36 2512.04 1112.42 2507.39 1112.42 2507.39C1112.42 2507.39 1114.48 2512.04 1116.2 2514.52C1117.92 2517 1121.15 2519.96 1121.15 2519.96C1121.15 2519.96 1117.92 2522.93 1116.2 2525.4C1114.48 2527.88 1112.42 2532.54 1112.42 2532.54Z"
        fill={orangeStarColor}
      />
      <path
        d="M97.7322 3614.15C97.7322 3614.15 95.6737 3609.49 93.9532 3607.02C92.2326 3604.54 88.9996 3601.58 88.9996 3601.58C88.9996 3601.58 92.2326 3598.61 93.9532 3596.13C95.6737 3593.66 97.7322 3589 97.7322 3589C97.7322 3589 99.7907 3593.66 101.511 3596.13C103.232 3598.61 106.465 3601.58 106.465 3601.58C106.465 3601.58 103.232 3604.54 101.511 3607.02C99.7907 3609.49 97.7322 3614.15 97.7322 3614.15Z"
        fill={orangeStarColor}
      />
      <path
        d="M1241.73 3726.15C1241.73 3726.15 1239.67 3721.49 1237.95 3719.02C1236.23 3716.54 1233 3713.58 1233 3713.58C1233 3713.58 1236.23 3710.61 1237.95 3708.13C1239.67 3705.66 1241.73 3701 1241.73 3701C1241.73 3701 1243.79 3705.66 1245.51 3708.13C1247.23 3710.61 1250.46 3713.58 1250.46 3713.58C1250.46 3713.58 1247.23 3716.54 1245.51 3719.02C1243.79 3721.49 1241.73 3726.15 1241.73 3726.15Z"
        fill={greenStarColor}
      />
      <path
        d="M183.938 657.941C183.938 657.941 185.338 661.045 186.508 662.697C187.678 664.349 189.876 666.325 189.876 666.325C189.876 666.325 187.678 668.301 186.508 669.953C185.338 671.604 183.938 674.708 183.938 674.708C183.938 674.708 182.538 671.604 181.368 669.953C180.199 668.301 178 666.325 178 666.325C178 666.325 180.199 664.349 181.368 662.697C182.538 661.045 183.938 657.941 183.938 657.941Z"
        fill={orangeStarColor}
      />
      <path
        d="M136.938 969C136.938 969 138.338 972.104 139.508 973.755C140.678 975.407 142.876 977.383 142.876 977.383C142.876 977.383 140.678 979.36 139.508 981.011C138.338 982.663 136.938 985.767 136.938 985.767C136.938 985.767 135.538 982.663 134.368 981.011C133.199 979.36 131 977.383 131 977.383C131 977.383 133.199 975.407 134.368 973.755C135.538 972.104 136.938 969 136.938 969Z"
        fill={orangeStarColor}
      />
      <path
        d="M1233.94 1112C1233.94 1112 1235.34 1115.1 1236.51 1116.76C1237.68 1118.41 1239.88 1120.38 1239.88 1120.38C1239.88 1120.38 1237.68 1122.36 1236.51 1124.01C1235.34 1125.66 1233.94 1128.77 1233.94 1128.77C1233.94 1128.77 1232.54 1125.66 1231.37 1124.01C1230.2 1122.36 1228 1120.38 1228 1120.38C1228 1120.38 1230.2 1118.41 1231.37 1116.76C1232.54 1115.1 1233.94 1112 1233.94 1112Z"
        fill={orangeStarColor}
      />
      <path
        d="M1163.42 2443.81C1163.42 2443.81 1162.02 2440.71 1160.85 2439.06C1159.68 2437.41 1157.48 2435.43 1157.48 2435.43C1157.48 2435.43 1159.68 2433.45 1160.85 2431.8C1162.02 2430.15 1163.42 2427.05 1163.42 2427.05C1163.42 2427.05 1164.82 2430.15 1165.99 2431.8C1167.16 2433.45 1169.36 2435.43 1169.36 2435.43C1169.36 2435.43 1167.16 2437.41 1165.99 2439.06C1164.82 2440.71 1163.42 2443.81 1163.42 2443.81Z"
        fill={pinkStarColor}
      />
      <path
        d="M396.443 585.142C397.793 581.813 402.507 581.813 403.857 585.142L406.77 592.326C407.176 593.329 407.971 594.124 408.974 594.53L416.158 597.443C419.487 598.793 419.487 603.507 416.158 604.857L408.974 607.77C407.971 608.176 407.176 608.971 406.77 609.974L403.857 617.158C402.507 620.487 397.793 620.487 396.443 617.158L393.53 609.974C393.124 608.971 392.329 608.176 391.326 607.77L384.142 604.857C380.813 603.507 380.813 598.793 384.142 597.443L391.326 594.53C392.329 594.124 393.124 593.329 393.53 592.326L396.443 585.142Z"
        fill={blueStarColor}
      />
      <path
        d="M232.009 533.151C232.649 531.398 235.128 531.398 235.767 533.151L237.304 537.363C237.506 537.918 237.943 538.354 238.497 538.557L242.71 540.093C244.463 540.733 244.463 543.212 242.71 543.851L238.497 545.388C237.943 545.59 237.506 546.027 237.304 546.581L235.767 550.794C235.128 552.547 232.649 552.547 232.009 550.794L230.473 546.581C230.27 546.027 229.834 545.59 229.279 545.388L225.067 543.851C223.314 543.212 223.314 540.733 225.067 540.093L229.279 538.557C229.834 538.354 230.27 537.918 230.473 537.363L232.009 533.151Z"
        fill={blueStarColor}
      />
      <path
        d="M1087.4 2568.6C1086.76 2570.36 1084.28 2570.36 1083.64 2568.6L1082.11 2564.39C1081.91 2563.84 1081.47 2563.4 1080.91 2563.2L1076.7 2561.66C1074.95 2561.02 1074.95 2558.54 1076.7 2557.9L1080.91 2556.37C1081.47 2556.16 1081.91 2555.73 1082.11 2555.17L1083.64 2550.96C1084.28 2549.21 1086.76 2549.21 1087.4 2550.96L1088.94 2555.17C1089.14 2555.73 1089.58 2556.16 1090.13 2556.37L1094.35 2557.9C1096.1 2558.54 1096.1 2561.02 1094.35 2561.66L1090.13 2563.2C1089.58 2563.4 1089.14 2563.84 1088.94 2564.39L1087.4 2568.6Z"
        fill={blueStarColor}
      />
      <path
        d="M1280.13 598.151C1280.77 596.398 1283.25 596.398 1283.89 598.151L1285.43 602.363C1285.63 602.918 1286.07 603.354 1286.62 603.557L1290.83 605.093C1292.59 605.733 1292.59 608.212 1290.83 608.851L1286.62 610.388C1286.07 610.59 1285.63 611.027 1285.43 611.581L1283.89 615.794C1283.25 617.547 1280.77 617.547 1280.13 615.794L1278.6 611.581C1278.39 611.027 1277.96 610.59 1277.4 610.388L1273.19 608.851C1271.44 608.212 1271.44 605.733 1273.19 605.093L1277.4 603.557C1277.96 603.354 1278.39 602.918 1278.6 602.363L1280.13 598.151Z"
        fill={blueStarColor}
      />
      <path
        d="M505.195 772.993C505.834 771.241 508.313 771.241 508.953 772.993L510.489 777.206C510.692 777.76 511.128 778.197 511.683 778.399L515.895 779.936C517.648 780.576 517.648 783.054 515.895 783.694L511.683 785.231C511.128 785.433 510.692 785.87 510.489 786.424L508.953 790.637C508.313 792.389 505.834 792.389 505.195 790.637L503.658 786.424C503.456 785.87 503.019 785.433 502.465 785.231L498.252 783.694C496.499 783.054 496.499 780.576 498.252 779.936L502.465 778.399C503.019 778.197 503.456 777.76 503.658 777.206L505.195 772.993Z"
        fill={pinkStarColor}
      />
      <path
        d="M1043.82 1648.35C1044.46 1646.6 1046.94 1646.6 1047.58 1648.35L1049.12 1652.57C1049.32 1653.12 1049.76 1653.56 1050.31 1653.76L1054.53 1655.3C1056.28 1655.94 1056.28 1658.42 1054.53 1659.06L1050.31 1660.59C1049.76 1660.79 1049.32 1661.23 1049.12 1661.79L1047.58 1666C1046.94 1667.75 1044.46 1667.75 1043.82 1666L1042.29 1661.79C1042.09 1661.23 1041.65 1660.79 1041.09 1660.59L1036.88 1659.06C1035.13 1658.42 1035.13 1655.94 1036.88 1655.3L1041.09 1653.76C1041.65 1653.56 1042.09 1653.12 1042.29 1652.57L1043.82 1648.35Z"
        fill={pinkStarColor}
      />
      <path
        d="M193.326 3241.15C193.965 3239.4 196.444 3239.4 197.084 3241.15L198.62 3245.36C198.822 3245.92 199.259 3246.35 199.814 3246.56L204.026 3248.09C205.779 3248.73 205.779 3251.21 204.026 3251.85L199.814 3253.39C199.259 3253.59 198.822 3254.03 198.62 3254.58L197.084 3258.79C196.444 3260.55 193.965 3260.55 193.326 3258.79L191.789 3254.58C191.587 3254.03 191.15 3253.59 190.596 3253.39L186.383 3251.85C184.63 3251.21 184.63 3248.73 186.383 3248.09L190.596 3246.56C191.15 3246.35 191.587 3245.92 191.789 3245.36L193.326 3241.15Z"
        fill={pinkStarColor}
      />
      <path
        d="M387.851 2569.15C387.212 2567.4 384.733 2567.4 384.093 2569.15L382.557 2573.36C382.354 2573.92 381.917 2574.35 381.363 2574.56L377.15 2576.09C375.398 2576.73 375.398 2579.21 377.15 2579.85L381.363 2581.39C381.917 2581.59 382.354 2582.03 382.557 2582.58L384.093 2586.79C384.733 2588.55 387.212 2588.55 387.851 2586.79L389.388 2582.58C389.59 2582.03 390.027 2581.59 390.581 2581.39L394.794 2579.85C396.547 2579.21 396.547 2576.73 394.794 2576.09L390.581 2574.56C390.027 2574.35 389.59 2573.92 389.388 2573.36L387.851 2569.15Z"
        fill={yellowStarColor}
      />
      <path
        d="M158.851 3062.15C158.212 3060.4 155.733 3060.4 155.093 3062.15L153.557 3066.36C153.354 3066.92 152.917 3067.35 152.363 3067.56L148.15 3069.09C146.398 3069.73 146.398 3072.21 148.15 3072.85L152.363 3074.39C152.917 3074.59 153.354 3075.03 153.557 3075.58L155.093 3079.79C155.733 3081.55 158.212 3081.55 158.851 3079.79L160.388 3075.58C160.59 3075.03 161.027 3074.59 161.581 3074.39L165.794 3072.85C167.547 3072.21 167.547 3069.73 165.794 3069.09L161.581 3067.56C161.027 3067.35 160.59 3066.92 160.388 3066.36L158.851 3062.15Z"
        fill={yellowStarColor}
      />
      <path
        d="M888.804 1107.15C889.444 1105.4 891.923 1105.4 892.562 1107.15L894.099 1111.36C894.301 1111.92 894.738 1112.35 895.292 1112.56L899.505 1114.09C901.258 1114.73 901.258 1117.21 899.505 1117.85L895.292 1119.39C894.738 1119.59 894.301 1120.03 894.099 1120.58L892.562 1124.79C891.923 1126.55 889.444 1126.55 888.804 1124.79L887.268 1120.58C887.065 1120.03 886.629 1119.59 886.074 1119.39L881.862 1117.85C880.109 1117.21 880.109 1114.73 881.862 1114.09L886.074 1112.56C886.629 1112.35 887.065 1111.92 887.268 1111.36L888.804 1107.15Z"
        fill={pinkStarColor}
      />
      <path
        d="M646.804 3935.15C647.444 3933.4 649.923 3933.4 650.562 3935.15L652.099 3939.36C652.301 3939.92 652.738 3940.35 653.292 3940.56L657.505 3942.09C659.258 3942.73 659.258 3945.21 657.505 3945.85L653.292 3947.39C652.738 3947.59 652.301 3948.03 652.099 3948.58L650.562 3952.79C649.923 3954.55 647.444 3954.55 646.804 3952.79L645.268 3948.58C645.065 3948.03 644.629 3947.59 644.074 3947.39L639.862 3945.85C638.109 3945.21 638.109 3942.73 639.862 3942.09L644.074 3940.56C644.629 3940.35 645.065 3939.92 645.268 3939.36L646.804 3935.15Z"
        fill={pinkStarColor}
      />
      <path
        d="M331.505 2548.34C330.866 2550.1 328.387 2550.1 327.748 2548.34L326.211 2544.13C326.009 2543.58 325.572 2543.14 325.017 2542.94L320.805 2541.4C319.052 2540.76 319.052 2538.28 320.805 2537.64L325.017 2536.11C325.572 2535.9 326.009 2535.47 326.211 2534.91L327.748 2530.7C328.387 2528.95 330.866 2528.95 331.505 2530.7L333.042 2534.91C333.244 2535.47 333.681 2535.9 334.235 2536.11L338.448 2537.64C340.201 2538.28 340.201 2540.76 338.448 2541.4L334.235 2542.94C333.681 2543.14 333.244 2543.58 333.042 2544.13L331.505 2548.34Z"
        fill={pinkStarColor}
      />
      <path
        d="M1335.05 128.151C1335.69 126.398 1338.16 126.398 1338.8 128.151L1340.34 132.363C1340.54 132.918 1340.98 133.354 1341.53 133.557L1345.75 135.093C1347.5 135.733 1347.5 138.212 1345.75 138.851L1341.53 140.388C1340.98 140.59 1340.54 141.027 1340.34 141.581L1338.8 145.794C1338.16 147.547 1335.69 147.547 1335.05 145.794L1333.51 141.581C1333.31 141.027 1332.87 140.59 1332.32 140.388L1328.1 138.851C1326.35 138.212 1326.35 135.733 1328.1 135.093L1332.32 133.557C1332.87 133.354 1333.31 132.918 1333.51 132.363L1335.05 128.151Z"
        fill={orangeStarColor}
      />
      <path
        d="M1259.05 3312.15C1259.69 3310.4 1262.16 3310.4 1262.8 3312.15L1264.34 3316.36C1264.54 3316.92 1264.98 3317.35 1265.53 3317.56L1269.75 3319.09C1271.5 3319.73 1271.5 3322.21 1269.75 3322.85L1265.53 3324.39C1264.98 3324.59 1264.54 3325.03 1264.34 3325.58L1262.8 3329.79C1262.16 3331.55 1259.69 3331.55 1259.05 3329.79L1257.51 3325.58C1257.31 3325.03 1256.87 3324.59 1256.32 3324.39L1252.1 3322.85C1250.35 3322.21 1250.35 3319.73 1252.1 3319.09L1256.32 3317.56C1256.87 3317.35 1257.31 3316.92 1257.51 3316.36L1259.05 3312.15Z"
        fill={orangeStarColor}
      />
      <path
        d="M494.017 1787.56C494.657 1789.31 497.136 1789.31 497.775 1787.56L499.312 1783.34C499.514 1782.79 499.951 1782.35 500.505 1782.15L504.718 1780.61C506.47 1779.97 506.47 1777.5 504.718 1776.86L500.505 1775.32C499.951 1775.12 499.514 1774.68 499.312 1774.13L497.775 1769.91C497.136 1768.16 494.657 1768.16 494.017 1769.91L492.48 1774.13C492.278 1774.68 491.841 1775.12 491.287 1775.32L487.074 1776.86C485.322 1777.5 485.322 1779.97 487.074 1780.61L491.287 1782.15C491.841 1782.35 492.278 1782.79 492.48 1783.34L494.017 1787.56Z"
        fill={orangeStarColor}
      />
      <path
        d="M320.023 1367.33C321.776 1366.69 321.776 1364.21 320.023 1363.57L315.811 1362.03C315.256 1361.83 314.819 1361.39 314.617 1360.84L313.08 1356.63C312.441 1354.87 309.962 1354.87 309.323 1356.63L307.786 1360.84C307.584 1361.39 307.147 1361.83 306.593 1362.03L302.38 1363.57C300.627 1364.21 300.627 1366.69 302.38 1367.33L306.593 1368.86C307.147 1369.07 307.584 1369.5 307.786 1370.06L309.323 1374.27C309.962 1376.02 312.441 1376.02 313.08 1374.27L314.617 1370.06C314.819 1369.5 315.256 1369.07 315.811 1368.86L320.023 1367.33Z"
        fill={orangeStarColor}
      />
      <path
        d="M740.794 2341.85C742.547 2341.21 742.547 2338.73 740.794 2338.09L736.581 2336.56C736.027 2336.35 735.59 2335.92 735.388 2335.36L733.851 2331.15C733.212 2329.4 730.733 2329.4 730.093 2331.15L728.557 2335.36C728.354 2335.92 727.917 2336.35 727.363 2336.56L723.15 2338.09C721.398 2338.73 721.398 2341.21 723.15 2341.85L727.363 2343.39C727.917 2343.59 728.354 2344.03 728.557 2344.58L730.093 2348.79C730.733 2350.55 733.212 2350.55 733.851 2348.79L735.388 2344.58C735.59 2344.03 736.027 2343.59 736.581 2343.39L740.794 2341.85Z"
        fill={orangeStarColor}
      />
      <path
        d="M320.761 331.471C321.401 329.718 323.88 329.718 324.519 331.471L325.495 334.148C325.698 334.702 326.135 335.139 326.689 335.341L329.366 336.318C331.119 336.957 331.119 339.436 329.366 340.076L326.689 341.052C326.135 341.254 325.698 341.691 325.495 342.246L324.519 344.922C323.88 346.675 321.401 346.675 320.761 344.922L319.785 342.246C319.582 341.691 319.146 341.254 318.591 341.052L315.914 340.076C314.161 339.436 314.161 336.957 315.914 336.318L318.591 335.341C319.146 335.139 319.582 334.702 319.785 334.148L320.761 331.471Z"
        fill={blueStarColor}
      />
      <path
        d="M901.308 659.819C901.947 658.066 904.426 658.066 905.066 659.819L906.042 662.495C906.245 663.05 906.681 663.487 907.236 663.689L909.913 664.665C911.666 665.305 911.666 667.784 909.913 668.423L907.236 669.4C906.681 669.602 906.245 670.039 906.042 670.593L905.066 673.27C904.426 675.023 901.947 675.023 901.308 673.27L900.332 670.593C900.129 670.039 899.692 669.602 899.138 669.4L896.461 668.423C894.708 667.784 894.708 665.305 896.461 664.665L899.138 663.689C899.692 663.487 900.129 663.05 900.332 662.495L901.308 659.819Z"
        fill={yellowStarColor}
      />
      <path
        d="M1116.38 299.309C1117.02 297.556 1119.5 297.556 1120.14 299.309L1123.36 308.128C1123.56 308.683 1123.99 309.12 1124.55 309.322L1133.37 312.539C1135.12 313.178 1135.12 315.657 1133.37 316.297L1124.55 319.514C1123.99 319.716 1123.56 320.153 1123.36 320.708L1120.14 329.527C1119.5 331.28 1117.02 331.28 1116.38 329.527L1113.16 320.708C1112.96 320.153 1112.52 319.716 1111.97 319.514L1103.15 316.297C1101.4 315.657 1101.4 313.178 1103.15 312.539L1111.97 309.322C1112.52 309.12 1112.96 308.683 1113.16 308.128L1116.38 299.309Z"
        fill={greenStarColor}
      />
      <path
        d="M1040.38 3483.31C1041.02 3481.56 1043.5 3481.56 1044.14 3483.31L1047.36 3492.13C1047.56 3492.68 1047.99 3493.12 1048.55 3493.32L1057.37 3496.54C1059.12 3497.18 1059.12 3499.66 1057.37 3500.3L1048.55 3503.51C1047.99 3503.72 1047.56 3504.15 1047.36 3504.71L1044.14 3513.53C1043.5 3515.28 1041.02 3515.28 1040.38 3513.53L1037.16 3504.71C1036.96 3504.15 1036.52 3503.72 1035.97 3503.51L1027.15 3500.3C1025.4 3499.66 1025.4 3497.18 1027.15 3496.54L1035.97 3493.32C1036.52 3493.12 1036.96 3492.68 1037.16 3492.13L1040.38 3483.31Z"
        fill={greenStarColor}
      />
      <path
        d="M1308.63 1335.97C1309.28 1334.25 1311.72 1334.25 1312.37 1335.97L1318.86 1353.21C1319.07 1353.76 1319.51 1354.19 1320.06 1354.39L1337.67 1360.61C1339.44 1361.24 1339.44 1363.76 1337.67 1364.39L1320.06 1370.61C1319.51 1370.81 1319.07 1371.24 1318.86 1371.79L1312.37 1389.03C1311.72 1390.75 1309.28 1390.75 1308.63 1389.03L1302.14 1371.79C1301.93 1371.24 1301.49 1370.81 1300.94 1370.61L1283.33 1364.39C1281.56 1363.76 1281.56 1361.24 1283.33 1360.61L1300.94 1354.39C1301.49 1354.19 1301.93 1353.76 1302.14 1353.21L1308.63 1335.97Z"
        fill={greenStarColor}
      />
      <path
        d="M1213.25 2284.97C1213.89 2283.22 1216.37 2283.22 1217.01 2284.97L1217.98 2287.65C1218.18 2288.2 1218.62 2288.64 1219.18 2288.84L1221.85 2289.82C1223.6 2290.46 1223.6 2292.93 1221.85 2293.57L1219.18 2294.55C1218.62 2294.75 1218.18 2295.19 1217.98 2295.74L1217.01 2298.42C1216.37 2300.17 1213.89 2300.17 1213.25 2298.42L1212.27 2295.74C1212.07 2295.19 1211.63 2294.75 1211.08 2294.55L1208.4 2293.57C1206.65 2292.93 1206.65 2290.46 1208.4 2289.82L1211.08 2288.84C1211.63 2288.64 1212.07 2288.2 1212.27 2287.65L1213.25 2284.97Z"
        fill={blueStarColor}
      />
      <path
        d="M1294.79 269.967C1294.15 268.214 1291.67 268.214 1291.03 269.967L1290.06 272.644C1289.86 273.198 1289.42 273.635 1288.86 273.837L1286.19 274.814C1284.43 275.453 1284.43 277.932 1286.19 278.572L1288.86 279.548C1289.42 279.75 1289.86 280.187 1290.06 280.742L1291.03 283.419C1291.67 285.171 1294.15 285.171 1294.79 283.419L1295.77 280.742C1295.97 280.187 1296.41 279.75 1296.96 279.548L1299.64 278.572C1301.39 277.932 1301.39 275.453 1299.64 274.814L1296.96 273.837C1296.41 273.635 1295.97 273.198 1295.77 272.644L1294.79 269.967Z"
        fill={blueStarColor}
      />
      <path
        d="M1218.79 3453.97C1218.15 3452.21 1215.67 3452.21 1215.03 3453.97L1214.06 3456.64C1213.86 3457.2 1213.42 3457.64 1212.86 3457.84L1210.19 3458.81C1208.43 3459.45 1208.43 3461.93 1210.19 3462.57L1212.86 3463.55C1213.42 3463.75 1213.86 3464.19 1214.06 3464.74L1215.03 3467.42C1215.67 3469.17 1218.15 3469.17 1218.79 3467.42L1219.77 3464.74C1219.97 3464.19 1220.41 3463.75 1220.96 3463.55L1223.64 3462.57C1225.39 3461.93 1225.39 3459.45 1223.64 3458.81L1220.96 3457.84C1220.41 3457.64 1219.97 3457.2 1219.77 3456.64L1218.79 3453.97Z"
        fill={blueStarColor}
      />
      <path
        d="M496.377 2926.81C495.738 2925.06 493.259 2925.06 492.62 2926.81L491.643 2929.49C491.441 2930.04 491.004 2930.48 490.45 2930.68L487.773 2931.66C486.02 2932.3 486.02 2934.78 487.773 2935.42L490.45 2936.39C491.004 2936.6 491.441 2937.03 491.643 2937.59L492.62 2940.26C493.259 2942.02 495.738 2942.02 496.377 2940.26L497.354 2937.59C497.556 2937.03 497.993 2936.6 498.547 2936.39L501.224 2935.42C502.977 2934.78 502.977 2932.3 501.224 2931.66L498.547 2930.68C497.993 2930.48 497.556 2930.04 497.354 2929.49L496.377 2926.81Z"
        fill={blueStarColor}
      />
      <path
        d="M125.998 1186.15C126.637 1184.4 129.116 1184.4 129.755 1186.15L130.732 1188.83C130.934 1189.38 131.371 1189.82 131.925 1190.02L134.602 1191C136.355 1191.64 136.355 1194.12 134.602 1194.76L131.925 1195.73C131.371 1195.93 130.934 1196.37 130.732 1196.93L129.755 1199.6C129.116 1201.35 126.637 1201.35 125.998 1199.6L125.021 1196.93C124.819 1196.37 124.382 1195.93 123.828 1195.73L121.151 1194.76C119.398 1194.12 119.398 1191.64 121.151 1191L123.828 1190.02C124.382 1189.82 124.819 1189.38 125.021 1188.83L125.998 1186.15Z"
        fill={blueStarColor}
      />
      <path
        d="M457.256 1647.13C456.617 1648.89 454.138 1648.89 453.499 1647.13L452.522 1644.46C452.32 1643.9 451.883 1643.47 451.329 1643.26L448.652 1642.29C446.899 1641.65 446.899 1639.17 448.652 1638.53L451.329 1637.55C451.883 1637.35 452.32 1636.91 452.522 1636.36L453.499 1633.68C454.138 1631.93 456.617 1631.93 457.256 1633.68L458.233 1636.36C458.435 1636.91 458.872 1637.35 459.426 1637.55L462.103 1638.53C463.856 1639.17 463.856 1641.65 462.103 1642.29L459.426 1643.26C458.872 1643.47 458.435 1643.9 458.233 1644.46L457.256 1647.13Z"
        fill={greenStarColor}
      />
      <path
        d="M581.608 1224.48C580.969 1226.23 578.49 1226.23 577.85 1224.48L576.874 1221.8C576.671 1221.24 576.235 1220.81 575.68 1220.6L573.003 1219.63C571.25 1218.99 571.25 1216.51 573.003 1215.87L575.68 1214.89C576.235 1214.69 576.671 1214.26 576.874 1213.7L577.85 1211.02C578.49 1209.27 580.969 1209.27 581.608 1211.02L582.584 1213.7C582.787 1214.26 583.224 1214.69 583.778 1214.89L586.455 1215.87C588.208 1216.51 588.208 1218.99 586.455 1219.63L583.778 1220.6C583.224 1220.81 582.787 1221.24 582.584 1221.8L581.608 1224.48Z"
        fill={yellowStarColor}
      />
      <path
        d="M948.379 981.879C947.74 980.126 945.261 980.126 944.622 981.879L943.645 984.556C943.443 985.11 943.006 985.547 942.452 985.75L939.775 986.726C938.022 987.365 938.022 989.844 939.775 990.484L942.452 991.46C943.006 991.663 943.443 992.099 943.645 992.654L944.622 995.331C945.261 997.083 947.74 997.083 948.379 995.331L949.356 992.654C949.558 992.099 949.995 991.663 950.549 991.46L953.226 990.484C954.979 989.844 954.979 987.365 953.226 986.726L950.549 985.75C949.995 985.547 949.558 985.11 949.356 984.556L948.379 981.879Z"
        fill={blueStarColor}
      />
      <path
        d="M1241.76 1285.15C1241.12 1283.4 1238.64 1283.4 1238 1285.15L1237.02 1287.83C1236.82 1288.38 1236.38 1288.82 1235.83 1289.02L1233.15 1290C1231.4 1290.64 1231.4 1293.12 1233.15 1293.76L1235.83 1294.73C1236.38 1294.93 1236.82 1295.37 1237.02 1295.93L1238 1298.6C1238.64 1300.35 1241.12 1300.35 1241.76 1298.6L1242.73 1295.93C1242.93 1295.37 1243.37 1294.93 1243.93 1294.73L1246.6 1293.76C1248.36 1293.12 1248.36 1290.64 1246.6 1290L1243.93 1289.02C1243.37 1288.82 1242.93 1288.38 1242.73 1287.83L1241.76 1285.15Z"
        fill={blueStarColor}
      />
      <path
        d="M301.899 2156.94C302.538 2155.19 305.017 2155.19 305.657 2156.94L306.633 2159.62C306.835 2160.17 307.272 2160.61 307.827 2160.81L310.504 2161.79C312.256 2162.43 312.256 2164.91 310.504 2165.55L307.827 2166.52C307.272 2166.73 306.835 2167.16 306.633 2167.72L305.657 2170.39C305.017 2172.15 302.538 2172.15 301.899 2170.39L300.922 2167.72C300.72 2167.16 300.283 2166.73 299.729 2166.52L297.052 2165.55C295.299 2164.91 295.299 2162.43 297.052 2161.79L299.729 2160.81C300.283 2160.61 300.72 2160.17 300.922 2159.62L301.899 2156.94Z"
        fill={blueStarColor}
      />
      <path
        d="M796.781 1769.39C796.141 1771.14 793.662 1771.14 793.023 1769.39L792.047 1766.71C791.844 1766.16 791.407 1765.72 790.853 1765.52L788.176 1764.54C786.423 1763.91 786.423 1761.43 788.176 1760.79L790.853 1759.81C791.407 1759.61 791.844 1759.17 792.047 1758.62L793.023 1755.94C793.662 1754.19 796.141 1754.19 796.781 1755.94L797.757 1758.62C797.96 1759.17 798.396 1759.61 798.951 1759.81L801.628 1760.79C803.381 1761.43 803.381 1763.91 801.628 1764.54L798.951 1765.52C798.396 1765.72 797.96 1766.16 797.757 1766.71L796.781 1769.39Z"
        fill={blueStarColor}
      />
      <path
        d="M1047.58 1745.64C1046.94 1747.39 1044.46 1747.39 1043.82 1745.64L1042.85 1742.96C1042.65 1742.41 1042.21 1741.97 1041.65 1741.77L1038.98 1740.79C1037.23 1740.15 1037.23 1737.67 1038.98 1737.03L1041.65 1736.06C1042.21 1735.86 1042.65 1735.42 1042.85 1734.86L1043.82 1732.19C1044.46 1730.44 1046.94 1730.44 1047.58 1732.19L1048.56 1734.86C1048.76 1735.42 1049.2 1735.86 1049.75 1736.06L1052.43 1737.03C1054.18 1737.67 1054.18 1740.15 1052.43 1740.79L1049.75 1741.77C1049.2 1741.97 1048.76 1742.41 1048.56 1742.96L1047.58 1745.64Z"
        fill={blueStarColor}
      />
      <path
        d="M265.827 310.406C266.167 309.58 267.337 309.58 267.677 310.406L269.239 314.206C269.341 314.453 269.537 314.65 269.784 314.751L273.584 316.313C274.41 316.653 274.41 317.823 273.584 318.163L269.784 319.725C269.537 319.827 269.341 320.023 269.239 320.27L267.677 324.07C267.337 324.897 266.167 324.897 265.827 324.07L264.265 320.27C264.163 320.023 263.967 319.827 263.72 319.725L259.92 318.163C259.093 317.823 259.093 316.653 259.92 316.313L263.72 314.751C263.967 314.65 264.163 314.453 264.265 314.206L265.827 310.406Z"
        fill={blueStarColor}
      />
      <path
        d="M1038.31 2223.9C1038.65 2223.08 1039.82 2223.08 1040.16 2223.9L1041.72 2227.7C1041.83 2227.95 1042.02 2228.15 1042.27 2228.25L1046.07 2229.81C1046.9 2230.15 1046.9 2231.32 1046.07 2231.66L1042.27 2233.22C1042.02 2233.32 1041.83 2233.52 1041.72 2233.77L1040.16 2237.57C1039.82 2238.39 1038.65 2238.39 1038.31 2237.57L1036.75 2233.77C1036.65 2233.52 1036.45 2233.32 1036.21 2233.22L1032.41 2231.66C1031.58 2231.32 1031.58 2230.15 1032.41 2229.81L1036.21 2228.25C1036.45 2228.15 1036.65 2227.95 1036.75 2227.7L1038.31 2223.9Z"
        fill={greenStarColor}
      />
      <path
        d="M562.038 2760.44C562.378 2759.61 563.548 2759.61 563.888 2760.44L565.45 2764.24C565.551 2764.48 565.748 2764.68 565.995 2764.78L569.795 2766.34C570.621 2766.68 570.621 2767.85 569.795 2768.19L565.995 2769.76C565.748 2769.86 565.551 2770.05 565.45 2770.3L563.888 2774.1C563.548 2774.93 562.378 2774.93 562.038 2774.1L560.476 2770.3C560.374 2770.05 560.178 2769.86 559.931 2769.76L556.131 2768.19C555.304 2767.85 555.304 2766.68 556.131 2766.34L559.931 2764.78C560.178 2764.68 560.374 2764.48 560.476 2764.24L562.038 2760.44Z"
        fill={greenStarColor}
      />
      <path
        d="M1318.99 232.137C1318.65 231.31 1317.48 231.31 1317.14 232.137L1315.58 235.937C1315.47 236.184 1315.28 236.38 1315.03 236.482L1311.23 238.044C1310.4 238.383 1310.4 239.554 1311.23 239.894L1315.03 241.456C1315.28 241.557 1315.47 241.753 1315.58 242L1317.14 245.801C1317.48 246.627 1318.65 246.627 1318.99 245.801L1320.55 242C1320.65 241.753 1320.85 241.557 1321.09 241.456L1324.89 239.894C1325.72 239.554 1325.72 238.383 1324.89 238.044L1321.09 236.482C1320.85 236.38 1320.65 236.184 1320.55 235.937L1318.99 232.137Z"
        fill={blueStarColor}
      />
      <path
        d="M1242.99 3416.14C1242.65 3415.31 1241.48 3415.31 1241.14 3416.14L1239.58 3419.94C1239.47 3420.18 1239.28 3420.38 1239.03 3420.48L1235.23 3422.04C1234.4 3422.38 1234.4 3423.55 1235.23 3423.89L1239.03 3425.46C1239.28 3425.56 1239.47 3425.75 1239.58 3426L1241.14 3429.8C1241.48 3430.63 1242.65 3430.63 1242.99 3429.8L1244.55 3426C1244.65 3425.75 1244.85 3425.56 1245.09 3425.46L1248.89 3423.89C1249.72 3423.55 1249.72 3422.38 1248.89 3422.04L1245.09 3420.48C1244.85 3420.38 1244.65 3420.18 1244.55 3419.94L1242.99 3416.14Z"
        fill={blueStarColor}
      />
      <path
        d="M605.107 2813.53C604.767 2812.71 603.597 2812.71 603.257 2813.53L601.695 2817.33C601.593 2817.58 601.397 2817.78 601.15 2817.88L597.35 2819.44C596.523 2819.78 596.523 2820.95 597.35 2821.29L601.15 2822.85C601.397 2822.95 601.593 2823.15 601.695 2823.4L603.257 2827.2C603.597 2828.02 604.767 2828.02 605.107 2827.2L606.669 2823.4C606.77 2823.15 606.967 2822.95 607.214 2822.85L611.014 2821.29C611.84 2820.95 611.84 2819.78 611.014 2819.44L607.214 2817.88C606.967 2817.78 606.77 2817.58 606.669 2817.33L605.107 2813.53Z"
        fill={blueStarColor}
      />
      <path
        d="M109.157 942.947C109.497 942.121 110.667 942.121 111.007 942.947L112.569 946.747C112.671 946.994 112.867 947.191 113.114 947.292L116.914 948.854C117.74 949.194 117.74 950.364 116.914 950.704L113.114 952.266C112.867 952.368 112.671 952.564 112.569 952.811L111.007 956.611C110.667 957.438 109.497 957.438 109.157 956.611L107.595 952.811C107.493 952.564 107.297 952.368 107.05 952.266L103.25 950.704C102.423 950.364 102.423 949.194 103.25 948.854L107.05 947.292C107.297 947.191 107.493 946.994 107.595 946.747L109.157 942.947Z"
        fill={blueStarColor}
      />
      <path
        d="M477.959 1683.57C477.619 1684.39 476.449 1684.39 476.109 1683.57L474.547 1679.77C474.446 1679.52 474.249 1679.33 474.002 1679.22L470.202 1677.66C469.376 1677.32 469.376 1676.15 470.202 1675.81L474.002 1674.25C474.249 1674.15 474.446 1673.95 474.547 1673.7L476.109 1669.9C476.449 1669.08 477.619 1669.08 477.959 1669.9L479.521 1673.7C479.623 1673.95 479.819 1674.15 480.066 1674.25L483.866 1675.81C484.693 1676.15 484.693 1677.32 483.866 1677.66L480.066 1679.22C479.819 1679.33 479.623 1679.52 479.521 1679.77L477.959 1683.57Z"
        fill={blueStarColor}
      />
      <path
        d="M401.007 2459.91C400.667 2460.74 399.497 2460.74 399.157 2459.91L397.595 2456.11C397.493 2455.87 397.297 2455.67 397.05 2455.57L393.25 2454.01C392.424 2453.67 392.424 2452.5 393.25 2452.16L397.05 2450.59C397.297 2450.49 397.493 2450.3 397.595 2450.05L399.157 2446.25C399.497 2445.42 400.667 2445.42 401.007 2446.25L402.569 2450.05C402.671 2450.3 402.867 2450.49 403.114 2450.59L406.914 2452.16C407.741 2452.5 407.741 2453.67 406.914 2454.01L403.114 2455.57C402.867 2455.67 402.671 2455.87 402.569 2456.11L401.007 2459.91Z"
        fill={blueStarColor}
      />
      <path
        d="M273.007 2731.91C272.667 2732.74 271.497 2732.74 271.157 2731.91L269.595 2728.11C269.493 2727.87 269.297 2727.67 269.05 2727.57L265.25 2726.01C264.424 2725.67 264.424 2724.5 265.25 2724.16L269.05 2722.59C269.297 2722.49 269.493 2722.3 269.595 2722.05L271.157 2718.25C271.497 2717.42 272.667 2717.42 273.007 2718.25L274.569 2722.05C274.671 2722.3 274.867 2722.49 275.114 2722.59L278.914 2724.16C279.741 2724.5 279.741 2725.67 278.914 2726.01L275.114 2727.57C274.867 2727.67 274.671 2727.87 274.569 2728.11L273.007 2731.91Z"
        fill={blueStarColor}
      />
      <path
        d="M773.007 2655.91C772.667 2656.74 771.497 2656.74 771.157 2655.91L769.595 2652.11C769.493 2651.87 769.297 2651.67 769.05 2651.57L765.25 2650.01C764.424 2649.67 764.424 2648.5 765.25 2648.16L769.05 2646.59C769.297 2646.49 769.493 2646.3 769.595 2646.05L771.157 2642.25C771.497 2641.42 772.667 2641.42 773.007 2642.25L774.569 2646.05C774.671 2646.3 774.867 2646.49 775.114 2646.59L778.914 2648.16C779.741 2648.5 779.741 2649.67 778.914 2650.01L775.114 2651.57C774.867 2651.67 774.671 2651.87 774.569 2652.11L773.007 2655.91Z"
        fill={blueStarColor}
      />
      <path
        d="M94.9249 2523.75C94.5852 2524.58 93.4148 2524.58 93.0751 2523.75L89.2061 2514.34C89.1046 2514.09 88.9084 2513.9 88.6614 2513.79L79.2499 2509.92C78.4235 2509.59 78.4235 2508.41 79.2499 2508.08L88.6614 2504.21C88.9084 2504.1 89.1046 2503.91 89.2061 2503.66L93.0751 2494.25C93.4148 2493.42 94.5852 2493.42 94.9249 2494.25L98.7939 2503.66C98.8954 2503.91 99.0916 2504.1 99.3386 2504.21L108.75 2508.08C109.577 2508.41 109.577 2509.59 108.75 2509.92L99.3386 2513.79C99.0916 2513.9 98.8954 2514.09 98.7939 2514.34L94.9249 2523.75Z"
        fill={greenStarColor}
      />
      <path
        d="M260.691 2077.2C260.351 2076.37 259.181 2076.37 258.841 2077.2L257.279 2081C257.177 2081.24 256.981 2081.44 256.734 2081.54L252.934 2083.1C252.107 2083.44 252.107 2084.61 252.934 2084.95L256.734 2086.51C256.981 2086.62 257.177 2086.81 257.279 2087.06L258.841 2090.86C259.181 2091.69 260.351 2091.69 260.691 2090.86L262.253 2087.06C262.354 2086.81 262.551 2086.62 262.798 2086.51L266.598 2084.95C267.424 2084.61 267.424 2083.44 266.598 2083.1L262.798 2081.54C262.551 2081.44 262.354 2081.24 262.253 2081L260.691 2077.2Z"
        fill={blueStarColor}
      />
      <path
        d="M862.441 1863.11C862.781 1863.94 863.951 1863.94 864.291 1863.11L865.853 1859.31C865.955 1859.06 866.151 1858.87 866.398 1858.77L870.198 1857.2C871.025 1856.86 871.025 1855.69 870.198 1855.35L866.398 1853.79C866.151 1853.69 865.955 1853.49 865.853 1853.25L864.291 1849.45C863.951 1848.62 862.781 1848.62 862.441 1849.45L860.879 1853.25C860.777 1853.49 860.581 1853.69 860.334 1853.79L856.534 1855.35C855.708 1855.69 855.708 1856.86 856.534 1857.2L860.334 1858.77C860.581 1858.87 860.777 1859.06 860.879 1859.31L862.441 1863.11Z"
        fill={orangeStarColor}
      />
      <path
        d="M448.391 194.982C448.391 194.982 451.191 201.319 453.531 204.691C455.87 208.064 460.267 212.098 460.267 212.098C460.267 212.098 455.87 216.133 453.531 219.505C451.191 222.878 448.391 229.214 448.391 229.214C448.391 229.214 445.591 222.878 443.252 219.505C440.912 216.133 436.515 212.098 436.515 212.098C436.515 212.098 440.912 208.064 443.252 204.691C445.591 201.319 448.391 194.982 448.391 194.982Z"
        fill={yellowStarColor}
      />
      <path
        d="M503.581 990.002C503.581 990.002 506.381 996.339 508.721 999.711C511.061 1003.08 515.458 1007.12 515.458 1007.12C515.458 1007.12 511.061 1011.15 508.721 1014.52C506.381 1017.9 503.581 1024.23 503.581 1024.23C503.581 1024.23 500.782 1017.9 498.442 1014.52C496.102 1011.15 491.705 1007.12 491.705 1007.12C491.705 1007.12 496.102 1003.08 498.442 999.711C500.782 996.339 503.581 990.002 503.581 990.002Z"
        fill={yellowStarColor}
      />
      <path
        d="M1177.64 222.201C1177.64 222.201 1180.44 228.538 1182.78 231.91C1185.12 235.282 1189.52 239.317 1189.52 239.317C1189.52 239.317 1185.12 243.352 1182.78 246.724C1180.44 250.096 1177.64 256.433 1177.64 256.433C1177.64 256.433 1174.84 250.096 1172.5 246.724C1170.16 243.352 1165.77 239.317 1165.77 239.317C1165.77 239.317 1170.16 235.282 1172.5 231.91C1174.84 228.538 1177.64 222.201 1177.64 222.201Z"
        fill={yellowStarColor}
      />
      <path
        d="M1101.64 3406.2C1101.64 3406.2 1104.44 3412.54 1106.78 3415.91C1109.12 3419.28 1113.52 3423.32 1113.52 3423.32C1113.52 3423.32 1109.12 3427.35 1106.78 3430.72C1104.44 3434.1 1101.64 3440.43 1101.64 3440.43C1101.64 3440.43 1098.84 3434.1 1096.5 3430.72C1094.16 3427.35 1089.77 3423.32 1089.77 3423.32C1089.77 3423.32 1094.16 3419.28 1096.5 3415.91C1098.84 3412.54 1101.64 3406.2 1101.64 3406.2Z"
        fill={yellowStarColor}
      />
      <path
        d="M336.613 1693.5C336.613 1693.5 339.412 1687.17 341.752 1683.79C344.092 1680.42 348.489 1676.39 348.489 1676.39C348.489 1676.39 344.092 1672.35 341.752 1668.98C339.412 1665.61 336.613 1659.27 336.613 1659.27C336.613 1659.27 333.813 1665.61 331.473 1668.98C329.133 1672.35 324.736 1676.39 324.736 1676.39C324.736 1676.39 329.133 1680.42 331.473 1683.79C333.813 1687.17 336.613 1693.5 336.613 1693.5Z"
        fill={yellowStarColor}
      />
      <path
        d="M1354.67 876.636C1354.67 876.636 1357.47 882.973 1359.81 886.345C1362.15 889.717 1366.54 893.752 1366.54 893.752C1366.54 893.752 1362.15 897.786 1359.81 901.159C1357.47 904.531 1354.67 910.868 1354.67 910.868C1354.67 910.868 1351.87 904.531 1349.53 901.159C1347.19 897.786 1342.79 893.752 1342.79 893.752C1342.79 893.752 1347.19 889.717 1349.53 886.345C1351.87 882.973 1354.67 876.636 1354.67 876.636Z"
        fill={yellowStarColor}
      />
      <path
        d="M1164.47 1918.46C1164.47 1918.46 1167.27 1924.79 1169.61 1928.17C1171.95 1931.54 1176.34 1935.57 1176.34 1935.57C1176.34 1935.57 1171.95 1939.61 1169.61 1942.98C1167.27 1946.35 1164.47 1952.69 1164.47 1952.69C1164.47 1952.69 1161.67 1946.35 1159.33 1942.98C1156.99 1939.61 1152.59 1935.57 1152.59 1935.57C1152.59 1935.57 1156.99 1931.54 1159.33 1928.17C1161.67 1924.79 1164.47 1918.46 1164.47 1918.46Z"
        fill={yellowStarColor}
      />
      <path
        d="M867.558 795.788C867.558 795.788 869.369 799.409 870.883 801.336C872.397 803.263 875.242 805.569 875.242 805.569C875.242 805.569 872.397 807.874 870.883 809.801C869.369 811.728 867.558 815.349 867.558 815.349C867.558 815.349 865.746 811.728 864.232 809.801C862.718 807.874 859.873 805.569 859.873 805.569C859.873 805.569 862.718 803.263 864.232 801.336C865.746 799.409 867.558 795.788 867.558 795.788Z"
        fill={greenStarColor}
      />
      <path
        d="M701.986 1951.99C701.986 1951.99 703.798 1948.37 705.312 1946.44C706.826 1944.52 709.671 1942.21 709.671 1942.21C709.671 1942.21 706.826 1939.9 705.312 1937.98C703.798 1936.05 701.986 1932.43 701.986 1932.43C701.986 1932.43 700.175 1936.05 698.661 1937.98C697.147 1939.9 694.302 1942.21 694.302 1942.21C694.302 1942.21 697.147 1944.52 698.661 1946.44C700.175 1948.37 701.986 1951.99 701.986 1951.99Z"
        fill={greenStarColor}
      />
      <path
        d="M894.803 1633.42C894.803 1633.42 896.614 1637.04 898.128 1638.97C899.642 1640.9 902.488 1643.2 902.488 1643.2C902.488 1643.2 899.642 1645.51 898.128 1647.44C896.614 1649.36 894.803 1652.98 894.803 1652.98C894.803 1652.98 892.991 1649.36 891.477 1647.44C889.963 1645.51 887.118 1643.2 887.118 1643.2C887.118 1643.2 889.963 1640.9 891.477 1638.97C892.991 1637.04 894.803 1633.42 894.803 1633.42Z"
        fill={greenStarColor}
      />
      <path
        d="M555.065 67.8938C556.415 64.5646 561.128 64.5646 562.478 67.8938L564.585 73.0899C564.992 74.0923 565.787 74.8873 566.789 75.2937L571.985 77.4007C575.315 78.7506 575.315 83.4644 571.985 84.8144L566.789 86.9213C565.787 87.3277 564.992 88.1228 564.585 89.1251L562.478 94.3212C561.128 97.6504 556.415 97.6504 555.065 94.3212L552.958 89.1251C552.551 88.1228 551.756 87.3277 550.754 86.9213L545.558 84.8144C542.229 83.4644 542.229 78.7506 545.558 77.4007L550.754 75.2937C551.756 74.8873 552.551 74.0923 552.958 73.0899L555.065 67.8938Z"
        fill={greenStarColor}
      />
      <path
        d="M936.506 2930.8C937.856 2927.47 942.57 2927.47 943.92 2930.8L946.027 2936C946.433 2937 947.228 2937.8 948.231 2938.2L953.427 2940.31C956.756 2941.66 956.756 2946.37 953.427 2947.72L948.231 2949.83C947.228 2950.24 946.433 2951.03 946.027 2952.04L943.92 2957.23C942.57 2960.56 937.856 2960.56 936.506 2957.23L934.399 2952.04C933.993 2951.03 933.198 2950.24 932.195 2949.83L926.999 2947.72C923.67 2946.37 923.67 2941.66 926.999 2940.31L932.195 2938.2C933.198 2937.8 933.993 2937 934.399 2936L936.506 2930.8Z"
        fill={greenStarColor}
      />
      <path
        d="M312.465 898.142C313.815 894.813 318.529 894.813 319.879 898.142L321.986 903.338C322.392 904.34 323.187 905.135 324.19 905.542L329.386 907.649C332.715 908.999 332.715 913.712 329.386 915.062L324.19 917.169C323.187 917.576 322.392 918.371 321.986 919.373L319.879 924.569C318.529 927.898 313.815 927.898 312.465 924.569L310.358 919.373C309.952 918.371 309.157 917.576 308.154 917.169L302.958 915.062C299.629 913.712 299.629 908.999 302.958 907.649L308.154 905.542C309.157 905.135 309.952 904.34 310.358 903.338L312.465 898.142Z"
        fill={greenStarColor}
      />
      <path
        d="M1016.15 1694.96C1017.5 1691.63 1022.21 1691.63 1023.56 1694.96L1025.67 1700.16C1026.07 1701.16 1026.87 1701.95 1027.87 1702.36L1033.07 1704.47C1036.4 1705.82 1036.4 1710.53 1033.07 1711.88L1027.87 1713.99C1026.87 1714.39 1026.07 1715.19 1025.67 1716.19L1023.56 1721.39C1022.21 1724.72 1017.5 1724.72 1016.15 1721.39L1014.04 1716.19C1013.63 1715.19 1012.84 1714.39 1011.84 1713.99L1006.64 1711.88C1003.31 1710.53 1003.31 1705.82 1006.64 1704.47L1011.84 1702.36C1012.84 1701.95 1013.63 1701.16 1014.04 1700.16L1016.15 1694.96Z"
        fill={blueStarColor}
      />
      <path
        d="M165.649 3287.76C166.999 3284.43 171.712 3284.43 173.062 3287.76L175.169 3292.95C175.576 3293.95 176.371 3294.75 177.373 3295.16L182.569 3297.26C185.898 3298.61 185.898 3303.33 182.569 3304.68L177.373 3306.78C176.371 3307.19 175.576 3307.99 175.169 3308.99L173.062 3314.18C171.712 3317.51 166.999 3317.51 165.649 3314.18L163.542 3308.99C163.135 3307.99 162.34 3307.19 161.338 3306.78L156.142 3304.68C152.813 3303.33 152.813 3298.61 156.142 3297.26L161.338 3295.16C162.34 3294.75 163.135 3293.95 163.542 3292.95L165.649 3287.76Z"
        fill={blueStarColor}
      />
      <path
        d="M415.528 2615.76C414.178 2612.43 409.464 2612.43 408.114 2615.76L406.007 2620.95C405.601 2621.95 404.806 2622.75 403.804 2623.16L398.608 2625.26C395.278 2626.61 395.278 2631.33 398.608 2632.68L403.804 2634.78C404.806 2635.19 405.601 2635.99 406.007 2636.99L408.114 2642.18C409.464 2645.51 414.178 2645.51 415.528 2642.18L417.635 2636.99C418.041 2635.99 418.836 2635.19 419.839 2634.78L425.035 2632.68C428.364 2631.33 428.364 2626.61 425.035 2625.26L419.839 2623.16C418.836 2622.75 418.041 2621.95 417.635 2620.95L415.528 2615.76Z"
        fill={blueStarColor}
      />
      <path
        d="M124.46 2249.14C125.81 2245.81 130.524 2245.81 131.874 2249.14L138.831 2266.3C139.237 2267.3 140.032 2268.1 141.035 2268.5L158.192 2275.46C161.521 2276.81 161.521 2281.52 158.192 2282.87L141.035 2289.83C140.032 2290.24 139.237 2291.03 138.831 2292.03L131.874 2309.19C130.524 2312.52 125.81 2312.52 124.46 2309.19L117.503 2292.03C117.097 2291.03 116.302 2290.24 115.299 2289.83L98.1419 2282.87C94.8126 2281.52 94.8126 2276.81 98.1419 2275.46L115.299 2268.5C116.302 2268.1 117.097 2267.3 117.503 2266.3L124.46 2249.14Z"
        fill={blueStarColor}
      />
      <path
        d="M850.649 1134.19C851.999 1130.87 856.712 1130.87 858.062 1134.19L860.169 1139.39C860.576 1140.39 861.371 1141.19 862.373 1141.59L867.569 1143.7C870.898 1145.05 870.898 1149.77 867.569 1151.12L862.373 1153.22C861.371 1153.63 860.576 1154.42 860.169 1155.43L858.062 1160.62C856.712 1163.95 851.999 1163.95 850.649 1160.62L848.542 1155.43C848.135 1154.42 847.34 1153.63 846.338 1153.22L841.142 1151.12C837.813 1149.77 837.813 1145.05 841.142 1143.7L846.338 1141.59C847.34 1141.19 848.135 1140.39 848.542 1139.39L850.649 1134.19Z"
        fill={greenStarColor}
      />
      <path
        d="M608.649 3962.19C609.999 3958.87 614.712 3958.87 616.062 3962.19L618.169 3967.39C618.576 3968.39 619.371 3969.19 620.373 3969.59L625.569 3971.7C628.898 3973.05 628.898 3977.77 625.569 3979.12L620.373 3981.22C619.371 3981.63 618.576 3982.42 618.169 3983.43L616.062 3988.62C614.712 3991.95 609.999 3991.95 608.649 3988.62L606.542 3983.43C606.135 3982.42 605.34 3981.63 604.338 3981.22L599.142 3979.12C595.813 3977.77 595.813 3973.05 599.142 3971.7L604.338 3969.59C605.34 3969.19 606.135 3968.39 606.542 3967.39L608.649 3962.19Z"
        fill={greenStarColor}
      />
      <path
        d="M705.024 97.5553C705.699 95.8907 708.056 95.8907 708.731 97.5553L710.591 102.142C710.794 102.643 711.191 103.04 711.692 103.244L716.279 105.103C717.943 105.778 717.943 108.135 716.279 108.81L711.692 110.67C711.191 110.873 710.794 111.27 710.591 111.772L708.731 116.358C708.056 118.023 705.699 118.023 705.024 116.358L703.164 111.772C702.961 111.27 702.564 110.873 702.063 110.67L697.476 108.81C695.812 108.135 695.812 105.778 697.476 105.103L702.063 103.244C702.564 103.04 702.961 102.643 703.164 102.142L705.024 97.5553Z"
        fill={pinkStarColor}
      />
      <path
        d="M1007.52 2904.58C1008.2 2902.91 1010.55 2902.91 1011.23 2904.58L1013.09 2909.16C1013.29 2909.66 1013.69 2910.06 1014.19 2910.27L1018.78 2912.12C1020.44 2912.8 1020.44 2915.16 1018.78 2915.83L1014.19 2917.69C1013.69 2917.89 1013.29 2918.29 1013.09 2918.79L1011.23 2923.38C1010.55 2925.04 1008.2 2925.04 1007.52 2923.38L1005.66 2918.79C1005.46 2918.29 1005.06 2917.89 1004.56 2917.69L999.974 2915.83C998.31 2915.16 998.31 2912.8 999.974 2912.12L1004.56 2910.27C1005.06 2910.06 1005.46 2909.66 1005.66 2909.16L1007.52 2904.58Z"
        fill={pinkStarColor}
      />
      <path
        d="M812.853 44.1419C814.203 40.8126 818.916 40.8126 820.266 44.1419L826.001 58.2851C826.408 59.2875 827.203 60.0825 828.205 60.4889L842.348 66.2237C845.677 67.5737 845.677 72.2875 842.348 73.6374L828.205 79.3722C827.203 79.7787 826.408 80.5737 826.001 81.576L820.266 95.7193C818.916 99.0485 814.203 99.0485 812.853 95.7192L807.118 81.576C806.711 80.5737 805.916 79.7787 804.914 79.3722L790.771 73.6374C787.442 72.2875 787.442 67.5737 790.771 66.2237L804.914 60.4889C805.916 60.0825 806.711 59.2875 807.118 58.2851L812.853 44.1419Z"
        fill={greenStarColor}
      />
      <path
        d="M-10.7763 450.142C-9.42633 446.813 -4.71251 446.813 -3.36257 450.142L2.37223 464.285C2.77866 465.287 3.57369 466.082 4.57603 466.489L18.7193 472.224C22.0485 473.574 22.0485 478.287 18.7192 479.637L4.57603 485.372C3.57368 485.779 2.77866 486.574 2.37223 487.576L-3.36257 501.719C-4.71252 505.049 -9.42634 505.049 -10.7763 501.719L-16.5111 487.576C-16.9175 486.574 -17.7125 485.779 -18.7149 485.372L-32.8581 479.637C-36.1874 478.287 -36.1874 473.574 -32.8581 472.224L-18.7149 466.489C-17.7125 466.082 -16.9175 465.287 -16.5111 464.285L-10.7763 450.142Z"
        fill={orangeStarColor}
      />
      <path
        d="M1171.22 2844.14C1172.57 2840.81 1177.29 2840.81 1178.64 2844.14L1184.37 2858.29C1184.78 2859.29 1185.57 2860.08 1186.58 2860.49L1200.72 2866.22C1204.05 2867.57 1204.05 2872.29 1200.72 2873.64L1186.58 2879.37C1185.57 2879.78 1184.78 2880.57 1184.37 2881.58L1178.64 2895.72C1177.29 2899.05 1172.57 2899.05 1171.22 2895.72L1165.49 2881.58C1165.08 2880.57 1164.29 2879.78 1163.29 2879.37L1149.14 2873.64C1145.81 2872.29 1145.81 2867.57 1149.14 2866.22L1163.29 2860.49C1164.29 2860.08 1165.08 2859.29 1165.49 2858.29L1171.22 2844.14Z"
        fill={greenStarColor}
      />
      <path
        d="M550.425 1028.39C551.517 1025.7 555.33 1025.7 556.422 1028.39L563.995 1047.07C564.323 1047.88 564.966 1048.52 565.777 1048.85L584.453 1056.43C587.146 1057.52 587.146 1061.33 584.453 1062.42L565.777 1069.99C564.966 1070.32 564.323 1070.97 563.995 1071.78L556.422 1090.45C555.33 1093.15 551.517 1093.15 550.425 1090.45L542.853 1071.78C542.524 1070.97 541.881 1070.32 541.07 1069.99L522.394 1062.42C519.701 1061.33 519.701 1057.52 522.394 1056.43L541.07 1048.85C541.881 1048.52 542.524 1047.88 542.853 1047.07L550.425 1028.39Z"
        fill={pinkStarColor}
      />
      <path
        d="M1331.5 2433.39C1332.59 2430.7 1336.41 2430.7 1337.5 2433.39L1350.29 2464.93C1350.61 2465.74 1351.26 2466.39 1352.07 2466.71L1383.61 2479.5C1386.3 2480.59 1386.3 2484.41 1383.61 2485.5L1352.07 2498.29C1351.26 2498.61 1350.61 2499.26 1350.29 2500.07L1337.5 2531.61C1336.41 2534.3 1332.59 2534.3 1331.5 2531.61L1318.71 2500.07C1318.39 2499.26 1317.74 2498.61 1316.93 2498.29L1285.39 2485.5C1282.7 2484.41 1282.7 2480.59 1285.39 2479.5L1316.93 2466.71C1317.74 2466.39 1318.39 2465.74 1318.71 2464.93L1331.5 2433.39Z"
        fill={pinkStarColor}
      />
      <path
        d="M1218.22 783.781C1219.57 780.451 1224.29 780.451 1225.64 783.781L1231.37 797.924C1231.78 798.926 1232.57 799.721 1233.58 800.128L1247.72 805.862C1251.05 807.212 1251.05 811.926 1247.72 813.276L1233.58 819.011C1232.57 819.417 1231.78 820.212 1231.37 821.215L1225.64 835.358C1224.29 838.687 1219.57 838.687 1218.22 835.358L1212.49 821.215C1212.08 820.212 1211.29 819.417 1210.29 819.011L1196.14 813.276C1192.81 811.926 1192.81 807.212 1196.14 805.862L1210.29 800.128C1211.29 799.721 1212.08 798.926 1212.49 797.924L1218.22 783.781Z"
        fill={blueStarColor}
      />
      <path
        d="M226.882 122.289C229.73 115.265 239.677 115.265 242.525 122.289L254.625 152.132C255.483 154.247 257.16 155.924 259.275 156.782L289.118 168.882C296.142 171.73 296.142 181.677 289.118 184.525L259.275 196.625C257.16 197.483 255.483 199.16 254.625 201.275L242.525 231.118C239.677 238.142 229.73 238.142 226.882 231.118L214.782 201.275C213.924 199.16 212.247 197.483 210.132 196.625L180.289 184.525C173.265 181.677 173.265 171.73 180.289 168.882L210.132 156.782C212.247 155.924 213.924 154.247 214.782 152.132L226.882 122.289Z"
        fill={blueStarColor}
      />
      <path
        d="M703.013 3855C705.375 3849.17 713.625 3849.17 715.987 3855L724.399 3875.74C725.11 3877.5 726.502 3878.89 728.256 3879.6L749.002 3888.01C754.828 3890.38 754.828 3898.62 749.002 3900.99L728.256 3909.4C726.502 3910.11 725.11 3911.5 724.399 3913.26L715.987 3934C713.625 3939.83 705.375 3939.83 703.013 3934L694.601 3913.26C693.89 3911.5 692.498 3910.11 690.744 3909.4L669.998 3900.99C664.172 3898.62 664.172 3890.38 669.998 3888.01L690.744 3879.6C692.498 3878.89 693.89 3877.5 694.601 3875.74L703.013 3855Z"
        fill={blueStarColor}
      />
      <path
        d="M1428.34 2046.97C1431.25 2039.78 1441.44 2039.78 1444.35 2046.97L1456.74 2077.52C1457.62 2079.68 1459.33 2081.4 1461.5 2082.28L1492.05 2094.66C1499.24 2097.58 1499.24 2107.76 1492.05 2110.68L1461.5 2123.06C1459.33 2123.94 1457.62 2125.66 1456.74 2127.82L1444.35 2158.37C1441.44 2165.57 1431.25 2165.57 1428.34 2158.37L1415.95 2127.82C1415.07 2125.66 1413.36 2123.94 1411.19 2123.06L1380.64 2110.68C1373.45 2107.76 1373.45 2097.58 1380.64 2094.66L1411.19 2082.28C1413.36 2081.4 1415.07 2079.68 1415.95 2077.52L1428.34 2046.97Z"
        fill={blueStarColor}
      />
      <path
        d="M380.402 2911.52C384.681 2900.97 399.624 2900.97 403.904 2911.52L422.083 2956.35C423.371 2959.53 425.891 2962.05 429.069 2963.34L473.903 2981.52C484.457 2985.8 484.457 3000.74 473.903 3005.02L429.069 3023.2C425.891 3024.49 423.371 3027.01 422.083 3030.19L403.904 3075.02C399.624 3085.57 384.681 3085.57 380.402 3075.02L362.223 3030.19C360.934 3027.01 358.414 3024.49 355.237 3023.2L310.403 3005.02C299.849 3000.74 299.849 2985.8 310.403 2981.52L355.237 2963.34C358.414 2962.05 360.934 2959.53 362.223 2956.35L380.402 2911.52Z"
        fill={blueStarColor}
      />
      <path
        d="M179.602 1452.99C181.355 1453.63 181.355 1456.11 179.602 1456.75L176.925 1457.73C176.371 1457.93 175.934 1458.37 175.732 1458.92L174.755 1461.6C174.116 1463.35 171.637 1463.35 170.998 1461.6L170.021 1458.92C169.819 1458.37 169.382 1457.93 168.828 1457.73L166.151 1456.75C164.398 1456.11 164.398 1453.63 166.151 1452.99L168.828 1452.02C169.382 1451.81 169.819 1451.38 170.021 1450.82L170.998 1448.15C171.637 1446.39 174.116 1446.39 174.755 1448.15L175.732 1450.82C175.934 1451.38 176.371 1451.81 176.925 1452.02L179.602 1452.99Z"
        fill={blueStarColor}
      />
    </svg>
  );
};

export default GlobalBackgroundSvgComponent;
