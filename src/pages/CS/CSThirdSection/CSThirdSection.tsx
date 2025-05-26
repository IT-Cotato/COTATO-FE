import { Box } from '@mui/material';
import React from 'react';
import { useIsInCSThirdSection } from '@/zustand-stores/useInCSThirdSection';

//
//
//

const OBSERVER_THRESHOLD = 0.2;

//
//
//

const CSThirdSection = () => {
  const thirdSectionRef = React.useRef<HTMLDivElement>(null);

  const { setIsInCSThirdSection } = useIsInCSThirdSection();

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
        width: '100vw',
        height: '100vh',
      }}
    >
      asdf
    </Box>
  );
};

export default CSThirdSection;
