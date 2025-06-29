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

const CS_EDUCATION_LINK = 'https://www.youtube.com/watch?v=UJnR2SMOHGo';

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
        marginTop: '2rem',
        flexDirection: {
          xs: 'column',
          tablet: 'row',
        },
        alignItems: {
          xs: 'center',
          tablet: 'flex-start',
        },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          color: theme.colors.common.black,
          flex: '1',
          height: '100%',
        }}
      >
        <Typography
          variant="h3"
          sx={{
            fontFamily: 'YComputer',
            fontWeight: {
              xs: '600',
            },
            fontSize: {
              xs: '2rem',
              tablet: '2.25rem',
              desktop: '3rem',
            },
          }}
        >
          CS 교육
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{
            fontWeight: '500',
            letterSpacing: '-0.025em',
            wordBreak: 'keep-all',
            fontSize: {
              xs: '1rem',
              desktop: '1.125rem',
            },
            marginTop: {
              xs: '1rem',
              desktop: '2rem',
            },
            lineHeight: {
              xs: '1.5rem',
              tablet: '1.75rem',
              desktop: '2.15rem',
            },
          }}
        >
          {CS_EDUCATION_DESCRIPTION}
        </Typography>
        <Box
          sx={{
            display: 'flex',
            flex: '1',
            alignItems: 'flex-end',
            paddingBottom: {
              tablet: '1.5rem',
              desktop: '2rem',
            },
            marginTop: {
              xs: '1.5rem',
              tablet: '0',
            },
          }}
        >
          <a
            href={CS_EDUCATION_LINK}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: theme.colors.common.black,
            }}
          >
            <Typography
              variant="body1"
              sx={{
                fontSize: {
                  tablet: '0.875rem',
                  desktop: '1rem',
                },
                fontWeight: '500',
              }}
            >
              CS 교육 세션 영상 링크
            </Typography>
          </a>
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
            width: {
              xs: '18rem',
              tablet: '25rem',
              desktop: '40rem',
            },
            height: 'auto',
            objectFit: 'contain',
            marginTop: {
              xs: '2rem',
              tablet: '0',
            },
          }}
        />
        <Box
          component="img"
          src={CSPPTImages[selectedSlideIndex]}
          sx={{
            position: 'absolute',
            width: {
              xs: '13.5rem',
              tablet: '18.75rem',
              desktop: '30rem',
            },
            top: {
              xs: '2.625rem',
              tablet: '0.825rem',
              desktop: '1.375rem',
            },
            left: {
              xs: '2.25rem',
              tablet: '3.125rem',
              desktop: '5rem',
            },
            height: 'auto',
            objectFit: 'contain',
          }}
        />
      </Box>
    </Box>
  );
};

export default CSThirdSectionMain;
