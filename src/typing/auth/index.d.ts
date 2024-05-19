/**
 * @api {post} /v1/api/auth/join
 */
export interface PostV1ApiAuthJoinRequest {
  email: string;
  password: string;
  name: string;
  phoneNumber: string;
}

/**
 * @api {post} /login
 */
export interface PostLoginRequest {
  email: string;
  password: string;
}

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
 * @api {post} /v1/api/auth/logout
 */
export interface PostV1ApiAuthLogoutRequest {
  accessToken: string;
}

/**
 * @api {post} /v1/api/auth/reissue
 */
export interface PostV1ApiAuthReissueResponse {
  accessToken: string;
}

/**
 * @api {get} /v1/api/auth/email
 */
export interface GetV1ApiAuthEmailResponse {
  email: string;
}

/**
 * @api {post} /v1/api/auth/verification?type=sign-up
 */
export interface PostV1ApiAuthVerificationRequest {
  email: string;
}

/**
 * @api {get} /v1/api/auth/verification?type=find-password
 */
export interface GetV1ApiAuthVerificationRequest {
  email: string;
}

export interface GetV1ApiAuthVerifycationResponse {
  accessToken: string;
}
