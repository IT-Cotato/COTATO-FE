import { css } from 'styled-components';

export const MOBILE_BREAKPOINT = 400;
export const LANDSCAPE_BREAKPOINT = 576;
export const TABLET_BREAKPOINT = 768;
export const LAPTOP_BREAKPOINT = 1024;
export const DESKTOP_BREAKPOINT = 1280;
export const WIDE_BREAKPOINT = 1440;

export const device = {
  mobile: `${MOBILE_BREAKPOINT}px`,
  landscape: `${LANDSCAPE_BREAKPOINT}px`,
  tablet: `${TABLET_BREAKPOINT}px`,
  laptop: `${LAPTOP_BREAKPOINT}px`,
  desktop: `${DESKTOP_BREAKPOINT}px`,
  wide: `${WIDE_BREAKPOINT}px`,
};

export const media = {
  /**
   * 400px 이하, 대부분의 모바일 환경에 적용
   */
  mobile: (...args) => css`
    @media (max-width: ${device.mobile}) {
      ${css(...args)};
    }
  `,
  /**
   * 576px 이하, 모바일 landscape 환경
   */
  landscape: (...args) => css`
    @media (max-width: ${device.landscape}) {
      ${css(...args)};
    }
  `,
  /**
   * 768px 이하
   */
  tablet: (...args) => css`
    @media (max-width: ${device.tablet}) {
      ${css(...args)};
    }
  `,
  /**
   * 1024px 이하
   */
  laptop: (...args) => css`
    @media (max-width: ${device.laptop}) {
      ${css(...args)};
    }
  `,
  /**
   * 1280px 이하
   */
  desktop: (...args) => css`
    @media (max-width: ${device.desktop}) {
      ${css(...args)};
    }
  `,
  /**
   * 1440px 이하
   */
  wide: (...args) => css`
    @media (max-width: ${device.wide}) {
      ${css(...args)};
    }
  `,
};
