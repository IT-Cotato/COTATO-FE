import { Box } from '@mui/material';
import React from 'react';
import { useIsInCSThirdSection } from '@/zustand-stores/useInCSThirdSection';
import CSThirdSectionMain from './CSThirdSectionMain';
import CSThirdSectionSlide from './CSThirdSectionSlide';

//
//
//

const OBSERVER_THRESHOLD = 0.2;

//
//
//

const CSThirdSection = () => {
  const thirdSectionRef = React.useRef<HTMLDivElement>(null);

  const [selectedSlideIndex, setSelectedSlideIndex] = React.useState(0);

  const { setIsInCSThirdSection } = useIsInCSThirdSection();

  /**
   *
   */
  const handleSlideChange = (index: number) => {
    setSelectedSlideIndex(index);
  };

  //
  //
  //
  React.useEffect(() => {
    const observerIn = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInCSThirdSection(true);
        }
      },
      {
        threshold: OBSERVER_THRESHOLD,
      },
    );

    const observerOut = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          setIsInCSThirdSection(false);
        }
      },
      {
        threshold: 1 - OBSERVER_THRESHOLD,
      },
    );

    if (thirdSectionRef.current) {
      observerIn.observe(thirdSectionRef.current);
      observerOut.observe(thirdSectionRef.current);
    }

    return () => {
      if (thirdSectionRef.current) {
        observerIn.unobserve(thirdSectionRef.current);
        observerOut.unobserve(thirdSectionRef.current);
      }
    };
  }, [thirdSectionRef]);

  return (
    <Box
      ref={thirdSectionRef}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        width: '100%',
        height: '100%',
        padding: {
          xs: '0 2.5rem',
          labtop: '2rem 4rem',
          desktop: '4rem 6rem',
        },
        overflow: 'scroll',

        '&::-webkit-scrollbar': {
          display: 'none',
        },
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
      }}
    >
      <CSThirdSectionMain selectedSlideIndex={selectedSlideIndex} />
      <CSThirdSectionSlide onChangeSlide={handleSlideChange} />
    </Box>
  );
};

export default CSThirdSection;
