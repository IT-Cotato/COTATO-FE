import { Alert, Button } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

//
//
//

interface SocketCloseAlertProps {
  generationId: number;
  educationId: number;
}

//
//
//

const SocketCloseAlert = ({ generationId, educationId }: SocketCloseAlertProps) => {
  const navigate = useNavigate();

  /**
   *
   */
  const handleClose = () => {
    navigate(`/cs/start/generation/${generationId}/education/${educationId}`);
  };

  return (
    <Alert
      severity="error"
      action={
        <Button color="inherit" size="small" onClick={handleClose}>
          확인
        </Button>
      }
      sx={{
        position: 'fixed',
        bottom: '100px',
        zIndex: '100',
        fontSize: '1rem',
        padding: '0.75rem 1.75rem',
      }}
    >
      새로운 창에서 동시 접속하여 연결이 끊어졌습니다.
    </Alert>
  );
};

export default SocketCloseAlert;
