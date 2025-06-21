import { Box } from '@mui/material';
import React from 'react';
import MypageRecruitmentManagementContentManageCard from './MypageRecruitmentManagementContentManageCard';
import MypageRecruitmentManagementContentManageInputField from './MypageRecruitmentManagementContentManageInputField';
import useRecruitmentManagement from '../hooks/useRecruitmentManagement';
import MypageRecruitmentManagementContentManageTextInput from './MypageRecruitmentManagementContentManageTextInput';
import CotatoIcon from '@components/CotatoIcon';
import { Dayjs } from 'dayjs';
import CotatoThemeToggleSwitch from '@components/CotatoToggleSwitch';
import { useTheme } from 'styled-components';
import MypageRecruitmentManagementContentManageTextarea from './MypageRecruitmentManagementContentManageTextarea';
import CotatoButton from '@components/CotatoButton';
import CotatoDatePicker from '@components/CotatoDatePicker';

//
//
//

const MypageRecruitmentManagementContentManage = () => {
  const [isStartDatePickerOpen, setIsStartDatePickerOpen] = React.useState(false);
  const [isEndDatePickerOpen, setIsEndDatePickerOpen] = React.useState(false);

  const theme = useTheme();

  const {
    isRecruitmentActive,
    formLink,
    startDate,
    endDate,
    mailContent,
    handleIsRecruitmentActiveChange,
    handleFormLinkChange,
    handleMailContentChange,
    handleStartDateChange,
    handleEndDateChange,
  } = useRecruitmentManagement();

  /**
   *
   */
  const renderInputCard = () => {
    /**
     *
     */
    const getDateValue = (date: Dayjs | undefined) => {
      if (date === undefined) {
        return 'YYYY.MM.DD';
      }

      return date.format('YYYY.MM.DD');
    };

    return (
      <MypageRecruitmentManagementContentManageCard>
        <MypageRecruitmentManagementContentManageInputField
          label="모집 링크"
          slot={
            <MypageRecruitmentManagementContentManageTextInput
              iconName="link-solid"
              value={formLink}
              placeholder="모집 링크를 입력해주세요."
              onChange={(e) => handleFormLinkChange(e.target.value)}
            />
          }
        />
        <MypageRecruitmentManagementContentManageInputField
          label="모집 기간"
          slot={
            <Box sx={{ display: 'flex', gap: '0.5rem', width: '100%', alignItems: 'center' }}>
              <MypageRecruitmentManagementContentManageTextInput
                iconName="calender-solid"
                value={getDateValue(startDate)}
                onClick={() => setIsStartDatePickerOpen(true)}
                style={{
                  cursor: 'pointer',
                }}
              />
              <CotatoDatePicker
                disableTimePicker
                open={isStartDatePickerOpen}
                date={startDate?.toDate() ?? new Date()}
                onDateChange={handleStartDateChange}
                onClose={() => setIsStartDatePickerOpen(false)}
              />

              <CotatoIcon icon="minus-solid" size="1.25rem" />

              <MypageRecruitmentManagementContentManageTextInput
                iconName="calender-solid"
                value={getDateValue(endDate)}
                onClick={() => setIsEndDatePickerOpen(true)}
                style={{
                  cursor: 'pointer',
                }}
              />
              <CotatoDatePicker
                disableTimePicker
                open={isEndDatePickerOpen}
                date={endDate?.toDate() ?? new Date()}
                onDateChange={handleEndDateChange}
                onClose={() => setIsEndDatePickerOpen(false)}
              />
            </Box>
          }
        />
        <MypageRecruitmentManagementContentManageInputField
          label="모집 버튼 활성화"
          slot={
            <CotatoThemeToggleSwitch
              checked={isRecruitmentActive}
              onChange={(e) => handleIsRecruitmentActiveChange(e.target.checked)}
            />
          }
        />
      </MypageRecruitmentManagementContentManageCard>
    );
  };

  /**
   *
   */
  const renderSubmitCard = () => {
    return (
      <MypageRecruitmentManagementContentManageCard>
        <MypageRecruitmentManagementContentManageInputField
          label="대기자 수"
          slot={
            <MypageRecruitmentManagementContentManageTextInput
              readonly
              placeholder="NN명"
              style={{
                border: 'none',
                backgroundColor: theme.colors.primary20,
              }}
            />
          }
        />
        <MypageRecruitmentManagementContentManageInputField
          label="메일 문구"
          description="내용을 입력하세요."
          slot={
            <MypageRecruitmentManagementContentManageTextarea
              value={mailContent}
              onChange={(e) => handleMailContentChange(e.target.value)}
            />
          }
        />
        <CotatoButton isEnabled buttonStyle="line" text="모집 메일 전송하기" />
      </MypageRecruitmentManagementContentManageCard>
    );
  };

  return (
    <Box
      sx={{
        display: 'flex',
        width: '100%',
        gap: '4rem',
      }}
    >
      {renderInputCard()}
      {renderSubmitCard()}
    </Box>
  );
};

//
//
//

export default MypageRecruitmentManagementContentManage;
