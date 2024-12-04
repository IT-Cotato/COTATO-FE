export const useThemeMode = () => {
  const theme = localStorage.getItem('theme') || 'dark';

  //
  //
  //

  return {
    mode: theme,
  };
};
