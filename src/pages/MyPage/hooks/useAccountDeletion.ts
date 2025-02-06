// useAccountDeletion.ts
import { useState } from 'react';
import api from '@/api/api';

//
//
//

interface DeactivationForm {
  email: string;
  password: string;
  isTermsAgreed: boolean;
}

interface DeactivateRequestBody {
  email: string;
  password: string;
  checkedPolicies: Array<{
    policyId: number;
    isChecked: boolean;
  }>;
}

//
//
//

export const useAccountDeletion = (memberId: number | undefined) => {
  const [form, setForm] = useState<DeactivationForm>({
    email: '',
    password: '',
    isTermsAgreed: false,
  });

  /**
   *
   */
  const updateForm = (field: keyof DeactivationForm, value: string | boolean) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  /**
   *
   */
  const deactivateAccount = async () => {
    if (!memberId) {
      return;
    }

    try {
      const requestBody: DeactivateRequestBody = {
        email: form.email,
        password: form.password,
        checkedPolicies: [
          {
            policyId: 0,
            isChecked: form.isTermsAgreed,
          },
        ],
      };

      await api.post(`/v1/api/member/${memberId}/deactivate`, requestBody);

      return true;
    } catch (error) {
      console.error('Failed to deactivate account:', error);
      return false;
    }
  };

  return {
    form,
    updateForm,
    deactivateAccount,
  };
};
