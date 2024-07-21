import React from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Stack,
  Typography,
  accordionDetailsClasses,
  accordionSummaryClasses,
  accordionClasses,
  useMediaQuery,
} from '@mui/material';
import styled from 'styled-components';
import { device } from '@theme/media';
import {
  CotatoCharacterImageMapType,
  convertCotatoCharcterImage,
} from '@utils/convertCotatoCharcterImage';

//
//
//

interface FAQAccordionProps {
  question: string;
  answer: string;
  summary: string;
  hash: string;
  image: CotatoCharacterImageMapType;
  expanded: boolean;
  index?: number;
  onClick?: (hash: string) => void;
}

//
//
//

const FAQAccordion: React.FC<FAQAccordionProps> = ({
  question,
  answer,
  hash,
  image,
  expanded,
  index = 0,
  onClick,
}) => {
  const isMobileOrSmaller = useMediaQuery(`(max-width:${device.mobile})`);

  /**
   *
   */
  const renderAccordionSummary = () => {
    return (
      <StyledAccordionSummary
        expandIcon={<span className="material-symbols-outlined">chevron_right</span>}
        onClick={handleAccordionClick}
        sx={{
          padding: { xs: '1rem 2rem', md: '1.5rem 2rem' },
        }}
      >
        <QuestionIndex>Q{index + 1}</QuestionIndex>
        <Typography
          fontFamily="Pretendard"
          fontWeight="bold"
          sx={{
            fontSize: { xs: '0.875rem', md: '1rem' },
          }}
        >
          {question}
        </Typography>
      </StyledAccordionSummary>
    );
  };

  /**
   *
   */
  const renderCharacter = () => {
    if (isMobileOrSmaller) {
      return null;
    }

    return (
      <Stack width="6rem" padding="1rem" justifyContent="center" alignItems="flex-end">
        <img src={convertCotatoCharcterImage(image)} width={50} height={50} />
      </Stack>
    );
  };

  /**
   *
   */
  const renderAccordionDetails = () => {
    return (
      <StyledAccordionDetails>
        <AnswerIndex>A{index + 1}</AnswerIndex>
        <Stack width="25rem" justifyContent="center">
          <StyledTypography
            dangerouslySetInnerHTML={{ __html: answer }}
            lineHeight="1.75rem"
            fontFamily="Pretendard"
            fontSize={{ xs: '0.875rem', md: '1rem' }}
            sx={{
              wordBreak: 'keep-all',
            }}
          />
        </Stack>
        {renderCharacter()}
      </StyledAccordionDetails>
    );
  };

  /**
   *
   */
  const handleAccordionClick = () => {
    if (typeof onClick !== 'function') return;

    onClick(hash);
  };

  //
  //
  //

  return (
    <StyledAccordion defaultExpanded={expanded}>
      {renderAccordionSummary()}
      {renderAccordionDetails()}
    </StyledAccordion>
  );
};

export default FAQAccordion;

//
//
//

const StyledAccordion = styled(Accordion)(() => ({
  [`&.${accordionClasses.root}`]: {
    background: 'none',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    boxShadow: 'none',
  },
}));

const StyledAccordionSummary = styled(AccordionSummary)(({ theme }) => ({
  [`&.${accordionSummaryClasses.root}`]: {
    borderRadius: '0.5rem',
    border: `2px solid ${theme.colors.primary100_2}`,
    backgroundColor: theme.colors.common.white,
    color: theme.colors.common.black,
  },

  [`& .${accordionSummaryClasses.expandIconWrapper}`]: {
    color: theme.colors.secondary60,
    '&.Mui-expanded': {
      transform: 'rotate(90deg)',
    },
  },
}));

const StyledAccordionDetails = styled(AccordionDetails)(({ theme }) => ({
  [`&.${accordionDetailsClasses.root}`]: {
    display: 'flex',
    padding: '1rem 2rem',
    border: `2px solid ${theme.colors.sub2['20']}`,
    borderRadius: '0.5rem',
    color: theme.colors.common.black,
    backgroundColor: theme.colors.common.white,
  },
}));

const QuestionIndex = styled.div`
  position: absolute;
  left: 0.5rem;
  top: -0.5rem;
  width: 2rem;
  height: 1rem;
  text-align: center;
  background-color: ${({ theme }) => theme.colors.common.white};
  color: ${({ theme }) => theme.colors.primary100_2};
`;

const AnswerIndex = styled.div`
  position: relative;
  left: -1.25rem;
  top: -1.5rem;
  width: 2rem;
  height: 1rem;
  text-align: center;
  background-color: ${({ theme }) => theme.colors.common.white};
  color: ${({ theme }) => theme.colors.sub2['20']};
`;

const StyledTypography = styled(Typography)`
  * {
    font-family: Pretendard;
    & + li {
      margin-top: 0.5rem;
    }
  }
  ul {
    padding-left: 1rem;
  }
`;
