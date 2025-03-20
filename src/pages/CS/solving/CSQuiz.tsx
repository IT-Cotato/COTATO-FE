import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import background from '@assets/bg_waiting.svg';
import mobile from '@assets/bg_waiting_mobile.svg';
import { ReactComponent as Timer } from '@assets/timer.svg';
import api from '@/api/api';
import CSProblem from './CSProblem';
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import BgWinner from './BgWinner';
import {
  ALLOW_SUBMIT_EVENT,
  EXIT_EVENT,
  handleWsMessage,
  MessageType,
  SHOW_KING_EVENT,
  SHOW_PROBLEM_EVENT,
  SHOW_WAITING_EVENT,
  SHOW_WINNER_EVENT,
} from '../admin/upload/utils/handleWsMessage';

//
//
//

interface WaitingProps {
  directToNext?: boolean;
}

//
//
//

const EXIT_TIMEOUT = 4000;
const SOCKET_RETRY_INTERVAL = 1000;
const SOCKET_RETRY_LIMIT = 3;

//
//
//

const CSQuiz: React.FC<WaitingProps> = () => {
  const params = useParams();
  const currentEducationId = params.educationId;

  const webSocket = React.useRef<WebSocket | undefined>(undefined);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const [message, setMessage] = useState<MessageType>({
    status: null,
    start: null,
    quizId: null,
    command: '',
  });
  const [showProblem, setShowProblem] = useState<boolean>(false);
  const [showKingKing, setShowKingKing] = useState<boolean>(false);
  const [showWinner, setShowWinner] = useState<boolean>(false);
  const [allowSubmit, setAllowSubmit] = useState<boolean>(false);
  const [problemId, setProblemId] = useState<number>(0); // = quizId

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [showHeader, setShowHeader] = useState<boolean>(true);

  const socketRetryCount = useRef<number>(0);

  window.addEventListener('mousemove', (e) => {
    if (e.clientY < 150) {
      setShowHeader(true);
    } else {
      setShowHeader(false);
    }
  });

  const navigate = useNavigate();

  useEffect(() => {
    initializeWebSocket();

    return () => {
      webSocket.current?.close(4000, 'disconnect websocket on purpose');

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // webSocket 초기 연결 및 메시지 수신
  const initializeWebSocket = () => {
    issueSocketToken(); // 토큰 발급이 완료된 후에 연결 요청하도록 함수 호출 타이밍 조절
    connectWebSocket();
    receiveMessage();
  };

  // WebSocket 접속을 위한 30초 토큰 발급
  const issueSocketToken = () => {
    api
      .post('/v1/api/socket/token')
      .then((res) => {
        const socketToken = res.data.socketToken;
        localStorage.setItem('socketToken', socketToken);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // WebSocket 연결
  const connectWebSocket = () => {
    webSocket.current = new WebSocket(
      `${process.env.REACT_APP_SOCKET_URL}/websocket/csquiz?Authorization=${localStorage.getItem('socketToken')}&educationId=${
        currentEducationId
      }`,
    );

    webSocket.current.onopen = () => {
      console.log('WebSocket connected');
    };

    webSocket.current.onerror = (error) => {
      console.log('WebSocket.onError', error);
    };

    webSocket.current.onclose = (event: any) => {
      console.log(event);

      if (event.code === 4000) {
        return;
      }

      reconnectWebSocket();
    };
  };

  const reconnectWebSocket = () => {
    console.log('WebSocket disconnected. Attempting to reconnect...');

    console.log('socketRetryCount:', socketRetryCount);

    if (socketRetryCount.current >= SOCKET_RETRY_LIMIT) {
      toast.error('연결에 실패했습니다. 페이지를 새로고침해주세요.');
      return;
    }

    setTimeout(() => {
      socketRetryCount.current += 1;
      initializeWebSocket();
    }, SOCKET_RETRY_INTERVAL);
  };

  // WebSocket 메시지 수신
  const receiveMessage = () => {
    webSocket.current?.addEventListener('message', (event) => {
      try {
        const message = JSON.parse(event.data);
        setMessage(message);
        setProblemId(message.quizId); // 문제 번호 변경을 감지하여 리렌더링 시키기 위함

        switch (handleWsMessage(message)) {
          case SHOW_WAITING_EVENT:
            setShowProblem(false);
            break;

          case SHOW_PROBLEM_EVENT:
            setShowProblem(true);
            setAllowSubmit(false);
            break;

          case ALLOW_SUBMIT_EVENT:
            setShowProblem(true);
            setAllowSubmit(true);
            break;

          case EXIT_EVENT:
            {
              timeoutRef.current = setTimeout(() => {
                navigate('/cs');
              }, EXIT_TIMEOUT);
            }

            break;

          case SHOW_KING_EVENT:
            setShowKingKing(true);
            break;

          case SHOW_WINNER_EVENT:
            setShowWinner(true);
            break;

          default:
            toast.error(message);
            break;
        }
      } catch (error) {
        toast.error(`${error}`);
      }
    });
  };

  /***
   *
   */
  const renderToast = () => {
    return (
      <ToastContainer
        position="bottom-center"
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
    );
  };

  //
  //
  //

  return (
    <Wrapper>
      {!showProblem && (
        <Waiting>
          <Timer style={{ width: '68px' }} />
          <div>곧 문제가 시작됩니다. &nbsp;잠시만 기다려주세요!</div>
        </Waiting>
      )}
      {showProblem && (
        <div className="problem">
          <CSProblem
            message={message}
            quizId={message.quizId}
            submitAllowed={allowSubmit}
            problemId={problemId}
            educationId={
              typeof currentEducationId === 'string'
                ? Number(currentEducationId)
                : currentEducationId
            }
            showKingKing={showKingKing}
            setShowKingKing={setShowKingKing}
          />
        </div>
      )}
      {showWinner && <BgWinner />}
      {renderToast()}
    </Wrapper>
  );
};

export default CSQuiz;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: auto;
  overflow: hidden;
  position: relative;
  .problem {
    display: flex;
    width: 100%;
    background-color: #fff;
    background-size: cover;
    height: auto;
    overflow: visible;
    z-index: 100;
  }
`;

const Waiting = styled.div`
  background: url(${background});
  background-size: cover;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 140px;
  div {
    margin-top: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 680px;
    height: 80px;
    border-radius: 19px;
    background: #fff;
    color: #477feb;
    font-family: NanumSquareRound;
    font-size: 1.2rem;
    font-weight: 700;
  }

  @media screen and (max-width: 392px) {
    background: url(${mobile});
    div {
      width: 360px;
      height: 72px;
      font-size: 1rem;
      border-radius: 8px;
    }
  }
`;
