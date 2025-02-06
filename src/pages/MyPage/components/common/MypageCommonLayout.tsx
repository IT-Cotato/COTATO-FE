import CotatoPanel, { SizeStateType } from '@components/CotatoPanel';
import { Box, Stack } from '@mui/material';
import { Header } from '@pages/MyPage/contents/style';
import React from 'react';
import BackButton from './BackButton';

//
//
//

interface MypageCommonLayoutProps {
  slotProps: {
    header: {
      panelSize: SizeStateType;
      textImgSrc: string;
    };
  };
  Content: React.ReactNode;
}

//
//
//

const MypageCommonLayout = ({ slotProps, Content }: MypageCommonLayoutProps) => {
  //
  //
  //

  return (
    <Stack gap="5rem" width="100%">
      <Header>
        <BackButton />
        <Box width="100%" display="flex" justifyContent="center">
          <CotatoPanel size={slotProps.header.panelSize} textImgSrc={slotProps.header.textImgSrc} />
        </Box>
      </Header>
      {Content}
    </Stack>
  );
};

export default MypageCommonLayout;
