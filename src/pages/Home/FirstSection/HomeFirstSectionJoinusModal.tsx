import React from 'react';
import { CotatoDialog } from '@components/CotatoDialog';
import { Box, Checkbox, DialogTitle, Stack, TextField, Typography } from '@mui/material';
import styled, { useTheme } from 'styled-components';
import CotatoIcon from '@components/CotatoIcon';
import CotatoButton from '@components/CotatoButton';
import { useJoinusModalOpenStore } from '@/zustand-stores/useJoinusModalOpenStore';
import api from '@/api/api';
import { toast } from 'react-toastify';

//
//
//

const CONSETN_FORM_TEXT = `개인정보보호법에 따라 코테이토의 모집 안내를 신청하시는 분께 수집하는 개인정보의 항목, 개인정보의 수집 및 이용 목적, 개인정보의 보유 및 이용 기간, 동의 거부권 및 동의 거부 시 불이익에 관한 사항을 안내해 드리니 확인 후 동의하여 주시기를 바랍니다.
메일 수신을 위해서는 아래와 같이 개인정보를 수집·이용합니다

개인정보 수집 항목: 이메일
개인정보 수집 목적: 모집 안내
보유 및 이용 기간: 다음 기수 모집 기간까지

이용자는 개인정보의 수집 및 이용 동의를 거부할 권리가 있으나 동의 거부 시 서비스 이용이 제한됩니다.`;

//
//
//

const HomeFirstSectionJoinusModal = () => {
  const [isConsentChecked, setIsConsentChecked] = React.useState(false);
  const [email, setEmail] = React.useState('');

  const { isJoinusModalOpen, setIsJoinusModalOpen } = useJoinusModalOpenStore();

  const theme = useTheme();

  /**
   *
   */
  const handleClose = () => {
    setIsJoinusModalOpen(false);
  };

  /**
   *
   */
  const handleConsentChange = () => {
    setIsConsentChecked((prev) => !prev);
  };

  /**
   *
   */
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  /**
   *
   */
  const handleSubmit = async () => {
    if (!isConsentChecked) {
      alert('개인정보 수집·이용 동의서를 확인해주세요.');
      return;
    }

    if (email.length === 0) {
      alert('이메일을 입력해주세요.');
      return;
    }

    try {
      await api.post('/v2/api/recruitments/notification', {
        policyCheck: isConsentChecked,
        email,
      });

      toast.success('모집 알림 신청이 완료되었습니다!');

      setEmail('');
      setIsConsentChecked(false);

      setIsJoinusModalOpen(false);
    } catch (error) {
      toast.error('모집 알림 신청에 실패했습니다. 다시 시도해주세요.');
    }
  };

  /**
   *
   */
  const renderTitle = () => {
    return (
      <DialogTitle
        variant="subtitle2"
        sx={{ textAlign: 'center', padding: '1.25rem', color: theme.colors.common.black }}
      >
        모집 지원하기
      </DialogTitle>
    );
  };

  /**
   *
   */
  const renderDescription = () => {
    return (
      <Stack spacing="0.625rem" sx={{ textAlign: 'center', lineHeight: '1.625rem' }}>
        <Typography variant="body1" color={theme.colors.secondary70}>
          *지금은 모집 기간이 아닙니다.
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: theme.colors.common.black,
          }}
        >
          이메일을 남겨주시면 다음 기수 감자 모집 시<br />
          메일을 보내드릴게요!
        </Typography>
      </Stack>
    );
  };

  /**
   *
   */
  const renderMailInput = () => {
    return (
      <TextField
        label="이메일"
        value={email}
        onChange={handleEmailChange}
        slotProps={{
          inputLabel: {
            shrink: true,
            sx: {
              position: 'relative',
              transform: 'none',
              marginBottom: '0.5rem',
              color: theme.colors.const.black,
              fontSize: '1rem',
              fontWeight: 500,
            },
          },
        }}
        sx={{
          '& .MuiInputLabel-root': {
            color: theme.colors.common.black,
          },

          '& .MuiOutlinedInput-root': {
            '& input': {
              backgroundColor: theme.colors.primary20,
              borderRadius: '0.25rem',
              padding: '0.875rem 0.75rem',
            },

            '& fieldset': {
              top: 0,
              borderColor: theme.colors.const.black,
            },

            '&.Mui-focused fieldset': {
              borderColor: theme.colors.const.black,
            },
          },

          '& legend': {
            display: 'none',
          },
        }}
      />
    );
  };

  /**
   *
   */
  const renderConsentForm = () => {
    return (
      <Stack
        spacing="0.75rem"
        sx={{
          border: `1px solid ${theme.colors.gray30}`,
          borderRadius: '0.625rem',
          padding: '0.75rem 0.5rem',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Checkbox
            checked={isConsentChecked}
            icon={<CotatoIcon icon="check-circle-solid" color={theme.colors.gray20} />}
            checkedIcon={<CotatoIcon icon="check-circle-solid" />}
            onChange={handleConsentChange}
          />
          <Typography
            sx={{
              fontSize: '0.875rem',
              color: theme.colors.common.black,
              fontWeight: 600,
            }}
          >
            개인정보 수집·이용 동의서
          </Typography>
        </Box>
        <StyledTextarea readOnly value={CONSETN_FORM_TEXT} />
      </Stack>
    );
  };

  /**
   *
   */
  const renderSubmitButton = () => {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <CotatoButton
          isEnabled={isConsentChecked && email.length > 0}
          text="모집 알림 신청하기"
          onClick={handleSubmit}
        />
      </Box>
    );
  };

  return (
    <CotatoDialog
      open={isJoinusModalOpen}
      onClose={handleClose}
      sx={{
        '& .MuiPaper-root': {
          width: '35rem',
          padding: '1rem 4.5rem',
          backgroundColor: theme.colors.common.white,
        },
      }}
    >
      <Stack spacing="1.75rem" sx={{}}>
        {renderTitle()}
        {renderDescription()}
        {renderMailInput()}
        {renderConsentForm()}
        {renderSubmitButton()}
      </Stack>
    </CotatoDialog>
  );
};

export default HomeFirstSectionJoinusModal;

//
//
//

const StyledTextarea = styled.textarea`
  border: none;
  resize: none;
  height: 8rem;
  color: ${({ theme }) => theme.colors.common.black};
  font-size: 0.75rem;
  line-height: 1.5rem;
  background-color: ${({ theme }) => theme.colors.common.white};

  &:focus-visible {
    outline: none;
  }
`;
