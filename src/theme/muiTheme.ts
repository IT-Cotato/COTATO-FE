import { createTheme } from '@mui/material';
import {
  LAPTOP_BREAKPOINT,
  MOBILE_BREAKPOINT,
  DESKTOP_BREAKPOINT,
  WIDE_BREAKPOINT,
  TABLET_BREAKPOINT,
  LANDSCAPE_BREAKPOINT,
} from './media';

declare module '@mui/material/styles' {
  interface BreakpointOverrides {
    xs: true;
    sm: true;
    md: true;
    lg: true;
    xl: true;
    mobile: true;
    landscape: true;
    tablet: true;
    laptop: true;
    desktop: true;
    wide: true;
  }
}

export const theme = createTheme({
  typography: {
    fontFamily: [
      '"Pretendard"',
      '"YComputer"',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
      mobile: MOBILE_BREAKPOINT,
      landscape: LANDSCAPE_BREAKPOINT,
      tablet: TABLET_BREAKPOINT,
      laptop: LAPTOP_BREAKPOINT,
      desktop: DESKTOP_BREAKPOINT,
      wide: WIDE_BREAKPOINT,
    },
  },
});

theme.typography.h1 = {
  fontSize: '4.875rem',
  [theme.breakpoints.down('tablet')]: {
    fontSize: '2.25rem',
  },
  [theme.breakpoints.down('landscape')]: {
    fontSize: '1.875rem',
  },
};

theme.typography.h2 = {
  fontSize: '4.25rem',
  [theme.breakpoints.down('tablet')]: {
    fontSize: '2rem',
  },
  [theme.breakpoints.down('landscape')]: {
    fontSize: '1.75rem',
  },
};

theme.typography.h3 = {
  fontSize: '3rem',
  [theme.breakpoints.down('tablet')]: {
    fontSize: '1.75rem',
    fontWeight: '500',
  },
  [theme.breakpoints.down('landscape')]: {
    fontSize: '1.5rem',
    fontWeight: '500',
  },
};

theme.typography.h4 = {
  fontSize: '2.25rem',
  [theme.breakpoints.down('tablet')]: {
    fontSize: '1.5rem',
    fontWeight: '500',
  },
  [theme.breakpoints.down('landscape')]: {
    fontSize: '1.25rem',
    fontWeight: '500',
  },
};

theme.typography.h5 = {
  fontSize: '1.875rem',
  [theme.breakpoints.down('tablet')]: {
    fontSize: '1.375rem',
    fontWeight: '500',
  },
  [theme.breakpoints.down('landscape')]: {
    fontSize: '1.125rem',
    fontWeight: '500',
  },
};

theme.typography.h6 = {
  fontSize: '1.5rem',
  [theme.breakpoints.down('tablet')]: {
    fontSize: '1.25rem',
    fontWeight: '500',
  },
  [theme.breakpoints.down('landscape')]: {
    fontSize: '1rem',
    fontWeight: '500',
  },
};

theme.typography.subtitle1 = {
  fontSize: '1.25rem',
  [theme.breakpoints.down('tablet')]: {
    fontSize: '1rem',
    fontWeight: '500',
  },
  [theme.breakpoints.down('landscape')]: {
    fontSize: '0.75rem',
    fontWeight: '500',
  },
};

theme.typography.subtitle2 = {
  fontSize: '1.125rem',
  [theme.breakpoints.down('tablet')]: {
    fontSize: '0.875rem',
    fontWeight: '500',
  },
  [theme.breakpoints.down('landscape')]: {
    fontSize: '0.75rem',
    fontWeight: '500',
  },
};

theme.typography.body1 = {
  fontSize: '1rem',
  [theme.breakpoints.down('tablet')]: {
    fontSize: '0.875rem',
    lineHeight: '1.25rem',
    fontWeight: '400',
  },
  [theme.breakpoints.down('landscape')]: {
    fontSize: '0.875rem',
    lineHeight: '1.25rem',
    fontWeight: '400',
  },
};

theme.typography.body2 = {
  fontSize: '0.875rem',
  [theme.breakpoints.down('tablet')]: {
    fontSize: '0.75rem',
    lineHeight: '1.25rem',
    fontWeight: '400',
  },
  [theme.breakpoints.down('landscape')]: {
    fontSize: '0.625rem',
    lineHeight: '1.25rem',
    fontWeight: '400',
  },
};

theme.typography.caption = {
  fontSize: '0.75rem',
  [theme.breakpoints.down('tablet')]: {
    fontSize: '0.625rem',
    lineHeight: '1.25rem',
  },
  [theme.breakpoints.down('landscape')]: {
    fontSize: '0.5rem',
    lineHeight: '1.25rem',
  },
};
