import { ThemeContext, ThemeProvider } from '@emotion/react';
import { useTheme } from 'styled-components';

//
//
//

export const sdkConfig = {
  // Additional SDK configuration goes in here, for example:
  colorScheme: 'dark',
  formTitle: 'Give Feedback',
  nameLabel: '성함',
  namePlaceholder: '',
  messageLabel: '상세 내용',
  isRequiredLabel: '(필수)',
  emailPlaceholder: '',
  messagePlaceholder: '발생한 오류 또는 사용하면서의 피드백을 작성해주세요.',
  addScreenshotButtonLabel: '스크린샷 추가',
  removeScreenshotButtonLabel: '스크린샷 삭제',
  submitButtonLabel: '제출하기',
  cancelButtonLabel: '취소',
  themeLight: {
    foreground: 'black',
    background: 'white',
    accentBackground: '#FFA000',
  },
  themeDark: {
    foreground: 'white',
    background: '#242321',
    accentBackground: '#C63C00',
  },
};
