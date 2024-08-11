/**
 * You can use theme like...
 * 
 * const StyledComponent = styled.div`
  color: ${({ theme }) => theme.colors.gray80};
  `;
 *
 * In media query with `media.js` like this 
 *   ${media.mobile`
 *   width: 500px;
 *   background-size: 500px 100px;
 *   color: ${({ theme }: { theme: CotatoThemeType }) => theme.colors.secondary5};
 *   `}
 */

/** @deprecated
 *  Use CotatoTheme since v2
 * */
export type LegacyThemeType = typeof LegacyTheme;

export const LegacyTheme = {
  color: {
    white: '#FFFFFF',
    lightBlue: '#D2E0FB',
    yellow: '#F9F3CC',
    lightGreen: '#D7E5CA',
    blue: '#93C6FE',
    darkBlue: '#8EACCD',
    lightGrey: '#CECCCC',
    grey: '#5E5E5E',
    darkGrey: '#7B7B7B',
    black: '#000000',
    red: '#EB5353',
    green: '#85C88A',
  },
};

export type CotatoThemeType = {
  colors: {
    common: {
      white: string;
      black: string;
      white_const: string;
      black_const: string;
    };
    gray5: string;
    gray10: string;
    gray20: string;
    gray30: string;
    gray40: string;
    gray50: string;
    gray60: string;
    gray70: string;
    gray80: string;
    gray80_1: string;
    gray80_2: string;
    gray90: string;
    gray100: string;
    primary5: string;
    primary10: string;
    primary20: string;
    primary30: string;
    primary40: string;
    primary50: string;
    primary60: string;
    primary70: string;
    primary80: string;
    primary90: string;
    primary100: string;
    primary100_1: string;
    primary100_2: string;
    secondary5: string;
    secondary10: string;
    secondary20: string;
    secondary30: string;
    secondary40: string;
    secondary50: string;
    secondary60: string;
    secondary70: string;
    secondary80: string;
    secondary90: string;
    secondary100: string;
    sub1: {
      10: string;
      20: string;
      40: string;
      60: string;
      80: string;
      100: string;
    };
    sub2: {
      10: string;
      20: string;
      40: string;
      40_1: string;
      40_2: string;
      60: string;
      80: string;
      100: string;
    };
    sub3: {
      10: string;
      20: string;
      40: string;
      60: string;
      80: string;
      100: string;
    };
    pastel: {
      yellow: {
        10: string;
        20: string;
        30: string;
        40: string;
        50: string;
        60: string;
        70: string;
        80: string;
        90: string;
      };
      pink: {
        10: string;
        20: string;
        30: string;
        40: string;
        50: string;
        60: string;
        70: string;
        80: string;
        90: string;
      };
      blue: {
        10: string;
        20: string;
        30: string;
        40: string;
        50: string;
        60: string;
        70: string;
        80: string;
        90: string;
      };
    };
    pastelTone: {
      yellow: {
        100: string;
      };
      pink: {
        100: string;
      };
      blue: {
        100: string;
      };
      blurBlue: {
        100: string;
      };
    };
  };
  fontSize: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    xxl: string;
  };
  size: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    xxl: string;
    '3xl': string;
  };
};

export const CotatoLightTheme = Object.freeze<CotatoThemeType>({
  colors: {
    common: {
      white: '#FAFAFA',
      black: '#000000',
      white_const: '#FAFAFA',
      black_const: '#000000',
    },
    // gray //
    gray5: '#F4F4F4',
    gray10: '#EEEDEC',
    gray20: '#DFDDDA',
    gray30: '#C6C4C1',
    gray40: '#AAA9A6',
    gray50: '#8F8D89',
    gray60: '#6A6967',
    gray70: '#4E4C49',
    gray80: '#363532',
    gray80_1: '#363532',
    gray80_2: '#363532',
    gray90: '#242321',
    gray100: '#1A1918',
    // primary //
    primary5: '#FFFCF4',
    primary10: '#FFF9E6',
    primary20: '#FFF5D4',
    primary30: '#FFF0BD',
    primary40: '#FFEBA3',
    primary50: '#FFE37D',
    primary60: '#FFDA58',
    primary70: '#FFD027',
    primary80: '#FFC700',
    primary90: '#FFB500',
    primary100: '#FFA000',
    primary100_1: '#FFA000',
    primary100_2: '#FFA000',
    // secondary //
    secondary5: '#FFF4ED',
    secondary10: '#FFE7D5',
    secondary20: '#FFD5B6',
    secondary30: '#FFBD8C',
    secondary40: '#FEA564',
    secondary50: '#FB873F',
    secondary60: '#F86C14',
    secondary70: '#E25B00',
    secondary80: '#DC4200',
    secondary90: '#C63C00',
    secondary100: '#A1380C',
    // sub1 //
    sub1: {
      10: '#FFA3EB',
      20: '#FF7BE2',
      40: '#FA4CD4',
      60: '#E242BF',
      80: '#B83A9C',
      100: '#A12284',
    },
    // sub2 //
    sub2: {
      10: '#88ACF4',
      20: '#5C8EF3',
      40: '#3270ED',
      40_1: '#3270ED',
      40_2: '#3270ED',
      60: '#235DD1',
      80: '#1D4CAC',
      100: '#183A7E',
    },
    // sub3 //
    sub3: {
      10: '#98D892',
      20: '#75CA6C',
      40: '#57B34D',
      60: '#37922C',
      80: '#2A6F22',
      100: '#1A5912',
    },
    // pastel //
    pastel: {
      yellow: {
        '10': '#FFFDF5',
        '20': '#FFF8EB',
        '30': '#FFF8E0',
        '40': '#FFF6D6',
        '50': '#FFF4CC',
        '60': '#CCC3A3',
        '70': '#99927A',
        '80': '#666252',
        '90': '#333129',
      },
      pink: {
        '10': '#FEFAFD',
        '20': '#FDF4FB',
        '30': '#FDEFF8',
        '40': '#FCE9F6',
        '50': '#FBE4F4',
        '60': '#C9B6C3',
        '70': '#978992',
        '80': '#645B62',
        '90': '#322E31',
      },
      blue: {
        '10': '#F7F8FD',
        '20': '#EFF2FB',
        '30': '#E6EBF9',
        '40': '#DEE5F7',
        '50': '#D6DEF5',
        '60': '#ABB2C4',
        '70': '#808593',
        '80': '#565962',
        '90': '#2B2C31',
      },
    },
    pastelTone: {
      yellow: {
        100: '#FFF4CC',
      },
      pink: {
        100: '#FBE4F4',
      },
      blue: {
        100: '#D6DEF5',
      },
      blurBlue: {
        100: '#305BCF',
      },
    },
  },
  fontSize: {
    xs: '0.75rem',
    sm: '0.875rem',
    md: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    xxl: '1.5rem',
  },
  size: {
    xs: '0.2rem',
    sm: '0.4rem',
    md: '0.8rem',
    lg: '1rem',
    xl: '1.2rem',
    xxl: '1.4rem',
    '3xl': '1.6rem',
  },
});

export const CotatoDarkTheme = Object.freeze<CotatoThemeType>({
  colors: {
    common: {
      white: CotatoLightTheme.colors.gray100,
      black: CotatoLightTheme.colors.common.white,
      white_const: CotatoLightTheme.colors.common.white_const,
      black_const: CotatoLightTheme.colors.common.black_const,
    },
    // gray //
    gray5: '#F4F4F4',
    gray10: '#EEEDEC',
    gray20: '#DFDDDA',
    gray30: '#C6C4C1',
    gray40: '#AAA9A6',
    gray50: '#8F8D89',
    gray60: CotatoLightTheme.colors.gray30,
    gray70: '#4E4C49',
    gray80: CotatoLightTheme.colors.gray30,
    gray80_1: CotatoLightTheme.colors.gray20,
    gray80_2: CotatoLightTheme.colors.gray30,
    gray90: '#242321',
    gray100: '#1A1918',
    // primary //
    primary5: '#FFFCF4',
    primary10: '#FFF9E6',
    primary20: '#FFF5D4',
    primary30: CotatoLightTheme.colors.gray90,
    primary40: '#FFEBA3',
    primary50: '#FFE37D',
    primary60: '#FFDA58',
    primary70: '#FFD027',
    primary80: '#FFC700',
    primary90: CotatoLightTheme.colors.primary80,
    primary100: CotatoLightTheme.colors.secondary60,
    primary100_1: CotatoLightTheme.colors.secondary60,
    primary100_2: '#FFA000',
    // secondary //
    secondary5: '#FFF4ED',
    secondary10: '#FFE7D5',
    secondary20: '#FFD5B6',
    secondary30: '#FFBD8C',
    secondary40: '#FEA564',
    secondary50: '#FB873F',
    secondary60: '#F86C14',
    secondary70: '#E25B00',
    secondary80: '#DC4200',
    secondary90: '#C63C00',
    secondary100: '#A1380C',
    // sub1 //
    sub1: {
      10: '#FFA3EB',
      20: '#FF7BE2',
      40: '#FA4CD4',
      60: '#E242BF',
      80: '#B83A9C',
      100: '#A12284',
    },
    // sub2 //
    sub2: {
      10: '#88ACF4',
      20: '#5C8EF3',
      40: '#3270ED',
      40_1: CotatoLightTheme.colors.sub3[40],
      40_2: CotatoLightTheme.colors.sub2[10],
      60: '#235DD1',
      80: '#1D4CAC',
      100: '#183A7E',
    },
    // sub3 //
    sub3: {
      10: '#98D892',
      20: '#75CA6C',
      40: '#57B34D',
      60: '#37922C',
      80: '#2A6F22',
      100: '#1A5912',
    },
    // pastel //
    pastel: {
      yellow: {
        '10': '#FFFDF5',
        '20': '#FFF8EB',
        '30': '#FFF8E0',
        '40': '#FFF6D6',
        '50': '#FFF4CC',
        '60': '#CCC3A3',
        '70': '#99927A',
        '80': '#666252',
        '90': '#333129',
      },
      pink: {
        '10': '#FEFAFD',
        '20': '#FDF4FB',
        '30': '#FDEFF8',
        '40': '#FCE9F6',
        '50': '#FBE4F4',
        '60': '#C9B6C3',
        '70': '#978992',
        '80': '#645B62',
        '90': '#322E31',
      },
      blue: {
        '10': '#F7F8FD',
        '20': '#EFF2FB',
        '30': '#E6EBF9',
        '40': '#DEE5F7',
        '50': '#D6DEF5',
        '60': '#ABB2C4',
        '70': '#808593',
        '80': '#565962',
        '90': '#2B2C31',
      },
    },
    pastelTone: {
      yellow: {
        100: '#FFF4CC',
      },
      pink: {
        100: '#FBE4F4',
      },
      blue: {
        100: '#D6DEF5',
      },
      blurBlue: {
        100: '#305BCF',
      },
    },
  },
  fontSize: {
    xs: '0.75rem',
    sm: '0.875rem',
    md: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    xxl: '1.5rem',
  },
  size: {
    xs: '0.2rem',
    sm: '0.4rem',
    md: '0.8rem',
    lg: '1rem',
    xl: '1.2rem',
    xxl: '1.4rem',
    '3xl': '1.6rem',
  },
});
