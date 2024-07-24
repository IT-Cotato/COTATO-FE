import React from 'react';
import { DraggableProvided, DraggableStateSnapshot } from 'react-beautiful-dnd';
import { createPortal } from 'react-dom';
import { styled } from 'styled-components';
import { SessionListImageInfo } from '@/typing/session';

//
//
//

interface SessionUpladModalImageInputThumnailProps {
  image: SessionListImageInfo;
  index: number;
  provided: DraggableProvided;
  snapshot: DraggableStateSnapshot;
  handleImageClick: (image: SessionListImageInfo) => void;
  handleImageAdd: (fileList: FileList | null) => void;
}

//
//
//

const portal = document.createElement('div');
document.body.appendChild(portal);

//
//
//

const SessionUploadModalImageInputThumnail = ({
  image,
  index,
  provided,
  snapshot,
  handleImageClick,
  handleImageAdd,
}: SessionUpladModalImageInputThumnailProps) => {
  const dragging = snapshot.isDragging;

  const getImageInput = () => (
    <>
      <label htmlFor="upload-session-image">추가</label>
      <input
        type="file"
        id="upload-session-image"
        accept="image/jpg, image/png, image/jpeg"
        multiple={true}
        onChange={(e) => handleImageAdd(e.target.files)}
      />
    </>
  );

  const child = (
    <ImageThumbnail
      ref={provided.innerRef}
      $image={image.imageUrl}
      onClick={() => handleImageClick(image)}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
    >
      {image.imageId === -1 ? getImageInput() : index + 1}
    </ImageThumbnail>
  );

  if (!dragging) {
    return child;
  }

  return createPortal(child, portal);
};

//
//
//

const ImageThumbnail = styled.div<{ $image?: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 5rem;
  height: 5rem;
  border-radius: ${({ theme }) => theme.size.sm};

  font-family: Pretendard-Bold;
  font-size: ${({ theme }) => theme.fontSize.xl};
  color: ${({ theme }) => theme.colors.common.white};
  user-select: none;

  background: ${({ $image, theme }) =>
    $image
      ? `linear-gradient(0deg, rgba(0, 0, 0, 0.40) 0%, rgba(0, 0, 0, 0.40) 100%), url(${$image}) lightgray 50% / cover no-repeat;`
      : theme.colors.gray30};

  > label {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    cursor: pointer;
  }

  > input {
    display: none;
  }
`;

export default SessionUploadModalImageInputThumnail;
