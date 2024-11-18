import { useNavigate } from 'react-router-dom';

//
//
//

/**
 * Custom hook to navigate to the attendance report page.
 *
 * The resulting URL format is:
 * `/attendance/report/generation/{generationId}/session/{sessionId}/attendance/{attendanceId}`
 *
 * @returns {Function} A function that navigates to the specified attendance report page.
 */
const useAttendanceReportNavigate = () => {
  const navigate = useNavigate();

  /**
   * Navigate to the attendance report page for a specific generation, session, and attendance.
   *
   * @param generationId {number | string}
   * @param sessionId {number | string}
   * @param attendanceId {number | string}
   */
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
