import React from 'react';
import { Fade, Modal, useMediaQuery } from '@mui/material';
import { CotatoSessionListResponse } from 'cotato-openapi-clients';
import { styled } from 'styled-components';
import { device } from '@theme/media';
import SessionDetailModalCard from '@pages/Session/SessionDetailModalCard';

//
//
//

interface SessionDetailModalProps {
  open: boolean;
  session: CotatoSessionListResponse | null;
  handleClose: () => void;
}

//
//
//

const FADE_DURATION = 300;

//
//
//

const SessionDetailModal = ({ open, session, handleClose }: SessionDetailModalProps) => {
  const isTabletOrSmaller = useMediaQuery(`(max-width:${device.tablet})`);

  /**
   *
   */
  const renderDetailModal = () => {
    if (isTabletOrSmaller) {
      return null;
    }

    return <SessionDetailModalCard session={session} handleClose={handleClose} />;
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      closeAfterTransition={true}
      slotProps={{
        backdrop: {
          sx: {
            backgroundColor: 'rgba(0, 0, 0, 0.10)',
            backdropFilter: 'blur(4px)',
          },
          timeout: FADE_DURATION,
        },
      }}
    >
      <Fade in={open} timeout={FADE_DURATION}>
        <Container>{renderDetailModal()}</Container>
      </Fade>
    </Modal>
  );
};

//
//
//

const Container = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;

  &:focus-visible {
    outline: none;
  }
`;

export default SessionDetailModal;
