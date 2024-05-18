/**
 * @api {post} /v1/api/education/add
 */
export interface PostV1ApiEducationAddResponse {
  education: number;
}

/**
 * @api {get} /v1/api/education/status?educationId={educationId}
 */
export interface GetV1ApiEducationStatusResponse {
  status: string;
}

export interface EducationInfo {
  educationId: number;
  subject: string;
  educationNumber: number;
  sessionNumber: number;
}

/**
 * @api {get} /v1/api/education?generationId={generationId}
 */
export type GetV1ApiEducationResponse = EducationInfo[];

/**
 * @api {get} /v1/api/education/from?quizId={quizId}
 */
export interface GetV1ApiEducationFromResponse {
  educationId: number;
}

export interface KingMemberInfo {
  memberId: number;
  memberName: string;
  backFourNumber: string;
}

/**
 * @api {get} /v1/api/education?educationId={educationId}
 */
export type GetV1ApiEducationResultKingsResponse = KingMemberInfo[];

/**
 * @api {get} /v1/api/education?educationId={educationId}
 */
export interface GetV1ApiEducationResultWinnerResponse {
  memberId: number;
  memberName: string;
  backFourNumber: string;
  educationNumber: number;
  memberPosition: string;
}
