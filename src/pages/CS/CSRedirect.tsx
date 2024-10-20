import React, { useEffect } from 'react';
import { useGeneration } from '@/hooks/useGeneration';
import { useNavigate, useParams } from 'react-router-dom';

//
//
//

const CSRedirect = () => {
  const params = useParams();
  const navigate = useNavigate();

  const { currentGeneration } = useGeneration();

  //
  //
  //
  useEffect(() => {
    if (!currentGeneration && !params.generationId) {
      return;
    }

    if (params.generationId !== undefined) {
      navigate(`/cs/${currentGeneration?.generationId}`);
    } else {
      navigate(`/cs/${currentGeneration?.generationId}`);
    }
  }, [currentGeneration, params]);

  //
  //
  //

  return <></>;
};

export default CSRedirect;
