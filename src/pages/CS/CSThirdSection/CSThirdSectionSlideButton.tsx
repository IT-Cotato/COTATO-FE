import React from 'react';
import CotatoIcon from '@components/CotatoIcon';
import { Button } from '@mui/material';

//
//
//

interface CSThirdSectionSlideButtonProps {
  isEnd: boolean;
  direction: 'left' | 'right';
  onClick: () => void;
}

//
//
//

const CSThirdSectionSlideButton = ({
  isEnd,
  direction,
  onClick,
}: CSThirdSectionSlideButtonProps) => {
  if (isEnd) {
    return null;
  }

  return (
    <Button
      sx={{
        position: 'absolute',
        top: '50%',
        [direction]: '-1rem',
        transform: 'translateY(-50%)',
        padding: 0,
        minWidth: 0,
        color: 'transparent',
        '&:hover': {
          backgroundColor: 'transparent',
        },
      }}
    >
      <CotatoIcon icon={`angle-${direction}-solid`} onClick={onClick} />
    </Button>
  );
};

export default CSThirdSectionSlideButton;
