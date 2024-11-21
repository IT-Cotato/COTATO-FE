import { NativeEventSource, EventSourcePolyfill } from 'event-source-polyfill';

//
//
//

type SetAttendanceState = React.Dispatch<React.SetStateAction<boolean>>;

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

  sse.addEventListener('attendance', (e: MessageEvent) => {
    const connectData = e.data;
    console.log('SSE connected: ', connectData);
  });

  sse.addEventListener('AttendanceStatus', (e: MessageEvent) => {
    const receivedData = e.data;
    console.log('attendance status: ', receivedData);
    const attendanceStatus = JSON.parse(receivedData);

    if (attendanceStatus.openStatus === 'OPEN') {
      setIsAttendanceOpen(true);
    }
  });

  sse.onerror = (err) => {
    console.error('SSE Error:', err);
  };
};
