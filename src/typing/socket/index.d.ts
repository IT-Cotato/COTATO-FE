/**
 * @api {patch} /v1/api/socket/start/csquiz
 */
export interface PatchV1ApiSocketStartCsquizRequest {
  educationId: number;
}

/**
 * @api {patch} /v1/api/socket/access
 */
export interface PatchV1ApiSocketAccessRequest {
  quizId: number;
}

/**
 * @api {patch} /v1/api/socket/deny
 */
export interface PatchV1ApiSocketDenyRequest {
  quizId: number;
}

/**
 * @api {patch} /v1/api/socket/start
 */
export interface PatchV1ApiSocketStartRequest {
  quizId: number;
}

/**
 * @api {patch} /v1/api/socket/stop
 */
export interface PatchV1ApiSocketStopRequest {
  quizId: number;
}

/**
 * @api {patch} /v1/api/socket/close/csquiz
 */
export interface PatchV1ApiSocketCloseCsquizRequest {
  educationId: number;
}
