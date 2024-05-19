import React from 'react';
import styled from 'styled-components';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import title from '@assets/home_section2_title.svg';
import it from '@assets/home_it_card.svg';
import cs from '@assets/home_cs_card.svg';
import networking from '@assets/home_networking_card.svg';
import hackerthon from '@assets/home_hackerthon_card.svg';
import devtalk from '@assets/home_devtalk_card.svg';
import demoday from '@assets/home_demoday_card.svg';

//
//
//

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
        <img src={title} />
        <p>코테이토의 활동을 소개할게요!</p>
      </Title>
      <Contents {...settings}>
        <div style={{ width: '300px' }} />
        <StyledDiv>
          <img src={it} alt="IT이슈" />
        </StyledDiv>
        <StyledDiv>
          <img src={cs} alt="CS교육" />
        </StyledDiv>
        <StyledDiv>
          <img src={networking} alt="네트워킹" />
        </StyledDiv>
        <StyledDiv>
          <img src={hackerthon} alt="해커톤" />
        </StyledDiv>
        <StyledDiv>
          <img src={devtalk} alt="데브토크" />
        </StyledDiv>
        <StyledDiv>
          <img src={demoday} alt="데모데이" />
        </StyledDiv>
      </Contents>
    </Wrapper>
  );
};

export default HomeSecondSection;

//
//
//

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
