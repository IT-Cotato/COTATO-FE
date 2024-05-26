import React from 'react';
import styled from 'styled-components';
import TeamMember from './SvgComponent/TeamMemberSvgComponent';

//
//
//

const HomeThirdSection = () => {
  return (
    <Wrapper>
      <SvgDiv>
        <TeamMember />
      </SvgDiv>
    </Wrapper>
  );
};

export default HomeThirdSection;

//
//
//

const Wrapper = styled.section`
  width: 100%;
  height: 180vh;
  margin-top: 650px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const SvgDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  position: absolute;
  top: 0%;
  left: 50%;
  transform: translate(-50%, 0);
  width: 900px;
  height: 180vh;
`;
