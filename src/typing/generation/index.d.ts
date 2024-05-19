/**
 * @api {post} /v1/api/generation/add
 */
export interface PostV1ApiGenerationAddRequest {
  generationNumber: number;
  SessionCount: number;
  startDate: string;
  endDate: string;
}

export interface PostV1ApiGenerationAddResponse {
  generationId: number;
}

/**
 * @api {patch} /v1/api/generation/recruiting
 */
export interface PatchV1ApiGenerationRecruitingRequest {
  generationId: number;
  statement: boolean;
}

/**
 * @api {patch} /v1/api/generation/period
 */
export interface PatchV1ApiGenerationPeriodRequest {
  generationName: string;
  startDate: string;
  endDate: string;
}

export interface GenerationInfo {
  generationId: number;
  generationNumber: number;
  sessionCount: number;
}

/**
 * @api {get} /v1/api/generation
 */
export type GetV1ApiGenerationResponse = GenerationInfo[];
