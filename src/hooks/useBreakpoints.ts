import { useMediaQuery } from '@mui/material';
import { device } from '@theme/media';

//
//
//

export const useBreakpoints = () => {
  const isMobileOrSmaller = useMediaQuery(`(max-width:${device.mobile})`);
  const isLandScapeOrSmaller = useMediaQuery(`(max-width:${device.landscape})`);
  const isTabletOrSmaller = useMediaQuery(`(max-width:${device.tablet})`);
  const isLaptopOrSmaller = useMediaQuery(`(max-width:${device.laptop})`);
  const isDesktopOrSmaller = useMediaQuery(`(max-width:${device.desktop})`);
  const isWideScreenOrSmaller = useMediaQuery(`(max-width:${device.wide})`);

  return {
    isMobileOrSmaller,
    isLandScapeOrSmaller,
    isTabletOrSmaller,
    isLaptopOrSmaller,
    isDesktopOrSmaller,
    isWideScreenOrSmaller,
  };
};
