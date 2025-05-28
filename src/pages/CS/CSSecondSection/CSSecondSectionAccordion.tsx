import React from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  IconButton,
} from '@mui/material';
import { useTheme } from 'styled-components';
import CotatoIcon from '@components/CotatoIcon';

//
//
//

interface CSSecondSectionAccordionProps {
  title: string;
  description: string;
  caption?: string;
}

//
//
//

const CSSecondSectionAccordion: React.FC<CSSecondSectionAccordionProps> = ({
  title,
  description,
  caption,
}) => {
  const [expanded, setExpanded] = React.useState(false);

  const theme = useTheme();

  /**
   *
   */
  const handleChange = (_: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded);
  };

  return (
    <Accordion
      expanded={expanded}
      onChange={handleChange}
      sx={{
        boxShadow: 'none',
        border: `1px solid ${theme.colors.primary80}`,
        borderRadius: '0.25rem',
        backgroundColor: theme.colors.common.white,

        '&.MuiAccordion-root::before': {
          display: 'none',
        },
      }}
    >
      <AccordionSummary
        expandIcon={
          <IconButton size="small">
            <CotatoIcon
              icon={expanded ? 'chevron-up-solid' : 'chevron-down-solid'}
              size="1rem"
              color={(t) => t.colors.gray60}
            />
          </IconButton>
        }
        sx={{
          padding: '1rem 1.25rem',
          minHeight: 'auto',
          '&.Mui-expanded': { minHeight: 'auto' },
          '& .MuiAccordionSummary-content': {
            margin: 0,
            alignItems: 'center',
            '&.Mui-expanded': { margin: 0 },
          },
        }}
      >
        <Typography variant="h6">{title}</Typography>
      </AccordionSummary>

      <AccordionDetails
        sx={{
          padding: '0.5rem 1rem 1rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem',
        }}
      >
        <Typography variant="body1">{description}</Typography>
        {caption && (
          <Typography variant="body2" sx={{ color: theme.colors.gray50 }}>
            {caption}
          </Typography>
        )}
      </AccordionDetails>
    </Accordion>
  );
};

export default CSSecondSectionAccordion;
