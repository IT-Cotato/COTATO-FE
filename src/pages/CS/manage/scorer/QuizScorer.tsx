import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import CSManageLayout from '@pages/CS/manage/CSManageLayout';
import { css, styled } from 'styled-components';
import { IQuizAdmin, IQuizAdminScorer, IQuizAdminSubmit } from '@/typing/db';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import AddAnswer from '@pages/CS/manage/scorer/AddAnswer';
import ToggleButton from '@components/ToggleButton';
import api from '@/api/api';
import { ToastContainer, toast } from 'react-toastify';
import WaitPopup from '@pages/CS/manage/WaitPopup';

const QuizScorer = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const quizId = searchParams.get('quizId');
  const educationId = searchParams.get('educationId');

  const { data: educationStatus } = useSWR(
    `/v1/api/education/status?educationId=${educationId}`,
    fetcher,
  );
  const { data: quizList, mutate: quizListMutate } = useSWR(
    `/v1/api/quiz/cs-admin/all?educationId=${educationId}`,
    fetcher,
  );
  const { data: quiz } = useSWR<IQuizAdminScorer>(
    `/v1/api/quiz/cs-admin?quizId=${quizId}`,
    fetcher,
  );
  const { data: record } = useSWR(`/v1/api/record/all?quizId=${quizId}`, fetcher, {
    refreshInterval: 1000,
  });

  const [submits, setSubmits] = useState<IQuizAdminSubmit[]>();
  const [scorer, setScorer] = useState<IQuizAdminScorer>();
  const [quizStatus, setQuizStatus] = useState('');
  const [quizStart, setQuizStart] = useState('');
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [quiz]);

  useEffect(() => {
    quizList?.quizzes.forEach((quizData: IQuizAdmin) => {
      if (quizData.quizId === Number(quizId)) {
        setQuizStatus(quizData.status);
        setQuizStart(quizData.start);
      }
    });
  }, [quizList, quizId]);

  useEffect(() => {
    const newSubmitList: IQuizAdminSubmit[] = record?.records;
    newSubmitList?.sort((left, right) => left.ticketNumber - right.ticketNumber);
    if (quizStart === 'QUIZ_OFF' && newSubmitList?.length) {
      setQuizStatus('QUIZ_ON');
      setQuizStart('QUIZ_ON');
    }

    setSubmits(newSubmitList);
    setScorer(record?.scorer);
  }, [record]);

  const onClickApproach = useCallback(() => {
    if (educationStatus.status !== 'ONGOING') {
      toast.error('교육을 시작해주세요.');
      return;
    }

    let path = '';
    if (quizStatus === 'QUIZ_OFF') {
      path = '/v1/api/socket/access';
    } else if (quizStatus === 'QUIZ_ON') {
      path = '/v1/api/socket/deny';
    }

    api
      .patch(path, { quizId: quizId })
      .then(() => {
        quizListMutate();
      })
      .catch((err) => {
        console.error(err);
        quizListMutate();
      });
  }, [quizStatus, quizStart, educationStatus]);

  const onClickQuizStart = useCallback(() => {
    if (educationStatus.status !== 'ONGOING') {
      toast.error('교육을 시작해주세요.');
      return;
    }

    if (quizStatus === 'QUIZ_OFF') {
      toast.error('문제 접근을 허용해주세요.');
      return;
    }

    let path = '';
    if (quizStart === 'QUIZ_OFF') {
      path = '/v1/api/socket/start';
      setIsPopupOpen(true);
    } else if (quizStart === 'QUIZ_ON') {
      path = '/v1/api/socket/stop';
    }

    api
      .patch(path, { quizId: quizId })
      .then(() => {
        setIsPopupOpen(false);
        quizListMutate();
      })
      .catch((err) => {
        console.error(err);
        setIsPopupOpen(false);
        quizListMutate();
      });
  }, [quizStart, educationStatus, quizStatus]);

  const handlePrevQuizButton = useCallback(() => {
    if (quiz?.quizNumber === 1) {
      toast.error('1번 문제입니다.');
      return;
    }

    let prevQuizId = 0;
    quizList?.quizzes.forEach((quizData: IQuizAdmin) => {
      if (quizData.quizNumber === Number(quiz?.quizNumber) - 1) {
        prevQuizId = quizData.quizId;
      }
    });

    navigate(`/cs/manage/quizscorer?educationId=${educationId}&quizId=${prevQuizId}`);
  }, [quiz, quizList]);

  const handleNextQuizButton = useCallback(() => {
    if (quiz?.quizNumber === 10) {
      toast.error('10번 문제입니다.');
      return;
    }

    let prevQuizId = 0;
    quizList?.quizzes.forEach((quizData: IQuizAdmin) => {
      if (quizData.quizNumber === Number(quiz?.quizNumber) + 1) {
        prevQuizId = quizData.quizId;
      }
    });

    navigate(`/cs/manage/quizscorer?educationId=${educationId}&quizId=${prevQuizId}`);
  }, [quiz, quizList]);

  return (
    <>
      <CSManageLayout header="CS 문제별 득점자 확인">
        <QuizScorerWrapper>
          <TitleWrapper>
            <p className="quiz-number">문제{quiz?.quizNumber}</p>
            <p className="question">{quiz?.question}</p>
          </TitleWrapper>
          <ColumnDivision>
            <HalfContainer width="55%">
              <p>제출 순 나열</p>
              <SubmitBox>
                {submits?.map((submit, index) => (
                  <SubmitContent key={index}>
                    <p>
                      {submit.memberName}({submit.backFourNumber})
                    </p>
                    <SubmitResult>
                      <p>
                        {submit.reply}
                        {quiz?.quizType === 'MULTIPLE_QUIZ' && '번'}
                      </p>
                    </SubmitResult>
                  </SubmitContent>
                ))}
              </SubmitBox>
            </HalfContainer>
            <HalfContainer width="45%">
              <p>득점자</p>
              <ScorerBox>
                <p>{scorer?.memberName ? `${scorer.memberName}(${scorer.backFourNumber})` : ''}</p>
              </ScorerBox>
              <p>문제 정답</p>
              <AnswerBox>
                {quiz?.answer.map((ans, idx) => (
                  <p key={idx}>
                    {ans}
                    {quiz.quizType === 'MULTIPLE_QUIZ' && '번'}
                  </p>
                ))}
              </AnswerBox>
              <AddAnswer quizId={quizId} quizType={quiz?.quizType} />
              <p>문제 제어</p>
              <ControlBox>
                <ControlButtonWrapper>
                  <p>접근</p>
                  <ToggleButton toggled={quizStatus === 'QUIZ_ON'} onClick={onClickApproach} />
                </ControlButtonWrapper>
                <ControlButtonWrapper>
                  <p>문제풀이 시작</p>
                  <ToggleButton toggled={quizStart === 'QUIZ_ON'} onClick={onClickQuizStart} />
                </ControlButtonWrapper>
              </ControlBox>
              <QuizMoveWrapper>
                <button onClick={handlePrevQuizButton}>이전 문제</button>
                <button onClick={handleNextQuizButton}>다음 문제</button>
              </QuizMoveWrapper>
            </HalfContainer>
          </ColumnDivision>
        </QuizScorerWrapper>
      </CSManageLayout>
      <WaitPopup isOpen={isPopupOpen} />
      <ToastContainer position="top-center" autoClose={2000} />
    </>
  );
};

export default QuizScorer;

const QuizScorerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
  margin-bottom: 48px;
`;

const fontStyle = css`
  color: #000;
  font-family: Inter;
  font-size: 20px;
  font-weight: 500;
  margin: 16px 0;
`;

const TitleWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  background: #fff;
  border-radius: 8px;

  .quiz-number {
    ${fontStyle}
    text-align: center;
    color: #477feb;
    width: 100px;
  }

  .question {
    ${fontStyle}
    width: calc(100% - 100px);
    margin: 16px 8px;
  }
`;

const ColumnDivision = styled.div`
  display: flex;
  width: 100%;
  margin-top: 36px;
`;

const HalfContainer = styled.div<{ width: string }>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: ${(props) => props.width};

  > p {
    ${fontStyle};
    margin: 8px 0;
  }
`;

const Box = styled.div`
  display: flex;
  border-radius: 8px;
  background: #fff;
  padding: 8px;
  box-sizing: border-box;
`;

const SubmitBox = styled(Box)`
  width: 90%;
  height: 70vh;
  flex-direction: column;
  align-items: center;
  overflow-y: scroll;
`;

const SubmitContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 95%;
  padding: 0 12px;
  border-bottom: 1px solid rgba(28, 28, 28, 0.3);

  > p {
    min-width: 80px;
    ${fontStyle};
  }
`;

const ScorerBox = styled(Box)`
  width: 100%;
  height: 56px;
  margin-bottom: 20px;

  > p {
    ${fontStyle}
    margin: 8px;
  }
`;

const SubmitResult = styled.div`
  display: flex;
  justify-content: flex-end;
  max-width: calc(100% - 80px);
  overflow-wrap: break-word;

  > p {
    ${fontStyle};
    color: #85c88a;
    max-width: 100%;
  }
`;

const AnswerBox = styled(Box)`
  display: block;
  width: 100%;
  margin-bottom: 20px;

  > p {
    ${fontStyle};
    color: #85c88a;
    margin: 8px;
  }
`;

const ControlBox = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 28px;
`;

const ControlButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 0 16px;
  > p {
    ${fontStyle};
    margin: 8px;
  }
`;

const QuizMoveWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: flex-end;
  gap: 8px;

  > button {
    display: flex;
    align-items: center;
    cursor: pointer;
    border-radius: 5px;
    border: 1px solid #bebebe;
    background: #feffff;
    padding: 8px 20px;

    color: #2e2e2e;
    font-family: Inter;
    font-size: 16px;
    font-weight: 400;
  }
`;
