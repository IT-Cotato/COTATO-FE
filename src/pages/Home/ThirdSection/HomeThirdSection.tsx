import React from 'react';
import styled from 'styled-components';
import { ReactComponent as ClubMembers } from '@assets/home_section3.svg';

//
//
//

const HomeThirdSection = () => {
  return (
    <Wrapper>
      <ClubMembers style={{ width: '700px' }} />
    </Wrapper>
  );
};

export default HomeThirdSection;

//
//
//

const Wrapper = styled.section`
  width: 100%;
  margin-top: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
