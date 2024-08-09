import React from 'react';
import { Fade, Modal, useMediaQuery } from '@mui/material';
import {
  CotatoSessionListImageInfoResponse,
  CotatoSessionListResponse,
} from 'cotato-openapi-clients';
import { styled } from 'styled-components';
import { device } from '@theme/media';
import SessionDetailModalCard from '@pages/Session/SessionDetailModalCard';
import SessionDetailModalImage from './SessionDetailModalImage';
import potato_ready from '@assets/potato_ready.svg';

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

const FADE_DURATION = 200;

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

    const imageList: CotatoSessionListImageInfoResponse[] =
      session?.imageInfos && session.imageInfos.length > 0
        ? session.imageInfos
        : [{ imageUrl: potato_ready }];

    return (
      <>
        <SessionDetailModalImage imageList={imageList} />
        <SessionDetailModalCard session={session} handleClose={handleClose} />
      </>
    );
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
  align-items: stretch;

  &:focus-visible {
    outline: none;
  }
`;

export default SessionDetailModal;
