import React from 'react';
import './App.css';
import { useLocation, useMatch, Outlet } from 'react-router-dom';
import Header from '@components/Header';
import { GlobalStyle } from '@theme/GlobalStyle';
import CotatoThemeProvider from '@theme/context/CotatoThemeProvider';

import { CotatoGlobalFab } from '@components/CotatoGlobalFab';

import { AttendanceFab } from '@components/attendance/attendance-fab';
import AgreementConfirmDialog from '@components/AgreementConfirmDialog';

import 'react-toastify/dist/ReactToastify.css';
import 'react-day-picker/dist/style.css';
import { ToastContainer } from 'react-toastify';
import Background from '@components/Background';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useBreakpoints } from './hooks/useBreakpoints';

function App() {
  //
  const location = useLocation();
  const isInHome = location.pathname === '/';

  //
  const isInAttendanceList = useMatch('/attendance/list/generation/:generationId');
  const isInCsSolve = useMatch('/cs/solving/:generationId/:educationId');

  //
  const { isTabletOrSmaller } = useBreakpoints();

  /**
   *
   */
  const renderHeader = () => {
    if (isInCsSolve && isTabletOrSmaller) {
      return null;
    }

    return <Header />;
  };

  /**
   *
   */
  const renderFab = () => {
    if (isInCsSolve && isTabletOrSmaller) {
      return null;
    }

    if (isInAttendanceList) {
      return <AttendanceFab />;
    }

    return <CotatoGlobalFab />;
  };

  //
  //
  //
  React.useEffect(() => {
    if (isInHome) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isInHome]);

  //
  //
  //

  return (
    <div className="App">
      <CotatoThemeProvider>
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ko">
          <GlobalStyle />
          <ToastContainer position="bottom-right" autoClose={3000} />
          <Background />

          {renderHeader()}
          <AgreementConfirmDialog />
          <Outlet />
          {renderFab()}
        </LocalizationProvider>
      </CotatoThemeProvider>
    </div>
  );
}

export default App;
