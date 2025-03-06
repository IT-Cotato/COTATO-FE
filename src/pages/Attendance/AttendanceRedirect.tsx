import { useGeneration } from '@/hooks/useGeneration';
import { useAttendanceListLayoutStore } from '@/zustand-stores/useAttendanceListLayoutStore';
import React from 'react';
import { useNavigate } from 'react-router-dom';

//
//
//

const AttendanceRedirect = () => {
  const navigate = useNavigate();
  const { currentGeneration, isGenerationLoading } = useGeneration();
  const { listLayoutType } = useAttendanceListLayoutStore();

  //
  // redirect logic
  //
  React.useEffect(() => {
    if (isGenerationLoading || !currentGeneration) {
      return;
    }

    const { generationId } = currentGeneration;

    // navigate to current generation page
    navigate(`/attendance/list/generation/${generationId}?viewType=${listLayoutType}`);

    return;
  }, [isGenerationLoading]);

  return null;
};

export default AttendanceRedirect;
