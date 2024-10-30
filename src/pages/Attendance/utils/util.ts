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
