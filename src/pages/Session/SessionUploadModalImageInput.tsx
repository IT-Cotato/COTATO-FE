import React, { useEffect, useState } from 'react';
import { styled, useTheme } from 'styled-components';
import { Box, CircularProgress } from '@mui/material';
import { DragDropContext, Draggable, Droppable, DropResult } from '@hello-pangea/dnd';
import SessionUploadModalImageInputThumnail from '@pages/Session/SessionUploadModalImageInputThumnail';
import { SessionListImageInfo } from '@/typing/session';
import { ReactComponent as ImageCloseIcon } from '@assets/close_dotted.svg';
import { toast } from 'react-toastify';
import imageSortByOrder from '@utils/imageSortByOrder';
import { produce } from 'immer';
import { CotatoSessionListImageInfoResponse } from 'cotato-openapi-clients';

//
//
//

interface SessionUploadModalImageInputProps {
  imageList: SessionListImageInfo[];
  handleImageListChange: (imageList: SessionListImageInfo[]) => void;
  requestImageAdd?: (image: SessionListImageInfo, order: number) => Promise<any>;
  requestImageReorder?: (imageList: SessionListImageInfo[]) => Promise<any>;
  requestImageRemove?: (image: SessionListImageInfo) => Promise<any>;
}

//
//
//

const IMAGE_WIDTH = 18;
const IMAGE_HEIGHT = IMAGE_WIDTH * (3 / 4);

//
//
//

const SessionUploadModalImageInput = ({
  imageList,
  handleImageListChange,
  requestImageAdd,
  requestImageReorder,
  requestImageRemove,
}: SessionUploadModalImageInputProps) => {
  const [selectedImage, setSelectedImage] = useState<SessionListImageInfo | null>(null);
  const [sortedImageList, setSortedImageList] = useState<SessionListImageInfo[]>([]);
  const [isImageLoading, setIsImageLoading] = useState(true);

  const theme = useTheme();

  /**
   * function for selecting image after image remove
   */
  const selectImageAfterImageRemove = (
    newImageList: readonly CotatoSessionListImageInfoResponse[],
    index: number,
  ) => {
    if (index === -1) {
      return;
    } else if (index === newImageList.length) {
      setSelectedImage(newImageList[newImageList.length - 1]);
    } else if (index < newImageList.length) {
      setSelectedImage(newImageList[index]);
    } else {
      setSelectedImage(null);
    }
  };

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
  const handleImageAdd = async (fileList: FileList | null) => {
    if (!fileList) {
      return;
    }

    if (sortedImageList.length + fileList.length > 5) {
      toast.error('이미지는 최대 5개까지 등록 가능합니다.');
      return;
    }

    const addedImageList = [];
    for (let i = 0; i < fileList.length; i++) {
      const addedImage: SessionListImageInfo = {
        imageFile: fileList[i],
        order: sortedImageList.length + i,
      };
      addedImageList.push(addedImage);
    }

    let newImageList = [...sortedImageList];

    // If requestImageAdd is provided, send request to server
    if (requestImageAdd) {
      const requests: Promise<any>[] = addedImageList.map((image, index) =>
        requestImageAdd(image, sortedImageList.length + index),
      );

      try {
        const responses = await Promise.all(requests);
        responses.forEach((response) => {
          const newImage = { ...response.data };

          newImageList = produce(newImageList, (draft) => {
            draft.push(newImage);
          });
        });
      } catch (error) {
        console.error(error);
        toast.error('이미지 추가에 실패했습니다.');
        return;
      }
    } else {
      addedImageList.forEach((image) => {
        const newImage = {
          imageUrl: URL.createObjectURL(image.imageFile as Blob),
          imageFile: image.imageFile,
        };
        newImageList.push(newImage);
      });
    }

    newImageList = imageSortByOrder(newImageList);
    handleImageListChange(newImageList);
    setSelectedImage(newImageList.at(-1) || null);
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

    const prevImageList = [...sortedImageList];

    let newImageList: SessionListImageInfo[] = JSON.parse(JSON.stringify(sortedImageList));
    const [removed] = newImageList.splice(source.index, 1);
    newImageList.splice(destination.index, 0, removed);
    newImageList = newImageList.map((image, index) => ({ ...image, order: index }));

    setSortedImageList(newImageList);
    handleImageListChange(newImageList);

    // If requestImageReorder is provided, send request to server
    if (requestImageReorder) {
      try {
        requestImageReorder(newImageList);
      } catch (err) {
        console.error(err);
        handleImageListChange(prevImageList);
        toast.error('이미지 순서 변경에 실패했습니다.');
        return;
      }
    }
  };

  /**
   * Callback function for image remove event
   * Remove selected image from image list
   */
  const handleImageRemove = async () => {
    if (!selectedImage) {
      return;
    }

    // If requestImageRemove is provided, send request to server
    if (requestImageRemove) {
      try {
        await requestImageRemove(selectedImage);
      } catch (err) {
        console.error(err);
        toast.error('이미지 삭제에 실패했습니다.');
        return;
      }
    }

    const newImageList = imageList.filter((image) => image.imageUrl !== selectedImage.imageUrl);
    const index = imageList.findIndex((image) => image.imageUrl === selectedImage.imageUrl);

    if (!selectedImage.imageId && selectedImage.imageUrl) {
      URL.revokeObjectURL(selectedImage.imageUrl);
    }

    selectImageAfterImageRemove(newImageList, index);

    handleImageListChange(newImageList);
    setSortedImageList(newImageList);
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
   *node_modules/@types/react-dom/node_modules/@types/react/ts5.0/index").ReactNode
   */
  const renderImageDnd = () => {
    const dragableImages = [...sortedImageList];
    dragableImages.push({ imageId: -1 });

    const getDraggableThumnail = (image: SessionListImageInfo, index: number) => (
      <Draggable
        key={image.imageUrl || index}
        index={index}
        draggableId={image.imageUrl || image.imageId?.toString() || index.toString()}
        isDragDisabled={image.imageId === -1}
        disableInteractiveElementBlocking={image.imageId === -1}
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
                {dragableImages.map((image, index) => getDraggableThumnail(image, index))}
                {propvided.placeholder}
              </ImageDndContainer>
            )}
          </Droppable>
        </DragDropContext>
        <DndDescription>드래그로 순서를 변경하세요.</DndDescription>
      </ImageDndWrapper>
    );
  };

  /**
   * If selected image is changed, set isImageLoading while loading image
   */
  useEffect(() => {
    setIsImageLoading(selectedImage?.imageUrl ? true : false);
  }, [selectedImage]);

  /**
   * If imageList is changed, set sortedImageList and selectedImage
   */
  useEffect(() => {
    if (
      imageList.length > 0 &&
      imageList.some((image, index) => image.imageUrl !== sortedImageList[index]?.imageUrl)
    ) {
      const newImageList = imageSortByOrder(imageList);
      if (sortedImageList.length === 0) {
        setSelectedImage(newImageList[0]);
        setIsImageLoading(true);
      }
      setSortedImageList(newImageList);
    } else if (imageList.length === 0) {
      setSortedImageList([]);
      setSelectedImage(null);
      setIsImageLoading(false);
    }
  }, [imageList]);

  /**
   * Revoke object URL when component is unmounted
   */
  useEffect(() => {
    return () => {
      imageList.forEach((image) => {
        if (!image.imageId && image.imageUrl) {
          URL.revokeObjectURL(image.imageUrl);
        }
      });
    };
  }, []);

  return (
    <>
      <ImageInputWrapper>
        {renderImageBox()}
        {renderImageDnd()}
      </ImageInputWrapper>
    </>
  );
};

//
//
//

const ImageInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${({ theme }) => theme.size.xl};
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
