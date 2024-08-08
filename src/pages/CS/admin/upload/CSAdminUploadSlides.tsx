import React, { useCallback } from 'react';
import DndContainer from './CSAdminUploadDndContainer';
import styled from 'styled-components';
import {
  CotatoCreateMultipleQuizRequest,
  CotatoCreateShortQuizRequest,
} from 'cotato-openapi-clients';
import { createMultipleQuiz } from './utils/createMultipleQuiz';

//
//
//

export interface MultipleQuiz extends CotatoCreateMultipleQuizRequest {
  previewUrl?: string;
}

export interface ShortQuiz extends CotatoCreateShortQuizRequest {
  previewUrl?: string;
}

export type QuizType = MultipleQuiz | ShortQuiz;

type Props = {
  quiz: QuizType[];
  setQuiz: React.Dispatch<React.SetStateAction<QuizType[]>>;
  selected: number;
  setSelected: React.Dispatch<React.SetStateAction<number>>;
};

//
//
//

const CSAdminUploadSlides = ({ quiz, setQuiz, selected, setSelected }: Props) => {
  /**
   *
   */
  const handleClickAddQuiz = () => {
    if (!checkCanAddQuiz()) {
      return;
    }

    setQuiz((prev) => {
      return [
        ...prev,
        createMultipleQuiz({
          number: prev.length + 1,
        }),
      ];
    });
  };

  /**
   *
   */
  const checkCanAddQuiz = () => {
    if (quiz.length === 10) {
      window.alert('슬라이드가 10개 이하이어야 합니다.');
      return false;
    }
    return true;
  };

  /**
   *
   */
  const checkCanDeleteQuiz = () => {
    if (quiz.length === 1) {
      window.alert('슬라이드가 1개 이상이어야 합니다.');
      return false;
    }
    return true;
  };

  /**
   *
   */
  const confirmDeleteQuiz = () => {
    const result = window.confirm('정말 삭제하시겠습니까?');

    if (!result) return;
    return true;
  };

  /**
   * delete selected quiz item
   */
  const deleteItem = useCallback(() => {
    if (!checkCanDeleteQuiz()) {
      return;
    }
    if (!confirmDeleteQuiz()) {
      return;
    }
    // select previous number
    selected === 0 ? setSelected(0) : setSelected(selected - 1);

    // delete selected quiz and renumber
    setQuiz((prev) => {
      const newPrev = [...prev];
      newPrev.splice(selected, 1);

      if (newPrev[selected - 2]?.previewUrl) {
        URL.revokeObjectURL(newPrev[selected - 2].previewUrl || '');
      }
      return newPrev.map((quiz, index) => ({ ...quiz, number: index + 1 }));
    });
  }, [selected]);

  return (
    <Wrapper>
      {DndContainer(quiz, setQuiz, setSelected, selected)}
      <button
        style={{ background: '#477FEB', color: 'white' }}
        onClick={() => {
          handleClickAddQuiz();
        }}
      >
        슬라이드 추가
      </button>
      <button
        style={{ background: '#D2D2D2' }}
        onClick={() => {
          deleteItem();
        }}
      >
        슬라이드 삭제
      </button>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  grid-area: leftbox;
  background-color: ${({ theme }) => theme.colors.primary5};
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 40px;
  button {
    width: 200px;
    height: 48px;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    border: none;
    background: ${({ theme }) => theme.colors.primary5};
    & + button {
      margin-top: 16px;
    }
    box-shadow: 0px 4px 5px 0px rgba(0, 0, 0, 0.15);
  }

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export default CSAdminUploadSlides;
