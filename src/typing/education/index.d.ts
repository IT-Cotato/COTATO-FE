/**
 * @api {post} /v1/api/education/add
 */
export interface PostV1ApiEducationAddRequest {
  subject: string;
  sessionId: number;
  educationNum: number;
}

export interface PostV1ApiEducationAddResponse {
  education: number;
}

/**
 * @api {get} /v1/api/education/status?educationId={educationId}
 */
export interface GetV1ApiEducationStatusResponse {
  status: string;
}

/**
 * @api {patch} /v1/api/education/status
 */
export interface PatchV1ApiEducationStatusRequest {
  educationId: number;
  status: string;
}

/**
 * @api {patch} /v1/api/education
 */
export interface PatchV1ApiEducationRequest {
  educationId: number;
  newSubject: string;
  newNumber: number;
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
 * @api {get} /v1/api/education/result/kings?educationId={educationId}
 */
export type GetV1ApiEducationResultKingsResponse = KingMemberInfo[];

/**
 * @api {get} /v1/api/education/result/winner?educationId={educationId}
 */
export interface GetV1ApiEducationResultWinnerResponse {
  memberId: number;
  memberName: string;
  backFourNumber: string;
  educationNumber: number;
  memberPosition: string;
}
