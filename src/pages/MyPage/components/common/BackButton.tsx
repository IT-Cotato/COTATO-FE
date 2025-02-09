import React from 'react';
import { ReactComponent as LeftAngle } from '@/pages/MyPage/tempAsssets/angle_left.svg';
import styled from 'styled-components';
import { Button } from '@mui/material';
import { media } from '@theme/media';
import { useNavigate } from 'react-router-dom';

//
//
//

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <StyledButton
      sx={{ position: 'absolute' }}
      onClick={() => {
        navigate(-1);
      }}
    >
      <LeftAngle />
    </StyledButton>
  );
};

//
//
//

const StyledButton = styled(Button)`
  height: 4rem;
  left: 7.5rem;

  ${media.tablet`
    left: 3rem;
    `};
`;

export default BackButton;
