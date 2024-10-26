import React from 'react';
import { ReactComponent as KaKaoTalkIcon } from '@/assets/kakaotalk.svg';
import { ReactComponent as AttendanceIcon } from '@/assets/attendance_icon.svg';
import { useNavigate } from 'react-router-dom';
import CotatoFloatingActionButton from '@components/CotatoFloatingActionButton/CotatoFloatingActionButton';
import CotatoFloatingActionButtonItem from '@components/CotatoFloatingActionButton/CotatoFloatingActionButtonItem';
import fetchUserData from '@utils/fetchUserData';
import { MemberRole } from '@/enums';
import CotatoIcon from '@components/CotatoIcon';

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

  const isOverOldMember = MemberRole[user?.role ?? 'REFUSED'] >= MemberRole.OLD_MEMBER;

  //
  const fabList = {
    attendance: {
      name: isOverOldMember ? '출석' : '코테이토 회원 전용 기능입니다!',
      icon: <AttendanceIcon width="100%" height="100%" />,
      disabled: !isOverOldMember,
      onClick: () => {
        navigate('/attendance');
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
  };

  //
  //
  //
  return (
    <CotatoFloatingActionButton
      icon={
        <CotatoIcon icon="search" size="100%" color={(theme) => theme.colors.common.white_const} />
      }
      name="바로가기"
    >
      {Object.entries(fabList).map(([key, value]) => (
        <CotatoFloatingActionButtonItem
          key={key}
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
