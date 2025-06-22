import { Stack, Typography } from '@mui/material';
import React from 'react';
import { useTheme } from 'styled-components';

//
//
//

interface MypageRecruitmentManagementContentLayoutProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

//
//
//

const MypageRecruitmentManagementContentLayout = ({
  title,
  description,
  children,
}: MypageRecruitmentManagementContentLayoutProps) => {
  const theme = useTheme();

  return (
    <Stack spacing="1rem">
      <Stack spacing="0.5rem">
        <Typography
          variant="h6"
          sx={{
            color: theme.colors.common.black,
          }}
        >
          {title}
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: theme.colors.gray60,
          }}
        >
          {description}
        </Typography>
      </Stack>
      {children}
    </Stack>
  );
};

//
//
//

export default MypageRecruitmentManagementContentLayout;
