/**
 * @api {patch} /v1/api/member/update/password
 */
export interface PatchV1ApiMemberUpdatePasswordRequest {
  password: string;
}

/**
 * @api {post} /v1/api/member/check/password
 */
export interface PostV1ApiMemberCheckPasswordRequest {
  password: string;
}

/**
 * @api {get} /v1/api/member/{memberId}/mypage
 */
export interface GetV1ApiMemberMemberIdMypageResponse {
  memberId: number;
  email: string;
  name: string;
  generationNumber: number;
  memberPosition: string;
  phoneNumber: string;
}
