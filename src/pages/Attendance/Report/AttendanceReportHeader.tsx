import React from 'react';
import { Box, Button, Stack, Typography } from '@mui/material';
import { useTheme } from 'styled-components';
import { useGeneration } from '@/hooks/useGeneration';
import CotatoDropBox from '@components/CotatoDropBox';
import { CotatoGenerationInfoResponse, CotatoSessionListResponse } from 'cotato-openapi-clients';
import { useNavigate, useParams } from 'react-router-dom';
import { useSession } from '@/hooks/useSession';
import CotatoIcon from '@components/CotatoIcon';

//
//
//

const AttendanceReportHeader = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const { generationId } = useParams();
  const { sessionId } = useParams();

  const { generations, currentGeneration, targetGeneration } = useGeneration({
    generationId: generationId,
  });
  const { sessions, targetSession } = useSession({
    generationId: currentGeneration?.generationId,
    sessionId: Number(sessionId),
  });

  const handleGenerationChange = (generations: CotatoGenerationInfoResponse) => {
    navigate(`/attendance/report/generation/${generations.generationId}/session/${sessionId}`);
  };

  const handleSessionChange = (session: CotatoSessionListResponse) => {
    alert(session.title);
  };

  const handleExportExcelClick = () => {
    alert('출시 예정입니다 :)');
  };

  return (
    <Stack
      direction="column"
      spacing="3rem"
      padding="2rem 0"
      sx={{
        width: '100%',
        border: '4px solid blue',
      }}
    >
      <Box>
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
      <Stack direction="row" justifyContent="space-between">
        <Stack direction="row" spacing="1rem">
          {generations && (
            <CotatoDropBox
              list={generations}
              onChange={handleGenerationChange}
              defaultItemId={targetGeneration?.generationId}
              color="yellow"
            />
          )}
          {sessions && (
            <CotatoDropBox
              list={sessions}
              onChange={handleSessionChange}
              defaultItemId={targetSession?.sessionId}
              color="yellow"
            />
          )}
        </Stack>
        <Stack direction="column-reverse">
          <Button
            disableElevation
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
              엑셀로 내보내기
            </Typography>
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default AttendanceReportHeader;
