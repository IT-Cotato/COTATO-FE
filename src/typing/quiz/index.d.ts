export interface ChoiceInfo {
  choiceId: number;
  number: number;
  content: string;
  isCorrect: string;
}

export interface MultipleQuizInfo {
  id: number;
  number: number;
  question: string;
  image: string;
  choices: ChoiceInfo[];
}

export interface ShortAnswerInfo {
  answer: string;
}

export interface ShortQuizInfo {
  id: number;
  number: number;
  question: string;
  image: string;
  shortAnswer: ShortAnswerInfo[];
}

export interface AllQuizzes {
  multiples: MultipleQuizInfo[];
  shortQuizzes: ShortQuizInfo[];
}

/**
 * @api {get} /v1/api/quiz/all?educationId={educationId}
 */
export type GetV1ApiQuizAllResponse = AllQuizzes;

/**
 * @api {get} /v1/api/quiz/{quizId}
 */
export interface GetV1ApiQuizQuizIdResponse {
  id: number;
  number: number;
  type: MultipleQuizInfo | ShortQuizInfo;
  question: string;
  photoUrl: string;
  choices?: ChoiceInfo[];
}

export interface CsAdminQuizInfo {
  quizId: number;
  question: string;
  quizNumber: number;
  status: string;
  start: string;
}

/**
 * @api {get} /v1/api/quiz/cs-admin/all?educationId={educationId}
 */
export type GetV1ApiQuizCsAdminAllResponse = CsAdminQuizInfo[];

export interface QuizResultInfo {
  quizId: number;
  quizNumber: number;
  scoreId: number;
  scorerName: string;
  backFourNumber: string;
}

/**
 * @api {get} /v1/api/quiz/cs-admin/results?educationId={educationId}
 */
export type GetV1QuizCsAdminResultResponse = QuizResultInfo[];
