import { useState, useEffect } from 'react';
import api from '@/api/api';

//
//
//

interface ProfileForm {
  introduction: string;
  university: string;
  profileLinks: {
    urlType: 'GITHUB' | 'BLOG';
    url: string;
  }[];
  profileImage: File | string | null;
}

//
//
//

export const useProfileForm = (memberId: number | undefined) => {
  const [form, setForm] = useState<ProfileForm>({
    introduction: '',
    university: '',
    profileLinks: [
      { urlType: 'GITHUB', url: '' },
      { urlType: 'BLOG', url: '' },
    ],
    profileImage: null,
  });

  /**
   *
   */
  useEffect(() => {
    const fetchMemberProfile = async (memberId: number | undefined) => {
      try {
        const response = await api.get(`/v1/api/member/${memberId}/profile`);
        setForm((prev) => ({
          ...prev,
          ...response.data,
        }));
      } catch (error) {
        console.error('Failed to fetch member info:', error);
      }
    };

    fetchMemberProfile(memberId);
  }, []);

  /**
   *
   */
  const handleIntroChange = (value: string) => {
    setForm((prev) => ({ ...prev, introduction: value }));
  };

  /**
   *
   */
  const handleLinkChange = (index: number, value: string) => {
    setForm((prev) => ({
      ...prev,
      profileLinks: prev.profileLinks.map((link, i) =>
        i === index ? { ...link, url: value } : link,
      ),
    }));
  };

  /**
   *
   */
  const handleImageChange = (file: File) => {
    setForm((prev) => ({ ...prev, profileImage: file }));
  };

  /**
   *
   */
  const submitProfile = async () => {
    try {
      const formData = new FormData();

      formData.append(
        'request',
        JSON.stringify({
          introduction: form.introduction,
          university: form.university,
          profileLinks: form.profileLinks,
        }),
      );

      if (form.profileImage) {
        formData.append('profileImage', form.profileImage);
      }

      await api.put('/v1/api/member/profile', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      return true;
    } catch (error) {
      console.error('Failed to update member info:', error);
      return false;
    }
  };

  return {
    form,
    handleIntroChange,
    handleLinkChange,
    handleImageChange,
    submitProfile,
  };
};
