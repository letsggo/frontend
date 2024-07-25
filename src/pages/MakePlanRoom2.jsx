import React, { useState } from 'react';
import styled from 'styled-components';

/* 기본 스타일 설정 */
const Container = styled.div`
  width: 90%;
  width: 900px;
  max-width: 1200px;
  margin: 0 auto;
  box-sizing: border-box;
`;

const FlexContainer = styled.div`
  display: flex;
  justify-content: space-between; /* 좌우 공간 균등 배분 */
  gap: 20px; /* 항목 간 간격 */
`;

const MapSection = styled.div`
  flex: 1;
`;

const InfoSection = styled.div`
  flex: 1;
`;

const SectionTitle = styled.h2`
  font-size: 18px;
  margin-bottom: 10px;
`;

const Input = styled.input`
  width: 100%;
  height: 30px;
  font-size: 16px;
  padding: 5px;
  box-sizing: border-box;
`;

const Textarea = styled.textarea`
  width: 100%;
  height: 100px;
  font-size: 16px;
  padding: 5px;
  box-sizing: border-box;
`;

const MapContainer = styled.div`
  width: 100%;
  height: 500px; /* 맵의 높이 설정 */
  background-color: #f0f0f0; /* 기본 배경색 */
  border: 1px solid #ccc; /* 기본 테두리 */
`;

const NextButton = styled.button`
  width: 100%; /* 버튼 너비 확장 */
  height: 50px; /* 버튼 높이 조정 */
  text-align: center;
  font-size: 16px;
  margin-top: 20px;
  border-radius: 30px;
  border: 1px solid #4caf50;
  background-color: #4caf50;
  color: white;
  cursor: pointer;
  outline: none;
  transition: background-color 0.3s ease, border-color 0.3s ease; /* 배경색과 테두리 색상 변화에 애니메이션 추가 */

  &:hover {
    background-color: #45a049;
    border-color: #45a049;
  }
`;

const RegisteredAccommodation = styled.div`
  border: 1px solid #ddd;
  padding: 10px;
  margin-bottom: 10px;
`;

/* MakePlanRoom2 컴포넌트 */
function MakePlanRoom2() {
  const [accommodation, setAccommodation] = useState('');
  const [registeredAccommodations, setRegisteredAccommodations] = useState([]);

  const handleAddAccommodation = () => {
    if (accommodation.trim() === '') return;
    setRegisteredAccommodations([...registeredAccommodations, accommodation]);
    setAccommodation('');
  };

  return (
    <Container>
      <h1>여행 계획방 만들기 (2/2)</h1>
      <FlexContainer>
        <MapSection>
          <SectionTitle>여행 지역</SectionTitle>
          <div>여행을 예정하는 지역을 모두 선택해주세요.</div>
          <MapContainer>
            {/* 카카오맵 또는 다른 맵 라이브러리가 여기에 삽입될 구역입니다 */}
            지도가 표시될 구역
          </MapContainer>
        </MapSection>
        <InfoSection>
          <SectionTitle>숙소</SectionTitle>
          <Input
            type="text"
            value={accommodation}
            onChange={(e) => setAccommodation(e.target.value)}
            placeholder="숙소를 입력하세요."
          />
          <button onClick={handleAddAccommodation}>숙소 추가</button>
          <SectionTitle>등록된 숙소</SectionTitle>
          <div>
            {registeredAccommodations.map((acc, index) => (
              <RegisteredAccommodation key={index}>
                {acc}
              </RegisteredAccommodation>
            ))}
          </div>
        </InfoSection>
      </FlexContainer>
      <NextButton>완료</NextButton>
    </Container>
  );
}

export default MakePlanRoom2;
