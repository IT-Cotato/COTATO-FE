/**
 * @api {post} /v1/api/session/add
 */
export interface PostV1ApiSessionAddRequest {
  generationId: number;
  sessionImage: string;
  description: string;
  ItIssue: string;
  Networking: string;
  CSEducation: string;
}

export interface PostV1ApiSessionAddResponse {
  sessionId: number;
  sessionNumber: number;
}

/**
 * @api {patch} /v1/api/session/update
 */
export interface PatchV1ApiSessionUpdateRequest {
  sessionId: number;
  sessionImage: string;
  description: string;
  isPhotoUpdated: boolean;
  itIssue: string;
  networking: string;
  csEducation: string;
}

/**
 * @api {patch} /v1/api/session/number
 */
export interface PatchV1ApiSessionNumberRequest {
  sessionId: number;
  sessionNum: number;
}

/**
 * @api {patch} /v1/api/session/description
 */
export interface PatchV1ApiSessionDescriptionRequest {
  sessionId: number;
  description: string;
}

/**
 * @api {patch} /v1/api/session/update/photo
 */
export interface PatchV1ApiSessionUpdatePhotoRequest {
  sessionId: number;
  sessionImage: string;
}

export interface SeesionInfo {
  sessionId: number;
  sessionNumber: number;
  photoUrl: string;
  description: string;
  generationId: number;
  itIssue: string;
  networking: string;
  csEducation: string;
}

/**
 * @api {get} /v1/api/session?generationId={generationId}
 */
export type GetV1ApiSessionResponse = SeesionInfo[];

export interface CsEducationOnSessionInfo {
  sessionId: number;
  sessionNumber: number;
}

/**
 * @api {get} /v1/api/seesion/cs-on?generationId={generationId}
 */
export type GetV1ApiSeesionCsOnResponse = CsEducationOnSessionInfo[];
