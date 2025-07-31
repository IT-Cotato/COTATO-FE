import { Box, Skeleton } from '@mui/material';
import React from 'react';
import MypageRecruitmentManagementContentManageCard from './MypageRecruitmentManagementContentManageCard';
import MypageRecruitmentManagementContentManageInputField from './MypageRecruitmentManagementContentManageInputField';
import useRecruitmentManagement from '../hooks/useRecruitmentManagement';
import MypageRecruitmentManagementContentManageTextInput from './MypageRecruitmentManagementContentManageTextInput';
import CotatoIcon from '@components/CotatoIcon';
import CotatoThemeToggleSwitch from '@components/CotatoToggleSwitch';
import { useTheme } from 'styled-components';
import MypageRecruitmentManagementContentManageTextarea from './MypageRecruitmentManagementContentManageTextarea';
import CotatoButton from '@components/CotatoButton';
import CotatoDatePicker from '@components/CotatoDatePicker';
import { useBreakpoints } from '@/hooks/useBreakpoints';

//
//
//

const MypageRecruitmentManagementContentManage = () => {
  const [isStartDatePickerOpen, setIsStartDatePickerOpen] = React.useState(false);
  const [isEndDatePickerOpen, setIsEndDatePickerOpen] = React.useState(false);

  const theme = useTheme();
  const { isTabletOrSmaller } = useBreakpoints();

  const {
    isLoading,
    isRecruitmentActive,
    formLink,
    startDate,
    endDate,
    nextGenerationNumber,
    notificationCount,
    handleIsRecruitmentActiveChange,
    handleFormLinkChange,
    handleNextGenerationNumberChange,
    handleStartDateChange,
    handleEndDateChange,
    handleMailSubmit,
  } = useRecruitmentManagement();

  /**
   *
   */
  const renderInputCard = () => {
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
                value={startDate && startDate.format('YYYY-MM-DD')}
                placeholder="YYYY-MM-DD"
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

              <CotatoIcon icon="minus-solid" size="2rem" />

              <MypageRecruitmentManagementContentManageTextInput
                iconName="calender-solid"
                value={endDate && endDate.format('YYYY-MM-DD')}
                placeholder="YYYY-MM-DD"
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
              placeholder={`${notificationCount}명`}
              style={{
                border: 'none',
                backgroundColor: theme.colors.primary20,
              }}
            />
          }
        />
        <MypageRecruitmentManagementContentManageInputField
          label="메일 문구"
          description="기수를 입력하세요."
          slot={
            <MypageRecruitmentManagementContentManageTextarea
              nextGenerationNumber={nextGenerationNumber}
              onChange={handleNextGenerationNumberChange}
            />
          }
        />
        <CotatoButton
          isEnabled
          buttonStyle="line"
          text="모집 메일 전송하기"
          onClick={handleMailSubmit}
        />
      </MypageRecruitmentManagementContentManageCard>
    );
  };

  if (isLoading) {
    return (
      <Box sx={{ width: '100%', display: 'flex', gap: '4rem' }}>
        <Box
          sx={{
            width: '100%',
            backgroundColor: theme.colors.common.real_white,
          }}
        >
          <Skeleton
            animation="wave"
            variant="rectangular"
            width="100%"
            height={400}
            sx={{
              borderRadius: '0.25rem',
            }}
          />
        </Box>
        <Box
          sx={{
            width: '100%',
            backgroundColor: theme.colors.common.real_white,
          }}
        >
          <Skeleton
            animation="wave"
            variant="rectangular"
            width="100%"
            height={400}
            sx={{
              borderRadius: '0.25rem',
            }}
          />
        </Box>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: 'flex',
        width: '100%',
        gap: '4rem',
        flexDirection: isTabletOrSmaller ? 'column' : 'row',
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
