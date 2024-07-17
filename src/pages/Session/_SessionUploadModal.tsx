import React from 'react';
import Modal from '@mui/material/Modal';
import { styled } from 'styled-components';
import { ReactComponent as CloseIcon } from '@assets/close_dotted.svg';

//
//
//

interface SessionUploadModalProps {
  open: boolean;
  handleClose: () => void;
  headerText: string;
}

//
//
//

const SessionUploadModal = ({ open, handleClose, headerText }: SessionUploadModalProps) => {
  /**
   *
   */
  const renderHeader = () => (
    <ModalHeader>
      {headerText}
      <CloseButton type="button" onClick={handleClose}>
        <CloseIcon />
      </CloseButton>
    </ModalHeader>
  );

  return (
    <Modal
      open={open}
      slotProps={{
        backdrop: { sx: { backgroundColor: 'rgba(0, 0, 0, 0.10)', backdropFilter: 'blur(4px)' } },
      }}
    >
      <UploadContainer>
        <Wrapper>{renderHeader()}</Wrapper>
      </UploadContainer>
    </Modal>
  );
};

//
//
//

const UploadContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 800px;
  height: 400px;
  padding: 1.6rem 3rem;
  border-radius: ${({ theme }) => theme.size.xl};
  box-shadow: 0px 4px 30px 0px rgba(0, 0, 0, 0.25);
  background-color: ${({ theme }) => theme.colors.common.white};

  &:focus-visible {
    outline: none;
  }
`;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  border: none;
  background-color: transparent;
  cursor: pointer;

  > svg {
    width: 2rem;
    height: 2rem;
  }
`;

const ModalHeader = styled.div`
  padding: ${({ theme }) => theme.size.md};
  color: ${({ theme }) => theme.colors.gray100};
  text-align: center;
  font-family: Pretendard-Bold;
  font-size: ${({ theme }) => theme.fontSize.xl};
`;

export default SessionUploadModal;
