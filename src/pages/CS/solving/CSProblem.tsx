import React, { useEffect, useState, useRef, useCallback } from 'react';
import styled from 'styled-components';
import lightBulb from '@assets/light.svg';
import light from '@assets/light_on.svg';
import bubble1 from '@assets/bubble_1.svg';
import bubble2 from '@assets/bubble_2.svg';
import bubble3 from '@assets/bubble_3.svg';
import explaination from '@assets/explaination.svg';
import podori from '@assets/podori.jpg';
import api from '@/api/api';
import BgCorrect from './BgCorrect';
import BgIncorrect from './BgIncorrect';
import BgWaiting from './BgWaiting';
import BgKingKing from './BgKingKing';
import { CotatoReplyRequest } from 'cotato-openapi-clients';
import fetchUserData from '@utils/fetchUserData';
import CotatoIcon from '@components/CotatoIcon';
import { IconButton } from '@mui/material';
import { QUIZ_END_NUMBER } from './constants';
import { MessageType } from '../admin/upload/utils/handleWsMessage';
import { useBreakpoints } from '@/hooks/useBreakpoints';
import { media } from '@theme/media';
import { v4 as uuidv4 } from 'uuid';

//
//
//

type Problem = {
  id: number; // 문제의 PK
  number: number; // 문제 번호
  type: string; // 문제 유형 (객관식 or 주관식)
  question: string; // 문제 내용
  image?: string; // 문제 이미지 url
  choices?: Choices[]; // 객관식 선지
  shortAnswers?: [] | null; // 주관식 정답
};

type Choices = {
  choiceId: number; // 객관식 선지의 PK
  number: number; // 객관식 선지 번호
  content: string; // 객관식 선지 내용
  isAnswer?: string | null; // 해당 선지의 정답 여부
};

interface CSProblemProps {
  quizId: number | null;
  submitAllowed: boolean;
  problemId: number;
  message: MessageType;
  showKingKing: boolean;
  educationId?: number;
  setShowKingKing: React.Dispatch<React.SetStateAction<boolean>>;
  alertError: boolean;
}

//
//
//

const CSProblem: React.FC<CSProblemProps> = ({
  quizId,
  submitAllowed,
  problemId,
  message,
  educationId,
  showKingKing,
  setShowKingKing,
  alertError,
}) => {
  const { data: user } = fetchUserData();
  user ? null : console.log('data is undefined');

  const { isTabletOrSmaller } = useBreakpoints();

  const [quizData, setQuizData] = useState<Problem | undefined>();
  const [multiples, setMultiples] = useState<string[]>([]); // 객관식 선지의 내용 리스트
  const [biggerImg, setBiggerImg] = useState<boolean>(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectNum, setSelectNum] = useState<number>(0);
  const [selected, setSelected] = useState<string[]>([]); // 최종적으로 선택한 선지번호 리스트
  const [shortAns, setShortAns] = useState('');
  const [showCorrect, setShowCorrect] = useState(false);
  const [showIncorrect, setShowIncorrect] = useState(false);
  const [showExplaination, setShowExplaination] = useState(false);
  const [returnToWaiting, setReturnToWaiting] = useState(false);
  const [count, setCount] = useState(0);
  const [notice, setNotice] = useState(false);

  const [currentKey, setCurrentKey] = useState<string | null>(null);

  const inputRef = useRef<any>();
  const multipleRef = useRef<any>();
  const shortRef = useRef<any>();
  const choiceRef = useRef<any | null>([]);

  const mountRef = useRef(false);

  const alignBtnHeights = () => {
    let maxHeight = 68;
    choiceRef?.current.forEach((el: any) => {
      if (el && el.offsetHeight > maxHeight) {
        maxHeight = el.offsetHeight;
      }
    });
    choiceRef?.current.forEach((el: any) => {
      if (el) el.style.height = `${maxHeight}px`;
    });
  };

  // 주관식 문제 입력 이벤트
  const onChangeShortAns = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setShortAns(e.target.value);
  }, []);

  const nextProblem = () => {
    // 다음 문제로 이동
    // 아직 다음 문제 안열렸으면 대기 상태로
    if (submitAllowed) {
      setReturnToWaiting(true);
    }
  };

  const submitProblem = () => {
    const input = quizData?.choices ? selected : [shortAns];

    if (!user || notice) {
      return;
    } else {
      if (!submitAllowed) {
        alert('아직 제출 기한이 아닙니다.');
        if (count >= 2) {
          setNotice(true);
          setTimeout(() => setNotice(false), 5000);
        }
        return;
      } else if (submitAllowed && (quizData?.choices ? selected.length === 0 : shortAns === '')) {
        alert('답안을 입력 후 제출해주세요.');
        return;
      } else {
        const rawLastSubmitInfo = JSON.parse(localStorage.getItem('lastSubmitInfo') || '{}');
        const lastSubmitAnswer = rawLastSubmitInfo.answer;
        const lastSubmitKey = rawLastSubmitInfo.answerKey;

        const isSameAnswer = JSON.stringify(input) === JSON.stringify(lastSubmitAnswer);
        const idempotencyKey = isSameAnswer ? lastSubmitKey : currentKey;

        api
          .post(
            '/v1/api/record/reply',
            {
              quizId: quizId,
              memberId: user.memberId,
              inputs: input,
            } as CotatoReplyRequest,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Idempotency-Key': idempotencyKey,
              },
            },
          )
          .then((res) => {
            if (res.data.result) {
              setShowCorrect(true);
              setTimeout(() => setReturnToWaiting(true), 2500);
            } else {
              setShowIncorrect(true);
            }

            localStorage.setItem(
              'lastSubmitInfo',
              JSON.stringify({ answer: input, answerKey: currentKey }),
            );
          })
          .catch((err) => {
            if (err.response.data.code === 'R-301') {
              alert('이미 정답 처리되었습니다.');
              nextProblem();
            }
          });
      }
    }
  };

  if (showKingKing) {
    setTimeout(() => {
      setShowKingKing(false);
      setReturnToWaiting(true);
    }, 8000);
  }

  //
  //
  //

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === 'Escape') {
        setCount((prevCount) => prevCount + 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    const intervalId = setInterval(() => {
      setCount(0);
    }, 3000);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      clearInterval(intervalId);
    };
  }, [count]);

  useEffect(() => {
    alignBtnHeights();
  }, [quizData]);

  // 최초 마운트 이후부터 문제 변경을 감지하여 다음 문제 보여주기
  useEffect(() => {
    if (!mountRef.current) {
      mountRef.current = true;
    } else {
      setReturnToWaiting(false);
    }
  }, [problemId]);

  useEffect(() => {
    const fetchData = async () => {
      await api
        .get(`/v1/api/quiz/${quizId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        })
        .then((res) => {
          setQuizData(res.data);
        })
        .catch((err) => {
          console.error(err);
        });
    };

    const initializeData = async () => {
      await setMultiples([]); // 문제 바뀔 때 이전 선지 초기화
      fetchData();
    };

    initializeData();
  }, [problemId]); // quizId가 바뀌면 문제 데이터를 다시 불러옴

  useEffect(() => {
    // 객관식 선지의 내용을 리스트에 담기 (quizData가 업데이트된 후에 선지 내용 설정)
    if (quizData?.choices) {
      quizData.choices.forEach((item) => {
        setMultiples((prev) => [...prev, item.content]);
      });
    }
    // 문제 바뀔 때 이전 입력 답안 초기화
    setShortAns('');
    setSelectNum(0);
    setSelected([]);
  }, [quizData]);

  useEffect(() => {
    // 정답/오답 화면 표시 후 위에 깔리지 않도록 삭제
    if (showCorrect) {
      const timeoutId = setTimeout(() => setShowCorrect(false), 2500);
      return () => clearTimeout(timeoutId);
    }
    if (showIncorrect) {
      const timeoutId = setTimeout(() => setShowIncorrect(false), 2500);
      return () => clearTimeout(timeoutId);
    }
  }, [showCorrect, showIncorrect]);

  useEffect(() => {
    const answerKey = uuidv4();
    setCurrentKey(answerKey);
  }, [selected, shortAns]);

  useEffect(() => {
    console.log('currentKey', currentKey);
  }, [currentKey]);

  return (
    <Wrapper disabled={alertError}>
      {notice && (
        <img
          src={podori}
          alt="포돌짱"
          style={{ position: 'fixed', marginTop: '60px', width: '500px', zIndex: '100' }}
        />
      )}
      <ProgressContainer>
        <ProgressBar progress={(quizData?.number as number) * 10} />
      </ProgressContainer>
      <QuizContainer>
        <QuestionContainer ifNoImg={!quizData?.image}>
          <h5>문제 {quizData?.number}</h5>
          <span>
            {quizData?.question.split('\r\n').map((sentence) => <p key={sentence}>{sentence}</p>)}
          </span>
        </QuestionContainer>
        {quizData?.image && (
          <ImageContainer bigger={biggerImg}>
            <Image src={quizData?.image} alt={`문제${quizData?.number}의 이미지`} />
            {window.innerWidth > 392 && (
              <ResizeIcon onClick={() => setBiggerImg(!biggerImg)}>
                <CotatoIcon size="20px" icon={biggerImg ? 'minus-solid' : 'expand-solid'} />
              </ResizeIcon>
            )}
          </ImageContainer>
        )}
        {!isTabletOrSmaller && (
          <LightImgContainer>
            {!submitAllowed && showExplaination && (
              <Explaination>
                불이 켜지면
                <br />
                제출!
              </Explaination>
            )}
            <LightBulb
              src={lightBulb}
              onMouseEnter={() => setShowExplaination(true)}
              onMouseLeave={() => setShowExplaination(false)}
            />
            {submitAllowed && (
              <LightOn>
                <img src={bubble1} alt="bubble 1" />
                <img src={bubble2} alt="bubble 2" />
                <img src={bubble3} alt="bubble 3" />
                <img src={light} alt="light" />
              </LightOn>
            )}
          </LightImgContainer>
        )}
        {quizData?.choices && (
          <Choice
            setSelectNum={setSelectNum}
            selected={selected}
            setSelected={setSelected}
            contents={multiples}
            multipleRef={multipleRef}
            choiceRef={choiceRef}
            notice={notice}
          />
        )}
        {!quizData?.choices && (
          <ShortAnswer
            shortAns={shortAns}
            onChangeShortAns={onChangeShortAns}
            inputRef={inputRef}
            problemId={problemId}
            shortRef={shortRef}
            notice={notice}
          />
        )}
        <ButtonContainer disabled={!submitAllowed}>
          {quizData?.number === QUIZ_END_NUMBER ? null : (
            <button onClick={nextProblem}>다음문제</button>
          )}
          <button onClick={submitProblem}>제출하기</button>
        </ButtonContainer>
      </QuizContainer>
      {showCorrect && <BgCorrect />}
      {showIncorrect && <BgIncorrect />}
      {showKingKing && educationId && <BgKingKing educationId={educationId} />}
      {message.command === 'exit' ? (
        <BgWaiting problemNumber={quizData?.number} />
      ) : (
        returnToWaiting && <BgWaiting problemNumber={quizData?.number} />
      )}
    </Wrapper>
  );
};

//
//
//

interface choiceProps {
  setSelectNum: React.Dispatch<React.SetStateAction<number>>;
  selected: string[]; // 최종적으로 선택한 선지번호 리스트
  setSelected: React.Dispatch<React.SetStateAction<string[]>>;
  contents: string[]; // 객관식 선지의 내용 리스트
  multipleRef: React.MutableRefObject<any>;
  choiceRef: React.MutableRefObject<any>;
  notice: boolean;
}

//
//
//

const Choice: React.FC<choiceProps> = ({
  setSelectNum,
  selected,
  setSelected,
  contents,
  multipleRef,
  choiceRef,
  notice,
}) => {
  return (
    <ChoiceContainer ref={multipleRef} choiceNum={contents.length}>
      {contents.map((content, idx) => {
        const choiceNum = idx + 1;

        return (
          <ChoiceBtn
            key={idx}
            clicked={selected.includes(choiceNum.toString())}
            onClick={() => {
              if (notice) return;

              setSelectNum(choiceNum);
              if (selected.includes(choiceNum.toString()) === false) {
                setSelected([...selected, choiceNum.toString()]);
              } else {
                setSelected(selected.filter((item) => item !== choiceNum.toString()));
              }
            }}
            ref={(el) => (choiceRef.current[idx] = el)}
          >
            {content}
          </ChoiceBtn>
        );
      })}
    </ChoiceContainer>
  );
};

//
//
//

interface ShortAnsProps {
  shortAns: string;
  onChangeShortAns: React.ChangeEventHandler<HTMLInputElement>;
  inputRef: React.MutableRefObject<any>;
  shortRef: React.MutableRefObject<any>;
  problemId: number;
  notice: boolean;
}

//
//
//

const ShortAnswer: React.FC<ShortAnsProps> = ({
  shortAns,
  onChangeShortAns,
  inputRef,
  shortRef,
  problemId,
  notice,
}) => {
  useEffect(() => inputRef.current.focus(), [problemId]); // 컴포넌트 마운트 즉시 포커싱

  return (
    <ShortAnswerContainer ref={shortRef}>
      <input
        type="text"
        id="shortAns"
        name="shortAns"
        value={shortAns}
        onChange={onChangeShortAns}
        placeholder="답안을 입력해주세요"
        ref={inputRef}
        disabled={notice}
      />
    </ShortAnswerContainer>
  );
};

//
//
//

const Wrapper = styled.div<{ disabled: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: auto;
  min-height: 100vh;
  position: relative;
  padding-bottom: 60px;
  overflow-x: hidden;
  overflow-y: visible;
  ${({ disabled }) =>
    disabled &&
    `pointer-events: none;
     user-select: none;`}
`;

const ProgressContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
`;

const ProgressBar = styled.div<{ progress: number }>`
  width: ${(props) => props.progress}%;
  height: 10px;
  background: #477feb;
  justify-content: flex-start;
  transition-property: width;
  transition-duration: 0.5s;
  transition-timing-function: ease-in;
`;

export const QuizContainer = styled.div`
  padding: 0 12px;
  width: 100%;
  max-width: 920px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;

  ${media.tablet`
    width: 100%;
    padding: 0 9px;
  `}
`;

export const QuestionContainer = styled.div<{ ifNoImg: boolean }>`
  width: 100%;
  min-height: 88px;
  height: fit-content;
  border-radius: 5px;
  background: #fff;
  box-shadow: 2px 4px 10px 0px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 32px;
  ${(props) => (props.ifNoImg ? `margin-bottom: 120px;` : `margin-bottom: 48px;`)};
  padding: 20px 60px !important;
  h5 {
    color: #477feb;
    font-family: Inter;
    font-size: 1.1rem;
    font-weight: 600;
    margin: 0 0 3px 0;
  }
  span {
    color: #000;
    font-family: NanumSquareRound;
    font-size: 1.1rem;
    font-weight: 600;
    width: 90%;
  }
  p {
    margin: 4px 0;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: break-word;
  }

  ${media.tablet`
    width: 100%;
    padding: 20px !important;
    p {
      margin: 0 0 4px 0;
    }
    span {
      width: 78%;
    }
  `}
`;

export const ImageContainer = styled.div<{ bigger: boolean }>`
  position: relative;
  width: 528px;
  height: 301px;
  margin-bottom: 52px;
  ${(props) =>
    props.bigger
      ? `
      transform: scale(1.2);
      transition: transform 0.3s;
      margin-top: 36px;
      margin-bottom: 84px;
    `
      : `
        transform: scale(1);
        transition: transform 0.3s;
      `};

  ${media.tablet`
    width: 332px;
    height: 189px;
  `}
`;

export const Image = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 5px;
  box-shadow: 2px 4px 10px 0px rgba(0, 0, 0, 0.25);
  object-fit: contain;
`;

const ResizeIcon = styled(IconButton)`
  position: absolute !important;
  right: 18px;
  bottom: 18px;
`;

export const LightImgContainer = styled.div`
  position: absolute;
  width: 80px;
  top: 140px;
  right: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Explaination = styled.div`
  background-image: url(${explaination});
  position: absolute;
  bottom: 20px;
  font-size: 0.75rem;
  color: #454545;
  width: 80px;
  height: 64px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding-bottom: 10px;
  margin-bottom: 16px;
`;

const LightBulb = styled.img`
  width: 32px;
  height: 32px;
  margin-top: 40px;
`;

const LightOn = styled.div`
  position: relative;
  width: 80px;
  height: 100%;
  padding: 0 auto;
  margin-top: 24px;
  img {
    position: absolute;
    @keyframes up {
      0% {
        transform: translateY(24px);
      }
      100% {
        transform: translateY(10px);
      }
    }
    @keyframes fadeOut {
      0% {
        opacity: 1;
      }
      60% {
        opacity: 1;
      }
      100% {
        opacity: 0;
      }
    }

    &:nth-child(1) {
      width: 40px;
      left: 20px;
      bottom: 68px;
      animation:
        up 3s infinite ease 2s,
        fadeOut 3s infinite ease;
    }
    &:nth-child(2) {
      width: 3px;
      left: 28px;
      bottom: 84px;
      animation:
        up 2.5s infinite ease,
        fadeOut 2.5s infinite ease 3s;
    }
    &:nth-child(3) {
      width: 4px;
      left: 44px;
      bottom: 88px;
      animation:
        up 4s infinite ease 2.5s,
        fadeOut 2.5s infinite ease;
    }
    // 전구 ON 불빛
    &:nth-child(4) {
      width: 80px;
      bottom: 8px;
      animation: twinkle 0.7s ease-in-out infinite alternate;
      @keyframes twinkle {
        0% {
          opacity: 0;
        }
        100% {
          opacity: 1;
        }
      }
    }
  }
`;

const ChoiceContainer = styled.div<{ choiceNum: number }>`
  width: 100%;
  height: fit-content;
  display: grid;
  ${(props) =>
    props.choiceNum > 4
      ? `grid-template-columns: 1fr;`
      : `grid-template-columns: 1fr 1fr;
      grid-template-rows: 1fr 1fr; 
      grid-column-gap: 16px;`}
  grid-row-gap: 12px;
  align-items: stretch !important;

  ${media.tablet`
    grid-column-gap: 12px;
  `}
`;

const ChoiceBtn = styled.div<{ clicked: boolean }>`
  width: 100%;
  min-height: 68px;
  height: fit-content;
  border-radius: 5px;
  background: #fff;
  box-shadow: 2px 4px 10px 0px rgba(0, 0, 0, 0.25);
  display: flex;
  align-items: center;
  padding: 20px 32px;
  cursor: pointer;
  &:hover {
    transform: scale(1.02);
    transition: transform 0.3s;
  }
  ${(props) => props.clicked && `background: #D2D2D2;`}

  ${media.tablet`
    min-height: 100px;
    padding: 20px;
  `}
`;

export const ShortAnswerContainer = styled.div`
  width: 100%;
  height: 120px;
  border-radius: 5px;
  background: #fff;
  box-shadow: 2px 4px 10px 0px rgba(0, 0, 0, 0.25);
  display: flex;
  padding: 0 80px;
  input {
    border: none;
    outline: none;
    font-family: NanumSquareRound;
    font-size: 1rem;
    font-weight: 400;
    width: 100%;
  }

  ${media.tablet`
    padding: 20px;
  `}
`;

const ButtonContainer = styled.div<{ disabled: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 60px;
  width: 100%;
  justify-content: flex-end;
  button {
    width: 96px;
    height: 36px;
    border-radius: 5px;
    border: 2px solid #bebebe;
    background: #feffff;
    color: #2e2e2e;
    font-family: NanumSquareRound;
    font-size: 1rem;
    font-weight: 400;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    &:last-child {
      background: #477feb;
      border: none;
      color: #fff;
      margin-left: 8px;
    }
  }
  ${(props) =>
    props.disabled &&
    `button:first-child {
      &:hover {
        cursor: default;
      }
    }
    button:last-child {
      background: #CECCCC;
      &:hover {
        cursor: default;
    }
  }`}

  ${media.tablet`
    width: 100%;
    padding: 0 9px;
    flex-direction: column;
    button {
      width: 100%;
      height: 64px;
      &:last-child {
        margin-left: 0;
      }
      &:first-child {
        margin-bottom: 8px;
      }
    }
  `}
`;

export default CSProblem;
