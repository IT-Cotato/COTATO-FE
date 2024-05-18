/**
 * @api {post} /api/v1/record/reply
 */
export interface PostV1ApiRecordReplyResponse {
  result: boolean;
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
