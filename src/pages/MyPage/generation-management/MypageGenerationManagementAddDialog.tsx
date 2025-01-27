import React, { useEffect } from 'react';
import {
  CotatoDialog,
  CotatoDialogActions,
  CotatoDialogContent,
  CotatoDialogTitle,
} from '@components/CotatoDialog';
import { Stack, TextField, Typography } from '@mui/material';
import CotatoButton from '@components/CotatoButton';
import { useGeneration } from '@/hooks/useGeneration';
import CotatoMuiDatePicker from '@components/CotatoMuiDatePicker';
import { CotatoAddGenerationRequest } from 'cotato-openapi-clients';
import { useForm, Controller, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import api from '@/api/api';
import { useBreakpoints } from '@/hooks/useBreakpoints';

//
//
//

interface MypageGenerationManagementAddDialogProps {
  open: boolean;
  onClose: () => void;
}

//
//
//

const MypageGenerationManagementAddDialog = ({
  open,
  onClose,
}: MypageGenerationManagementAddDialogProps) => {
  const { isMobileOrSmaller } = useBreakpoints();

  //
  const { currentGeneration, mutateCurrentGeneration, mutateGenerations } = useGeneration();
  const defaultGenerationNumber = (currentGeneration?.generationNumber ?? 0) + 1;

  //
  const schema = yup.object({
    generationNumber: yup.number().required(),
    startDate: yup.date().required(),
    endDate: yup
      .date()
      .required()
      .test(
        'endDate-after-startDate',
        '종료일은 시작일보다 이후이어야 합니다.',
        function (endDate) {
          const { startDate } = this.parent;
          if (!startDate || !endDate) {
            return true;
          }

          return endDate >= startDate;
        },
      ),
  });

  //
  const {
    control,
    formState: { isValid },
    reset,
    handleSubmit,
    trigger,
  } = useForm<CotatoAddGenerationRequest>({
    defaultValues: {
      generationNumber: defaultGenerationNumber,
    },
    resolver: yupResolver(schema),
  });

  //
  const startDate = useWatch({ control, name: 'startDate' });
  const endDate = useWatch({ control, name: 'endDate' });

  /**
   *
   */
  const postGenerationRequest = async (formData: CotatoAddGenerationRequest) => {
    await api.post('v1/api/generations', formData);
  };

  /**
   *
   */
  const onSubmit = (formData: CotatoAddGenerationRequest) => {
    postGenerationRequest(formData).then(() => {
      toast.success('기수가 추가되었습니다.');
      mutateGenerations();
      mutateCurrentGeneration();
      reset();
      onClose();
    });
  };

  /**
   *
   */
  const renderGenerationName = () => {
    return (
      <Stack direction={isMobileOrSmaller ? 'column' : 'row'} gap="1rem">
        <Typography fontWeight="700" fontFamily="Pretendard">
          기수 이름
        </Typography>
        <TextField
          slotProps={{ input: { readOnly: true } }}
          defaultValue={defaultGenerationNumber + '기'}
        />
      </Stack>
    );
  };

  /**
   *
   */
  const renderGenerationPeriod = () => {
    return (
      <Stack direction={isMobileOrSmaller ? 'column' : 'row'} gap="1rem">
        <Typography fontWeight="700" fontFamily="Pretendard" minWidth="fit-content">
          운영 기간
        </Typography>
        <Stack width="100%" gap="1rem">
          {/* 시작일 */}
          <Controller
            control={control}
            name="startDate"
            render={({ field }) => <CotatoMuiDatePicker {...field} placeholder="시작일" />}
          />

          {/* 종료일 */}
          <Controller
            control={control}
            name="endDate"
            render={({ field, fieldState }) => (
              <CotatoMuiDatePicker
                {...field}
                slotProps={{
                  textField: {
                    placeholder: '종료일',
                    helperText: (
                      <Typography color="error" variant="caption">
                        {fieldState.error?.message}
                      </Typography>
                    ),
                  },
                }}
              />
            )}
          />
        </Stack>
      </Stack>
    );
  };

  //
  //
  //
  useEffect(() => {
    if (currentGeneration) {
      reset({
        generationNumber: defaultGenerationNumber,
      });
    }
  }, [defaultGenerationNumber]);

  //
  //
  //
  useEffect(() => {
    if (open) {
      reset();
    }
  }, [open]);

  //
  //
  //
  useEffect(() => {
    if (startDate && endDate) {
      trigger(['startDate', 'endDate']);
    }
  }, [startDate, endDate, trigger]);

  //
  //
  //

  return (
    <CotatoDialog open={open} onClose={onClose}>
      <CotatoDialogTitle alignCenter>기수 추가하기</CotatoDialogTitle>
      <CotatoDialogContent>
        <Stack
          padding={isMobileOrSmaller ? '2rem 0' : '2.125rem 3rem'}
          gap="1.25rem"
          margin="auto"
          maxWidth="28rem"
        >
          {renderGenerationName()}
          {renderGenerationPeriod()}
        </Stack>
      </CotatoDialogContent>
      <CotatoDialogActions alignCenter>
        <CotatoButton
          // TODO: add loading props
          isEnabled={isValid}
          buttonStyle="filled"
          text="추가하기"
          handleClick={handleSubmit(onSubmit)}
        />
      </CotatoDialogActions>
    </CotatoDialog>
  );
};

export default MypageGenerationManagementAddDialog;
