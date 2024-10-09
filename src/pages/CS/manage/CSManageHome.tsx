import React, { useCallback, useEffect, useState } from 'react';
import { styled } from 'styled-components';
import CSManageLayout from '@pages/CS/manage/CSManageLayout';
import QuizContent from '@pages/CS/manage/QuizContent';
import { useNavigate, useParams } from 'react-router-dom';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import { IQuizAdmin } from '@/typing/db';
import api from '@/api/api';
import { toast } from 'react-toastify';

const CSManageHome = () => {
  const { educationId, generationId } = useParams();
  const navigate = useNavigate();

  const { data: quizData, mutate: quizMutate } = useSWR(
    `/v1/api/quiz/cs-admin/all?educationId=${educationId}`,
    fetcher,
  );
  const { data: educationStatus, mutate: statusMutate } = useSWR(
    `/v1/api/education/status?educationId=${educationId}`,
    fetcher,
  );
  const [quizzes, setQuizzes] = useState<IQuizAdmin[]>();

  useEffect(() => {
    if (quizData) {
      const quizArr: IQuizAdmin[] = quizData.quizzes;
      quizArr.sort((left, right) => left.quizNumber - right.quizNumber);
      setQuizzes(quizArr);
    }
  }, [quizData]);

  const onClickQuizButton = useCallback(() => {
    let path = '';
    if (educationStatus?.status !== 'ONGOING' && confirm('교육을 시작하시겠습니까?')) {
      path = '/v1/api/socket/start/csquiz';
    } else if (educationStatus?.status === 'ONGOING' && confirm('교육을 종료하시겠습니까?')) {
      path = '/v1/api/socket/close/csquiz';
    }

    api
      .patch(path, { educationId: educationId })
      .then(() => {
        statusMutate();
        quizMutate();
      })
      .catch((err) => {
        console.error(err);
        statusMutate();
        quizMutate();
      });
  }, [educationStatus?.status]);

  const handleKingKingButton = useCallback(() => {
    if (educationStatus?.status !== 'ONGOING') {
      alert('교육을 시작해주세요.');
      return;
    }

    if (confirm('킹킹 진출자를 계산하시겠습니까?')) {
      api
        .post(`/v1/api/education/kings?educationId=${educationId}`)
        .then(() => {
          submitKingKing();
        })
        .catch((err) => {
          if (err.response.data.code === 'K-301') {
            submitKingKing();
          } else {
            console.error(err);
            toast.error('킹킹 진출자 계산이 실패했습니다.');
          }
        });
    }
  }, [educationId, educationStatus, quizData]);

  const submitKingKing = useCallback(() => {
    api
      .post(`/v1/api/socket/kings?educationId=${educationId}`)
      .then(() => {
        toast.success('킹킹 진출자 계산이 완료되었습니다.');
      })
      .catch((err) => {
        console.error(err);
        toast.error('킹킹 진출자 계산이 실패했습니다.');
      });
  }, [educationId]);

  const handleWinnerButton = useCallback(() => {
    if (educationStatus?.status !== 'ONGOING') {
      alert('교육을 시작해주세요.');
      return;
    }

    if (confirm('우승자를 계산하시겠습니까?')) {
      api
        .post(`/v1/api/education/winner?educationId=${educationId}`)
        .then(() => {
          submitWinner();
        })
        .catch((err) => {
          if (err.response.data.code === 'W-301') {
            submitWinner();
          } else {
            console.error(err);
            toast.error('우승자 계산이 실패했습니다.');
          }
        });
    }
  }, [educationId, quizData, educationStatus]);

  const submitWinner = useCallback(() => {
    api
      .post(`/v1/api/socket/winner?educationId=${educationId}`)
      .then(() => {
        toast.success('우승자 계산이 완료되었습니다.');
      })
      .catch((err) => {
        console.error(err);
        toast.error('우승자 계산이 실패했습니다.');
      });
  }, [educationId]);

  const onClickCheckAllScorer = useCallback(() => {
    navigate(`/cs/manage/generation/${generationId}/education/${educationId}/allscorer`);
  }, [educationId]);

  /**
   *
   */
  const renderQuizContents = () => {
    if (!educationId) {
      return null;
    }

    return quizzes?.map((quiz) => (
      <QuizContent
        key={quiz.quizId}
        quiz={quiz}
        educationStatus={educationStatus?.status}
        quizStatus={quiz.status}
      />
    ));
  };

  //
  //
  //

  return (
    <>
      <CSManageLayout header="CS 문제풀이 관리">
        <ManageWrapper>
          <ButtonWrapper>
            <LeftButtonContainer>
              <Button color="#477FEB" onClick={onClickQuizButton}>
                {educationStatus?.status === 'ONGOING' ? '교육 종료하기' : '교육 시작하기'}
              </Button>
              <Button color="#477FEB" onClick={handleKingKingButton}>
                킹킹 진출자 계산
              </Button>
              <Button color="#477FEB" onClick={handleWinnerButton}>
                우승자 계산
              </Button>
            </LeftButtonContainer>
            <Button color="#000" onClick={onClickCheckAllScorer}>
              전체 득점자 확인
            </Button>
          </ButtonWrapper>
          <QuizContentsWrapper>{renderQuizContents()}</QuizContentsWrapper>
        </ManageWrapper>
      </CSManageLayout>
    </>
  );
};

export default CSManageHome;

const ManageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
  margin-bottom: 132px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const Button = styled.button<{ color: string }>`
  background: #feffff;
  border: none;
  border-radius: 5px;
  padding: 8px 32px;
  cursor: pointer;
  min-width: 152px;

  color: ${(props) => props.color};
  font-family: Inter;
  font-size: 16px;
  font-weight: 500;
`;

const LeftButtonContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const QuizContentsWrapper = styled.div`
  width: 100%;
`;
