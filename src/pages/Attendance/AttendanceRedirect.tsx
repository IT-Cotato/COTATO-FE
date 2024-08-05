import { useGeneration } from '@/hooks/useGeneration';
import React from 'react';
import { useNavigate } from 'react-router-dom';

//
//
//

const AttendanceRedirect = () => {
  const navigate = useNavigate();
  const { currentGeneration, isGenerationLoading } = useGeneration();

  //
  // redirect logic
  //
  React.useEffect(() => {
    if (isGenerationLoading || !currentGeneration) {
      return;
    }

    const { sessionCount, generationId } = currentGeneration;

    // if there is no session, navigate to home
    if (!sessionCount) {
      navigate('/');

      return;
    }

    // navigate to current generation page
    navigate(`/attendance/list/generation/${generationId}`);

    return;
  }, [isGenerationLoading]);

  return null;
};

export default AttendanceRedirect;
