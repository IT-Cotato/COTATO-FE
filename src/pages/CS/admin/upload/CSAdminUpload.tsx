import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CSAdminUploadLayout from './CSAdminUploadLayout';
import CSAdminUploadContent from './CSAdminUploadContent';
import fetchUserData from '@utils/fetchUserData';
import api from '@/api/api';
import { MultipleQuiz, ShortQuiz } from './CSAdminUploadSlides';
import { createMultipleQuiz } from './utils/createMultipleQuiz';
import { useGeneration } from '@/hooks/useGeneration';
import { useEducation } from '@/hooks/useEducation';

//
//
//

type QuizType = MultipleQuiz | ShortQuiz;

//
//
//

const CSAdminUpload = () => {
  // 현재 선택된 슬라이드를 나타내기 위한 state
  const [selected, setSelected] = useState(0);
  // 전체 슬라이드를 담기 위한 state
  const [quiz, setQuiz] = useState<QuizType[]>([createMultipleQuiz()]);

  const { data: userData, isLoading } = fetchUserData();
  const { generationId, educationId } = useParams();

  const { targetGeneration } = useGeneration({ generationId });
  const { targetEducation } = useEducation({
    generationId: Number(generationId),
    educationId: educationId,
  });

  /**
   * fetch quiz list data if it exists
   */
  const fetchQuizData = async () => {
    await api
      .get('/v1/api/quiz/all', {
        params: {
          educationId: educationId,
        },
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      })
      .then((res) => {
        const quizDataList = [...res.data.multiples].concat(res.data.shortQuizzes);
        quizDataList.sort((a: QuizType, b: QuizType) => (a as any).number - (b as any).number);
        if (quizDataList.length === 0) {
          return;
        }
        setQuiz(quizDataList);
      });
  };

  //
  // fetch quiz data when component is mounted
  //
  useEffect(() => {
    fetchQuizData();
  }, []);

  //
  // prevent user from leaving the page
  //
  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  //
  // TODO: utilize role check function
  //
  setTimeout(() => {
    if (isLoading) return;

    if (!['ADMIN', 'EDUCATION'].includes(userData?.role as string)) {
      window.location.href = '/';
    }
  }, 500);

  return (
    <CSAdminUploadLayout
      generationNumber={targetGeneration?.generationNumber?.toString()}
      educationNumber={targetEducation?.educationNumber?.toString()}
    >
      <CSAdminUploadContent
        quiz={quiz}
        setQuiz={setQuiz}
        selected={selected}
        setSelected={setSelected}
        educationId={Number(educationId)}
      />
    </CSAdminUploadLayout>
  );
};

export default CSAdminUpload;
