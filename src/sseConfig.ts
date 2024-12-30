import { NativeEventSource, EventSourcePolyfill } from 'event-source-polyfill';

//
//
//

type SetAttendanceState = React.Dispatch<React.SetStateAction<boolean>>;

interface AttendanceStatus {
  attendanceId: number;
  openStatus: string;
}

//
//
//

export const sseConfig = (setIsAttendanceOpen: SetAttendanceState): void => {
  const url = `${process.env.REACT_APP_BASE_URL}/v2/api/events/attendances`;
  const options = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
    },
    heartbeatTimeout: 3600000, //타임 아웃 1시간 설정
    withCredentials: true,
  };

  const EventSource = EventSourcePolyfill || NativeEventSource;
  const sse = new EventSource(url, options) as EventSource;

  /**
   *
   */
  const handleAttendanceOpen = (attendanceStatus: AttendanceStatus) => {
    if (attendanceStatus.openStatus === 'OPEN') {
      setIsAttendanceOpen(true);
    }
  };

  /**
   *
   */
  sse.addEventListener('AttendanceStatus', (e: MessageEvent) => {
    const receivedData = e.data;
    const attendanceStatus = JSON.parse(receivedData);

    handleAttendanceOpen(attendanceStatus);
  });

  /**
   *
   */
  sse.onerror = (err) => {
    console.error('SSE Error:', err);
  };
};
