import 'styled-components';
import { CotatoThemeType } from './theme';

/**
 * Will be deprecated in v2.
 */
// declare module 'styled-components' {
//   export interface DefaultTheme extends LegacyThemeType {}
// }

declare module 'styled-components' {
  export interface DefaultTheme extends CotatoThemeType {}
}
