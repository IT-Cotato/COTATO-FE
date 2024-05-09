import React from 'react';
import styled from 'styled-components';

const HomeThirdSection = () => {
  return (
    <Wrapper>
      <img src="https://raw.githubusercontent.com/MinJaeSon/assets/e46458def78fa241b52db612b70760c78fd62bc3/section3.svg" />
    </Wrapper>
  );
};

export default HomeThirdSection;

const Wrapper = styled.section`
  width: 100%;
  margin-top: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 1000px;
  }
`;
