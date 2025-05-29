import React from 'react';
import { Box, Typography } from '@mui/material';
import macbook from '@/assets/macbook.png';

//
//
//

const CS_EDUCATION_DESCRIPTION = `
교육팀 활동을 통해 CS 지식을 깊이 있게 학습하고, 직접 교육 자료와 퀴즈를 제작하며 함께
성장할 수 있어요. CS 지식의 탄탄한 학습과 Git Organization 을 활용한 학습을 해요. 단순히
배우는 것을 넘어 실제로 활용할 수 있는 경험을 찾고 있다면, 코테이토 교육팀과 함께해요!
`;

//
//
//

const CSThirdSectionMain = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        gap: '3.25rem',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '3.25rem',
          paddingTop: '2.5rem',
        }}
      >
        <Typography
          variant="h1"
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
            wordBreak: 'keep-all',
          }}
        >
          {CS_EDUCATION_DESCRIPTION}
        </Typography>
      </Box>
      <Box
        component="img"
        src={macbook}
        sx={{
          width: '35rem',
          height: 'auto',
          objectFit: 'contain',
          // marginTop: '-5rem',
        }}
      ></Box>
    </Box>
  );
};

export default CSThirdSectionMain;
