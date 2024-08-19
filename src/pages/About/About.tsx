import React from 'react';
import AboutLayout from './AboutLayout';
import exampleIcon from '@assets/sign_up_user_icon.svg';

//
//
//

const About = () => {
  return (
    <div>
      {/* 맨 위 홈 자리 */}
      <AboutLayout title="운영진 구조도" dividerIcon={exampleIcon} content={<div>ㅎㅇㅎㅇ</div>} />
    </div>
  );
};

export default About;
