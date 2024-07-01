import { COTATO_DARK_THEME, COTATO_LIGHT_THEME } from '@theme/constants/constants';
import React from 'react';

//
//
//

function useCotatoTheme() {
  const defaultTheme = localStorage.getItem('theme') || COTATO_DARK_THEME;
  const [theme, setTheme] = React.useState(defaultTheme);

  /**
   *
   */
  const onChangeTheme = React.useCallback(() => {
    const newTheme = theme === COTATO_LIGHT_THEME ? COTATO_DARK_THEME : COTATO_LIGHT_THEME;
    localStorage.setItem('theme', newTheme);
    setTheme(newTheme);
  }, [theme]);

  //
  //
  //

  return {
    DefaultTheme: theme,
    onChangeTheme,
  };
}

export default useCotatoTheme;
