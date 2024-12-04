import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import CotatoPanel from '@components/CotatoPanel';
import panelText from '@assets/find_password_sending_email_panel_text.svg';
import CotatoButton from '@components/CotatoButton';
import api from '@/api/api';
import { media } from '@theme/media';
import { CotatoThemeType } from '@theme/theme';

//
//
//

interface EmailAuthProps {
  goToNextStep: () => void;
  email: string;
}

type InputRefType = (HTMLInputElement | null)[];

//
//
//

const CODE_LENGTH = 6;

//
//
//

const EmailAuth: React.FC<EmailAuthProps> = ({ goToNextStep, email }) => {
  const [input, setInput] = useState<number[]>(Array(CODE_LENGTH).fill(null));
  const inputRef = useRef<InputRefType>(Array(CODE_LENGTH).fill(null));

  /**
   *
   */
  const handlePasteEvent = (value: string) => {
    const newInput = [...input];
    for (let i = 0; i < CODE_LENGTH; i++) {
      newInput[i] = parseInt(value[i]);
    }
    setInput(newInput);
  };

  /**
   *
   */
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, idx: number) => {
    if (e.target.value.length >= CODE_LENGTH) {
      handlePasteEvent(e.target.value);
      return;
    }

    const newInput = [...input];
    let value = e.target.value;

    if (newInput[idx] !== null) {
      const prevValue = input[idx].toString();
      value = e.target.value.replace(prevValue, '');
    }

    newInput[idx] = parseInt(value);
    setInput(newInput);

    if (idx < input.length - 1) {
      inputRef.current[idx + 1]?.focus();
    }
  };

  /**
   *
   */
  const checkInputValidation = () => {
    if (input.some((el) => el === null)) {
      alert('인증 코드를 입력해주세요.');
      return;
    }

    return true;
  };

  /**
   *
   */
  const initializeInput = () => {
    inputRef.current.forEach((el: HTMLInputElement | null) => {
      if (el !== null) {
        el.value = '';
      }
    });
    setInput(Array(CODE_LENGTH).fill(null));
  };

  /**
   *
   */
  const handleError = (code: string) => {
    switch (code) {
      case 'A-101':
        alert('인증 코드가 일치하지 않습니다.');
        break;
      case 'A-102':
        alert('인증 코드가 만료되었습니다. 새로운 인증 코드를 발급해주세요.');
        break;
      default:
        alert('인증에 실패했습니다. 다시 시도해주세요.');
        break;
    }
  };

  /**
   *
   */
  const handleAuthCode = () => {
    if (!checkInputValidation()) {
      return;
    }

    const result = api
      .get('/v1/api/auth/verification', {
        params: {
          email: email,
          code: input.join(''),
          type: 'find-password',
        },
      })
      .then((res) => {
        alert('인증이 완료되었습니다.');
        localStorage.setItem('token_reset_password', res.data.accessToken);
        goToNextStep();
      })
      .catch((err) => {
        handleError(err.response.data.code);
        initializeInput();

        return false;
      });

    return result;
  };

  /**
   *
   */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isAuthorized = await handleAuthCode();
    if (isAuthorized) {
      goToNextStep();
    }
  };

  /**
   *
   */
  const renderGuideMessage = () => {
    return (
      <Message>
        <span>{email}</span>(으)로 인증 이메일이 발송 되었습니다.
        <br />
        이메일에서 코드 {CODE_LENGTH}자리를 아래 박스에 입력해주세요.
      </Message>
    );
  };

  /**
   *
   */
  const renderInputField = () => {
    return (
      <InputDiv>
        {input.map((num, idx) => (
          <InputBox
            filled={input[idx] !== null}
            key={idx}
            type="number"
            value={num}
            ref={(el) => (inputRef.current[idx] = el)}
            onChange={(e) => {
              handleInputChange(e, idx);
            }}
          />
        ))}
      </InputDiv>
    );
  };

  /**
   *
   */
  const renderInfoMessage = () => {
    return (
      <Message>
        인증 메일은 발송 시점부터 30분 유효하며,
        <br />
        재발송 시 기본 인증코드는 만료됩니다.
      </Message>
    );
  };

  //
  //
  //
  useEffect(() => {
    if (!inputRef.current) {
      return;
    }

    inputRef.current[0]?.focus();
  }, []);

  return (
    <Wrapper>
      <CotatoPanel size="long" textImgSrc={panelText} />
      {renderGuideMessage()}
      {renderInputField()}
      {renderInfoMessage()}
      <CotatoButton
        width="base"
        height="base"
        color="black"
        text="버튼"
        handleClick={handleSubmit}
      />
    </Wrapper>
  );
};

//
//
//

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 6rem;

  ${media.mobile`
    padding: 8rem 3rem;
  `}
`;

const Message = styled.p`
  font-family: 'Pretendard';
  font-size: ${({ theme }) => theme.fontSize.md};
  color: ${({ theme }) => theme.colors.gray80_1};
  line-height: 1.5rem;
  text-align: center;
  margin-top: 1.7rem;
  margin-bottom: 0;
  &:nth-of-type(2) {
    margin-bottom: 2.25rem;
  }
  span {
    font-family: 'Pretendard';
    font-weight: bold;
  }

  ${media.mobile`
    font-size: ${({ theme }: { theme: CotatoThemeType }) => theme.fontSize.xs};
  `}
`;

const InputDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1rem;
  margin-top: 2.6rem;

  ${media.mobile`
    gap: 0.5rem;
  `}
`;

const InputBox = styled.input<{ filled: boolean }>`
  width: 5rem;
  height: 5rem;
  border-radius: 0.25rem;
  border: 2px solid ${({ theme }) => theme.colors.common.black};
  ${({ filled }) => filled && `border-width: 3px`};
  background-color: ${({ theme }) => theme.colors.common.white};
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.colors.common.black};
  font-size: 2.8rem;
  font-family: 'Pretendard';
  font-weight: 700;
  text-align: center;
  caret-color: transparent;
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
  &:focus {
    border-width: 3px !important;
  }

  ${media.landscape`
    width: 4rem;
    height: 4rem;
    font-size: 2rem;
  `}
  ${media.mobile`
    width: 3rem;
    height: 3rem;
    font-size: ${({ theme }: { theme: CotatoThemeType }) => theme.fontSize.xl};
  `}
`;

export default EmailAuth;
