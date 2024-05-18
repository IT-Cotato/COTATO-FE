import React from 'react';
import styled from 'styled-components';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const HomeSecondSection = () => {
  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    autoplay: true,
    speed: 4000,
    autoplaySpeed: 4000,
    cssEase: 'linear',
    pauseOnHover: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    draggable: false,
    initialSlide: 1,
    variableWidth: true,
  };

  return (
    <Wrapper>
      <Title>
        <img src="https://raw.githubusercontent.com/MinJaeSon/assets/852045fa8f2ebd6b2f4515cdd50e68aa89c3d665/section2_title.svg" />
        <p>코테이토의 활동을 소개할게요!</p>
      </Title>
      <Contents {...settings}>
        <div style={{ width: '300px' }} />
        <StyledDiv>
          <img src="https://raw.githubusercontent.com/MinJaeSon/assets/3cb6d33e5755fdbe411f66ef6081a8d857df8b64/IT.svg" />
        </StyledDiv>
        <StyledDiv>
          <img src="https://raw.githubusercontent.com/MinJaeSon/assets/3cb6d33e5755fdbe411f66ef6081a8d857df8b64/CS.svg" />
        </StyledDiv>
        <StyledDiv>
          <img src="https://raw.githubusercontent.com/MinJaeSon/assets/3cb6d33e5755fdbe411f66ef6081a8d857df8b64/Networking.svg" />
        </StyledDiv>
        <StyledDiv>
          <img src="https://raw.githubusercontent.com/MinJaeSon/assets/3cb6d33e5755fdbe411f66ef6081a8d857df8b64/Hackertone.svg" />
        </StyledDiv>
        <StyledDiv>
          <img src="https://raw.githubusercontent.com/MinJaeSon/assets/3cb6d33e5755fdbe411f66ef6081a8d857df8b64/Devtalk.svg" />
        </StyledDiv>
        <StyledDiv>
          <img src="https://raw.githubusercontent.com/MinJaeSon/assets/3cb6d33e5755fdbe411f66ef6081a8d857df8b64/Demoday.svg" />
        </StyledDiv>
      </Contents>
    </Wrapper>
  );
};

export default HomeSecondSection;

const Wrapper = styled.section`
  width: 100%;
  margin: 0 auto;
  box-sizing: border-box;
  .slick-slider {
    height: 400px;
    margin-left: 200px;
  }
`;

const Title = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 100px;
  img {
    width: 200px;
    height: 40px;
  }
  p {
    margin-top: 20px;
    margin-bottom: 60px;
    font-size: ${(props) => props.theme.fontSize.xl};
    font-weight: 700;
    color: #333;
  }
`;

const Contents = styled(Slider)`
  .slick-slide {
    transition: transform 4000ms ease-in-out;
    transition-delay: 4000ms;
  }
  /* .slick-slide:nth-child(6n + 2) {
    margin-right: 500px;
  } */
`;

const StyledDiv = styled.div`
  width: 300px;
  img {
    width: 280px;
  }
`;
