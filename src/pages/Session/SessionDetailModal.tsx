import React from 'react';
import { Fade, Modal, useMediaQuery } from '@mui/material';
import { CotatoSessionListResponse } from 'cotato-openapi-clients';
import { styled } from 'styled-components';
import { device, media } from '@theme/media';
import SessionDetailModalCard from '@pages/Session/SessionDetailModalCard';
import SessionDetailModalImage from '@pages/Session/SessionDetailModalImage';
import SessionArrowButton from '@components/Session/SessionArrowButton';
import potato_ready from '@assets/potato_ready.svg';
import { ReactComponent as ArrowNext } from '@assets/arrow_right_dotted.svg';

//
//
//

interface SessionDetailModalProps {
  open: boolean;
  session: CotatoSessionListResponse | null;
  sessionCount: number;
  handleClose: () => void;
  handlePrevClick: () => void;
  handleNextClick: () => void;
  handleClickUpdateSession: (session: CotatoSessionListResponse | null) => void;
}

//
//
//

const FADE_DURATION = 200;

//
//
//

const SessionDetailModal = ({
  open,
  session,
  sessionCount,
  handleClose,
  handlePrevClick,
  handleNextClick,
  handleClickUpdateSession,
}: SessionDetailModalProps) => {
  const isTabletOrSmaller = useMediaQuery(`(max-width:${device.tablet})`);

  /**
   *
   */
  const getImageList = () => {
    return session?.imageInfos && session.imageInfos.length > 0
      ? session.imageInfos
      : [{ imageUrl: potato_ready }];
  };

  /**
   *
   */
  const renderPrevButton = () => {
    if (session?.sessionNumber === 0) {
      return null;
    }

    return (
      <PrevButtonWrapper>
        <SessionArrowButton direction="prev" onClick={handlePrevClick} />
      </PrevButtonWrapper>
    );
  };

  /**
   *
   */
  const renderNextButton = () => {
    if (session?.sessionNumber === sessionCount - 1) {
      return null;
    }

    return (
      <NextButtonWrapper>
        <SessionArrowButton direction="next" onClick={handleNextClick} />
      </NextButtonWrapper>
    );
  };

  /**
   *
   */
  const renderDetailModal = () => {
    if (isTabletOrSmaller) {
      return null;
    }

    return (
      <>
        {renderPrevButton()}
        <SessionDetailModalImage imageList={getImageList()} />
        <SessionDetailModalCard
          session={session}
          handleClose={handleClose}
          handleClickUpdateSession={handleClickUpdateSession}
        />
        {renderNextButton()}
      </>
    );
  };

  /**
   *
   */
  const renderMobileDetailModal = () => {
    if (!isTabletOrSmaller) {
      return null;
    }

    return (
      <>
        <MobileCloseButton type="button" onClick={handleClose}>
          <ArrowLeftIcon />
        </MobileCloseButton>
        <SessionDetailModalImage imageList={getImageList()} />
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
        <Container>
          {renderDetailModal()}
          {renderMobileDetailModal()}
        </Container>
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
  height: 30rem;

  &:focus-visible {
    outline: none;
  }

  ${media.tablet`
    flex-direction: column;
    width: 100%;
    height: 100%;
  `}
`;

const PrevButtonWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: -6rem;
  transform: translateY(-50%);
  z-index: 10;

  ${media.laptop`
    left: -4rem;
  `}
`;

const NextButtonWrapper = styled.div`
  position: absolute;
  top: 50%;
  right: -6rem;
  transform: translateY(-50%);
  z-index: 10;

  ${media.laptop`
    right: -4rem;
  `}
`;

const MobileCloseButton = styled.button`
  position: absolute;
  top: 1.25rem;
  left: 0.5rem;
  border: none;
  background: none;
  cursor: pointer;
  z-index: 10;
`;

const ArrowLeftIcon = styled(ArrowNext)`
  transform: rotate(180deg);
  width: 1.5rem;
  height: 1.5rem;

  > path {
    fill: ${({ theme }) => theme.colors.common.white_const};
  }
`;

export default SessionDetailModal;
