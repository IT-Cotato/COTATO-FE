import React from 'react';
import fetcher from '@utils/fetcher';
import useSWR from 'swr';
import { Route, Routes, useNavigate } from 'react-router-dom';
import CSManageHome from '@pages/CS/manage/CSManageHome';
import QuizScorer from '@pages/CS/manage/scorer/QuizScorer';
import AllScorer from '@pages/CS/manage/scorer/AllScorer';
import { checkIsUnderManager } from '@utils/role';

const CSManage = () => {
  const { data: user } = useSWR('/v1/api/member/info', fetcher);

  const navigate = useNavigate();

  const isUnderManager = checkIsUnderManager(user?.role);

  if (isUnderManager) {
    navigate('/');
  }

  return (
    <Routes>
      <Route path="/generation/:generationId/education/:educationId" element={<CSManageHome />} />
      <Route
        path="/generation/:generationId/education/:educationId/quiz/:quizId/quizscorer"
        element={<QuizScorer />}
      />
      <Route
        path="/generation/:generationId/education/:educationId/allscorer"
        element={<AllScorer />}
      />
    </Routes>
  );
};

export default CSManage;
