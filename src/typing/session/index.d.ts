/**
 * @api {post} /v1/api/session/add
 */
export interface PostV1ApiSessionAddResponse {
  sessionId: number;
  sessionNumber: number;
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
