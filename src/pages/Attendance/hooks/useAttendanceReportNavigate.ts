import { useLocation, useNavigate } from 'react-router-dom';

//
//
//

/**
 * Custom hook to navigate to the attendance report page.
 *
 * The resulting URL format is:
 * `/attendance/report/generation/{generationId}/session/{sessionId}/attendance/{attendanceId}`
 *
 * The Search parameters are included to retain any query string present in the current URL.
 *
 * @returns {Function} A function that navigates to the specified attendance report page.
 */
const useAttendanceReportNavigate = () => {
  const navigate = useNavigate();
  const location = useLocation();

  /**
   * Navigate to the attendance report page for a specific generation, session, and attendance.
   *
   * @param generationId {number | string} - The ID of the generation.
   * @param sessionId {number | string} - The ID of the session.
   * @param attendanceId {number | string} - The ID of the attendance.
   *
   * Note: The search parameters (`location.search`) are included to retain
   * any query string present in the current URL.
   */
  const attendanceReportNavigate = (
    generationId: number | string,
    sessionId: number | string,
    attendanceId: number | string,
  ) => {
    navigate(
      `/attendance/report/generation/${generationId}/session/${sessionId}/attendance/${attendanceId}${location.search}`,
    );
  };

  return attendanceReportNavigate;
};

export default useAttendanceReportNavigate;
