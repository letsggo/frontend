import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import KakaoMap from '../components/KakaoMap'; // KakaoMap 컴포넌트 임포트
import styled from 'styled-components';
import { FaArrowCircleLeft } from 'react-icons/fa';

const Container = styled.div`
  display: flex;
  width: 100%;
`;
const Top = styled.div`
  display: flex;
  button {
    color: #63caf4;
    background: none;
    border: none;
    font-size: 20px;
  }
  div {
    font-size: 18px;
    font-weight: 600;
  }
`;
const Left = styled.div`
  width: 600px;
  margin-top: -50px;
  margin-left: -90px;
`;
const Middle = styled.div`
  width: 570px;
  height: 770px;
  border: 1px red solid;
  margin-left: 30px;
`;
const Right = styled.div`
  width: 400px;
  height: 770px;
  border: 2px #63caf4 solid;
  border-radius: 5px;
  margin-left: 30px;
  overflow-y: auto;
  flex-grow: 1;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #d2d2d2;
    border-radius: 6px;
  }
`;

// "여행 동선 보러가기" 버튼 스타일
const RouteButton = styled.button`
  background-color: #63caf4;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  margin-top: 20px;

  &:hover {
    background-color: #4da4cf;
  }
`;

const PlanRoom2 = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const travelId = location.state?.travelId;

  // 여행 동선 보러가기 버튼 클릭 핸들러
  const handleGoToResult = () => {
    navigate('/planroomresult', { state: { travelId } }); // PlanRoomResult 페이지로 이동
  };

  return (
    <Container>
      <Left>
        <Top>
          <button
            onClick={() => {
              navigate('/PlanRoom1', { state: { travelId } });
            }}
          >
            <FaArrowCircleLeft />
          </button>
          <div>투표 다시하기</div>
        </Top>
        <KakaoMap width="100%" height="calc(100vh - 150px)" />
      </Left>
      <Middle>{/* <TogglePR2 /> */}</Middle>
      <Right>
        <RouteButton onClick={handleGoToResult}>여행 동선 보러가기</RouteButton>
      </Right>
    </Container>
  );
};

export default PlanRoom2;
