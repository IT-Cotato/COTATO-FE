import React from 'react';
import styled from 'styled-components';
import image from '@assets/section3.svg';

const HomeThirdSection = () => {
  return (
    <Wrapper>
      <img src={image} />
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
    width: 700px;
  }
`;
