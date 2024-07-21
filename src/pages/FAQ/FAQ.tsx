import { Box, Stack, useMediaQuery } from '@mui/material';
import React from 'react';
import styled, { useTheme } from 'styled-components';
import FAQAccordion from './FAQAccordion';
import { FAQList } from './constants';
import FAQFloatingNav from './FAQFloatingNav';
import { device, media } from '@theme/media';
import { useLocation } from 'react-router-dom';

//
//
//

const DEFAULT_SCROLL_OFFSET = 100;

//
//
//

const FAQ = () => {
  const theme = useTheme();
  const isLapTopOrSmaller = useMediaQuery(`(max-width:${device.laptop})`);
  const location = useLocation();
  const applyFAQRefs = React.useRef<(HTMLDivElement | null)[]>([]);
  const activityFAQRefs = React.useRef<(HTMLDivElement | null)[]>([]);

  /**
   *
   */
  const renderApplyFAQ = () => {
    return (
      <Stack gap="3rem" alignItems="center">
        <StyledTitleBox
          sx={{
            backgroundColor: theme.colors.primary100_2,
          }}
        >
          지원관련
        </StyledTitleBox>
        <Stack width="100%" justifyContent="center" alignItems="center">
          <StyledStack gap="1.25rem">
            {FAQList.apply.map((faq, idx) => (
              <div
                key={`faq-apply-${idx}`}
                id={faq.hash}
                ref={(ref) => (applyFAQRefs.current[idx] = ref)}
              >
                <FAQAccordion
                  {...faq}
                  index={idx}
                  expanded={location.hash === `#${faq.hash}`}
                  onClick={handleSummaryClick}
                />
              </div>
            ))}
          </StyledStack>
        </Stack>
      </Stack>
    );
  };

  /**
   *
   */
  const renderActivityFAQ = () => {
    return (
      <Stack gap="3rem" alignItems="center">
        <StyledTitleBox
          sx={{
            backgroundColor: theme.colors.sub2['60'],
            color: theme.colors.common.white,
          }}
        >
          활동관련
        </StyledTitleBox>
        <Stack width="100%" justifyContent="center" alignItems="center">
          <StyledStack gap="1.25rem">
            {FAQList.activity.map((faq, idx) => (
              <div
                key={`faq-activity-${idx}`}
                id={faq.hash}
                ref={(ref) => (activityFAQRefs.current[idx] = ref)}
              >
                <FAQAccordion
                  {...faq}
                  index={idx}
                  expanded={location.hash === `#${faq.hash}`}
                  onClick={handleSummaryClick}
                />
              </div>
            ))}
          </StyledStack>
        </Stack>
      </Stack>
    );
  };

  /**
   *
   */
  const renderFloatingNav = () => {
    if (isLapTopOrSmaller) {
      return null;
    }

    return (
      <Stack position="fixed" right="6rem" top="6rem" gap="2rem">
        <FAQFloatingNav
          title="지원관련"
          summaries={FAQList.apply.map((faq) => faq.summary)}
          hashes={FAQList.apply.map((faq) => faq.hash)}
          handleNavClick={handleSummaryClick}
        />

        <FAQFloatingNav
          title="활동관련"
          summaries={FAQList.activity.map((faq) => faq.summary)}
          hashes={FAQList.activity.map((faq) => faq.hash)}
          handleNavClick={handleSummaryClick}
        />
      </Stack>
    );
  };

  /**
   *
   */
  const handleSummaryClick = (hash: string) => {
    window.history.pushState(null, '', `#${hash}`);

    const element =
      applyFAQRefs.current.find((ref) => ref?.id === hash) ||
      activityFAQRefs.current.find((ref) => ref?.id === hash);

    if (element) {
      window.scrollTo({
        top: element.offsetTop - DEFAULT_SCROLL_OFFSET,
        behavior: 'smooth',
      });
    }
  };

  //
  // Scroll to hash if exists
  //
  React.useEffect(() => {
    if (location.hash) {
      const hash = location.hash.replace('#', '');
      const element =
        applyFAQRefs.current.find((ref) => ref?.id === hash) ??
        activityFAQRefs.current.find((ref) => ref?.id === hash);
      if (element) {
        window.scrollTo({
          top: element.offsetTop - DEFAULT_SCROLL_OFFSET,
          behavior: 'smooth',
        });
      }
    }
  }, []);

  //
  //
  //

  return (
    <Box display="flex" padding="3rem">
      <Stack width="100%" alignItems="center" gap="5rem">
        {renderApplyFAQ()}
        {renderActivityFAQ()}
      </Stack>
      {renderFloatingNav()}
    </Box>
  );
};

export default FAQ;

//
//
//

const StyledTitleBox = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 14rem;
  border-radius: 1.8rem;
  padding: 0.5rem;
  color: ${({ theme }) => theme.colors.common.black};
  font-size: 2.25rem;
`;

const StyledStack = styled(Stack)`
  width: 30rem;

  ${media.tablet`
    width: 25rem;
  `}

  ${media.mobile`
    width: 15rem;
  `}
`;
