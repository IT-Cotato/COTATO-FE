import React, { ObjectHTMLAttributes } from 'react';
import { regularIcons, solidIcons } from '../utils/iconLoader';
import { RegularIconName } from '../types/regularIconNames';
import { SolidIconName } from '../types/solidIconNames';
import { useTheme, DefaultTheme } from 'styled-components';

//
//
//

export interface CotatoIconProps extends Omit<ObjectHTMLAttributes<HTMLObjectElement>, 'color'> {
  icon: RegularIconName | SolidIconName;
  size?: string;
  color?: string | ((theme: DefaultTheme) => string);
}

//
//
//

/**
 * Common Icon Component for Cotato, from Pixel Icon Library
 * ref: https://www.npmjs.com/package/@hackernoon/pixel-icon-library?activeTab=readme
 */
const CotatoIcon: React.FC<CotatoIconProps> = ({ icon, color, size, ...rest }) => {
  const theme = useTheme();

  const icons = icon in solidIcons ? solidIcons : regularIcons;
  const Icon = icons[icon as keyof typeof icons];

  // color가 함수일 경우 theme을 인자로 받아 처리
  const resolvedColor =
    typeof color === 'function' ? color(theme) : color || theme.colors.common.black;

  const defaultStyle = {
    backgroundColor: resolvedColor,
    width: '24px',
    height: '24px',
  };

  if (!Icon) {
    return <div>X</div>;
  }

  return (
    <div
      {...rest}
      style={{
        ...rest.style,
        width: size || defaultStyle.width,
        height: size || defaultStyle.height,
        backgroundColor: resolvedColor,
        WebkitMaskImage: `url(${Icon})`,
        WebkitMaskRepeat: 'no-repeat',
        WebkitMaskPosition: 'center center',
        maskImage: `url(${Icon})`,
        maskRepeat: 'no-repeat',
        maskPosition: 'center center',
      }}
    />
  );
};

export default CotatoIcon;
