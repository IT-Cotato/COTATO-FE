import { useState, useEffect } from 'react';
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
  checkedPolicies: {
    policyId: number;
    isChecked: boolean;
  }[];
}

interface PolicyResponse {
  policies: {
    policyId: number;
    type: string;
    title: string;
    content: string;
  }[];
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
  const [leavingPolicies, setLeavingPolicies] = useState<PolicyResponse['policies']>([]);

  /**
   *
   */
  useEffect(() => {
    const fetchLeavingPolicies = async () => {
      try {
        const response = await api.get<PolicyResponse>('/v2/api/policies?category=LEAVING');
        setLeavingPolicies(response.data.policies);
      } catch (error) {
        console.error('Failed to fetch leaving policies:', error);
      }
    };

    fetchLeavingPolicies();
  }, []);

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
        checkedPolicies: leavingPolicies.map((policy) => ({
          policyId: policy.policyId,
          isChecked: form.isTermsAgreed,
        })),
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
    leavingPolicies,
  };
};
