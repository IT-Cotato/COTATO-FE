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
 * @api {patch} /v1/api/admin/approve
 */
export interface PatchV1ApiAdminApproveRequest {
  memberId: number;
  position: string;
  generationId: number;
}

/**
 * @api {patch} /v1/api/admin/reject
 */
export interface PatchV1ApiAdminRejectRequest {
  memberId: number;
}

/**
 * @api {patch} /v1/api/admin/reapprove
 */
export interface PatchV1ApiAdminReapproveRequest {
  memberId: number;
  position: string;
  generationId: number;
}

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
 * @api {patch} /v1/api/admin/active-members/role
 */
export interface GetV1ApiAdminActiveMembersRoleRequest {
  memberId: number;
  role: string;
}

/**
 * @api {patch} /v1/api/admin/active-members/to-old-members
 */
export interface PatchV1ApiAdminActiveMembersToOldMembersRequest {
  memberIds: number[];
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

/**
 * @api {patch} /v1/api/admin/old-members/role
 */
export interface GetV1ApiAdminOldMembersRoleRequest {
  memberId: number;
}
