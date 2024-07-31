/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import EmailAuth from './EmailAuth';
import api from '@/api/api';

interface FindPWProps {
  goToNextStep: () => void;
  isEmail: boolean;
  setIsEmail: React.Dispatch<React.SetStateAction<boolean>>;
  isPassword: boolean;
  isPasswordCheck: boolean;
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
}

const FindPW: React.FC<FindPWProps> = ({
  goToNextStep,
  isEmail,
  setIsEmail,
  isPassword,
  isPasswordCheck,
  email,
  setEmail,
}) => {
  // const [email, setEmail] = useState('');
  const [errMessage, setErrMessage] = useState('');
  // const [isEmail, setIsEmail] = useState(false);

  // const [showEmailAuth, setShowEmailAuth] = useState(false);

  const onChangeEmail = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const emailRegex =
        /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
      const emailCurrent = e.target.value;
      setEmail(emailCurrent);
      if (!emailRegex.test(emailCurrent)) {
        setErrMessage('올바른 이메일 형식이 아닙니다.');
        setIsEmail(false);
      } else {
        setErrMessage('');
        setIsEmail(true);
      }
    },
    [email],
  );

  const emailData = {
    email: email,
  };

  const onSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (isEmail) {
        console.log(email);
        api
          .post('/v1/api/auth/verification', emailData, {
            params: {
              type: 'find-password',
            },
          })
          .then((res) => {
            console.log(res);
            console.log('이메일이 발송되었습니다.');
            goToNextStep();
          })
          .catch((err) => {
            console.log(err);
            if (err.response.status === 404) {
              alert('존재하지 않는 계정입니다.');
            }
          });
      } else if (!isEmail) {
        alert('이메일을 입력해주세요.');
        return;
      }
    },
    [email],
  );

  // if (showEmailAuth) {
  //   return <EmailAuth />;
  // }

  return (
    <Wrapper>
      <h3>비밀번호 찾기</h3>
      <Form onSubmit={onSubmit}>
        <Label>
          <span>이메일</span>
          <InputBox
            type="text"
            id="id"
            name="id"
            placeholder="아이디를 기입해주세요."
            value={email}
            onChange={onChangeEmail}
          />
          {!isEmail && <Error>{errMessage}</Error>}
        </Label>
        <Button type="submit">인증 이메일 보내기</Button>
      </Form>
    </Wrapper>
  );
};

export default FindPW;

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  flex-direction: column;
  padding: 3rem 5rem;
  justify-content: flex-start;
  align-items: center;
  color: ${({ theme }) => theme.colors.common.black};
  gap: 2rem;
  h3 {
    font-size: 1.8rem;
  }
  p {
    font-size: 1rem;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4rem;
`;

const Label = styled.label`
  font-size: 1rem;
  span {
    padding-left: 4px;
  }
  p {
    margin: 0;
  }
`;

const InputBox = styled.input`
  width: 500px !important;
  height: 52px;
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.colors.primary90} !important;
  color: ${({ theme }) => theme.colors.common.black};
  background: ${({ theme }) => theme.colors.common.white};
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
  padding-top: 4px;
`;

const Button = styled.button`
  width: 500px;
  height: 52px;
  background: ${({ theme }) => theme.colors.primary100_2};
  color: ${({ theme }) => theme.colors.common.white};
  font-size: 1.1rem;
  font-weight: 400;
  border-radius: 28px;
  border: none;
  &:hover {
    cursor: pointer;
  }
`;
