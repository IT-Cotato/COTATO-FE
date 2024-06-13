import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import HomeDropDownMenu from './HomeDropDownMenu';
import HamburgerMenu from './HamburgerMenu';
import fetchUserData from '@utils/fetchUserData';
import type { MemberData } from '@/typing/db';

const HomeHeader = () => {
  const { data: userData }: Partial<{ data: MemberData }> = fetchUserData();
  const navigate = useNavigate();

  const NonMemberMenus = () => {
    return (
      <WindowUl>
        <li
          onClick={() => {
            navigate('/');
          }}
        >
          홈
        </li>
        <li
          onClick={() => {
            navigate('/projects');
          }}
        >
          프로젝트
        </li>
        <li
          onClick={() => {
            navigate('/team');
          }}
        >
          팀 멤버
        </li>
        <li
          onClick={() => {
            navigate('/signin');
          }}
        >
          로그인
        </li>
        <li
          onClick={() => {
            navigate('/joinus');
          }}
        >
          Join us
        </li>
      </WindowUl>
    );
  };

  const MemberMenus = () => {
    return (
      <WindowUl>
        <li
          onClick={() => {
            navigate('/');
          }}
        >
          홈
        </li>
        <li
          onClick={() => {
            navigate('/projects');
          }}
        >
          프로젝트
        </li>
        <li
          onClick={() => {
            navigate('/team');
          }}
        >
          팀 멤버
        </li>
        <li
          onClick={() => {
            navigate('/cs');
          }}
        >
          CS 문제풀이
        </li>
        <li
          onClick={() => {
            navigate('/session');
          }}
        >
          세션 기록
        </li>
      </WindowUl>
    );
  };

  return (
    <Wrapper>
      <div className="title">
        <span
          onClick={() => {
            navigate('/');
          }}
        >
          COTATO
        </span>
      </div>

      {userData ? (
        <>
          {MemberMenus()}
          <Profile
            onClick={() => {
              navigate('/mypage');
            }}
          >
            <p>{userData?.memberName}</p>
          </Profile>
        </>
      ) : (
        <>
          {NonMemberMenus()}
          <HomeDropDownMenu />
        </>
      )}
      <HamburgerMenu />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  padding: 30px 40px;
  display: flex;
  align-items: flex-start;
  justify-content: space-around;
  background: transparent;
  z-index: 999;
  position: absolute;
  top: 0;
  .title {
    height: 34px;
    display: flex;
    align-items: flex-start;
    justify-content: center;
  }
  span {
    z-index: 10;
    color: #fff;
    text-align: center;
    font-family: Pretendard;
    font-size: 24px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    letter-spacing: 1.28px;
    cursor: pointer;
  }
  @media screen and (max-width: 960px) {
    padding: 30px 20px;
  }
  @media screen and (max-width: 768px) {
    justify-content: space-between;
    padding: 30px 20px;
  }
`;

const WindowUl = styled.ul`
  display: flex;
  width: 100%;
  justify-content: flex-end;
  flex-direction: row;
  list-style: none;
  margin: 0;
  z-index: 10;
  padding-left: 0;
  li {
    display: flex;
    align-items: center;
    height: 29px;
    color: #fff;
    font-size: 16px;
    font-weight: 400;
    margin-right: 40px;
    z-index: 10;
    font-family: NanumSquareRound;
    &:hover {
      color: #fff;
      font-weight: 600;
    }
    cursor: pointer;
  }
  li + li {
    margin-right: 64px;
  }
  li:first-child {
    margin-right: 80px;
  }

  @media screen and (max-width: 960px) {
    li {
      font-size: 14px;
    }
  }
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const Profile = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 120px;
  height: 36px;
  border-radius: 22px;
  background: linear-gradient(180deg, #6e6cfe 0%, rgba(189, 219, 255, 0.69) 100%);
  cursor: pointer;
  p {
    color: black;
    font-size: 16px;
    font-weight: 800;
  }
  margin-top: -6px;
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export default HomeHeader;
