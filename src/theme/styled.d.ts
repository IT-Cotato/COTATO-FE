import 'styled-components';
import { CotatoThemeType } from './theme';

/**
 * Will be deprecated in v2.
 */
// declare module 'styled-components' {
//   export interface DefaultTheme extends LegacyThemeType {}
// }

/**
 * Will be replaced this in v2.
 */
declare module 'styled-components' {
  export interface DefaultTheme extends CotatoThemeType {}
}
