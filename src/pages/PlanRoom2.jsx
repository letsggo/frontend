import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; 
import KakaoMap from '../components/KakaoMap'; // KakaoMap 컴포넌트 임포트
import styled from 'styled-components';
import { FaArrowCircleLeft } from "react-icons/fa";
// import TogglePR2 from '../toggleLists/TogglePR2';
//import axios from 'axios';

/*구역 나눔*/
const Container=styled.div`
  display:flex;
  width:100%;
`;
const Top=styled.div`
  display:flex;
  button{
    color:#63CAF4;
    background:none;
    border:none;
    font-size:20px;
  }
  div{
    font-size:18px;
    font-weight:600;
  }
`;
const Left=styled.div`
  width:600px;
  margin-top:-50px;
  margin-left:-90px;
`;
const Middle=styled.div`
  width:570px;
  height:770px;
  border:1px red solid;
  margin-left:30px;
`;
const Right=styled.div`
  width:400px;
  height:770px;
  border:2px #63CAF4 solid;
  border-radius:5px;
  margin-left:30px;
  overflow-y: auto;
  flex-grow: 1;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #D2D2D2;
    border-radius: 6px;
`;
const PlanRoom2 = () => {
  const navigate = useNavigate(); 
  const location = useLocation(); 
  const travelId = location.state?.travelId;

  // const selectedDates = location.state?.selectedDates; // 전달된 날짜 정보 받기
  // const [expandedAccommodation, setExpandedAccommodation] = useState(false);
  // const [expandedCandidates, setExpandedCandidates] = useState(null);
  // const token = localStorage.getItem('token');

  // const handleCompletePlan = () => {
  //   navigate('/planroomresult'); // PlanRoomResult 페이지로 이동
  // };

  // const handleAccommodationClick = () => {
  //   setExpandedAccommodation(prev => !prev);
  //   setExpandedCandidates(null); // 후보군 리스트는 닫기
  // };

  // const handleCandidateClick = (id) => {
  //   setExpandedCandidates(prev => (prev === id ? null : id));
  //   setExpandedAccommodation(false); // 숙소 리스트는 닫기
  // };


  return (
    <Container>
      <Left>
        <Top>
          <button onClick={()=>{navigate('/PlanRoom1',{state:{travelId}})}}><FaArrowCircleLeft /></button>
          <div>투표 다시하기</div>
        </Top>
        <KakaoMap width="100%" height="calc(100vh - 150px)"/>  
      </Left>
      <Middle>
        {/* <TogglePR2 /> */}
      </Middle>
      <Right>
        
      </Right>
    </Container>
  );
};

export default PlanRoom2;