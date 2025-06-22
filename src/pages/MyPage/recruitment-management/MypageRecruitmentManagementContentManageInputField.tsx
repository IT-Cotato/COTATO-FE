import React from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { useTheme } from 'styled-components';

//
//
//

interface MypageRecruitmentManagementContentManageInputFieldProps {
  label: string;
  description?: string;
  slot: React.ReactNode;
}

//
//
//

const MypageRecruitmentManagementContentManageInputField = ({
  label,
  description,
  slot,
}: MypageRecruitmentManagementContentManageInputFieldProps) => {
  const theme = useTheme();

  return (
    <Stack spacing="0.5rem" sx={{ width: '100%' }}>
      <Box sx={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
        <Typography variant="subtitle2">{label}</Typography>
        {description && (
          <Typography variant="body1" color={theme.colors.gray60}>
            ({description})
          </Typography>
        )}
      </Box>
      {slot}
    </Stack>
  );
};

//
//
//

export default MypageRecruitmentManagementContentManageInputField;
