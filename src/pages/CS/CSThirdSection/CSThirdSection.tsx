import { Box } from '@mui/material';
import React from 'react';
import { useIsInCSThirdSection } from '@/zustand-stores/useInCSThirdSection';
import CSThirdSectionMain from './CSThirdSectionMain';
import CSThirdSectionSlide from './CSThirdSectionSlide';

//
//
//

const OBSERVER_THRESHOLD = 0.5;

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
    if (!thirdSectionRef.current) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        console.log(entry);
        const inView = entry.intersectionRatio >= OBSERVER_THRESHOLD;
        setIsInCSThirdSection(inView);
      },
      {
        threshold: [OBSERVER_THRESHOLD],
      },
    );

    observer.observe(thirdSectionRef.current);
    return () => {
      observer.disconnect();
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
