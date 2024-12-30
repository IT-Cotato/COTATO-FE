import {
  COTATO_DARK_THEME,
  COTATO_LIGHT_THEME,
  THEME_CHANGE_TRANSITION,
} from '@theme/constants/constants';
import React from 'react';

//
//
//

function useCotatoTheme() {
  const currentTheme = localStorage.getItem('theme') || COTATO_DARK_THEME;
  const [theme, setTheme] = React.useState(currentTheme);

  /**
   *
   */
  const onChangeTheme = React.useCallback(() => {
    const newTheme = theme === COTATO_LIGHT_THEME ? COTATO_DARK_THEME : COTATO_LIGHT_THEME;

    localStorage.setItem('theme', newTheme);
    setTheme(newTheme);

    if (newTheme === COTATO_DARK_THEME) {
      document.body.style.backgroundColor = '#1A1A1A';
    } else {
      document.body.style.backgroundColor = '#F9F9F9';
    }

    document.body.style.transition = THEME_CHANGE_TRANSITION;
    setTimeout(() => {
      document.body.style.transition = '';
    }, 250);
  }, [theme]);

  //
  //
  //
  return {
    DefaultTheme: theme,
    theme: currentTheme,
    onChangeTheme,
  };
}

export default useCotatoTheme;
