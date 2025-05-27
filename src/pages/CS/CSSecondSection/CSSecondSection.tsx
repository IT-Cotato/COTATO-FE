import { Box, Stack } from '@mui/material';
import React from 'react';
import CSSecondSectionHeader from './CSSecondSectionHeader';
import CSSecondSectionBox from './CSSecondSectionBox';

//
//
//

const CS_SECOND_SECTION_CURRICULUM_LIST = [
  {
    title: '01. 발표자 선정',
    description: '매 교육마다 발표자 선정',
    caption: '*모든 교육 팀원은 발표를 진행합니다',
  },
  {
    title: '02. CS 교육 주제',
    description: 'CS 전공지식 및 면접 대비에 적합한 주제 선정',
  },
  {
    title: '03. 공부 방식',
    description: '깃허브를 활용한 자료 관리 및 아카이빙',
  },
  {
    title: '04. 퀴즈 제작 및 검토',
    description: '코테이토 자체 사이트를 통한 퀴즈 제작 및 검토',
    caption: '*교육 팀원 전체가 참여합니다.',
  },
  {
    title: '05. 교육 진행',
    description: '세션에서 교육 및 문제풀이 진행',
  },
];

//
//
//

const CSSecondSection = () => {
  return (
    <Box
      sx={(theme) => ({
        width: '100%',
        height: '100%',
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: [theme.breakpoints.down('tablet') ? 'flex-start' : 'space-evenly'],
        padding: '2.5rem 0',

        '&::-webkit-scrollbar': {
          display: 'none',
        },
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
      })}
    >
      <CSSecondSectionHeader />
      <Stack
        spacing="1.25rem"
        sx={{
          marginTop: '2.5rem',
        }}
      >
        {CS_SECOND_SECTION_CURRICULUM_LIST.map(({ title, description, caption }) => (
          <CSSecondSectionBox
            key={title}
            title={title}
            description={description}
            caption={caption}
          />
        ))}
      </Stack>
    </Box>
  );
};

//
//
//

export default CSSecondSection;
