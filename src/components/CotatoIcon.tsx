import React, { ObjectHTMLAttributes } from 'react';
import { regularIcons, solidIcons } from '../utils/iconLoader';
import { RegularIconName } from '../types/regularIconNames';
import { SolidIconName } from '../types/solidIconNames';
import { useTheme } from 'styled-components';

//
//
//

interface CotatoIconProps extends ObjectHTMLAttributes<HTMLObjectElement> {
  icon: RegularIconName | SolidIconName;
  size?: string;
  color?: string;
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

  const defaultStyle = {
    backgroundColor: color || theme.colors.common.black,
    width: '24px',
    height: '24px',
  };

  if (!Icon) {
    return <div>X</div>;
  }

  //
  //
  //

  return (
    <div
      {...rest}
      style={{
        ...rest.style,
        width: size || defaultStyle.width,
        height: size || defaultStyle.height,
        backgroundColor: color || theme.colors.common.black,
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
