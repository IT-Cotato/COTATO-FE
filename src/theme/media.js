import { css } from 'styled-components';

const device = {
  mobile: '400px',
  landscape: '576px',
  tablet: '768px',
  laptop: '1024px',
  desktop: '1280px',
  wide: '1440px',
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
