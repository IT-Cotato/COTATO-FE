import React, { ChangeEvent, FormEvent, useCallback, useState } from 'react';
import { styled } from 'styled-components';
import { ReactComponent as AddIcon } from '@assets/add_circle.svg';
import api from '@/api/api';
import useSWR from 'swr';
import { IQuizAdminScorer } from '@/typing/db';
import fetcher from '@utils/fetcher';
import { ToastContainer, toast } from 'react-toastify';

interface Props {
  quizId?: string;
  quizType?: string;
}

const AddAnswer = ({ quizId, quizType }: Props) => {
  const { mutate: mutateQuiz } = useSWR<IQuizAdminScorer>(
    `/v1/api/quiz/cs-admin?quizId=${quizId}`,
    fetcher,
  );
  const { mutate: mutateRecord } = useSWR(`/v1/api/record/all?quizId=${quizId}`, fetcher, {
    dedupingInterval: 1000,
  });

  const [addAnswer, setAddAnswer] = useState('');

  const onChangeAddAnswer = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setAddAnswer(e.target.value);
    },
    [addAnswer],
  );

  const onSubmitAddAnswer = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (quizType === 'SHORT_QUIZ') {
        api
          .post(
            '/v1/api/quiz/cs-admin/answer/add',
            {
              quizId: quizId,
              answer: addAnswer,
            },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
              },
            },
          )
          .then(() => {
            api
              .post('/v1/api/record/regrade', {
                quizId: quizId,
                newAnswer: addAnswer,
              })
              .then(() => {
                mutateQuiz();
                mutateRecord();
              })
              .catch((err) => console.error(err));

            setAddAnswer('');
          })
          .catch((err) => console.error(err));
      } else {
        toast.error('정답 추가는 주관식만 가능합니다.');
      }
    },
    [addAnswer],
  );

  return (
    <Form onSubmit={onSubmitAddAnswer}>
      <p>정답 추가</p>
      <AddAnswerInputWrapper>
        <AddAnswerInput
          type="text"
          placeholder="내용을 입력해주세요."
          value={addAnswer}
          onChange={onChangeAddAnswer}
        />
        <CleanAddAnswer onClick={() => setAddAnswer('')}>&times;</CleanAddAnswer>
      </AddAnswerInputWrapper>
      <AddAnswerButtonBox>
        <AddAsnwerButton type="submit">
          <AddIcon />
          <p>답안추가</p>
        </AddAsnwerButton>
      </AddAnswerButtonBox>
      <ToastContainer position="top-center" autoClose={2000} />
    </Form>
  );
};

export default React.memo(AddAnswer);

const Form = styled.form`
  width: 100%;
  margin-bottom: 20px;

  > p {
    color: #000;
    font-family: Inter;
    font-size: 20px;
    font-weight: 500;
    margin: 8px 0;
  }
`;

const AddAnswerInputWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const AddAnswerInput = styled.input`
  display: flex;
  width: 100%;
  border: none;
  border-radius: 8px;
  background-color: #fff;
  padding: 16px;
  box-sizing: border-box;

  color: #000;
  font-family: Inter;
  font-size: 20px;
  font-weight: 500;
  margin: 0;

  &:focus-visible {
    outline: none;
  }

  &::placeholder {
    color: #a4a4a4;
  }
`;

const CleanAddAnswer = styled.div`
  position: absolute;
  top: 50%;
  right: 20px;
  transform: translateY(-45%);
  cursor: pointer;
  border: none;
  background: transparent;
  color: #686868;
  font-size: 24px;
`;

const AddAnswerButtonBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 54px;
  border-radius: 8px;
  background: #fff;
  padding: 8px;
  box-sizing: border-box;
  margin-top: 12px;
`;

const AddAsnwerButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  height: 32px;
  cursor: pointer;
  border: none;
  background: transparent;

  > p {
    color: #757575;
    font-family: Inter;
    font-size: 16px;
    font-weight: 400;
  }
`;
