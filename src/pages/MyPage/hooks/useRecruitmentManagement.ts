import dayjs, { Dayjs } from 'dayjs';
import React from 'react';

//
//
//

const INITIAL_MAIL_CONTENT = `
코테이토  ___ 기 모집이 시작되었습니다! 

https://www.cotato.kr 에 접속하여 지원해주세요!

무엇이라도 해내야겠다는 마음가짐, 발전하고자 하는 열정이면 충분합니다!
`.trim();

//
//
//

const useRecruitmentManagement = () => {
  const [isRecruitmentActive, setIsRecruitmentActive] = React.useState<boolean>(false);
  const [formLink, setFormLink] = React.useState<string>();
  const [mailContent, setMailContent] = React.useState<string>(INITIAL_MAIL_CONTENT);
  const [startDate, setStartDate] = React.useState<Dayjs>();
  const [endDate, setEndDate] = React.useState<Dayjs>();

  /**
   *
   */
  const handleIsRecruitmentActiveChange = (value: boolean) => {
    if (!isRecruitmentActive && confirm('모집 상태로 전환하시겠습니까?')) {
      setIsRecruitmentActive(value);
    } else if (isRecruitmentActive && confirm('모집 상태를 비활성화하시겠습니까?')) {
      setIsRecruitmentActive(value);
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
  const handleMailContentChange = (value: string) => {
    setMailContent(value);
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

  return {
    isRecruitmentActive,
    formLink,
    mailContent,
    startDate,
    endDate,
    handleIsRecruitmentActiveChange,
    handleFormLinkChange,
    handleMailContentChange,
    handleStartDateChange,
    handleEndDateChange,
  };
};

//
//
//

export default useRecruitmentManagement;
