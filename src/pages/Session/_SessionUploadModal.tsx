import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import { styled } from 'styled-components';
import { ReactComponent as CloseIcon } from '@assets/close_dotted_circle.svg';
import { ReactComponent as PencilIcon } from '@assets/pencil.svg';
import SessionUploadModalImageInput from '@pages/Session/_SessionUploadModalImageInput';
import { SessionListImageInfo } from '@/typing/session';
import CotatoThemeToggleSwitch from '@components/CotatoToggleSwitch';

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

interface InfoBoxProps {
  $height?: string;
  $bold?: boolean;
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

  /**
   *
   */
  const renderInfoInput = () => {
    const getContentsInput = () => {
      const contentList = [
        { name: 'IT 이슈', checked: true, hanldeChange: () => {} },
        { name: 'CS 교육', checked: true, hanldeChange: () => {} },
        { name: '네트워킹', checked: false, hanldeChange: () => {} },
        { name: '데브토크', checked: false, hanldeChange: () => {} },
      ];

      return (
        <>
          {contentList.map((content, index) => (
            <ContentsInputWrapper key={index}>
              <span>{content.name}</span>
              <CotatoThemeToggleSwitch checked={content.checked} onChange={content.hanldeChange} />
            </ContentsInputWrapper>
          ))}
        </>
      );
    };

    return (
      <InfoInputWrapper>
        <TitleBox $bold={true}>
          <input value="세션" />
          <PencilIcon />
        </TitleBox>
        <InfoBox>
          <input value="날짜 (출석 기능 출시 이후 활성화)" readOnly={true} />
        </InfoBox>
        <InfoBox>
          <input value="장소 (출석 기능 출시 이후 활성화)" readOnly={true} />
        </InfoBox>
        <InfoBox>
          <input value="시간 (출석 기능 출시 이후 활성화)" readOnly={true} />
        </InfoBox>
        <InfoBox>{getContentsInput()}</InfoBox>
        <InfoBox $height="8rem">
          <textarea placeholder="설명" />
        </InfoBox>
      </InfoInputWrapper>
    );
  };

  const renderUplaodButton = () => (
    <UploadButtonWrapper>
      <button>업로드</button>
    </UploadButtonWrapper>
  );

  return (
    <Modal
      open={open}
      slotProps={{
        backdrop: {
          sx: {
            backgroundColor: 'rgba(0, 0, 0, 0.10)',
            backdropFilter: 'blur(4px)',
          },
        },
      }}
    >
      <UploadContainer>
        <Wrapper>
          {renerCloseButton()}
          {renderHeader()}
          {renderImageInput()}
          {renderInfoInput()}
          {renderUplaodButton()}
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
  max-height: 80vh;
  overflow-y: scroll;
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

const InfoInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${({ theme }) => theme.size.lg} 0;
  gap: 0.6rem;
`;

const InfoBox = styled.div<InfoBoxProps>`
  position: relative;
  display: flex;
  justify-content: space-between;
  width: 34rem;
  height: ${({ $height }) => $height || '3.2rem'};
  padding: ${({ theme }) => theme.size.lg} ${({ theme }) => theme.size.md};
  border-radius: ${({ theme }) => theme.size.sm};
  background: ${({ theme }) => theme.colors.gray20};

  > input,
  textarea {
    width: 100%;
    height: 100%;
    padding: 0;
    background: transparent;
    border: none;
    color: ${({ theme }) => theme.colors.gray60};
    font-family: Pretendard;
    font-size: ${({ theme }) => theme.fontSize.md};
    font-weight: ${({ $bold }) => ($bold ? '600' : '300')};
    line-height: 125%;

    &::placeholder {
      font-size: ${({ theme }) => theme.fontSize.md};
      font-weight: 300;
    }

    &:focus-visible {
      outline: none;
    }
  }

  > textarea {
    resize: none;
  }

  > svg {
    position: absolute;
    top: 50%;
    right: 1rem;
    transform: translateY(-50%);
    width: 1.2rem;
    height: 1.2rem;
  }
`;

const TitleBox = styled(InfoBox)`
  border: 2px solid ${({ theme }) => theme.colors.primary90};
  background: transparent;
`;

const ContentsInputWrapper = styled.span`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.size.sm};
  gap: 0.6rem;

  > span {
    color: ${({ theme }) => theme.colors.gray60};
    font-family: Pretendard;
    font-size: ${({ theme }) => theme.fontSize.md};
    font-weight: 300;
    line-height: 125%;
  }

  > label {
    margin-right: 0;
    > span {
      height: auto;
    }
  }
`;

const UploadButtonWrapper = styled.div`
  display: flex;
  justify-content: end;
  width: 100%;
  margin-top: ${({ theme }) => theme.size.md};

  > button {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: ${({ theme }) => theme.size.sm} ${({ theme }) => theme.size.lg};
    border: none;
    border-radius: 6rem;
    background: ${({ theme }) => theme.colors.primary100_1};
    color: ${({ theme }) => theme.colors.common.white};
    text-align: center;
    font-family: Pretendard;
    font-size: 1.25rem;
    font-size: ${({ theme }) => theme.fontSize.lg};
    font-weight: 700;
  }
`;

export default SessionUploadModal;
