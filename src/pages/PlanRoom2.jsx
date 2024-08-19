import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; // useLocation 임포트
import KakaoMap from '../components/KakaoMap'; // KakaoMap 컴포넌트 임포트
import { planroomStyle } from '../styles/PlanRoom2style';
/** @jsxImportSource @emotion/react */

const PlanRoom2 = () => {
  const navigate = useNavigate(); // useNavigate 훅 사용
  const location = useLocation(); // useLocation 훅 사용
  const selectedDates = location.state?.selectedDates; // 전달된 날짜 정보 받기
  const [zoomLevel, setZoomLevel] = useState(3); // 기본 줌 레벨 설정
  const [expandedAccommodation, setExpandedAccommodation] = useState(false);
  const [expandedCandidates, setExpandedCandidates] = useState(null);

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 1, 10)); // 최대 줌 레벨 제한
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 1, 1)); // 최소 줌 레벨 제한
  };

  const handleCompletePlan = () => {
    navigate('/planroomresult'); // PlanRoomResult 페이지로 이동
  };

  const handleAccommodationClick = () => {
    setExpandedAccommodation(prev => !prev);
    setExpandedCandidates(null); // 후보군 리스트는 닫기
  };

  const handleCandidateClick = (id) => {
    setExpandedCandidates(prev => (prev === id ? null : id));
    setExpandedAccommodation(false); // 숙소 리스트는 닫기
  };

  return (
    <div css={planroomStyle} className="planroom">
      <h2 className="travel-title">여행 기간: {selectedDates}</h2>
      <KakaoMap zoomLevel={zoomLevel} /> {/* KakaoMap 컴포넌트 추가 */}

      <div className="zoom-controls">
        <button className="zoom-button" onClick={handleZoomIn}>+</button>
        <button className="zoom-button" onClick={handleZoomOut}>-</button>
      </div>

      <div className="info-section">
        <div className="location-info">
          <h3 className="section-title">장소 정보</h3>
          <p className="section-description">드래그하여 원하는 리스트에 담아보세요</p>
          <div className="location-content"></div>
        </div>
        <div className="voice-chat">
          <h3 className="section-title">음성채팅</h3>
          <div className="chat-options">
            <div className="profile">A</div>
            <div className="profile">B</div>
            <div className="profile">C</div>
          </div>
        </div>
      </div>

      <div className="vote-result-place">
        <h2 className="section-title">투표결과로 선정된 장소</h2>
      </div>
      <div className="travel-route">
        <h2 className="section-title">여행동선</h2>
      </div>

      <div className="accommodation-tag" onClick={handleAccommodationClick}>숙소</div>
      {expandedAccommodation && (
        <div className="accommodation-subitems">
          <div className="accommodation-item">숙소 1</div>
          <div className="accommodation-item">숙소 2</div>
        </div>
      )}

      {['후보군리스트1', '후보군리스트2', '후보군리스트3', '후보군리스트4'].map((tag, index) => (
        <div key={index}>
          <div className={`accommodation-tag${index + 2}`} onClick={() => handleCandidateClick(index)}>
            {tag}
          </div>
          {expandedCandidates === index && (
            <div className="accommodation-subitems">
              {[...Array(3)].map((_, subIndex) => (
                <div key={subIndex} className={`accommodation-item${index + 2}`}>
                  장소이름
                </div>
              ))}
            </div>
          )}
        </div>
      ))}

      <button className="add-route-button">+ 여행 동선 추가하기</button>
      <button className="complete-button" onClick={handleCompletePlan}>여행 계획 완료하기</button>
    </div>
  );
};

export default PlanRoom2;