import React from 'react';
import { useGeneration } from '@/hooks/useGeneration';
import { Box, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import { styled } from 'styled-components';
import { useNavigate } from 'react-router-dom';

//
//
//

const MypageGenerationManagementContent = () => {
  const navigate = useNavigate();

  //
  const { generations, isGenerationLoading } = useGeneration();

  /**
   *
   */
  const handleClickGeneration = (generationId: number) => {
    navigate(`/mypage/generation-management/${generationId}`);
  };

  //
  //
  //

  if (isGenerationLoading) {
    return null;
  }

  return (
    <Stack
      height="100%"
      direction="row"
      flexWrap="wrap"
      columnGap="4rem"
      rowGap="2rem"
      justifyContent="center"
    >
      {generations?.map((generation) => (
        <Box margin="auto" key={generation.generationId}>
          <StyledBox
            key={generation.generationId}
            width="5rem"
            height="5rem"
            display="flex"
            alignItems="center"
            justifyContent="center"
            onClick={() => handleClickGeneration(generation.generationId!)}
          >
            <Typography
              sx={{
                fontFamily: 'Ycomputer',
                fontSize: '1.25rem',
              }}
            >
              {generation.generationNumber}기
            </Typography>
          </StyledBox>
        </Box>
      ))}
    </Stack>
  );
};

export default MypageGenerationManagementContent;

const StyledBox = styled(Box)`
  cursor: pointer;
  background-color: ${({ theme }) => theme.colors.primary30};
  transition: background-color 0.3s ease;
  &:hover {
    background-color: ${({ theme }) => theme.colors.primary50};
  }
`;
