/**
 * @api {post} /api/v1/record/reply
 */
export interface PostV1ApiRecordReplyRequest {
  quizId: number;
  memberId: number;
  input: string;
}

export interface PostV1ApiRecordReplyResponse {
  result: boolean;
}

/**
 * @api {post} /v1/api/record/regrade
 */
export interface PostV1ApiRecordRegradeRequest {
  quizId: number;
  newAnswer: string;
}

export interface RecordInfo {
  recordId: number;
  ticketNumber: number;
  memberId: number;
  memberName: string;
  backFourNumber: string;
  reply: string;
}

export interface ScorerInfo {
  scorerId: number;
  memberId: number;
  memberName: string;
  backFourNumber: string;
}

/**
 * @api {get} /api/v1/record/all?quizId={quizId}
 */
export interface GetV1ApiRecordAllResponse {
  records: RecordInfo[];
  scorer: ScorerInfo;
}
