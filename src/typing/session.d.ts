import {
  CotatoSessionListImageInfoResponse,
  CotatoUpdateSessionRequest,
} from 'cotato-openapi-clients';

interface ImageFile {
  imageFile?: File;
}

export type SessionListImageInfo = CotatoSessionListImageInfoResponse & ImageFile;

export type SessionUploadInfo = Omit<CotatoUpdateSessionRequest, 'sessionId'> & {
  sessionId?: number;
  generationId?: number;
  imageInfos: SessionListImageInfo[];
};
