import React from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { COTATO_DARK_THEME, COTATO_LIGHT_THEME } from '../constants/constants';
import { CotatoDarkTheme, CotatoLightTheme } from '../theme';
import useCotatoTheme from '@/hooks/useCotatoTheme';

//
//
//

interface CotatoThemeProvider {
  children: React.ReactNode;
}

//
//
//

const defaultValue = {
  DefaultTheme: COTATO_DARK_THEME,
  onChangeTheme: () => {},
};

export const ThemeContext = React.createContext(defaultValue);

//
//
//

function CotatoThemeProvider({ children }: CotatoThemeProvider) {
  const themeProps = useCotatoTheme();

  return (
    <ThemeContext.Provider value={themeProps}>
      <StyledThemeProvider
        theme={themeProps.DefaultTheme === COTATO_LIGHT_THEME ? CotatoLightTheme : CotatoDarkTheme}
      >
        {children}
      </StyledThemeProvider>
    </ThemeContext.Provider>
  );
}

export default CotatoThemeProvider;
