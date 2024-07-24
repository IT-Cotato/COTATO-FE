import {
  CotatoSessionListResponse,
  CotatoSessionListImageInfoResponse,
} from 'cotato-openapi-clients';

interface ImageFile {
  imageFile?: File;
}

export type SessionListImageInfo = CotatoSessionListImageInfoResponse & ImageFile;

export type SessionListInfo = Omit<CotatoSessionListResponse, 'imageInfos'> & {
  imageInfos: SessionListImageInfo[];
};
