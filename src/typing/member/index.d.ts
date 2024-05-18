/**
 * @api {get} /v1/api/member/{memberId}/mypage
 */
export interface GetV1ApiMemberMemberIdMypageResponse {
  memberId: number;
  email: string;
  name: string;
  generationNumber: number;
  memberPositoin: string;
  phoneNumber: string;
}
