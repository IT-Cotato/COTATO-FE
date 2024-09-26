import React from 'react';
import AboutLayout from './AboutLayout';
import AboutStatus from './AboutStatus';
import AboutStructureDiagram from './AboutStructureDiagram';
import AboutActivity from './AboutActivity';
import AboutReview from './AboutReview';
import AboutMain from './AboutMain';
import analyticsIcon from '@assets/analytics_icon.svg';
import userCrownIcon from '@assets/user_crown_icon.svg';
import usersIcon from '@assets/users_icon.svg';
import quoteIcon from '@assets/quote_icon.svg';
import { useBreakpoints } from '@/hooks/useBreakpoints';

//
//
//

const About = () => {
  const { isLaptopOrSmaller } = useBreakpoints();

  return (
    <div>
      <AboutMain />
      <AboutLayout
        title="성장추구형 코테이토"
        dividerIcon={analyticsIcon}
        content={<AboutStatus />}
      />
      <AboutLayout
        title="운영진 구조도"
        dividerIcon={userCrownIcon}
        content={<AboutStructureDiagram />}
      />
      <AboutLayout title="감자들의 활동" dividerIcon={usersIcon} content={<AboutActivity />} />
      {!isLaptopOrSmaller && (
        <AboutLayout title="찐 감자들의 후기" dividerIcon={quoteIcon} content={<AboutReview />} />
      )}
    </div>
  );
};

export default About;
