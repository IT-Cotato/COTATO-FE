import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import { styled } from 'styled-components';
import { ReactComponent as CloseIcon } from '@assets/close_dotted_circle.svg';
import SessionUploadModalImageInput from '@pages/Session/_SessionUploadModalImageInput';
import { SessionListImageInfo } from '@/typing/session';

//
//
//

interface SessionUploadModalProps {
  open: boolean;
  handleClose: () => void;
  headerText: string;
  requestImageAdd?: (imageFile: FileList) => string;
  requestImageReorder?: (imageList: SessionListImageInfo[]) => void;
  requestImageRemove?: (image: SessionListImageInfo) => void;
}

//
//
//

const SessionUploadModal = ({
  open,
  handleClose,
  headerText,
  requestImageAdd,
  requestImageReorder,
  requestImageRemove,
}: SessionUploadModalProps) => {
  const [imageList, setImageList] = useState<SessionListImageInfo[]>([
    {
      imageUrl:
        'https://cotatos3.s3.ap-northeast-2.amazonaws.com/session/256f22ce-ab12-46a2-ad7c-a15502bff026',
      imageId: 1,
    },
    {
      imageUrl:
        'https://cotatos3.s3.ap-northeast-2.amazonaws.com/session/cf2c56e3-06ec-43b1-bad3-72d73e889c3a',
      imageId: 2,
    },
    {
      imageUrl:
        'https://cotatos3.s3.ap-northeast-2.amazonaws.com/session/c0a882ea-f50f-460c-9bee-865bb313b80f',
      imageId: 3,
    },
    {
      imageUrl:
        'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FCafCp%2FbtsIsK0RlkB%2FYI8RzS4Mfm1K3i7nsLHB00%2Fimg.jpg',
      imageId: 4,
    },
  ]);

  /**
   *
   */
  const renerCloseButton = () => (
    <CloseButton type="button" onClick={handleClose}>
      <CloseIcon />
    </CloseButton>
  );

  /**
   *
   */
  const renderHeader = () => <ModalHeader>{headerText}</ModalHeader>;

  /**
   *
   */
  const renderImageInput = () => {
    return <SessionUploadModalImageInput imageListProps={imageList} />;
  };

  return (
    <Modal
      open={open}
      slotProps={{
        backdrop: { sx: { backgroundColor: 'rgba(0, 0, 0, 0.10)', backdropFilter: 'blur(4px)' } },
      }}
    >
      <UploadContainer>
        <Wrapper>
          {renerCloseButton()}
          {renderHeader()}
          {renderImageInput()}
        </Wrapper>
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
  height: 600px;
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
