import { useNavigate } from 'react-router-dom';

//
//
//

const useAttendanceReportNavigate = () => {
  const navigate = useNavigate();

  const attendanceReportNavigate = (
    generationId: number | string,
    sessionId: number | string,
    attendanceId: number | string,
  ) => {
    navigate(
      `/attendance/report/generation/${generationId}/session/${sessionId}/attendance/${attendanceId}`,
    );
  };

  return attendanceReportNavigate;
};

export default useAttendanceReportNavigate;
