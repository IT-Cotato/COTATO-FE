import React, { ChangeEvent, DragEvent, useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { produce } from 'immer';
import { MultipleQuiz, QuizType, ShortQuiz } from './CSAdminUploadSlides';
import { Stack, Typography } from '@mui/material';
import CotatoMuiButton from '@components/CotatoMuiButton';
import { CotatoDialog, CotatoDialogActions } from '@components/CotatoDialog';
import {
  ImageContainer,
  QuestionContainer,
  QuizContainer,
  ShortAnswerContainer,
} from '@pages/CS/solving/CSProblem';
import { media } from '@theme/media';

//
//
//

interface CSAdminUploadEditQuizProps {
  quiz: (MultipleQuiz | ShortQuiz)[];
  selected: number;
  setQuiz: React.Dispatch<React.SetStateAction<(MultipleQuiz | ShortQuiz)[]>>;
}

//
//
//

const EditQuiz = ({ quiz, selected, setQuiz }: CSAdminUploadEditQuizProps) => {
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  /**
   *
   */
  const onDrop = useCallback(
    (e: DragEvent<HTMLElement>) => {
      e.preventDefault();
      // 여러 장을 업로드할 시에는 불가능하다고 알림
      if (e.dataTransfer.items) {
        for (let i = 0; i < e.dataTransfer.items.length; i++) {
          if (e.dataTransfer.items[i].kind === 'file') {
            const file = e.dataTransfer.items[i].getAsFile();
            if (file) {
              setQuiz(
                produce((draft) => {
                  draft[selected].image = file;
                  draft[selected].previewUrl = URL.createObjectURL(file);
                }),
              );
            }
          }
        }
      }
    },
    [selected, quiz],
  );

  /**
   * input checkBox 상태 관리를 위한 함수
   */
  const handleChoiceChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setQuiz(
        produce((draft) => {
          const selectedQuiz = draft[selected] as MultipleQuiz;
          const choicedQuizAnswer = selectedQuiz.choices![Number(e.target.id) - 1].isAnswer;
          selectedQuiz.choices![Number(e.target.id) - 1].isAnswer =
            choicedQuizAnswer === 'ANSWER' ? 'NO_ANSWER' : 'ANSWER';
        }),
      );
    },
    [selected, quiz],
  );

  /**
   *
   */
  const onDragOver = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.items.length > 1 || e.dataTransfer.files.length > 1) {
      window.alert('이미지는 한 장만 업로드 가능합니다.');
    }
  }, []);

  /**
   *
   */
  const handleFileChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        setQuiz(
          produce((draft) => {
            const files = e.target.files;
            if (!files) return;
            draft[selected].image = files[0];
            draft[selected].previewUrl = URL.createObjectURL(files[0]);
          }),
        );
      }
    },
    [selected],
  );

  /**
   * 객관식인지 주관식인지 판별하는 함수
   */
  const isMultiples = (quiz: QuizType): quiz is MultipleQuiz => {
    return (quiz as MultipleQuiz).choices !== undefined;
  };

  /**
   *
   */
  const onChangeTitle = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>) => {
      setQuiz(
        produce((draft) => {
          const prev = draft[selected];
          if (isMultiples(prev)) {
            prev.question = e.target.value;
          } else {
            (prev as ShortQuiz).question = e.target.value;
          }
        }),
      );
    },
    [selected],
  );

  /**
   * 객관식 input 상태 관리 함수
   */
  const onChangeChoices = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>, id: string) => {
      setQuiz(
        produce((draft) => {
          const prev = draft[selected] as MultipleQuiz;
          if (prev.choices) {
            prev.choices[Number(id) - 1].content = e.target.value;
          }
        }),
      );
    },
    [selected],
  );

  /**
   * 주관식 input 상태 관리 함수
   */
  const onChangeShorts = useCallback(
    (e: ChangeEvent<HTMLInputElement>, id: string) => {
      setQuiz(
        produce((draft) => {
          const prev = draft[selected] as ShortQuiz;
          if (prev.shortAnswers) {
            prev.shortAnswers[Number(id) - 1].answer = e.target.value;
          }
        }),
      );
    },
    [selected],
  );

  /**
   * 주관식 답안 삭제 함수
   */
  const deleteShortAnswer = useCallback(
    (id: number) => {
      const prev = quiz[selected] as ShortQuiz;

      if (prev.shortAnswers && prev.shortAnswers.length === 1) {
        window.alert('주관식 답안은 최소 1개 이상이어야 합니다.');
        return;
      }

      setQuiz(
        produce((draft) => {
          const prev = draft[selected] as ShortQuiz;
          if (prev.shortAnswers) {
            prev.shortAnswers.splice(id, 1);
          }
        }),
      );
    },
    [selected],
  );

  /**
   *
   */
  const handleDeleteAnswer = useCallback(() => {
    setQuiz(
      produce((draft) => {
        const prev = draft[selected] as MultipleQuiz | ShortQuiz;
        isMultiples(prev) ? prev.choices?.pop() : prev.shortAnswers?.pop();
      }),
    );
  }, [selected]);

  /**
   * 이미지 삭제 버튼 핸들러
   */
  const handleDeleteButtonOnClick = useCallback(() => {
    const confirm = window.confirm('이미지를 삭제하시겠습니까?');
    if (confirm) {
      setQuiz(
        produce((draft) => {
          draft[selected].image = undefined;
          draft[selected].previewUrl = undefined;
        }),
      );
    }
  }, [selected]);

  /**
   *
   */
  const handleAddChoice = useCallback(() => {
    setQuiz(
      produce((draft) => {
        const prev = draft[selected] as MultipleQuiz | ShortQuiz;

        isMultiples(prev)
          ? prev.choices?.push({
              number: prev.choices.length + 1,
              content: '',
              isAnswer: 'NO_ANSWER',
            })
          : prev.shortAnswers?.push({ answer: '' });
      }),
    );
  }, [selected]);

  /**
   *
   */
  const renderTitle = () => {
    const selectedQuiz = quiz[selected] as any;
    const value = selectedQuiz?.question || selectedQuiz?.content || '';

    return (
      <MakeQuestionDiv>
        <textarea placeholder="문제를 입력해주세요." onChange={onChangeTitle} value={value} />
      </MakeQuestionDiv>
    );
  };

  /**
   *
   */
  const renderUpload = () => {
    const quizImage = quiz[selected]?.previewUrl || quiz[selected]?.image;

    return (
      <UploadDiv $image={quizImage || null} onDrop={onDrop} onDragOver={onDragOver}>
        {quizImage ? (
          <DeleteButton onClick={handleDeleteButtonOnClick}>
            <img src="https://velog.velcdn.com/images/ea_st_ring/post/d5f4409f-39c9-43bd-bb35-c6d4fa8774be/image.svg" />
          </DeleteButton>
        ) : (
          <>
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: 'none' }}
              accept="image/*"
              onChange={handleFileChange}
            />
            <img src="https://velog.velcdn.com/images/ea_st_ring/post/5bc62320-dd59-497f-9741-79945c54de6a/image.svg" />
            <p>
              컴퓨터에서 이미지를 드래그 혹은{' '}
              <a
                href="#"
                onClick={() => {
                  fileInputRef.current?.click();
                }}
              >
                클릭하여 업로드
              </a>
              해주세요.
            </p>
          </>
        )}
      </UploadDiv>
    );
  };

  /**
   *
   */
  const renderMultiples = () => {
    const selectedQuiz = quiz[selected] as MultipleQuiz;
    return (
      <ChoiceDiv>
        {selectedQuiz?.choices?.map((choice, index) => (
          <Choice key={`quiz -${index}`}>
            <textarea
              placeholder={`답안 ${index + 1}`}
              onChange={(e) => {
                onChangeChoices(e, `${index + 1}`);
              }}
              value={selectedQuiz?.choices?.[index]?.content || ''}
              id={`${index + 1}`}
            />
            <input
              type="checkbox"
              id={`${index + 1}`}
              tabIndex={index + 1}
              onChange={(e) => {
                handleChoiceChange(e);
              }}
              checked={selectedQuiz?.choices?.[index]?.isAnswer === 'ANSWER'}
            />
          </Choice>
        ))}
      </ChoiceDiv>
    );
  };

  /**
   *
   */
  const renderShorts = () => {
    const selectedQuiz = quiz[selected] as ShortQuiz;
    return (
      <Short>
        {selectedQuiz?.shortAnswers?.map((choice, index) => (
          <div key={index}>
            <input
              type="text"
              placeholder={`답안 ${index + 1}`}
              onChange={(e) => {
                onChangeShorts(e, `${index + 1}`);
              }}
              value={choice.answer || ''}
            />
            <img
              onClick={() => {
                deleteShortAnswer(index);
              }}
              src="https://velog.velcdn.com/images/ea_st_ring/post/d5f4409f-39c9-43bd-bb35-c6d4fa8774be/image.svg"
            />
          </div>
        ))}
      </Short>
    );
  };

  /**
   *
   */
  const renderActions = () => {
    return (
      <Stack direction="row" width="100%" justifyContent="flex-end" padding="1.5rem" gap="0.5rem">
        <CotatoMuiButton
          color="info"
          variant="outlined"
          onClick={() => {
            setIsPreviewOpen(true);
          }}
        >
          미리보기
        </CotatoMuiButton>
        <CotatoMuiButton onClick={handleAddChoice} variant="contained">
          답안 추가
        </CotatoMuiButton>
        <CotatoMuiButton onClick={handleDeleteAnswer} variant="contained" color="error">
          <Typography color="white">답안 삭제</Typography>
        </CotatoMuiButton>
      </Stack>
    );
  };

  /**
   *
   */
  const renderPreviewDialog = () => {
    return (
      <CotatoDialog fullScreen open={isPreviewOpen} onClose={() => setIsPreviewOpen(false)}>
        <Wrapper>
          <QuizContainer>
            <QuestionContainer ifNoImg={!quiz[selected]?.image}>
              <h5>문제 {quiz[selected]?.number}</h5>
              <span>
                {(quiz[selected]?.question as string).split('\r\n').map((sentence) => (
                  <p key={sentence}>{sentence}</p>
                ))}
              </span>
            </QuestionContainer>
            {quiz[selected]?.image && (
              <ImageContainer bigger={false}>
                <Image src={quiz[selected]?.previewUrl} />
              </ImageContainer>
            )}

            {(quiz[selected] as MultipleQuiz)?.choices ? (
              <ChoiceContainer choiceNum={0}>
                {(quiz[selected] as MultipleQuiz).choices?.map((choice) => (
                  <ChoiceBtn key={choice.number}>{choice.content}</ChoiceBtn>
                ))}
              </ChoiceContainer>
            ) : (
              <ShortAnswerContainer>
                <input
                  type="text"
                  id="shortAns"
                  name="shortAns"
                  value={''}
                  placeholder="답안을 입력해주세요"
                />
              </ShortAnswerContainer>
            )}
          </QuizContainer>
          <Stack width="100%" padding="0 17rem">
            <CotatoDialogActions>
              <CotatoMuiButton size="large" onClick={() => setIsPreviewOpen(false)}>
                닫기
              </CotatoMuiButton>
            </CotatoDialogActions>
          </Stack>
        </Wrapper>
      </CotatoDialog>
    );
  };

  // 컴포넌트 언마운트 시 preview_url을 제거
  useEffect(() => {
    return () => {
      quiz.forEach((quiz) => {
        if (quiz.previewUrl) {
          URL.revokeObjectURL(quiz.previewUrl);
        }
      });
    };
  }, []);

  //
  //
  //

  return (
    <Wrapper>
      <>
        {renderTitle()}
        {renderUpload()}
        {renderActions()}
        {renderPreviewDialog()}
        {isMultiples(quiz[selected]) ? renderMultiples() : renderShorts()}
      </>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  grid-area: centerbox;
  width: auto;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px;
  background-color: ${({ theme }) => theme.colors.primary5};
  @media screen and (max-width: 768px) {
    justify-content: center;
    align-items: center;
    width: 100vw;
    padding: 20px;
  }
`;

const MakeQuestionDiv = styled.div`
  min-width: 578px;
  height: 95px;
  margin-top: 16px;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.colors.common.white};
  box-shadow: 2px 4px 10px 0px rgba(0, 0, 0, 0.25);
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 24px;
  textarea {
    width: 100%;
    height: 100%;
    color: #000;
    font-family: NanumSquareRound;
    font-size: 16px;
    padding: 8px;
    font-style: normal;
    font-weight: 400;
    outline: none;
    border: none;
    resize: none;
    &::placeholder {
      text-align: center;
      vertical-align: middle;
    }
  }
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const UploadDiv = styled.div<any>`
  width: 528px;
  height: 301px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  flex-shrink: 0;
  border-radius: 5px;
  border: ${(props) => (props.$image ? 'none' : '3px dashed #6f99f2')};
  background-image: ${(props) =>
    props.$image ? `url(${props.$image})` : `rgba(255, 255, 255, 0.2)`};
  background-size: 100%;
  background-position: center;
  margin-top: 12px;
  p {
    display: ${(props) => (props.$image ? 'none' : 'block')};
    margin-top: 24px;
    color: #757575;
    font-family: Inter;
    font-size: 14px;
    font-weight: 400;
    z-index: 1;
  }
  img {
    -webkit-user-drag: none;
    -khtml-user-drag: none;
    -moz-user-drag: none;
    -o-user-drag: none;
    -user-drag: none;
    z-index: 10;
  }
  @media screen and (max-width: 768px) {
    width: 332px;
    height: 189px;
    background-color: white;
    border: none;
  }
`;

const ChoiceDiv = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  grid-gap: 8px;
  width: 100%;
  margin-top: 24px;
  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
  }
`;

const Choice = styled.div`
  width: 100%;
  height: 160px;
  border-radius: 5px;
  padding: 10px 0px;
  background: #fff;
  box-shadow: 2px 4px 10px 0px rgba(0, 0, 0, 0.25);
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
  textarea {
    width: 80%;
    height: 100%;
    text-align: start;
    resize: none;
    border-radius: 5px;
    border: none;
    background: #fff;
    padding: 0 16px;
    font-family: 'NanumSquareRound';
    font-size: 16px;
    font-weight: 400;
    color: #757575;
  }
  textarea:focus {
    outline: none;
  }
  input:last-child {
    width: 20%;
    height: 24px;
    border-radius: 5px;
    border: none;
    background: #fff;
    padding: 0 16px;
    font-size: 16px;
    font-weight: 400;
    margin: 0;
    color: #757575;
  }

  input:focus {
    outline: none;
  }
  @media screen and (max-width: 768px) {
    margin: auto;
    width: 100%;
    height: 100px;
  }
`;

const Short = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 30px;
  div {
    display: flex;
    border-radius: 5px;
    background: #fff;
    box-shadow: 2px 4px 10px 0px rgba(0, 0, 0, 0.25);
    width: 534px;
    height: 57px;
    justify-content: space-between;
    align-items: center;
  }
  img {
    width: 32px;
    height: 32px;
    margin-right: 16px;
    cursor: pointer;
  }
  input {
    width: 450px;
    height: 100%;
    border: none;
    padding: 0 24px;
  }
  input:focus {
    outline: none;
  }
  div + div {
    margin-top: 16px;
  }
  button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 534px;
    height: 57px;
    border-radius: 5px;
    background: #fff;
    box-shadow: 2px 4px 10px 0px rgba(0, 0, 0, 0.25);
    border: none;
    margin-top: 16px;
    cursor: pointer;
    font-size: 14px;
    &:hover {
      background: #f4f4f4;
    }
    img {
      width: 20px;
      height: 20px;
      margin-right: 4px;
    }
  }
  @media screen and (max-width: 768px) {
    width: 100%;
    div {
      width: 100%;
    }
    button {
      width: 100%;
    }
  }
`;

const DeleteButton = styled.div`
  width: 32px;
  height: 32px;
  position: relative;
  top: -130px;
  right: -240px;
  cursor: pointer;
  img {
    width: 100%;
    height: 100%;
  }
`;

export const Image = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 5px;
  box-shadow: 2px 4px 10px 0px rgba(0, 0, 0, 0.25);
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

const ChoiceBtn = styled.div`
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

  ${media.tablet`
    min-height: 100px;
    padding: 20px;
  `}
`;

export default EditQuiz;
