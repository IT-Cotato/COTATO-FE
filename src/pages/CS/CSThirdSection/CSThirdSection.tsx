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
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInCSThirdSection(entry.isIntersecting);
      },
      {
        threshold: OBSERVER_THRESHOLD,
      },
    );

    if (thirdSectionRef.current) {
      observer.observe(thirdSectionRef.current);
    }

    return () => {
      if (thirdSectionRef.current) {
        observer.unobserve(thirdSectionRef.current);
      }
    };
  }, []);

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
