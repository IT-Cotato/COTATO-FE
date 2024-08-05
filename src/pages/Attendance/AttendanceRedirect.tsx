import { useGeneration } from '@/hooks/useGeneration';
import React from 'react';
import { useNavigate } from 'react-router-dom';

//
//
//

const AttendanceRedirect = () => {
  const navigate = useNavigate();
  const { generationId, isGenerationLoading, sessionCount } = useGeneration();

  //
  // redirect logic
  //
  React.useEffect(() => {
    if (isGenerationLoading) {
      return;
    }

    // if there is no session, navigate to home
    if (!sessionCount) {
      navigate('/');

      return;
    }

    // navigate to current generation page
    navigate(`/attendance/list/generation/${generationId}`);

    return;
  }, [generationId, isGenerationLoading]);

  return null;
};

export default AttendanceRedirect;
