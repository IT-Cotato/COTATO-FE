/**
 * @type ApplyMemberInfo
 */
export interface ApplyMemberInfo {
  memberId: number;
  memberName: string;
  backFourNumber: string;
}

/**
 * @api {get} /v1/api/admin/applicants
 */
export type GetV1ApiAdminApplicantsResponse = ApplyMemberInfo[];

/**
 * @api {get} /v1/api/admin/reject-applicants
 */
export type GetV1ApiAdminRejectApplicantsResponse = ApplyMemberInfo[];

/**
 * @api {get} /v1/api/admin/active-members
 */
export interface GetV1ApiAdminActiveMembersResponse {
  memberId: number;
  memberName: string;
  position: string;
  generationNumber: number;
  role: string;
}

/**
 * @api {get} /v1/api/admin/old-members
 */
export interface GetV1ApiAdminOldMembersResponse {
  memberId: number;
  memberName: string;
  position: string;
  generationNumber: number;
  role: string;
}
