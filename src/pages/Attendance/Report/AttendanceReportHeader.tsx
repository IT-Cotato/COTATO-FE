import React from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { useTheme } from 'styled-components';
import { useGeneration } from '@/hooks/useGeneration';
import CotatoDropBox from '@components/CotatoDropBox';
import { CotatoGenerationInfoResponse } from 'cotato-openapi-clients';
import { useNavigate } from 'react-router-dom';

//
//
//

const AttendanceReportHeader = () => {
  const theme = useTheme();
  const { generations } = useGeneration();
  const navigate = useNavigate();

  const handleGenerationChange = (generations: CotatoGenerationInfoResponse) => {
    navigate(`/attendance/report/generation/${generations.generationId}`);
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
            <CotatoDropBox list={generations} onChange={handleGenerationChange} color="yellow" />
          )}
          <div>세션 선택</div>
        </Stack>
        <Box>엑셀</Box>
      </Stack>
    </Stack>
  );
};

export default AttendanceReportHeader;
