/**
 * @api {post} /v1/api/generation/add
 */
export interface PostV1ApiGenerationAddResponse {
  generationId: number;
}

export interface GenerationInfo {
  generationId: number;
  generationNumber: number;
  sessionCount: number;
}

/**
 * @api {get} /v1/api/generation/{generationId}
 */
export type GetV1ApiGenerationResponse = GenerationInfo[];
