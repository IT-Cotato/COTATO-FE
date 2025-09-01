import { createGlobalStyle } from 'styled-components';
import { device } from './media';
import { HEADER_HEIGHT } from './constants/constants';

export const GlobalStyle = createGlobalStyle`

  :root {
    --z-index-fab: 1000;
    --z-index-mobile-side-menu-drawer: 999;
    --z-index-header: 999;
  }

  * {
	box-sizing: border-box;
  }
  
  body {
    font-family: NanumSquareRound;
    // global layout
    @media screen and (min-width: ${device.tablet}) {
      margin-top: ${HEADER_HEIGHT};
    }
  }
`;
