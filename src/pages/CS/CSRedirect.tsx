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
    if (params.generationId !== undefined) {
      navigate(`/cs/${currentGeneration?.generationId}`);
    } else {
      navigate(`/cs/${currentGeneration?.generationId}`);
    }
  }, []);

  //
  //
  //

  return <></>;
};

export default CSRedirect;
