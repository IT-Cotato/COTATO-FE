import { createGlobalStyle } from 'styled-components';
import { device } from './media';
import { HEADER_HEIGHT } from './constants/constants';

export const GlobalStyle = createGlobalStyle`

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
