/**
 * @api {get} /v1/api/auth/memberinfo
 */
export interface GetV1ApiAuthMemberinfoResponse {
  id: number;
  name: string;
  backFourNumber: string;
  role: string;
}

/**
 * @api {post} /v1/api/auth/login
 */
export interface PostV1ApiAuthReissueResponse {
  accessToken: string;
}

/**
 * @api {post} /v1/api/auth/login
 */
export interface GetV1ApiAuthEmailResponse {
  email: string;
}

/**
 * @api {post} /v1/api/auth/verifycation?type=sign-up
 */
export interface GetV1ApiAuthVerifycationResponse {
  accessToken: string;
}
