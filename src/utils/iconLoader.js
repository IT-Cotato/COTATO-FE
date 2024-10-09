/**
 * load all icons from the pixel-icon-library
 * require.context has issue that use dynamic path, so separate the function
 *
 */

const loadRegularSvgIcons = () => {
  const regularContext = require.context(
    '@hackernoon/pixel-icon-library/icons/SVG/regular',
    false,
    /\.svg$/,
  );

  const icons = {};

  regularContext.keys().forEach((key) => {
    const iconName = key.match(/\.\/(.*)\.svg/)?.[1];

    if (!iconName) {
      return;
    }

    icons[iconName] = regularContext(key);
  });

  return icons;
};

const loadSolidSvgIcons = () => {
  const solidContext = require.context(
    '@hackernoon/pixel-icon-library/icons/SVG/solid',
    false,
    /\.svg$/,
  );

  const icons = {};

  solidContext.keys().forEach((key) => {
    const iconName = key.match(/\.\/(.*)\.svg/)?.[1];

    if (!iconName) {
      return;
    }

    icons[iconName] = solidContext(key);
  });

  return icons;
};

export const regularIcons = loadRegularSvgIcons('regular');
export const solidIcons = loadSolidSvgIcons('solid');
