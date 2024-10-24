import useUser from '@/hooks/useUser';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

//
//
//

const CSGuard = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();

  const { user, isUserError, isUserLoading } = useUser();

  //
  //
  //
  useEffect(() => {
    if (isUserLoading) {
      return;
    }

    if (isUserError || user?.role === 'GENERAL') {
      window.alert('코테이토 회원 전용 페이지입니다.');
      navigate('/');

      return;
    }
  }, [isUserError, isUserLoading, user]);

  //
  //
  //

  return <>{children}</>;
};

export default CSGuard;
