import { FormControlLabel, Switch, switchClasses } from '@mui/material';
import switchBaseClasses from '@mui/material/internal/switchBaseClasses';
import React from 'react';
import { useTheme } from 'styled-components';

//
//
//

interface CotatoThemeToggleSwitchProps {
  width?: number;
  height?: number;
  checked?: boolean;
  label?: React.ReactNode;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

//
//
//

const CotatoThemeToggleSwitch: React.FC<CotatoThemeToggleSwitchProps> = ({
  width = 68,
  height = 24,
  checked,
  label,
  onChange,
}: CotatoThemeToggleSwitchProps) => {
  const styledTheme = useTheme();

  /**
   *
   */
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (typeof onChange === 'function') {
      onChange(event);
    }
  };

  //
  //
  //

  return (
    <FormControlLabel
      control={
        <Switch
          aria-label="theme"
          sx={{
            width: width,
            [`& .${switchBaseClasses.root}`]: {
              color: styledTheme.colors.gray60,
            },
            [`& .${switchClasses.track}`]: {
              backgroundColor: styledTheme.colors.gray30,
              opacity: 1,
              height: height,
              borderRadius: height / 2,
            },
            [`& .${switchClasses.colorPrimary}`]: {
              '&.Mui-checked': {
                color: styledTheme.colors.common.white,
              },
              [`&.${switchClasses.checked} + .${switchClasses.track}`]: {
                backgroundColor: styledTheme.colors.primary100_2,
                opacity: 1,
              },
            },
            [`& .${switchClasses.thumb}`]: {
              width: height - 4,
              height: height - 4,
              boxShadow: 'none',
              color: styledTheme.colors.common.white,
            },
            [`& .${switchClasses.switchBase}`]: {
              padding: 0,
              margin: 1.75,
            },
          }}
          checked={checked}
          onChange={handleChange}
        />
      }
      label={label}
    />
  );
};

export default CotatoThemeToggleSwitch;
