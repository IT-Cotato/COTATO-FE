import React, { useCallback } from 'react';
import { styled } from 'styled-components';
import { ReactComponent as Insta } from '@/assets/footer_insta.svg';
import { ReactComponent as Youtube } from '@/assets/footer_youtube.svg';
import { ReactComponent as Github } from '@/assets/footer_github.svg';
import { ReactComponent as Cafe } from '@/assets/footer_cafe.svg';

//
//
//

const FooterWrapper = styled.footer`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 6.25rem 6.25rem 3.125rem 6.25rem;
  gap: 6.25rem;
`;

const SnsWrapper = styled.div`
  display: flex;
  gap: 2.4rem;
`;

const DescriptionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.6rem;
`;

const MainText = styled.span`
  font-family: Ycomputer;
  color: ${({ theme }) => theme.colors.gray80};

  &.md {
    font-size: ${({ theme }) => theme.fontSize.md};
  }
  &.lg {
    font-size: ${({ theme }) => theme.fontSize.lg};
  }
`;

const SubTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  > p {
    font-family: Ycomputer;
    font-size: ${({ theme }) => theme.fontSize.md};
    color: ${({ theme }) => theme.colors.gray80};
    line-height: 180%;

    > a {
      color: ${({ theme }) => theme.colors.gray80};
    }
  }
`;

//
//
//

const Footer = () => {
  const renderSns = useCallback(
    () => (
      <SnsWrapper>
        <Insta
          onClick={() => open('https://www.instagram.com/cotato_official_?igsh=aDh2ZGZqazBpMmtp')}
        />
        <Youtube onClick={() => open('https://www.youtube.com/@ITCotato')} />
        <Github onClick={() => open('https://github.com/IT-Cotato')} />
        <Cafe onClick={() => open('https://cafe.naver.com/cotato')} />
      </SnsWrapper>
    ),
    [],
  );

  const renderDescription = useCallback(
    () => (
      <DescriptionWrapper>
        <p>
          <MainText className="lg">Cotato</MainText>
          &nbsp; &nbsp;
          <MainText className="md">코테이토</MainText>
        </p>
        <SubTextContainer>
          <p>
            E-mail. <a href="mailto:itcotato@gmail.com">itcotato@gmail.com</a>
          </p>
          <p>© Cotato. 2024 All rights reserved. | 대학생 IT 연합 동아리 코테이토</p>
          <p>Cotato 2024 HomePage v1.0</p>
        </SubTextContainer>
      </DescriptionWrapper>
    ),
    [],
  );

  return (
    <FooterWrapper>
      {renderSns()}
      {renderDescription()}
    </FooterWrapper>
  );
};

export default Footer;
