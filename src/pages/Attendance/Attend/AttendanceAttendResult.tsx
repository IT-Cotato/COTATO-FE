import React from 'react';
import { useParams } from 'react-router-dom';
import AttendanceAttendResultLayout from './AttendanceAttendResultLayout';

//
//
//

const AttendanceAttendResult = () => {
  const { status, attendanceType } = useParams();

  /**
   *
   */
  const convertStatusToEnum = (status?: string) => {
    switch (status) {
      case 'present':
        return 'PRESENT';

      case 'late':
        return 'LATE';

      case 'absent':
        return 'ABSENT';

      default:
        return 'error';
    }
  };

  /**
   *
   */
  const convertAttendanceTypeToEnum = (attendanceType?: string) => {
    switch (attendanceType) {
      case 'online':
        return 'ONLINE';

      case 'offline':
        return 'OFFLINE';
    }
  };

  const statusEnum = convertStatusToEnum(status);
  const attendanceTypeEnum = convertAttendanceTypeToEnum(attendanceType);

  return <AttendanceAttendResultLayout status={statusEnum} attendanceType={attendanceTypeEnum} />;
};

export default AttendanceAttendResult;
