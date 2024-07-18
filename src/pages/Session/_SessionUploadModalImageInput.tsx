import React, { useState } from 'react';
import { styled } from 'styled-components';
import { Box, CircularProgress } from '@mui/material';

//
//
//

interface SessionUploadModalImageInputProps {}

//
//
//

const IMAGE_WIDTH = 22;
const IMAGE_HEIGHT = IMAGE_WIDTH * (3 / 4);

//
//
//

const SessionUploadModalImageInput = () => {
  const [selectedImageUrl, setSelectedImageUrl] = useState<string | null>(
    'https://cotatos3.s3.ap-northeast-2.amazonaws.com/session/256f22ce-ab12-46a2-ad7c-a15502bff026',
  );
  const [isImageLoading, setIsImageLoading] = useState(selectedImageUrl ? true : false);

  /**
   *
   */
  const renderImageBox = () => {
    return (
      <Box
        width={`${IMAGE_WIDTH}rem`}
        height={`${IMAGE_HEIGHT}rem`}
        position="relative"
        display="center"
        alignItems="center"
        justifyContent="center"
      >
        {isImageLoading && <CircularProgress sx={{ animationDuration: '1000ms' }} />}
        <SelectedImage
          src={selectedImageUrl || ''}
          alt="selected image"
          onLoad={() => setIsImageLoading(false)}
          $display={isImageLoading ? 'none' : 'block'}
        />
      </Box>
    );
  };

  return <ImageInputWrapper>{renderImageBox()}</ImageInputWrapper>;
};

//
//
//

const ImageInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${({ theme }) => theme.size.xxl};
  gap: ${({ theme }) => theme.size.xxl};
`;

const SelectedImage = styled.img<{ $display: string }>`
  display: ${({ $display }) => $display};
  height: 100%;
  border-radius: ${({ theme }) => theme.size.lg};
  aspect-ratio: 4 / 3;
  object-fit: contain;
`;

export default SessionUploadModalImageInput;
