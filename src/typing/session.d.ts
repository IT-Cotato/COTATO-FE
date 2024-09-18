import {
  CotatoSessionListResponse,
  CotatoSessionListImageInfoResponse,
} from 'cotato-openapi-clients';

interface ImageFile {
  imageFile?: File;
}

interface SessionDeadline {
  attendDeadLine: ?string;
  lateDeadLine?: string;
}

export type SessionListImageInfo = CotatoSessionListImageInfoResponse & ImageFile;

export type SessionListInfo = Omit<CotatoSessionListResponse, 'imageInfos'> & {
  imageInfos: SessionListImageInfo[];
  attendanceDeadLine?: string;
  lateDeadLine?: string;
};
