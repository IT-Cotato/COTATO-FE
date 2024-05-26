export interface ChoiceRequestType {
  content: string;
  number: number;
  isAnswer: string;
}

export interface MultipleQuizRequestType {
  number: number;
  question: string;
  image: File;
  choices: ChoiceRequestType[];
}

export interface ShortAnswerRequestType {
  answer: string;
}

export interface ShortQuizRequestType {
  number: number;
  question: string;
  image: File;
  shortAnswer: ShortAnswerRequestType[];
}

export interface QuizzesRequestType {
  multiples: MultipleQuizRequestType[];
  shortQuizzes: ShortQuizRequestType[];
}

/**
 * @api {post} /v1/api/quiz/adds?educationId=상수
 */
export type PostV1ApiQuizAddsRequest = QuizzesRequestType;

export interface ChoiceResponseType {
  choiceId: number;
  number: number;
  content: string;
  isCorrect: string;
}

export interface MultipleQuizResponseType {
  id: number;
  number: number;
  question: string;
  image: string;
  choices: ChoiceResponseType[];
}

export interface ShortAnswerResponseType {
  answer: string;
}

export interface ShortQuizResponseType {
  id: number;
  number: number;
  question: string;
  image: string;
  shortAnswer: ShortAnswerResponseType[];
}

export interface QuizzesResposeType {
  multiples: MultipleQuizResponseType[];
  shortQuizzes: ShortQuizResponseType[];
}

/**
 * @api {get} /v1/api/quiz/all?educationId={educationId}
 */
export type GetV1ApiQuizAllResponse = QuizzesResposeType;

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
 * @api {post} /v1/api/quiz/cs-admin/answer/add
 */
export interface PostV1QuizCsAdminAnswerAddRequest {
  quizId: number;
  answer: string;
}

/**
 * @api {get} /v1/api/quiz/cs-admin/results?educationId={educationId}
 */
export type GetV1QuizCsAdminResultResponse = QuizResultInfo[];
