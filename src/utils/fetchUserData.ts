import useSWR from 'swr';
import fetcher from './fetcher';
import { CotatoMemberInfoResponse } from 'cotato-openapi-clients';
/**
 * fetch user's name, role, and etc
 * @returns {Object}
 */

interface FetchUserData {
  data: CotatoMemberInfoResponse;
  isLoading: boolean;
}

export default function fetchUserData(): FetchUserData {
  const { data, isLoading } = useSWR('/v1/api/member/info', fetcher, {
    revalidateOnFocus: false,
    revalidateIfStale: false,
    dedupingInterval: 6000000, // 10분동안은 데이터가 변경되지 않는 한 재요청이 발생하지 않음
    onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
      if (error.status === 400) return;
      if (retryCount >= 10) return;
    },
  });
  return { data, isLoading };
}
