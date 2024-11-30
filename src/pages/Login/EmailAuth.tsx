import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import CotatoPanel from '@components/CotatoPanel';
import panelText from '@assets/find_password_sending_email_panel_text.svg';
import CotatoButton from '@components/CotatoButton';

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
      <CotatoButton width="base" height="base" color="black" text="버튼" />
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
  padding: 6rem !important;
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
`;

const InputDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1rem;
  margin-top: 2.6rem;
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
  color: ${({ theme }) => theme.colors.gray100};
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
`;

export default EmailAuth;
