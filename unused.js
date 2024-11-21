/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs');
const path = require('path');
const glob = require('glob');

// asset 폴더 내 파일들을 찾기
const assetFiles = glob.sync('src/assets/**/*.*');

// 각 파일이 사용되는지 소스 코드에서 검색
assetFiles.forEach((file) => {
  const fileName = path.basename(file);
  const regex = new RegExp(`\\b${fileName}\\b`);

  const isUsed = glob.sync(`src/**/*.*`).some((sourceFile) => {
    const content = fs.readFileSync(sourceFile, 'utf8');
    return regex.test(content);
  });

  if (!isUsed) {
    console.log(`${file} is not used`);
  }
});
