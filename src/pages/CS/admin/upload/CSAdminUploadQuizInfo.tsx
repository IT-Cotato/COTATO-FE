import React, { useCallback } from 'react';
import styled from 'styled-components';
import { Multiples, ShortQuizzes } from '@/typing/db';
import axios from 'axios';
import { trackPromise } from 'react-promise-tracker';
import { LoadingIndicator } from '../../../../components/LoadingIndicator';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import fetchUserData from '@utils/fetchUserData';

type QuizType = Multiples | ShortQuizzes;

type Props = {
  quiz: QuizType[];
  setQuiz: React.Dispatch<React.SetStateAction<QuizType[]>>;
  selected: number;
  educationId: number;
};

const CSAdminUploadQuizInfo = ({ quiz, setQuiz, selected, educationId }: Props) => {
  // 타입 가드
  const isMultiples = (quiz: Multiples | ShortQuizzes): quiz is Multiples => {
    return (quiz as Multiples)?.choices !== undefined;
  };

  /**
   * 객관식, 주관식 버튼 클릭 시, quiz_type 변경
   */
  const onClickType = useCallback(
    (type: string) => {
      if (type === 'choice' && isMultiples(quiz[selected])) return;
      if (type === 'short' && !isMultiples(quiz[selected])) return;
      setQuiz((prev) => {
        const newPrev = [...prev];
        const copySelected = newPrev[selected];
        if (isMultiples(copySelected)) {
          newPrev[selected] = changeType(
            type,
            copySelected.number,
            copySelected.question,
            copySelected.image,
            copySelected.previewUrl || null,
          );
        } else {
          newPrev[selected] = changeType(
            type,
            copySelected.number,
            copySelected.question,
            copySelected.image,
            copySelected.previewUrl || null,
          );
        }
        return [...newPrev];
      });
    },
    [selected, quiz],
  );

  /**
   * quiz_type을 안전하게 변경하기 위한 함수
   */
  const changeType = useCallback(
    (
      type: string,
      number: number,
      question: string | null,
      image: File | null,
      previewUrl: string | null,
    ) => {
      // 들어온 type이 choice일 경우, choice를 제외한 나머지를 복사
      if (type === 'choice') {
        return {
          number,
          question: question || '',
          choices: [
            {
              number: 1,
              content: '',
              isAnswer: 'ANSWER' as const,
            },
            {
              number: 2,
              content: '',
              isAnswer: 'NO_ANSWER' as const,
            },
            {
              number: 3,
              content: '',
              isAnswer: 'NO_ANSWER' as const,
            },
            {
              number: 4,
              content: '',
              isAnswer: 'NO_ANSWER' as const,
            },
          ],
          image: image,
          previewUrl: previewUrl || null,
        } as Multiples;
      } else {
        return {
          number,
          question: question || '',
          image: image,
          previewUrl: previewUrl || null,
          shortAnswers: [{ answer: '' }],
        } as ShortQuizzes;
      }
    },
    [selected, quiz],
  );

  const convertImageUrlToFile = async (imageUrl: any) => {
    try {
      const response = await fetch(imageUrl, { cache: 'no-cache' });
      const blob = await response.blob();
      const fileName = imageUrl.substring(imageUrl.lastIndexOf('/') + 1);
      const file = new File([blob], fileName, { type: blob.type });

      return file;
    } catch (error) {
      console.error('Error converting image URL to File:', error);
    }
  };

  const appendData = (formData: any, dataArray: any, arrayName: any) => {
    // dataArray의 image 필드가 URL인 경우, 파일로 변환하여 다시 저장
    dataArray.forEach((item: any, index: any) => {
      Object.keys(item).forEach((key) => {
        const fieldKey = `${arrayName}[${index}].${key}`;
        const value = item[key];
        if (Array.isArray(value)) {
          // Recursively append nested arrays
          appendData(formData, value, fieldKey);
        } else {
          formData.append(fieldKey, value);
        }
      });
    });
  };

  const checkUpload = useCallback(async () => {
    // question이 있는지 검사
    // 객관식 choice에 ANSWER가 있는지, content가 전부 있는지 검사
    // 주관식 choice에 answer가 있는지 검사
    quiz.some((quiz) => {
      if (quiz.question === '') {
        toast.info(`${quiz.number}번 문제 제목을 입력해주세요.`);
        return true;
      }
      if (isMultiples(quiz)) {
        quiz?.choices?.some((choice) => {
          if (choice.content === '') {
            toast.info(`${quiz.number}번 문제 ${choice.number}번 보기를 입력해주세요.`);
            return true;
          }
        });
        if (quiz?.choices?.filter((choice) => choice.isAnswer === 'ANSWER').length === 0) {
          toast.info(`${quiz.number}번 문제 정답을 입력해주세요.`);
          return true;
        }
      } else {
        quiz.shortAnswers.some((short) => {
          if (short?.answer === '') {
            toast.info(`${quiz.number}번 문제 정답을 입력해주세요.`);
            return true;
          }
        });
      }
    });
    const { multiples, shortQuizzes } = await classifyQuizzes();
    const formData = new FormData();

    appendData(formData, multiples, 'multiples');
    appendData(formData, shortQuizzes, 'shortQuizzes');

    const sendData = async () => {
      await axios({
        method: 'POST',
        url: '/v1/api/quiz/adds',
        data: formData,
        params: {
          educationId: educationId,
        },
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
          ContentType: 'multipart/form-data',
        },
      })
        .then(() => {
          toast.success('성공적으로 저장되었습니다!');
        })
        .catch((error) => {
          if (error.response.data.code === 'T-001') {
            fetchUserData();
          }
          toast.error(error.response.data.message);
        });
    };
    trackPromise(sendData());
  }, [quiz]);

  /**
   * 업로드 전 미리보기 이미지 제거 / 객관식, 주관식 분류
   *
   */
  const classifyQuizzes = useCallback(async () => {
    const newQuiz = quiz.map((quiz) => {
      if (isMultiples(quiz)) {
        return quiz.image
          ? {
              number: quiz.number,
              question: quiz.question,
              choices: quiz.choices.map((choice) => ({
                number: choice.number,
                content: choice.content,
                isAnswer: choice.isAnswer,
              })),
              image: quiz.image,
            }
          : {
              number: quiz.number,
              question: quiz.question,
              choices: quiz.choices.map((choice) => ({
                number: choice.number,
                content: choice.content,
                isAnswer: choice.isAnswer,
              })),
            };
      } else {
        return quiz.image
          ? {
              number: quiz.number,
              question: quiz.question,
              shortAnswers: quiz.shortAnswers.map((short) => ({
                answer: short.answer,
              })),
              image: quiz.image,
            }
          : {
              number: quiz.number,
              question: quiz.question,
              shortAnswers: quiz.shortAnswers.map((short) => ({
                answer: short.answer,
              })),
            };
      }
    });

    // 객관식, 주관식 분류
    const multiples = newQuiz.filter((quiz) => (quiz as Multiples).choices !== undefined);
    const shortQuizzes = newQuiz.filter(
      (quiz) => (quiz as ShortQuizzes).shortAnswers !== undefined,
    );

    // Use Promise.all to wait for all image conversions to complete
    await Promise.all([
      ...multiples.map(async (item: any) => {
        if (item.image && typeof item.image === 'string') {
          item.image = await convertImageUrlToFile(item.image);
        }
      }),
      ...shortQuizzes.map(async (item: any) => {
        if (item.image && typeof item.image === 'string') {
          item.image = await convertImageUrlToFile(item.image);
        }
      }),
    ]);

    return { multiples, shortQuizzes };
  }, [quiz]);

  return (
    <Wrapper>
      <DesktopSection>
        <p>문제 형식</p>
        <DeskTopOption>
          <button
            id="choice"
            style={
              isMultiples(quiz[selected])
                ? { background: '#C1C1C1', color: 'white' }
                : { background: '#fff', color: 'black' }
            }
            onClick={() => {
              onClickType('choice');
            }}
          >
            객관식
          </button>
          <button
            id="short"
            style={
              !isMultiples(quiz[selected])
                ? { background: '#C1C1C1', color: 'white' }
                : { background: '#fff', color: 'black' }
            }
            onClick={() => {
              onClickType('short');
            }}
          >
            주관식
          </button>
        </DeskTopOption>
        <p>정답</p>
        <AnswerBox>
          {isMultiples(quiz[selected])
            ? (quiz[selected] as Multiples)?.choices
                ?.filter((choice) => choice.isAnswer === 'ANSWER')
                .map((choice, index) => (
                  <div key={index}>
                    <img src="https://velog.velcdn.com/images/ea_st_ring/post/555ec60e-4c31-48e7-80d1-ec3cb60350d2/image.svg" />
                    {choice?.number}번 : {choice?.content}
                  </div>
                ))
            : (quiz[selected] as ShortQuizzes).shortAnswers.map((short, index) => (
                <div key={index}>
                  <img src="https://velog.velcdn.com/images/ea_st_ring/post/555ec60e-4c31-48e7-80d1-ec3cb60350d2/image.svg" />
                  {short?.answer}
                </div>
              ))}
        </AnswerBox>
      </DesktopSection>
      <MobileSection>
        <MobileOption>
          <select name="type" id="type" onChange={(e) => onClickType(e.target.value)}>
            <option value="choice">객관식</option>
            <option value="short">주관식</option>
          </select>
        </MobileOption>
        <NavBox>
          <SaveButton onClick={checkUpload}>저장</SaveButton>
          <ExitButton>나가기</ExitButton>
        </NavBox>
      </MobileSection>{' '}
      <LoadingIndicator />
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme="light"
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  grid-area: rightbox;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.primary5};
  color: ${({ theme }) => theme.colors.gray100};
  padding: 32px;
  p {
    width: 100%;
    align-self: flex-start;
  }
  /* div {
    display: flex;
    margin-bottom: 24px;
    button {
      width: 100px;
      height: 40px;
      flex-shrink: 0;
      border-radius: 5px;
      border: 2px solid #c1c1c1;
      background: #fff;
      cursor: pointer;
    }
    button + button {
      margin-left: 12px;
    }
  } */
  @media screen and (max-width: 768px) {
    display: flex;
    width: 100%;
    background: #f4f4f4;
    padding: 20px;
  }
`;

const DesktopSection = styled.div`
  display: flex;
  flex-direction: column;
  div {
    display: flex;
    margin-bottom: 24px;
    button {
      width: 100px;
      height: 40px;
      flex-shrink: 0;
      border-radius: 5px;
      border: 2px solid #c1c1c1;
      background: #fff;
      cursor: pointer;
    }
    button + button {
      margin-left: 12px;
    }
  }
  @media screen and (max-width: 768px) {
    display: none !important;
  }
`;

const DeskTopOption = styled.div`
  div {
    display: flex;
    margin-bottom: 24px;
    button {
      width: 100px;
      height: 40px;
      flex-shrink: 0;
      border-radius: 5px;
      border: 2px solid #c1c1c1;
      background: #fff;
      cursor: pointer;
    }
    button + button {
      margin-left: 12px;
    }
  }
`;

const AnswerBox = styled.div`
  div {
    width: 216px;
    height: 120px;
    flex-shrink: 0;
    border-radius: 5px;
    border: 2px solid #cfcfcf;
    background: #fff;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    padding: 8px;
    margin-bottom: 0px;
  }
  img {
    width: 20px;
    height: 20px;
    margin-right: 4px;
  }
  flex-direction: column;
  div + div {
    margin-top: 8px;
  }
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const MobileSection = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  div {
    display: flex;
    margin-bottom: 24px;
    button {
      width: 100px;
      height: 40px;
      flex-shrink: 0;
      border-radius: 5px;
      border: 2px solid #c1c1c1;
      background: #fff;
      cursor: pointer;
    }
    button + button {
      margin-left: 12px;
    }
  }
`;

const MobileOption = styled.div`
  display: none;
  select {
    display: none;
  }
  @media screen and (max-width: 768px) {
    display: flex;
    justify-content: flex-end;
    select {
      display: block;
      width: 100px;
      height: 40px;
      border-radius: 5px;
      border: none;
      margin-bottom: 24px;
      text-align: center;
      background: #fff;
      cursor: pointer;
      box-shadow: 4px 4px 5px -2px rgba(212, 212, 212, 0.75);
      -webkit-box-shadow: 4px 4px 5px -2px rgba(212, 212, 212, 0.75);
      -moz-box-shadow: 4px 4px 5px -2px rgba(212, 212, 212, 0.75);
      &:focus {
        outline: none;
      }
    }
  }
`;

const NavBox = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: flex-end;
  button {
    width: 100px;
    height: 40px;
    border-radius: 5px;
  }
  @media screen and (max-width: 768px) {
    display: flex;
    justify-content: space-between;
    flex-direction: row-reverse;
    button {
      width: 140px !important;
    }
  }
`;

const SaveButton = styled.button`
  border: none !important;
  background-color: #477feb !important;
  color: white;
  cursor: pointer;
`;

const ExitButton = styled.button`
  background: #ededed !important;
  border: none !important;
  @media screen and (max-width: 768px) {
    margin-left: 0 !important;
    font-weight: 800;
    cursor: pointer;
    box-shadow: 4px 4px 5px -2px rgba(212, 212, 212, 0.75);
    -webkit-box-shadow: 4px 4px 5px -2px rgba(212, 212, 212, 0.75);
    -moz-box-shadow: 4px 4px 5px -2px rgba(212, 212, 212, 0.75);
  }
`;

export default CSAdminUploadQuizInfo;
