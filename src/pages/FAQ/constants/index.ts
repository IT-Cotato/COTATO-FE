import { CotatoCharacterImageMapType } from '@utils/convertCotatoCharcterImage';

type FAQType = {
  question: string;
  answer: string;
  summary: string;
  hash: string;
  image: CotatoCharacterImageMapType;
};

export const FAQList = {
  apply: [
    {
      question: '지원기간이 언제인가요?',
      answer: '각 기수별로 2월 및 8월 중으로 모집합니다.',
      summary: '지원기간',
      hash: 'apply-period',
      image: 'eye_close',
    },
    {
      question: '개발 실력이 부족한데 지원해도 될까요?',
      answer:
        '코테이토 선발은 실력보다는 열정에 기준을 두고 있습니다. 바로 프로젝트를 진행하기 어렵다면 처음에 스터디 위주로 활동 후 프로젝트에 들어가는 방법도 있으니 열심히 하실 준비가 되어있다면 지원해주세요!',
      summary: '지원자 요구실력',
      hash: 'apply-qualification',
      image: 'laugh',
    },
    {
      question: '면접은 어떻게 진행되나요?',
      answer: '면접은 대면으로 15-20분 동안 진행됩니다.<br/>',
      summary: '면접 진행방식',
      hash: 'interview',
      image: 'eye_close',
    },
    {
      question: '포트폴리오는 어떤 것을 위주로 제출하면 되나요?',
      answer:
        '개발 파트는 깃허브 링크 또는 활동했던 프로젝트 소개, 디자인 파트는 작업물 이미지 등을 위주로 첨부해주시면 됩니다.<br/>',
      summary: '포트폴리오',
      hash: 'portfolio',
      image: 'laptop',
    },
    {
      question: '활동 시 파트별 요구 역량이 있나요?',
      answer:
        '코테이토 활동 시 각 파트에서 <b>주로</b> 다루는 언어 및 프레임워크는 다음과 같습니다. <br/><ul><li>프론트 : JavaScript, TypeScript, React</li> <li>백 : Java Spring, Node JS</li> <li>기획 : Figma</li> <li>디자인 : Figma</li> </ul>',
      summary: '파트별 역량',
      hash: 'part-qualification',
      image: 'laptop',
    },
  ] as FAQType[],
  activity: [
    {
      question: '활동으로 주로 어떤 것을 진행하나요?',
      answer:
        '정기 세션에서는 팀별 진행상황 발표, CS 교육, IT 이슈 발표, 네트워킹 등의 활동이 진행됩니다.',
      summary: '내부 활동',
      hash: 'activity',
      image: 'laugh',
    },
    {
      question: '한 기수동안 활동 기간이 어떻게 되나요?',
      answer: '6개월 정도 활동하며 3-8월, 9-2월 기간동안 활동이 이루어집니다.',
      summary: '활동 기간',
      hash: 'activity-period',
      image: 'eye_close',
    },
    {
      question: '정기 세션 장소는 어느 지역인가요?',
      answer:
        '정기세션은 활동 인원의 거주 지역을 고려하여 서울 여러 지역(신촌/강남/혜화/왕십리 등)을 돌아가며 진행합니다.',
      summary: '세션 장소',
      hash: 'session-place',
      image: 'hot',
    },
    {
      question: '아직 프론트/백엔드에 대한 지식이 부족한데 프로젝트 활동에 참여할 수 있을까요?',
      answer:
        '프로젝트 진행 시 초반에는 기획 및 디자인이 약 1-2달 동안 진행됩니다. 이때 프로젝트에 필요한 스터디를 진행한 후 개발에 들어가면 프로젝트가 처음이어도 충분히 참여가 가능합니다.',
      summary: '프로젝트 참여 조건',
      hash: 'project-qualification',
      image: 'eye_close',
    },
    {
      question: '스터디 및 프로젝트 활동은 어떤 식으로 진행되나요?',
      answer:
        '활동 초반에 하고 싶은 스터디/프로젝트 주제를 신청 받은 수 희망 참여자를 받아 팀을 개설합니다. 이후 활동은 각 팀에서 임의적으로 이루어지며, 매 세션마다 활동 진행상황을 발표하는 방식으로 진행됩니다.',
      summary: '진행 방식',
      hash: 'activity-flow',
      image: 'laptop',
    },
    {
      question: '해커톤은 어떻게 진행되나요?',
      answer:
        '방학 기간 중에 신청자를 받아 무박 2일로 프로젝트를 진행합니다. 활동 기수의 신입 부원은 필수로 참여해야 합니다.',
      summary: '해커톤',
      hash: 'hackathon',
      image: 'zombie',
    },
    {
      question: '한 기수 활동 종료 후에도 다음 기수를 할 수 있나요?',
      answer: '회칙 기준에 부합하게 기수를 수료한 경우 다음 기수 활동 신청이 가능합니다.',
      summary: '활동 연장',
      hash: 'activity-extension',
      image: 'eye_close',
    },
  ] as FAQType[],
};
