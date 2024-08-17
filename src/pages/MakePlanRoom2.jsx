import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  MapContainer as LeafletMapContainer,
  TileLayer,
  Marker,
  Polyline,
  Popup,
  useMapEvents,
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import AddbuttonImage from '../buttonimage/addbutton.png';
import DeletebuttonImage from '../buttonimage/deletebutton.png';
import VectorImage from '../buttonimage/vector.png';

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
  width: 500px;
`;

const SectionTitle = styled.h2`
  font-size: 18px;
  margin-bottom: 10px;
`;

const InputContainer = styled.div`
  margin: 10px 0px;
  border: 1px solid #4ec3f3;
  border-radius: 20px;
  position: relative;
  width: 100%;
  height: 40%;
`;

const Input = styled.input`
  margin: 10px;
  width: 95%;
  height: 40px;
  font-size: 16px;
  padding: 5px 40px 5px 10px;
  box-sizing: border-box;
  border: none;
  border-bottom: 2px solid #4ec3f3;
  box-shadow: 0px 2px 0px rgba(0, 0, 0, 0.1);
  outline: none;
`;

const AddButton = styled.button`
  background: url(${AddbuttonImage}) no-repeat center center;
  position: absolute;
  right: 10px;
  top: 10%;
  transform: translateY(-50%); /* 수직 중앙 정렬 */
  background-size: 30px 30px; /* 이미지 크기 조정 */
  padding: 20px;
  align-items: center;
  border: none;
`;

const StyledMapContainer = styled.div`
  width: 100%;
  height: 600px;
  background-color: #f0f0f0;
  border-radius: 15px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  font-size: 16px;
  color: #888;
  margin: 10px 0px;
`;

const RegisteredListContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  width: 100%;
  max-width: auto;
  overflow-x: auto;
  overflow-y: hidden;
  box-sizing: border-box;
`;

const RegisteredAccommodation = styled.div`
  display: flex;
  flex-direction: column;
  border: none;
  box-shadow: 0px 3px 8px rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  padding: 10px;
  width: 150px;
  height: 230px;
  margin: 5px;
  position: relative; /* 삭제 버튼을 절대 위치로 설정하기 위한 기준 */
  flex-shrink: 0; /* 항목이 축소되지 않도록 설정 */
`;

const ImageContainer = styled.div`
  flex: 0 0 30%;
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
  margin: 5px 0px;
`;

const AccommodationDescription = styled.p`
  display: flex;
  font-size: 14px;
  margin: 10px 30px;
  color: #666;
`;

const VectorIcon = styled.img`
  background: url(${VectorImage}) no-repeat center center;
  position: absolute;
  left: 4px;
  top: 85%;
  transform: translateY(-50%); /* 수직 중앙 정렬 */
  background-size: 19px 25px; /* 이미지 크기 조정 */
  padding: 18px;
  align-items: center;
  border: none;
`;

const DeleteButton = styled.button`
  background: url(${DeletebuttonImage}) no-repeat center center;
  position: absolute;
  right: 0px;
  top: 8%;
  transform: translateY(-50%); /* 수직 중앙 정렬 */
  background-size: 30px 30px; /* 이미지 크기 조정 */
  padding: 20px;
  align-items: center;
  border: none;
`;

const NextButton = styled.button`
  width: 100%;
  height: 50px;
  text-align: center;
  font-size: 16px;
  margin-top: 20px;
  border-radius: 30px;
  border: 1px solid #4ec3f3;
  background-color: #4ec3f3;
  color: white;
  cursor: pointer;
  outline: none;
  transition: background-color 0.3s ease, border-color 0.3s ease;
`;

// 기본 마커 아이콘 설정
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

// 장소와 동선 데이터 예제
const initialLocations = [
  { id: 1, name: '장소 1', position: [37.5665, 126.978] },
];
const initialRoute = [[37.5665, 126.978]];

/* 지도 이벤트 훅 */
function MapEvents({ onClick }) {
  useMapEvents({
    click(e) {
      onClick(e.latlng);
    },
  });
  return null;
}

/* MakePlanRoom2 컴포넌트 */
function MakePlanRoom2() {
  const [accommodation, setAccommodation] = useState('');
  const [registeredAccommodations, setRegisteredAccommodations] = useState([]);
  const [locations, setLocations] = useState(initialLocations);
  const [route, setRoute] = useState(initialRoute);
  const location = useLocation();
  const navigate = useNavigate();

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

  const handleAddLocation = (latlng) => {
    setLocations([
      ...locations,
      {
        id: locations.length + 1,
        name: `장소 ${locations.length + 1}`,
        position: [latlng.lat, latlng.lng],
      },
    ]);
  };

  const handleLink = () => {
    const travelId = location.state?.travelId; // MakePlanRoom1에서 받은 travelId
    navigate('/StartPlanRoom', { state: { travelId } });
  };

  return (
    <Container>
      <h1>여행 계획방 만들기 (2/2)</h1>
      <FlexContainer>
        <MapSection>
          <SectionTitle>여행 지역</SectionTitle>
          <div>여행을 예정하는 지역을 모두 선택해주세요</div>
          <StyledMapContainer>
            <LeafletMapContainer
              center={[37.5665, 126.978]}
              zoom={15}
              style={{ height: '100%', width: '100%' }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              {locations.map((location) => (
                <Marker key={location.id} position={location.position}>
                  <Popup>{location.name}</Popup>
                </Marker>
              ))}
              <Polyline positions={route} color="blue" />
              <MapEvents onClick={handleAddLocation} />
            </LeafletMapContainer>
          </StyledMapContainer>
        </MapSection>
        <InfoSection>
          <SectionTitle>숙소</SectionTitle>
          <div>숙소가 결정된 경우, 등록해주세요</div>
          <InputContainer>
            <Input
              type="text"
              value={accommodation}
              onChange={(e) => setAccommodation(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="숙소명"
            />
            <AddButton onClick={handleAddAccommodation}></AddButton>
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
                    <VectorIcon />
                    {acc.description}
                    <DeleteButton
                      onClick={() => handleDeleteAccommodation(index)}
                    ></DeleteButton>
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
