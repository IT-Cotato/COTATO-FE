export type MessageType = {
  status?: string | null;
  start?: string | null;
  quizId: number | null;
  educationId?: number | null;
  command: string;
};

export const SHOW_WAITING_EVENT = 'SHOW_WAITING';
export const SHOW_PROBLEM_EVENT = 'SHOW_PROBLEM';
export const ALLOW_SUBMIT_EVENT = 'ALLOW_SUBMIT';
export const SHOW_KING_EVENT = 'SHOW_KING';
export const SHOW_WINNER_EVENT = 'SHOW_WINNER';
export const EXIT_EVENT = 'EXIT';

//
//
//

export const handleWsMessage = (message: MessageType) => {
  //
  const waitingEvent = [
    !message.status,
    !message.start,
    !message.quizId,
    message.command === 'show',
  ].every((condition) => condition);

  //
  const showProblemEvent = [
    message.status === 'QUIZ_ON',
    message.start === 'QUIZ_OFF',
    message?.quizId,
    message.command === 'show',
  ].every((condition) => condition);

  //
  const allowSubmitEvent = [message.quizId, message.command === 'start'].every(
    (condition) => condition,
  );

  //
  const allowSubmitWithReloadEvent = [
    message.status === 'QUIZ_ON',
    message.start === 'QUIZ_ON',
    message.quizId,
    message.command === 'show',
  ].every((condition) => condition);

  //
  const exitEvent = message.command === 'exit';

  //
  const kingEvent = message.educationId && message.command === 'king';

  //
  const winnerEvent = message.command === 'winner';

  //
  //
  //

  switch (true) {
    case waitingEvent:
      return SHOW_WAITING_EVENT;

    case showProblemEvent:
      return SHOW_PROBLEM_EVENT;

    case allowSubmitEvent || allowSubmitWithReloadEvent:
      return ALLOW_SUBMIT_EVENT;

    case exitEvent:
      return EXIT_EVENT;

    case kingEvent:
      return SHOW_KING_EVENT;

    case winnerEvent:
      return SHOW_WINNER_EVENT;

    default:
      return message;
  }
};
