import { ShortQuiz } from '../CSAdminUploadSlides';

type CreateShortQuizProps = ShortQuiz;

export const createShortQuiz = (props: CreateShortQuizProps) => {
  // Default values for initialization
  const defaultValues: ShortQuiz = {
    number: 1,
    question: '',
    image: undefined,
    previewUrl: '',
  };

  const quiz = {
    ...defaultValues,
    ...props,
    choices: undefined,
    shortAnswers: [],
  };

  return quiz;
};
