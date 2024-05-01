import { css } from 'styled-components';

const device = {
  xs: '400px',
  sm: '600px',
  md: '900px',
  lg: '1280px',
  xl: '1440px',
  xxl: '1920px',
};

export const media = {
  /**
   * 400px 이하, 대부분의 모바일 환경에 적용
   */
  xs: (...args) => css`
    @media (max-width: ${device.xs}) {
      ${css(...args)};
    }
  `,
  /**
   * 600px 이하, 모바일 landscape 환경
   */
  sm: (...args) => css`
    @media (max-width: ${device.sm}) {
      ${css(...args)};
    }
  `,
  /**
   * 900px 이하
   */
  md: (...args) => css`
    @media (max-width: ${device.md}) {
      ${css(...args)};
    }
  `,
  /**
   * 1280px 이하
   */
  lg: (...args) => css`
    @media (max-width: ${device.lg}) {
      ${css(...args)};
    }
  `,
  /**
   * 1440px 이하
   */
  xl: (...args) => css`
    @media (max-width: ${device.xl}) {
      ${css(...args)};
    }
  `,
  /**
   * 1920px 이하
   */
  xxl: (...args) => css`
    @media (max-width: ${device.xxl}) {
      ${css(...args)};
    }
  `,
};
