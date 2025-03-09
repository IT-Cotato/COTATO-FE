import React from 'react';
import styled from 'styled-components';
import { Button } from '@mui/material';
import { media } from '@theme/media';
import { useNavigate } from 'react-router-dom';
import CotatoIcon from '@components/CotatoIcon';

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
      <CotatoIcon
        icon="angle-left-solid"
        size="2.25rem"
        color={(theme) => theme.colors.common.black}
      />
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

  ${media.landscape`
    left: 0.5rem;
  `};
`;

export default BackButton;
