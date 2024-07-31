import {
  CotatoCreateChoiceRequest as Choice,
  CotatoCreateChoiceRequest,
} from 'cotato-openapi-clients';
import { MultipleQuiz } from '../CSAdminUploadSlides';

type CreateMultipleQuizProps = MultipleQuiz;

export const createMultipleQuiz = (props?: CreateMultipleQuizProps) => {
  // Default values for initialization
  const defaultValues: MultipleQuiz = {
    number: 1,
    question: '',
    image: undefined,
    choices: [],
    previewUrl: '',
  };

  const createChoice = (number: number, isAnswer: 'ANSWER' | 'NO_ANSWER'): Choice => {
    return {
      number,
      content: '',
      isAnswer,
    };
  };

  const choices: CotatoCreateChoiceRequest[] = Array.from({ length: 4 }, (_, i) =>
    createChoice(i + 1, i === 0 ? 'ANSWER' : 'NO_ANSWER'),
  );

  const quiz = {
    ...defaultValues,
    ...props,
    choices: choices,
    shortAnswers: undefined,
  };

  return quiz;
};
