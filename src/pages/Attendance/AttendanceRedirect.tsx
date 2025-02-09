import { useGeneration } from '@/hooks/useGeneration';
import { useSession } from '@/hooks/useSession';
import { useAttendanceListLayoutStore } from '@/zustand-stores/useAttendanceListLayoutStore';
import React from 'react';
import { useNavigate } from 'react-router-dom';

//
//
//

const AttendanceRedirect = () => {
  const navigate = useNavigate();
  const { currentGeneration, isGenerationLoading } = useGeneration();
  const { sessions, isSessionLoading } = useSession({
    generationId: currentGeneration?.generationId,
  });
  const { listLayoutType } = useAttendanceListLayoutStore();

  //
  // redirect logic
  //
  React.useEffect(() => {
    if (isGenerationLoading || isSessionLoading || !currentGeneration) {
      return;
    }

    const { generationId } = currentGeneration;

    // if there is no session, navigate to home
    if (!sessions || sessions.length === 0) {
      navigate('/');
      return;
    }

    // navigate to current generation page
    navigate(`/attendance/list/generation/${generationId}?viewType=${listLayoutType}`);

    return;
  }, [isGenerationLoading, isSessionLoading]);

  return null;
};

export default AttendanceRedirect;
