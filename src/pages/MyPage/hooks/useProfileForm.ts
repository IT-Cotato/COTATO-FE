import { useState, useEffect } from 'react';
import {
  CotatoProfileInfoResponse,
  CotatoProfileLinkResponseUrlTypeEnum,
} from 'cotato-openapi-clients';
import api from '@/api/api';

type ImageUpdateStatus = 'UPDATE' | 'KEEP' | 'DEFAULT';

type FormState = Omit<CotatoProfileInfoResponse, 'profileImage'> & {
  profileImage: string | File | null;
  imageUpdateStatus: ImageUpdateStatus;
};

/**
 * 회원 프로필 정보를 관리하는 훅
 * 프로필 데이터 조회, 업데이트 및 제출 기능 제공
 */
export const useProfileForm = (memberId: number | undefined) => {
  const [form, setForm] = useState<FormState | null>(null);

  /**
   * 회원 프로필 정보를 서버에서 가져오는 함수
   */
  const fetchMemberProfile = async () => {
    if (memberId === undefined) return;

    try {
      const response = await api.get<CotatoProfileInfoResponse>(
        `/v1/api/member/${memberId}/profile`,
      );

      const defaultLinks = [
        { linkId: 0, urlType: CotatoProfileLinkResponseUrlTypeEnum.Github, url: '' },
        { linkId: 1, urlType: CotatoProfileLinkResponseUrlTypeEnum.Blog, url: '' },
      ];

      setForm({
        ...response.data,
        profileLinks:
          response.data.profileLinks.length === 0 ? defaultLinks : response.data.profileLinks,
        imageUpdateStatus: 'KEEP', // Initially set to KEEP
      });
    } catch (error) {
      console.error('Failed to fetch member info:', error);
    }
  };

  useEffect(() => {
    fetchMemberProfile();
  }, [memberId]);

  /**
   * 대학교 정보 변경 처리 함수
   */
  const handleUniversityChange = (value: string) => {
    if (!form) return;
    setForm({
      ...form,
      university: value,
    });
  };

  /**
   * 자기소개 정보 변경 처리 함수
   */
  const handleIntroChange = (value: string) => {
    if (!form) return;
    setForm({
      ...form,
      introduction: value,
    });
  };

  /**
   * 프로필 링크 정보 변경 처리 함수
   */
  const handleLinkChange = (urlType: CotatoProfileLinkResponseUrlTypeEnum, value: string) => {
    if (!form) return;
    setForm({
      ...form,
      profileLinks: form.profileLinks.map((link) =>
        link.urlType === urlType ? { ...link, url: value } : link,
      ),
    });
  };

  /**
   * 프로필 이미지 변경 처리 함수
   * 파일이 있으면 UPDATE 상태로, 없으면 DEFAULT 상태로 설정
   */
  const handleImageChange = (file: File | null) => {
    if (!form) return;

    if (file) {
      setForm({
        ...form,
        profileImage: file,
        imageUpdateStatus: 'UPDATE',
      });
    } else {
      setForm({
        ...form,
        profileImage: null,
        imageUpdateStatus: 'DEFAULT',
      });
    }
  };

  /**
   * 프로필 이미지를 기본 이미지로 초기화하는 함수
   * 이미지를 null로 설정하고 상태를 DEFAULT로 변경
   */
  const resetToDefaultImage = () => {
    if (!form) return;
    setForm({
      ...form,
      profileImage: null,
      imageUpdateStatus: 'DEFAULT',
    });
  };

  /**
   * 프로필 정보를 서버에 제출하는 함수
   * 이미지 상태에 따라 FormData 구성 후 PATCH 요청 전송
   */
  const submitProfile = async () => {
    if (!form) return false;

    try {
      const formData = new FormData();

      const payload = {
        imageUpdateStatus: form.imageUpdateStatus,
        introduction: form.introduction,
        university: form.university,
        profileLinks: form.profileLinks,
      };

      formData.append('request', JSON.stringify(payload));

      if (form.imageUpdateStatus === 'UPDATE' && form.profileImage instanceof File) {
        formData.append('profileImage', form.profileImage);
      }

      await api.patch('/v1/api/member/profile', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      await fetchMemberProfile();
      return true;
    } catch (error) {
      console.error('Failed to update member info:', error);
      return false;
    }
  };

  return form
    ? {
        form,
        handleUniversityChange,
        handleIntroChange,
        handleLinkChange,
        handleImageChange,
        resetToDefaultImage,
        submitProfile,
      }
    : {
        form: null,
        handleUniversityChange: () => {},
        handleIntroChange: () => {},
        handleLinkChange: () => {},
        handleImageChange: () => {},
        resetToDefaultImage: () => {},
        submitProfile: () => Promise.resolve(false),
      };
};
