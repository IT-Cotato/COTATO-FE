import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import api from '@/api/api';
import CotatoPanel, { SizeStateEnum } from '@components/CotatoPanel';
import panelText from '@assets/find_id_panel_text.svg';
import CotatoButton from '@components/CotatoButton';
import CotatoIcon from '@components/CotatoIcon';
import { media } from '@theme/media';
import FindIdResult from './FindIdResult';

//
//
//

const TEL_REGEX = /^010\d{4}\d{4}$/;

//
//
//

const FindId = () => {
  const [name, setName] = useState('');
  const [tel, setTel] = useState('');
  const [isName, setIsName] = useState(false);
  const [isTel, setIsTel] = useState(false);
  const [nameErrMsg, setNameErrMsg] = useState('');
  const [telErrMsg, setTelErrMsg] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [id, setId] = useState('');

  /**
   *
   */
  const handleNameChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setName(e.target.value);
      if (!e.target.value) {
        setIsName(false);
        setNameErrMsg('필수 입력 항목입니다!');
      } else {
        setIsName(true);
        setNameErrMsg('');
      }
    },
    [name],
  );

  /**
   *
   */
  const handleTelChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const telCurrent = e.target.value;
      setTel(telCurrent);
      if (!telCurrent) {
        setIsTel(false);
        setTelErrMsg('필수 입력 항목입니다!');
      } else if (!TEL_REGEX.test(telCurrent)) {
        setIsTel(false);
        setTelErrMsg('올바른 전화번호 형식이 아닙니다.');
      } else {
        setIsTel(true);
        setTelErrMsg('');
      }
    },
    [tel],
  );

  /**
   *
   */
  const checkInputValidation = () => {
    if (!name || !tel) {
      alert('필수 입력 항목을 확인해주세요.');
      return;
    }

    if (!isName || !isTel) {
      alert('입력한 정보를 확인해주세요.');
      return;
    }

    return true;
  };

  /**
   *
   */
  const findId = () => {
    if (!checkInputValidation()) {
      return;
    }

    api
      .get('/v1/api/auth/email', {
        params: {
          name: name,
          phone: tel,
        },
      })
      .then((res) => {
        setId(res.data.email);
        setShowResult(true);
      })
      .catch(() => {
        alert('일치하는 정보가 없습니다.');
      });
  };

  /**
   *
   */
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    findId();
  };

  /**
   *
   */
  const renderErrorMessage = (errMsg: string) => {
    return (
      <Error>
        <CotatoIcon
          icon="times-circle"
          size="1.25rem"
          color={(theme) => theme.colors.secondary80}
        />
        <span>{errMsg}</span>
      </Error>
    );
  };

  /**
   *
   */
  const renderFindId = () => {
    if (showResult) {
      return;
    }

    return (
      <Form onSubmit={handleSubmit}>
        <InputDiv>
          <Label>
            <span>이름</span>
            <InputBox>
              <CotatoIcon icon="user-solid" size="1.25rem" color={(theme) => theme.colors.gray60} />
              <input
                type="text"
                id="id"
                name="id"
                placeholder="이름을 입력해주세요."
                onChange={handleNameChange}
              />
            </InputBox>
            {nameErrMsg && renderErrorMessage(nameErrMsg)}
          </Label>
          <Label>
            <span>전화번호</span>
            <InputBox>
              <CotatoIcon
                icon="phone-ringing-low-solid"
                size="1.25rem"
                color={(theme) => theme.colors.gray60}
              />
              <input
                type="tel"
                id="tel"
                name="tel"
                placeholder="‘-’ 를 제외한 숫자만 입력해주세요."
                onChange={handleTelChange}
              />
            </InputBox>
            {telErrMsg && renderErrorMessage(telErrMsg)}
          </Label>
        </InputDiv>
        <CotatoButton isEnabled={true} buttonStyle="line" text="아이디 찾기" />
      </Form>
    );
  };

  /**
   *
   */
  const renderFindIdResult = () => {
    if (!showResult) {
      return;
    }

    return <FindIdResult userName={name} userId={id} />;
  };

  return (
    <Wrapper>
      <CotatoPanel size={SizeStateEnum.LONG} textImgSrc={panelText} />
      {renderFindId()}
      {renderFindIdResult()}
    </Wrapper>
  );
};

//
//
//

const Wrapper = styled.div`
  padding: 6rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  ${media.mobile`
    padding: 8rem 3rem;
  `}
`;

const Form = styled.form`
  width: 40rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 4.5rem;
  gap: 2.25rem;

  ${media.tablet`
    width: 30rem;
    `}
  ${media.landscape`
    width: 20rem;
    `}
`;

const InputDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

const Label = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.5rem;
  span {
    color: ${({ theme }) => theme.colors.common.black};
    font-size: ${({ theme }) => theme.fontSize.md};
    margin: 0;
  }
`;

const InputBox = styled.div`
  width: 100%;
  height: 3.25rem;
  gap: 0.6rem;
  border-radius: 0.5rem;
  border: 2px solid ${({ theme }) => theme.colors.primary100_1};
  background: ${({ theme }) => theme.colors.common.white};
  display: flex;
  align-items: center;
  padding: 0 1.25rem;
  input {
    border: none;
    width: 100%;
    &:focus {
      outline: none;
    }
    caret-color: ${({ theme }) => theme.colors.primary100_1};
    caret-shape: bar;
    background-color: ${({ theme }) => theme.colors.common.white};
    color: ${({ theme }) => theme.colors.gray60};
    font-size: ${({ theme }) => theme.fontSize.sm};
    font-family: 'Pretendard';
  }
`;

const Error = styled.div`
  display: flex;
  align-items: center;
  margin: 0;
  padding-left: 0.75rem;
  gap: 0.35rem;
  span {
    font-size: ${({ theme }) => theme.fontSize.sm};
    font-weight: 500;
    color: ${({ theme }) => theme.colors.secondary80};
  }

  ${media.mobile`
    img {
      width: 1rem;
    }
    span {
      font-size: 0.725rem;
    }
  `}
`;

export default FindId;
