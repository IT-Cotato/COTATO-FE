import { CotatoAttendanceRecordResponse, CotatoAttendanceStatistic } from 'cotato-openapi-clients';

/**
 * Get current statistic
 */
export const getCurrentStatistic = (record: CotatoAttendanceRecordResponse | undefined) => {
  // online, offline, late, absent

  const keys = Object.keys(record?.statistic || {});

  // 0이 아닌 값이 있는 인덱스 == online, offline, late, absent 중 하나
  const currentInfoIndex = Object.values(record?.statistic || {}).findIndex((value) => value !== 0);

  const currentStatistic = keys[currentInfoIndex] as keyof CotatoAttendanceStatistic;

  return currentInfoIndex === -1 ? 'undefined' : currentStatistic;
};

/**
 * Interface: GetAttendanceReportPathParams
 * Defines the parameters required to construct the attendance report path.
 */
export interface GetAttendanceReportPathParams {
  keepSearchParam?: boolean;
  generationId?: number | string;
  sessionId?: number | string;
  attendanceId?: number | string;
}

/**
 * Function: getAttendanceReportPath
 * Generates a dynamic path for the attendance report.
 *
 * @param {GetAttendanceReportPathParams} params - The parameters for constructing the path.
 * @param {boolean} [params.keepSearchParam=true] - Whether to include the current URL's search parameters in the path.
 * @param {number | string} [params.generationId] - The generation ID. Defaults to `0` if not provided.
 * @param {number | string} [params.sessionId] - The session ID. Defaults to `0` if not provided.
 * @param {number | string} [params.attendanceId] - The attendance ID. Defaults to `0` if not provided.
 * @returns {string} The generated attendance report path.
 */
export const getAttendanceReportPath = ({
  keepSearchParam = true,
  generationId = 0,
  sessionId = 0,
  attendanceId = 0,
}: GetAttendanceReportPathParams) => {
  return `/attendance/report/generation/${generationId}/session/${sessionId}/attendance/${attendanceId}${
    keepSearchParam ? location.search : ''
  }`;
};
