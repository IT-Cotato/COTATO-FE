import { Card } from '@mui/material';
import React from 'react';
import { useTheme } from 'styled-components';

//
//
//

interface MypageRecruitmentManagementContentManageCardProps {
  children: React.ReactNode;
}

//
//
//

const MypageRecruitmentManagementContentManageCard = ({
  children,
}: MypageRecruitmentManagementContentManageCardProps) => {
  const theme = useTheme();

  return (
    <Card
      elevation={0}
      sx={{
        display: 'flex',
        padding: '2.25rem',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '2.25rem',
        flex: '1 1 0',
        borderRadius: '0.5rem',
        border: `2px solid ${theme.colors.gray30}`,
        backgroundColor: theme.colors.common.real_white,
      }}
    >
      {children}
    </Card>
  );
};

//
//
//

export default MypageRecruitmentManagementContentManageCard;
