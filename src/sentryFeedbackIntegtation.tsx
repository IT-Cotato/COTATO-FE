import * as Sentry from '@sentry/react';

export const feedbackIntegration = Sentry.feedbackIntegration({
  // Additional SDK configuration goes in here, for example:
  colorScheme: 'light',
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
  successMessage: '피드백이 성공적으로 제출되었습니다.',
  successColor: '#37922C',
  errorColor: '#DC4200',
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
  autoInject: false,
});
