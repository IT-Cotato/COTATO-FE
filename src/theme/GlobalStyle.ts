import { createGlobalStyle } from 'styled-components';

const theme = window.localStorage.getItem('theme') ?? 'dark';

export const GlobalStyle = createGlobalStyle`

  * {
	box-sizing: border-box;
  }
  
  body {
    font-family: NanumSquareRound;
    background-color: ${theme === 'dark' ? '#1A1A1A' : '#F9F9F9'};
  }
`;
