import React from 'react';
import AboutLayout from './AboutLayout';
import AboutStatus from './AboutStatus';
import exampleIcon from '@assets/sign_up_user_icon.svg';
import analyticsIcon from '@assets/analytics_icon.svg';

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
      <AboutLayout title="운영진 구조도" dividerIcon={exampleIcon} content={<></>} />
    </div>
  );
};

export default About;
