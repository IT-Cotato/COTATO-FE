import { useState, useEffect } from 'react';
import {
  CotatoProfileInfoResponse,
  CotatoProfileLinkResponseUrlTypeEnum,
} from 'cotato-openapi-clients';
import api from '@/api/api';

//
//
//

type FormState = Omit<CotatoProfileInfoResponse, 'profileImage'> & {
  profileImage: string | File | null;
};

//
//
//

export const useProfileForm = (memberId: number | undefined) => {
  const [form, setForm] = useState<FormState | null>(null);

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
      });
    } catch (error) {
      console.error('Failed to fetch member info:', error);
    }
  };

  useEffect(() => {
    fetchMemberProfile();
  }, [memberId]);

  const handleUniversityChange = (value: string) => {
    if (!form) return;
    setForm({
      ...form,
      university: value,
    });
  };

  const handleIntroChange = (value: string) => {
    if (!form) return;
    setForm({
      ...form,
      introduction: value,
    });
  };

  const handleLinkChange = (urlType: CotatoProfileLinkResponseUrlTypeEnum, value: string) => {
    if (!form) return;
    setForm({
      ...form,
      profileLinks: form.profileLinks.map((link) =>
        link.urlType === urlType ? { ...link, url: value } : link,
      ),
    });
  };

  const handleImageChange = (file: File) => {
    if (!form) return;
    setForm({
      ...form,
      profileImage: file as unknown as string,
    });
  };

  const submitProfile = async () => {
    if (!form) return false;

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

      if (form.profileImage instanceof File) {
        formData.append('profileImage', form.profileImage);
      }

      await api.put('/v1/api/member/profile', formData, {
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
        submitProfile,
      }
    : {
        form: null,
        handleUniversityChange: () => {},
        handleIntroChange: () => {},
        handleLinkChange: () => {},
        handleImageChange: () => {},
        submitProfile: () => Promise.resolve(false),
      };
};
