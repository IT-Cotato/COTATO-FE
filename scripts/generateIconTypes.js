const fs = require('fs');
const path = require('path');

// 경로 설정
const iconDir = path.resolve(__dirname, '../node_modules/@hackernoon/pixel-icon-library/icons/SVG');
const styles = ['regular', 'solid'];

// 아이콘 이름 추출 및 타입 생성
styles.forEach((style) => {
  const iconsPath = path.join(iconDir, style);
  const iconFiles = fs.readdirSync(iconsPath);

  const iconNames = iconFiles
    .filter((file) => file.endsWith('.svg'))
    .map((file) => file.replace('.svg', ''));

  const typeDef = `export type ${style.charAt(0).toUpperCase() + style.slice(1)}IconName = ${iconNames
    .map((name) => `'${name}'`)
    .join(' | ')};`;

  const outputPath = path.resolve(__dirname, `../src/types/${style}IconNames.ts`);
  fs.writeFileSync(outputPath, typeDef);
});
