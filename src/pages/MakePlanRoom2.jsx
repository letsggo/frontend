import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

/* 기본 스타일 설정 */
const Container = styled.div`
  width: 90%;
  max-width: 1200px;
  margin: 0 auto;
  box-sizing: border-box;
`;

const FlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;
`;

const MapSection = styled.div`
  flex: 1;
`;

const InfoSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column; /* 세로 방향으로 배치 */
`;

const SectionTitle = styled.h2`
  font-size: 18px;
  margin-bottom: 10px;
`;

const InputContainer = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 150px;
`;

const Input = styled.input`
  width: 100%;
  height: 30px;
  font-size: 16px;
  padding: 5px 40px 5px 10px;
  box-sizing: border-box;
  border-radius: 10px;
  border: none;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  outline: none;
`;

const AddButton = styled.button`
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  height: 30px;
  border: none;
  background-color: #4caf50;
  cursor: pointer;
  border-radius: 5px;
  padding: 0 10px;
  font-size: 14px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const MapContainer = styled.div`
  width: 100%;
  height: 500px;
  background-color: #f0f0f0;
  border-radius: 15px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  font-size: 16px;
  color: #888;
`;

const RegisteredListContainer = styled.div`
  flex: 1;
  max-height: 300px; /* 최대 높이를 설정하여 스크롤이 생기도록 함 */
  overflow-y: auto; /* 수직 스크롤 허용 */
  box-sizing: border-box; /* 패딩을 포함하여 높이 계산 */
`;

const RegisteredAccommodation = styled.div`
  display: flex;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 10px;
  margin-bottom: 10px;
  background-color: #fff;
`;

const ImageContainer = styled.div`
  flex: 0 0 30%;
  padding-right: 10px;
`;

const Image = styled.img`
  width: 100%;
  height: auto;
  border-radius: 8px;
`;

const InfoContainer = styled.div`
  flex: 1;
`;

const AccommodationTitle = styled.h3`
  font-size: 16px;
  margin: 0;
`;

const AccommodationDescription = styled.p`
  display: flex;
  font-size: 14px;
  margin: 5px 0 0;
  color: #666;
  position: relative; /* 삭제 버튼을 절대 위치로 설정하기 위한 기준 */
`;

const DeleteButton = styled.button`
  position: absolute;
  top: 10px; /* 오른쪽 상단으로 위치 조정 */
  right: 10px;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  font-size: 14px;
`;

const NextButton = styled.button`
  width: 100%;
  height: 50px;
  text-align: center;
  font-size: 16px;
  margin-top: 20px;
  border-radius: 30px;
  border: 1px solid #4caf50;
  background-color: #4caf50;
  color: white;
  cursor: pointer;
  outline: none;
  transition: background-color 0.3s ease, border-color 0.3s ease;

  &:hover {
    background-color: #45a049;
    border-color: #45a049;
  }
`;

/* MakePlanRoom2 컴포넌트 */
function MakePlanRoom2() {
  const [accommodation, setAccommodation] = useState('');
  const [registeredAccommodations, setRegisteredAccommodations] = useState([]);

  const handleAddAccommodation = () => {
    if (accommodation.trim() === '') return;
    setRegisteredAccommodations([
      ...registeredAccommodations,
      {
        name: accommodation,
        description: '숙소 설명.',
        imageUrl: 'https://via.placeholder.com/150', // 예제 이미지 URL
      },
    ]);
    setAccommodation('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // 엔터 키의 기본 동작을 방지
      handleAddAccommodation();
    }
  };

  const handleDeleteAccommodation = (index) => {
    setRegisteredAccommodations((prev) => prev.filter((_, i) => i !== index));
  };

  const navigate = useNavigate();

  const handleLink = () => {
    navigate('/StartPlanRoom');
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
          <InputContainer>
            <Input
              type="text"
              value={accommodation}
              onChange={(e) => setAccommodation(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="숙소를 입력하세요."
            />
            <AddButton onClick={handleAddAccommodation}>🔍</AddButton>
          </InputContainer>
          <SectionTitle>등록된 숙소</SectionTitle>
          <RegisteredListContainer>
            {registeredAccommodations.map((acc, index) => (
              <RegisteredAccommodation key={index}>
                <ImageContainer>
                  <Image src={acc.imageUrl} alt={acc.name} />
                </ImageContainer>
                <InfoContainer>
                  <AccommodationTitle>{acc.name}</AccommodationTitle>
                  <AccommodationDescription>
                    {acc.description}
                    <DeleteButton
                      onClick={() => handleDeleteAccommodation(index)}
                    >
                      ❌
                    </DeleteButton>
                  </AccommodationDescription>
                </InfoContainer>
              </RegisteredAccommodation>
            ))}
          </RegisteredListContainer>
        </InfoSection>
      </FlexContainer>
      <NextButton onClick={handleLink}>완성하기</NextButton>
    </Container>
  );
}

export default MakePlanRoom2;
