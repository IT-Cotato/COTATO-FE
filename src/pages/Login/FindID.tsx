import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import api from '@/api/api';

const FindID = () => {
  const [name, setName] = useState('');
  const [tel, setTel] = useState('');
  const [isName, setIsName] = useState(false);
  const [isTel, setIsTel] = useState(false);
  const [nameErrMsg, setNameErrMsg] = useState('');
  const [telErrMsg, setTelErrMsg] = useState('');
  const [apiErrMsg, setApiErrMsg] = useState('');

  const [showResult, setShowResult] = useState(false);
  const [email, setEmail] = useState('');

  const onChangeName = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setName(e.target.value);
      if (!e.target.value) {
        setIsName(false);
        setNameErrMsg('필수 입력사항입니다.');
      } else {
        setIsName(true);
        setNameErrMsg('');
      }
    },
    [name],
  );

  const onChangeTel = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const telRegex = /^01(?:0|1|[6-9])(?:\d{3}|\d{4})\d{4}$/;
      const telCurrent = e.target.value;
      setTel(telCurrent);
      if (!telCurrent) {
        setIsTel(false);
        setTelErrMsg('필수 입력사항입니다.');
      } else if (!telRegex.test(telCurrent)) {
        setIsTel(false);
        setTelErrMsg('올바른 전화번호 형식이 아닙니다.');
      } else {
        setIsTel(true);
        setTelErrMsg('');
        setApiErrMsg(''); // 전화번호 수정 시, apiErrMsg 초기화
      }
    },
    [tel],
  );

  const navigate = useNavigate();
  const navigateToLogin = () => {
    navigate('/signin');
  };

  const onSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      console.log(name, tel);
      api
        .get('/v1/api/auth/email', {
          params: {
            name: name,
            phone: tel,
          },
        })
        .then((res) => {
          console.log(res.data);
          if (res.data.email) {
            setEmail(res.data.email);
            setShowResult(true);
          }
        })
        .catch((err) => {
          console.log(err);
          console.log(isName, isTel);
          if (!isName || !isTel) {
            setNameErrMsg('필수 입력 사항입니다.');
            setTelErrMsg('필수 입력 사항입니다.');
          } else {
            setApiErrMsg('일치하는 정보가 없습니다.');
          }
        });
    },
    [name, tel],
  );

  return (
    <Wrapper>
      <h3>내 계정 ID 찾기</h3>
      <Container>
        {showResult ? (
          <ResultWrapper>
            <p>
              {name}님의 ID는 <span>{email}</span> 입니다.
            </p>
            <Button type="submit" onClick={navigateToLogin}>
              계속
            </Button>
          </ResultWrapper>
        ) : (
          <InputWrapper>
            <p>내 계정 ID를 찾으려면, 회원가입 시 입력한 전화번호를 기입해주세요.</p>
            <Form onSubmit={onSubmit}>
              <Label>
                <span>이름</span>
                <InputBox
                  type="text"
                  id="name"
                  name="name"
                  placeholder="이름을 기입해주세요."
                  value={name}
                  onChange={onChangeName}
                />
                {!isName && <Error>{nameErrMsg}</Error>}
              </Label>
              <Label>
                <span>전화번호</span>
                <InputBox
                  type="text"
                  id="tel"
                  name="tel"
                  placeholder="'-'를 제외한 숫자만 입력해주세요."
                  value={tel}
                  onChange={onChangeTel}
                />
                {!isTel && <Error>{telErrMsg}</Error>}
                {apiErrMsg && <Error>{apiErrMsg}</Error>}
              </Label>
              <Button type="submit">계속</Button>
            </Form>
          </InputWrapper>
        )}
      </Container>
    </Wrapper>
  );
};

export default FindID;

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  padding: 3rem 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 1rem;
  color: ${({ theme }) => theme.colors.common.black};
  h3 {
    font-size: 1.8rem;
  }
  p {
    font-size: 1rem;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  p {
    font-size: 1rem;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
`;

const Label = styled.label`
  font-size: 1rem;
  height: 80px;
  span {
    padding-left: 4px;
  }
`;

const InputBox = styled.input`
  width: 500px !important;
  height: 52px;
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.colors.primary90} !important;
  background: ${({ theme }) => theme.colors.common.white};
  color: ${({ theme }) => theme.colors.common.black};
  margin-bottom: 4px;
  display: flex;
  flex-direction: row;
  align-items: center;
  border: none;
  width: 512px;
  margin-top: 4px;
  padding-left: 20px;
  &:focus {
    outline: none;
  }
`;

const Error = styled.p`
  color: #eb5353;
  font-size: 0.9rem !important;
  font-weight: 500;
  margin: 0;
  padding-left: 4px;
`;

const Button = styled.button`
  width: 500px;
  height: 52px;
  margin-top: 12px;
  background: ${({ theme }) => theme.colors.primary100_2};
  font-size: 1.1rem;
  font-weight: 400;
  border-radius: 28px;
  border: none;
  font-family: NanumSquareRound;
  &:hover {
    cursor: pointer;
  }
`;

const ResultWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  p {
    font-size: 1.1rem;
    font-weight: 700;
    width: 600px;
    text-align: center;
    span {
      color: #85c88a;
    }
  }
`;
