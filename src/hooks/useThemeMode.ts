export const useThemeMode = () => {
  const theme = localStorage.getItem('theme') || 'light';

  //
  //
  //

  return {
    mode: theme,
  };
};
