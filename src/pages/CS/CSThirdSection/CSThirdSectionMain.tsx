import React from 'react';
import { Box, Typography } from '@mui/material';
import macbook from '@/assets/macbook.png';
import CSPPTImages from '@assets/cs_ppt';
import { useTheme } from 'styled-components';

//
//
//

interface CSThirdSectionMainProps {
  selectedSlideIndex: number;
}

const CS_EDUCATION_DESCRIPTION = `
교육팀 활동을 통해 CS 지식을 깊이 있게 학습하고, 직접 교육 자료와 퀴즈를 제작하며 함께
성장할 수 있어요. CS 지식의 탄탄한 학습과 Git Organization 을 활용한 학습을 해요. 단순히
배우는 것을 넘어 실제로 활용할 수 있는 경험을 찾고 있다면, 코테이토 교육팀과 함께해요!
`;

//
//
//

const CSThirdSectionMain = ({ selectedSlideIndex }: CSThirdSectionMainProps) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        gap: '3.25rem',
        marginTop: '2rem',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '3.25rem',
          color: theme.colors.common.black,
        }}
      >
        <Typography
          variant="h3"
          sx={{
            fontFamily: 'YComputer',
          }}
        >
          CS 교육
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{
            lineHeight: '2.15rem',
            fontWeight: '500',
            letterSpacing: '-0.025em',
            wordBreak: 'keep-all',
          }}
        >
          {CS_EDUCATION_DESCRIPTION}
        </Typography>
        <Box
          sx={{
            display: 'flex',
            flex: '1',
            alignItems: 'flex-end',
            paddingBottom: '1.625rem',
          }}
        >
          <Typography variant="subtitle1">링크를 내놔라</Typography>
        </Box>
      </Box>
      <Box
        sx={{
          position: 'relative',
        }}
      >
        <Box
          component="img"
          src={macbook}
          sx={{
            width: '40rem',
            height: 'auto',
            objectFit: 'contain',
          }}
        />
        <Box
          component="img"
          src={CSPPTImages[selectedSlideIndex]}
          sx={{
            position: 'absolute',
            width: '30rem',
            top: '1.375rem',
            left: '5rem',
            height: 'auto',
            objectFit: 'contain',
          }}
        />
      </Box>
    </Box>
  );
};

export default CSThirdSectionMain;
