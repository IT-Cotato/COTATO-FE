import React, { useEffect, useState } from 'react';
import { useGeneration } from '@/hooks/useGeneration';
import { Box, Card, IconButton, Stack, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import { styled, useTheme } from 'styled-components';
import { Controller, useForm, useFormState, useWatch } from 'react-hook-form';
import { CotatoChangeGenerationPeriodRequest } from 'cotato-openapi-clients';
import CotatoDatePicker from '@components/CotatoDatePicker';
import dayjs from 'dayjs';
import CotatoIcon from '@components/CotatoIcon';
import CotatoMuiButton from '@components/CotatoMuiButton';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useGenerationsPeriodPatchMutate } from '../hooks/useGenerationsPeriodPatch';
import MypageGenerationManagementDetailContentMemberInfo from './MypageGenerationManagementDetailContentMemberInfo';

//
//
//

const MypageGenerationManagementDetailContent = () => {
  const params = useParams();
  const theme = useTheme();

  //
  const { mutateGenerationsPeriodPatch } = useGenerationsPeriodPatchMutate({
    generationId: Number(params.generationId),
  });

  //
  const { targetGeneration } = useGeneration({ generationId: params.generationId });

  //
  const GENERATION_PERIOD_SCHEMA = yup.object({
    startDate: yup
      .date()
      .required()
      .test('is-before-endDate', '시작일은 종료일 이전이어야 합니다.', function (value) {
        const { endDate } = this.parent;
        return value && dayjs(value).isBefore(dayjs(endDate));
      }),
    endDate: yup.date().required(),
    generationNumber: yup.number().required(),
  }) as unknown as yup.ObjectSchema<CotatoChangeGenerationPeriodRequest>;

  //
  const { control, handleSubmit, reset } = useForm<CotatoChangeGenerationPeriodRequest>({
    defaultValues: {
      ...targetGeneration,
    },
    resolver: yupResolver(GENERATION_PERIOD_SCHEMA),
    mode: 'onChange',
  });
  const { isDirty, isValid } = useFormState({ control });
  const { startDate, endDate } = useWatch({ control });

  //
  const [isOpenStartDatePicker, setIsOpenStartDatePicker] = useState(false);
  const [isOpenEndDatePicker, setIsOpenEndDatePicker] = useState(false);

  /**
   *
   */
  const onSubmit = (data: CotatoChangeGenerationPeriodRequest) => {
    const commonForm = {
      ...data,
      startDate: dayjs(data.startDate).format('YYYY-MM-DD') as unknown as Date,
      endDate: dayjs(data.endDate).format('YYYY-MM-DD') as unknown as Date,
    };

    mutateGenerationsPeriodPatch({ ...commonForm });
  };

  /**
   *
   */
  const renderTitle = () => {
    return (
      <Typography fontSize="1.5rem" fontWeight="600">
        기수 정보
      </Typography>
    );
  };

  /**
   *
   */
  const renderCurrentGeneration = () => {
    return (
      <Stack gap="0.5rem">
        <Typography>기수</Typography>
        <StyledBox $disabled>{targetGeneration?.generationNumber}기</StyledBox>
      </Stack>
    );
  };

  /**
   *
   */
  const renderValidationError = () => {
    if (isValid) {
      return null;
    }

    return (
      <Box position="relative">
        <StyledErrorTypography variant="caption">
          시작일은 종료일 이전이어야 합니다.
        </StyledErrorTypography>
      </Box>
    );
  };

  /**
   *
   */
  const renderGenerationPeriodField = () => {
    if (!startDate || !endDate) {
      return null;
    }

    return (
      <Stack gap="0.5rem">
        <Typography>운영 기간</Typography>
        <Stack direction="row" gap="0.5rem" alignItems="center">
          <Controller
            control={control}
            name="startDate"
            render={({ field }) => {
              const date = dayjs(field.value);

              return (
                <StyledBox
                  $disabled={false}
                  display="flex"
                  flexDirection="row"
                  alignItems="center"
                  gap="0.5rem"
                >
                  <StyledCotatoTypography color={theme.colors.gray100}>
                    {date.format('YYYY-MM-DD')}
                  </StyledCotatoTypography>
                  <IconButton onClick={() => setIsOpenStartDatePicker(true)}>
                    <CotatoIcon icon="calender-solid" />
                  </IconButton>

                  <CotatoDatePicker
                    disableTimePicker
                    {...field}
                    id="startDate"
                    key="startDate"
                    open={isOpenStartDatePicker}
                    date={startDate}
                    selected={startDate}
                    onDateChange={(date) => {
                      field.onChange(date);
                    }}
                    onClose={() => setIsOpenStartDatePicker(false)}
                  />
                </StyledBox>
              );
            }}
          />

          <CotatoIcon icon="minus-solid" />

          <Controller
            control={control}
            name="endDate"
            render={({ field }) => {
              const date = dayjs(field.value);

              return (
                <StyledBox
                  $disabled={false}
                  display="flex"
                  flexDirection="row"
                  alignItems="center"
                  gap="0.5rem"
                >
                  <StyledCotatoTypography color={theme.colors.gray100}>
                    {date.format('YYYY-MM-DD')}
                  </StyledCotatoTypography>
                  <IconButton onClick={() => setIsOpenEndDatePicker(true)}>
                    <CotatoIcon icon="calender-solid" />
                  </IconButton>

                  <CotatoDatePicker
                    disableTimePicker
                    id="endDate"
                    key="endDate"
                    open={isOpenEndDatePicker}
                    date={endDate}
                    selected={endDate}
                    onDateChange={(date) => {
                      field.onChange(date);
                    }}
                    onClose={() => setIsOpenEndDatePicker(false)}
                  />
                </StyledBox>
              );
            }}
          />
        </Stack>

        {renderValidationError()}
      </Stack>
    );
  };

  /**
   *
   */
  const renderSubmitButton = () => {
    return (
      <Box flex={1} display="flex" justifyContent="flex-end">
        <CotatoMuiButton
          disabled={!isDirty || !isValid}
          startIcon={<CotatoIcon size="1.25rem" icon="pencil-solid" />}
          variant="contained"
          fontFamily="Ycomputer"
          onClick={handleSubmit(onSubmit)}
        >
          기수 정보 수정하기
        </CotatoMuiButton>
      </Box>
    );
  };

  //
  // reset form when targetGeneration changes
  //
  useEffect(() => {
    if (targetGeneration) {
      reset({
        ...targetGeneration,
      });
    }
  }, [targetGeneration]);

  //
  //
  //

  return (
    <Stack>
      <StyledCard>
        <Stack gap="1.5rem">
          {renderTitle()}
          <Stack direction="row" gap="2rem" alignItems="flex-end">
            {renderCurrentGeneration()}
            {renderGenerationPeriodField()}
            {renderSubmitButton()}
          </Stack>
        </Stack>
      </StyledCard>
      <MypageGenerationManagementDetailContentMemberInfo />
    </Stack>
  );
};

export default MypageGenerationManagementDetailContent;

const StyledCard = styled(Card)`
  padding: 2rem;
`;

const StyledBox = styled(Box)<{ $disabled?: boolean }>`
  display: flex;
  flex-direction: column;
  padding: 0.625rem;
  align-items: center;
  border-radius: 0.25rem;
  justify-content: center;
  font-family: 'Ycomputer';
  height: 2.5rem;
  background-color: ${({ $disabled, theme }) =>
    $disabled ? theme.colors.gray30 : theme.colors.primary20};
`;

const StyledCotatoTypography = styled(Typography)`
  font-family: 'Ycomputer' !important;
`;

const StyledErrorTypography = styled(Typography)`
  color: ${({ theme }) => theme.colors.secondary80};
  position: absolute;
  top: 0;
  left: 0;
`;
