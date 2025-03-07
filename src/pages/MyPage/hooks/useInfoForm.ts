import { useState, useEffect } from 'react';
import api from '@/api/api';

//
//
//

interface ProfileForm {
  email: string;
  phoneNumber: string;
}

//
//
//

export const useInfoForm = (memberId: number | undefined) => {
  const [form, setForm] = useState<ProfileForm>({
    email: '',
    phoneNumber: '',
  });

  /**
   *
   */
  useEffect(() => {
    const fetchMemberInfo = async (memberId: number | undefined) => {
      try {
        const response = await api.get(`/v1/api/member/${memberId}/mypage`);
        setForm((prev) => ({
          ...prev,
          ...response.data,
        }));
      } catch (error) {
        console.error('Failed to fetch member info:', error);
      }
    };

    fetchMemberInfo(memberId);
  }, [memberId]);

  return { form };
};
