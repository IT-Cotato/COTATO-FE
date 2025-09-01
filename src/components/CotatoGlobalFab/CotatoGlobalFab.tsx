import React, { useEffect, useRef } from 'react';
import { ReactComponent as KaKaoTalkIcon } from '@/assets/kakaotalk.svg';
import { ReactComponent as AttendanceIcon } from '@/assets/attendance_icon.svg';
import { ReactComponent as ReportIcon } from '@/assets/report_icon.svg';
import { ReactComponent as CSQuizIcon } from '@/assets/cs_icon.svg';
import { useNavigate } from 'react-router-dom';
import CotatoFloatingActionButton from '@components/CotatoFloatingActionButton/CotatoFloatingActionButton';
import CotatoFloatingActionButtonItem from '@components/CotatoFloatingActionButton/CotatoFloatingActionButtonItem';
import fetchUserData from '@utils/fetchUserData';
import { feedbackIntegration } from '@/sentryFeedbackIntegtation';
import CotatoIcon from '@components/CotatoIcon';
import { checkIsAtLeastMember } from '@utils/role';
import { styled } from 'styled-components';

//
//
//

const COTATO_KAKAO_PLUS_FRIEND_URL = 'https://pf.kakao.com/_LQLyG';

//
//
//

const CotatoGlobalFab = () => {
  const navigate = useNavigate();
  const { data: user } = fetchUserData();

  const errorReportButtonRef = useRef<HTMLButtonElement>(null);

  const isMember = checkIsAtLeastMember(user?.role);

  //
  const fabList = {
    attendance: {
      name: isMember ? '출석' : '코테이토 회원 전용 기능입니다!',
      icon: <AttendanceIcon width="100%" height="100%" />,
      disabled: !isMember,
      onClick: () => {
        navigate('/attendance');
      },
    },
    csQuiz: {
      name: isMember ? 'CS 퀴즈' : '코테이토 회원 전용 기능입니다!',
      icon: <StyledCSQuizIcon width="100%" height="100%" />,
      disabled: !isMember,
      onClick: () => {
        navigate('/cs');
      },
    },
    kakaotalk: {
      name: '플러스 친구',
      icon: <KaKaoTalkIcon width="100%" height="100%" />,
      disabled: false,
      onClick: () => {
        window.open(COTATO_KAKAO_PLUS_FRIEND_URL, '_blank');
      },
    },
    errorReport: {
      name: '버그 문의',
      icon: <ReportIcon width="100%" height="100%" />,
      disabled: false,
      onClick: () => {},
    },
  };

  /**
   *
   */
  useEffect(() => {
    if (errorReportButtonRef.current) {
      feedbackIntegration.attachTo(errorReportButtonRef.current, {
        formTitle: 'Report a Bug',
      });
    }
  }, []);

  //
  //
  //
  return (
    <CotatoFloatingActionButton
      icon={<CotatoIcon icon="search" size="100%" color={(theme) => theme.colors.const.white} />}
      name="바로가기"
    >
      {Object.entries(fabList).map(([key, value]) => (
        <CotatoFloatingActionButtonItem
          key={key}
          ref={key === 'errorReport' ? errorReportButtonRef : undefined}
          name={value.name}
          icon={value.icon}
          disabled={value.disabled}
          onClick={value.onClick}
        />
      ))}
    </CotatoFloatingActionButton>
  );
};

export default CotatoGlobalFab;

//
//
//

const StyledCSQuizIcon = styled(CSQuizIcon)`
  path {
    fill: ${({ theme }) => theme.colors.const.white};
  }
`;
