import React from 'react';
import AboutLayout from './AboutLayout';
import AboutStatus from './AboutStatus';
import AboutStructureDiagram from './AboutStructureDiagram';
import analyticsIcon from '@assets/analytics_icon.svg';
import userCrownIcon from '@assets/user_crown_icon.svg';
import usersIcon from '@assets/users_icon.svg';
import AboutActivity from './AboutActivity';

//
//
//

const About = () => {
  return (
    <div>
      {/* 맨 위 홈 자리 */}
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
    </div>
  );
};

export default About;
