import React, { useEffect, useState } from 'react';
import { styled, useTheme } from 'styled-components';
import { Box, CircularProgress } from '@mui/material';
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd';
import SessionUploadModalImageInputThumnail from '@pages/Session/_SessionUploadModalImageInputThumnail';
import { SessionListImageInfo } from '@/typing/session';
import { ReactComponent as ImageCloseIcon } from '@assets/close_dotted.svg';
import { toast, ToastContainer } from 'react-toastify';

//
//
//

interface SessionUploadModalImageInputProps {
  imageListProps: SessionListImageInfo[];
  requestImageAdd?: (imageFile: FileList) => string;
  requestImageReorder?: (imageList: SessionListImageInfo[]) => void;
  requestImageRemove?: (image: SessionListImageInfo) => void;
}

//
//
//

const IMAGE_WIDTH = 22;
const IMAGE_HEIGHT = IMAGE_WIDTH * (3 / 4);

//
//
//

const SessionUploadModalImageInput = ({
  imageListProps,
  requestImageAdd,
  requestImageReorder,
  requestImageRemove,
}: SessionUploadModalImageInputProps) => {
  const [selectedImage, setSelectedImage] = useState<SessionListImageInfo | null>(null);
  const [imageList, setImageList] = useState<SessionListImageInfo[]>(imageListProps);
  const [isImageLoading, setIsImageLoading] = useState(selectedImage?.imageUrl ? true : false);

  const theme = useTheme();

  /**
   * Callback function for image click event
   * If thumnail is not a add button, set selected image
   */
  const handleImageClick = (image: SessionListImageInfo) => {
    if (image.imageId !== -1) {
      setSelectedImage(image);
    }
  };

  /**
   * Callback function for image add event
   * Add new image to image list and set selected image
   */
  const handleImageAdd = (fileList: FileList | null) => {
    if (!fileList) {
      return;
    }

    if (imageList.length + fileList.length > 5) {
      toast.error('이미지는 최대 5개까지 등록 가능합니다.');
      return;
    }

    const newImageList = [...imageList];
    for (let i = 0; i < fileList.length; i++) {
      const newImage = { imageUrl: URL.createObjectURL(fileList[i]) };
      newImageList.push(newImage);
    }

    setImageList(newImageList);
    setSelectedImage(newImageList.at(-1) || null);

    requestImageAdd && requestImageAdd(fileList);
  };

  /**
   * Callback function for image drag end event
   * Reorder image list
   */
  const handleImageDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination || source.index === destination.index) {
      return;
    }

    const newImageList = Array.from(imageList);
    const [removed] = newImageList.splice(source.index, 1);
    newImageList.splice(destination.index, 0, removed);

    setImageList(newImageList);
    requestImageReorder && requestImageReorder(newImageList);
  };

  /**
   * Callback function for image remove event
   * Remove selected image from image list
   */
  const handleImageRemove = () => {
    if (!selectedImage) {
      return;
    }

    const newImageList = imageList.filter((image) => image.imageUrl !== selectedImage.imageUrl);
    const index = imageList.findIndex((image) => image.imageUrl === selectedImage.imageUrl);

    if (index === -1) {
      return;
    } else if (index < newImageList.length) {
      setSelectedImage(newImageList[index]);
    } else if (index - 1 < newImageList.length) {
      setSelectedImage(newImageList[index - 1]);
    } else {
      setSelectedImage(null);
    }

    setImageList(newImageList);

    if (!selectedImage.imageId && selectedImage.imageUrl) {
      URL.revokeObjectURL(selectedImage.imageUrl);
    }

    requestImageRemove && requestImageRemove(selectedImage);
  };

  /**
   *
   */
  const renderImageBox = () => {
    const getCloseButton = () => (
      <CloseButton onClick={handleImageRemove}>
        <ImageCloseIcon />
      </CloseButton>
    );

    return (
      <Box
        width={`${IMAGE_WIDTH}rem`}
        height={`${IMAGE_HEIGHT}rem`}
        position="relative"
        display="center"
        alignItems="center"
        justifyContent="center"
        sx={{ backgroundColor: theme.colors.gray10, borderRadius: theme.size.sm }}
      >
        {isImageLoading && <CircularProgress sx={{ animationDuration: '1000ms' }} />}
        {selectedImage?.imageUrl ? (
          <>
            {!isImageLoading && getCloseButton()}
            <SelectedImage
              src={selectedImage.imageUrl || ''}
              alt="selected image"
              onLoad={() => setIsImageLoading(false)}
              $display={isImageLoading ? 'none' : 'block'}
            />
          </>
        ) : (
          <div>이미지를 추가하세요.</div>
        )}
      </Box>
    );
  };

  /**
   *
   */
  const renderImageDnd = () => {
    const dragableImages = [...imageList];
    dragableImages.push({ imageId: -1 });

    const getdragableThumnail = (image: SessionListImageInfo, index: number) => (
      <Draggable
        key={image.imageUrl || index}
        index={index}
        draggableId={image.imageUrl || image.imageId?.toString() || index.toString()}
        isDragDisabled={image.imageId === -1}
      >
        {(provided, snapshot) => (
          <SessionUploadModalImageInputThumnail
            image={image}
            index={index}
            provided={provided}
            snapshot={snapshot}
            handleImageClick={handleImageClick}
            handleImageAdd={handleImageAdd}
          />
        )}
      </Draggable>
    );

    return (
      <ImageDndWrapper>
        <DragDropContext onDragEnd={handleImageDragEnd}>
          <Droppable droppableId="droppable-image" direction="horizontal">
            {(propvided) => (
              <ImageDndContainer ref={propvided.innerRef} {...propvided.droppableProps}>
                {dragableImages.map((image, index) => getdragableThumnail(image, index))}
                {propvided.placeholder}
              </ImageDndContainer>
            )}
          </Droppable>
        </DragDropContext>
        <DndDescription>드래그로 순서를 변경하세요.</DndDescription>
      </ImageDndWrapper>
    );
  };

  useEffect(() => {
    setIsImageLoading(selectedImage?.imageUrl ? true : false);
  }, [selectedImage]);

  useEffect(() => {
    if (imageList.length > 0) {
      setSelectedImage(imageList[0]);
    }

    return () => {
      imageList.forEach((image) => {
        if (!image.imageId && image.imageUrl) {
          URL.revokeObjectURL(image.imageUrl);
        }
      });
    };
  }, []);

  return (
    <ImageInputWrapper>
      {renderImageBox()}
      {renderImageDnd()}
      <ToastContainer
        position="top-center"
        autoClose={2000}
        pauseOnFocusLoss={false}
        theme={localStorage.getItem('theme') || 'dark'}
      />
    </ImageInputWrapper>
  );
};

//
//
//

const ImageInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${({ theme }) => theme.size.xxl};
  gap: ${({ theme }) => theme.size['3xl']};
`;

const SelectedImage = styled.img<{ $display: string }>`
  display: ${({ $display }) => $display};
  height: 100%;
  width: 100%;
  object-fit: contain;
  border-radius: ${({ theme }) => theme.size.sm};
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.2rem;
  border: none;
  border-radius: 0.6rem;
  background: rgba(255, 255, 255, 0.5);
  cursor: pointer;

  > svg {
    width: 1.2rem;
    height: 1.2rem;
  }
`;

const ImageDndWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.size.md};
`;

const ImageDndContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: ${({ theme }) => theme.size.sm};
  background: transparent;
`;

const DndDescription = styled.span`
  color: ${({ theme }) => theme.colors.gray60};
  font-family: Pretendard;
  font-size: ${({ theme }) => theme.fontSize.md};
  font-weight: 300;
`;

export default SessionUploadModalImageInput;
