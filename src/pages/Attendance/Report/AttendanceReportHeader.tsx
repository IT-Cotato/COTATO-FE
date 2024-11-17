import React, { useState } from 'react';
import { Box, Button, Stack, Typography } from '@mui/material';
import styled, { useTheme } from 'styled-components';
import { useGeneration } from '@/hooks/useGeneration';
import CotatoDropBox from '@components/CotatoDropBox';
import { CotatoGenerationInfoResponse, CotatoSessionListResponse } from 'cotato-openapi-clients';
import { useNavigate, useParams } from 'react-router-dom';
import { useSession } from '@/hooks/useSession';
import CotatoIcon from '@components/CotatoIcon';
import { useBreakpoints } from '@/hooks/useBreakpoints';

//
//
//

const AttendanceReportHeader = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { isLandScapeOrSmaller } = useBreakpoints();

  const { generationId, sessionId } = useParams();

  const [selectedGenerationId, setSelectedGenerationId] = useState<number>(Number(generationId));
  const [selectedSessionId, setSelectedSessionId] = useState<number>(Number(sessionId));

  const { generations } = useGeneration({
    generationId: selectedGenerationId.toString(),
  });
  const { sessions } = useSession({
    generationId: selectedGenerationId,
  });

  /**
   *
   */
  const handlePreviousClick = () => {
    navigate('/attendance');
  };

  /**
   *
   */
  const handleGenerationChange = (generations: CotatoGenerationInfoResponse) => {
    navigate(`/attendance/report/generation/${generations.generationId}/session/${sessionId}`);

    /**
     * TODO: 기수 수정 로직 변경
     * 1. 기수 변경시 새로운 세션을 불러옴
     * 2. 세션 리스트에서 가장 최근 세션을 선택
     * 3. generatoin id, session id를 url에 반영
     */
  };

  /**
   *
   */
  const handleSessionChange = (session: CotatoSessionListResponse) => {
    navigate(`/attendance/report/generation/${generationId}/session/${session.sessionId}`);
  };

  /**
   *
   */
  const handleExportExcelClick = () => {
    alert('출시 예정입니다 :)');
  };

  return (
    <Stack
      direction="column"
      spacing="3rem"
      padding="2.5rem 0"
      sx={{
        width: '100%',
      }}
    >
      <Box sx={{ position: 'relative' }}>
        <StyledIcon
          icon="chevron-down-solid"
          color={theme.colors.primary90}
          onClick={handlePreviousClick}
        />
        <Typography
          align="center"
          color={theme.colors.common.black}
          sx={{
            fontFamily: 'Ycomputer',
            fontSize: '1.75rem',
          }}
        >
          출석부 확인하기
        </Typography>
      </Box>
      <Stack direction="row" justifyContent="space-between" gap="1rem">
        <Stack direction="row" spacing="1rem">
          {generations && (
            <CotatoDropBox
              list={generations}
              onChange={handleGenerationChange}
              defaultItemId={selectedGenerationId}
              color="yellow"
            />
          )}
          {sessions && (
            <CotatoDropBox
              list={sessions}
              onChange={handleSessionChange}
              defaultItemId={selectedSessionId}
              width="12rem"
              color="yellow"
            />
          )}
        </Stack>
        <Stack direction="column-reverse">
          <Button
            disableElevation
            disabled
            variant="contained"
            onClick={handleExportExcelClick}
            startIcon={
              <CotatoIcon icon="upload-alt-solid" color={theme.colors.common.black_const} />
            }
            sx={{
              backgroundColor: theme.colors.primary80,
              borderRadius: '0.325rem',
            }}
          >
            <Typography
              color={theme.colors.common.black_const}
              sx={{
                fontFamily: 'Ycomputer',
                fontSize: '1rem',
              }}
            >
              {!isLandScapeOrSmaller && '엑셀로 내보내기'}
            </Typography>
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default AttendanceReportHeader;

//
//
//

const StyledIcon = styled(CotatoIcon)`
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateX(-50%);
  rotate: 90deg;
  width: 2rem !important;
  height: 2rem !important;
  cursor: pointer;
`;
