import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import { ReactComponent as Pencil } from '@/pages/MyPage/tempAsssets/Pencil.svg';
import { ReactComponent as Trash } from '@/pages/MyPage/tempAsssets/Trash.svg';

//
//
//

interface ProfileImageSectionProps {
  onImageChange: (file: File | null) => void;
  isModifying: boolean;
  value: File | string | null;
}

//
//
//

/**
 * 프로필 이미지 영역
 */
const ProfileImageSection = ({ onImageChange, isModifying, value }: ProfileImageSectionProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    if (value instanceof File) {
      const url = URL.createObjectURL(value);
      setPreviewUrl(url);

      return () => {
        URL.revokeObjectURL(url);
      };
    } else if (typeof value === 'string') {
      setPreviewUrl(value);
    } else {
      setPreviewUrl(null);
    }
  }, [value]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onImageChange(file);
    }
  };

  const handleClickEdit = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleClickDelete = () => {
    onImageChange(null);
    setPreviewUrl(null);
  };

  return (
    <ProfileImageContainer>
      <ProfileImage src={previewUrl || ''} />
      {isModifying && (
        <ProfileImageEditOverlay>
          <IconButton
            onClick={handleClickEdit}
            style={{ left: '30%' }}
            aria-label="Edit profile image"
          >
            <Pencil />
          </IconButton>
          <IconButton
            onClick={handleClickDelete}
            style={{ right: '30%' }}
            aria-label="Remove profile image"
          >
            <Trash />
          </IconButton>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/png, image/jpeg"
            onChange={handleFileChange}
            style={{ display: 'none' }}
            id="profile-image-input"
          />
        </ProfileImageEditOverlay>
      )}
    </ProfileImageContainer>
  );
};

//
//
//

const ProfileImageContainer = styled.div`
  position: relative;
  width: 11.25rem;
  height: 11.25rem;
  border-radius: 50%;
`;

const ProfileImage = styled.div<{ src: string }>`
  width: 11.25rem;
  height: 11.25rem;
  border-radius: 15rem;
  background-image: ${({ src }) => (src ? `url(${src})` : 'none')};
  background-size: cover;
`;

const ProfileImageEditOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: rgba(128, 128, 128, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const IconButton = styled.button`
  position: absolute;
  background: transparent;
  border: none;
  padding: 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default ProfileImageSection;
