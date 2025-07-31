import api from '@/api/api';
import { useGeneration } from '@/hooks/useGeneration';
import fetcher from '@utils/fetcher';
import {
  CotatoRecruitmentInfoResponse,
  CotatoRecruitmentNotificationPendingResponse,
} from 'cotato-openapi-clients';
import dayjs, { Dayjs } from 'dayjs';
import React from 'react';
import { toast } from 'react-toastify';
import useSWR, { useSWRConfig } from 'swr';

//
//
//

const useRecruitmentManagement = () => {
  const {
    data: recruitmentPending,
    isLoading: isRecruitmentPendingLoading,
    error: recruimentPendingError,
    mutate: mutateRecruitmentPending,
  } = useSWR<CotatoRecruitmentNotificationPendingResponse>(
    '/v2/api/recruitments/notifications/pending',
    fetcher,
  );

  const {
    data: recruitmentStatus,
    isLoading: isRecruitmentStatusLoading,
    error: recruitmentStatusError,
    mutate: mutateRecruitmentStatus,
  } = useSWR<CotatoRecruitmentInfoResponse>('/v2/api/recruitments', fetcher);

  const { mutate } = useSWRConfig();

  const { currentGeneration } = useGeneration();

  const [isSubmitting, setIsSubmitting] = React.useState<boolean>(false);

  const [isRecruitmentActive, setIsRecruitmentActive] = React.useState<boolean>(false);
  const [formLink, setFormLink] = React.useState<string>('');
  const [nextGenerationNumber, setNextGenerationNumber] = React.useState<number>();
  const [startDate, setStartDate] = React.useState<Dayjs>();
  const [endDate, setEndDate] = React.useState<Dayjs>();

  /**
   *
   */
  const handleIsRecruitmentActiveChange = async (value: boolean) => {
    const confirmText = value
      ? '모집 상태로 전환하시겠습니까?'
      : '모집 상태를 비활성화하시겠습니까?';

    // when data is loading or submitting, do not proceed
    if (isRecruitmentPendingLoading || isRecruitmentStatusLoading || isSubmitting) {
      return;
    }

    // when user cancels the confirmation dialog, do not proceed
    if (!confirm(confirmText)) {
      return;
    }

    // input data is not valid, show error message
    if (!formLink || !startDate || !endDate || endDate.isBefore(startDate)) {
      toast.error('모집 링크와 시작일, 종료일을 올바르게 입력해주세요.');
      return;
    }

    try {
      setIsSubmitting(true);

      await api.put('/v2/api/recruitments', {
        isOpened: value,
        recruitmentUrl: formLink,
        startDate: startDate.format('YYYY-MM-DD'),
        endDate: endDate.format('YYYY-MM-DD'),
      });

      toast.success(`모집 상태가 ${value ? '활성화' : '비활성화'}되었습니다.`);

      setIsRecruitmentActive(value);

      mutateRecruitmentPending();
      mutateRecruitmentStatus();
    } catch (error) {
      toast.error('모집 상태를 변경하는데 실패했습니다. 다시 시도해주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  /**
   *
   */
  const handleFormLinkChange = (value: string) => {
    setFormLink(value);
  };

  /**
   *
   */
  const handleNextGenerationNumberChange = (value: number | undefined) => {
    setNextGenerationNumber(value);
  };

  /**
   *
   */
  const handleStartDateChange = (value: Date) => {
    setStartDate(dayjs(value));
  };

  /**
   *
   */
  const handleEndDateChange = (value: Date) => {
    setEndDate(dayjs(value));
  };

  /**
   *
   */
  const handleMailSubmit = async () => {
    if (isSubmitting) {
      return;
    }

    if (nextGenerationNumber === undefined) {
      toast.error('기수를 입력해주세요.');
      return;
    }

    if (!confirm('모집 메일을 전송하시겠습니까?')) {
      return;
    }

    try {
      if (!currentGeneration) {
        new Error('generation is not defined');
      }

      setIsSubmitting(true);

      await api.post('/v2/api/recruitments/notification/requester', {
        generationNumber: nextGenerationNumber,
      });

      toast.success('메일이 성공적으로 전송되었습니다.');

      mutateRecruitmentPending();
      mutateRecruitmentStatus();
      mutate('/v2/api/recruitments/notifications/logs');
    } catch (error) {
      toast.error('메일 전송에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  //
  //
  //
  React.useEffect(() => {
    if (
      isRecruitmentPendingLoading ||
      isRecruitmentStatusLoading ||
      !currentGeneration ||
      recruimentPendingError ||
      recruitmentStatusError
    ) {
      return;
    }

    setIsRecruitmentActive(recruitmentStatus?.isOpened ?? false);
    setFormLink(recruitmentStatus?.recruitmentUrl ?? '');
    setNextGenerationNumber(Number(currentGeneration.generationNumber) + 1);
    setStartDate(recruitmentStatus?.startDate ? dayjs(recruitmentStatus?.startDate) : undefined);
    setEndDate(recruitmentStatus?.endDate ? dayjs(recruitmentStatus.endDate) : undefined);
  }, [isRecruitmentPendingLoading, isRecruitmentStatusLoading, currentGeneration]);

  return {
    isLoading: isRecruitmentPendingLoading || isRecruitmentStatusLoading,
    isRecruitmentActive,
    formLink,
    nextGenerationNumber,
    startDate,
    endDate,
    notificationCount: recruitmentPending?.notificationCount ?? 0,
    handleIsRecruitmentActiveChange,
    handleFormLinkChange,
    handleNextGenerationNumberChange,
    handleStartDateChange,
    handleEndDateChange,
    handleMailSubmit,
  };
};

//
//
//

export default useRecruitmentManagement;
