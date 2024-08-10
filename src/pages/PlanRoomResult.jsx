import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import {
  MapContainer as LeafletMapContainer,
  TileLayer,
  Marker,
  Polyline,
  Popup,
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import OutImage from '../buttonimage/outbutton.png';
import prevImage from '../buttonimage/prebutton.png';
import DownImage from '../buttonimage/down.png';
import SaveImage from '../buttonimage/save.png';
import TravelImage from '../buttonimage/travel.png';
import RouteImage from '../buttonimage/route.png';
import html2canvas from 'html2canvas';
import * as XLSX from 'xlsx';
// 전체
const Container = styled.div`
  width: 90%;
  max-width: 1200px;
  margin: 0 auto;
  box-sizing: border-box;
`;
// 상단
const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between; /* 버튼들을 양쪽 끝에 배치 */
  align-items: center;
  margin-bottom: 20px;
`;

const TitleWrapper = styled.div`
  text-align: center;
`;

const Prevbt = styled.button`
  width: 250px;
  height: 100px;
  background: url(${prevImage}) no-repeat center center;
  background-size: contain;
  border: none;
  cursor: pointer;
`;
const Out = styled.button`
  width: 200px; /* 원하는 너비로 조정 */
  height: 50px; /* 원하는 높이로 조정 */
  background: url(${OutImage}) no-repeat center center;
  background-size: contain; /* 이미지 크기를 버튼 크기에 맞춤 */
  border: none; /* 버튼 테두리 제거 */
  cursor: pointer; /* 커서 모양을 포인터로 변경 */
`;

const Title = styled.div`
  font-size: 24px;
  font-weight: bold;
  margin: 20px 0;
  text-align: center;
`;

const Subtitle = styled.div`
  font-size: 18px;
  margin-bottom: 20px;
  text-align: center;
  width: 100%;
`;
// 하단
const FlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;
`;

const MapSection = styled.div`
  flex: 1;
`;

const SectionTitle = styled.h2`
  font-size: 18px;
  margin-bottom: 4px;
`;

const StyledMapContainer = styled.div`
  width: 100%;
  height: 630px;
  background-color: #f0f0f0;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  font-size: 16px;
  color: #888;
`;

const InfoSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const InfoContainer = styled.div``;

const ButtonContainer = styled.div``;

const Button = styled.button`
  color: #d0d0d0;
  margin-top: 10px;
  font-size: 18px;
  border: none;
  cursor: pointer;
  background-color: rgba(0, 0, 0, 0);
  &:hover {
    color: black;
  }
  &.active {
    color: black;
    border-bottom: 5px solid black;
  }
`;

const RouteContainer = styled.div`
  background: url(${TravelImage}) no-repeat center center;
  height: 580px;
  background-size: cover;
  padding: 20px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  border: 1px solid lightgray;
`;

const FlexWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 0px 30px 0px 30px;
  gap: 55px; /* Adjust gap to fit both items and buttons */
`;

const Circle = styled.div`
  position: absolute;
  top: -20px; /* 동그라미 위치 조정 */
  left: 50%;
  transform: translateX(-50%);
  width: 40px;
  height: 40px;
  background-color: #f08080;
  border-radius: 50%;
  z-index: 2;
`;

const Item = styled.div`
  display: ${({ isIncludedInRoute }) => (isIncludedInRoute ? 'flex' : 'none')};
  position: relative; // 상대적 위치 설정
  z-index: 1; // 기본적으로 장소가 다른 요소보다 아래에 표시됨
  margin: 67px 30px; //개별
  order: ${({ order }) => order}; // 순서 설정
`;

const RouteButton = styled.div`
  position: absolute; // 절대 위치로 설정
  right: -90px; // 장소의 오른쪽으로 위치 조정
  top: 50%; // 수직 중앙에 위치
  transform: translateY(-50%); // 수직 중앙 정렬
  width: 50px;
  height: 20px;
  background: url(${RouteImage}) no-repeat center center;
  background-size: contain;
  border: none;
  cursor: pointer;
`;

const BottomWrapper = styled.div`
  display: flex;
  justify-content: space-between; /* 버튼들을 양쪽 끝에 배치 */
`;

const ToggleLabel = styled.label`
  margin-top: 10px;
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const ToggleSwitch = styled.input`
  appearance: none;
  width: 34px;
  height: 20px;
  background: #ccc;
  border-radius: 20px;
  position: relative;
  outline: none;
  cursor: pointer;
  margin-left: 10px;

  &:checked {
    background: #4caf50;
  }

  &:checked::before {
    transform: translateX(14px);
  }

  &::before {
    content: '';
    position: absolute;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: white;
    top: 2px;
    left: 2px;
    transition: transform 0.2s ease;
  }
`;

const Save = styled.button`
  margin-top: 10px;
  width: 40px;
  height: 40px;
  background: url(${SaveImage}) no-repeat center center;
  background-size: contain;
  border: none;
  cursor: pointer;
`;

const Modal = styled.div`
  display: ${(props) => (props.open ? 'block' : 'none')};
  position: fixed;
  top: 70%;
  left: 80%;
  transform: translate(-50%, -50%);
  width: 400px;
  padding: 20px;
  background: #2c2c2c;
  font-size: 14px;
  color: white;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  text-align: center;
`;

const ModalButton = styled.button`
  margin-right: 10px;
  background: white;
  color: #2c2c2c;
  border: 1px solid #2c2c2c;
  border-radius: 20px; /* 둥근 가장자리 */
  padding: 10px 20px;
  font-size: 14px;
  cursor: pointer;
  transition: background 0.3s, color 0.3s;
`;

const DownImageContainer = styled.div`
  display: ${(props) => (props.show ? 'flex' : 'none')};
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 300px;
  height: 300px;
  background: url(${DownImage}) no-repeat center center;
  background-size: contain;
  z-index: 1000;
`;

// 기본 마커 아이콘 설정
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

// 장소와 동선 데이터 예제
const locations = [
  { id: 1, name: '숙소 ', position: [37.5665, 126.978] },
  { id: 2, name: '여행지 1', position: [37.5651, 126.9895] },
  { id: 3, name: '여행지 2', position: [37.568, 126.98] },
  { id: 4, name: '여행지 3', position: [37.57, 126.983] },
  { id: 5, name: '여행지 4', position: [37.57, 126.988] },
  { id: 6, name: '여행지 5', position: [37.572, 126.99] },
  { id: 7, name: '여행지 6', position: [37.573, 126.992] },
];

const routes = {
  1: [
    [37.5665, 126.978],
    [37.5651, 126.9895],
    [37.568, 126.98],
    [37.57, 126.983],
    [37.57, 126.988],
    [37.572, 126.99],
    [37.573, 126.992],
  ],
  2: [
    [37.5665, 126.978],
    [37.5651, 126.9895],
    [37.568, 126.98],
  ],
  // 추가 동선 데이터
};

const openDirections = (start, end) => {
  const startPoint = start.join(',');
  const endPoint = end.join(',');
  // 구글 맵에서 길찾기
  const url = `https://www.google.com/maps/dir/?api=1&origin=${startPoint}&destination=${endPoint}`;
  window.open(url, '_blank');
};

function PlanRoomResult() {
  const [activeRoute, setActiveRoute] = useState(null);
  const [showTime, setShowTime] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [showDownImage, setShowDownImage] = useState(false);

  useEffect(() => {
    let timer;
    if (showDownImage) {
      timer = setTimeout(() => {
        setShowDownImage(false);
      }, 1000);
    }
    return () => clearTimeout(timer); // Cleanup the timer on component unmount
  }, [showDownImage]);

  const handleRouteClick = (routeId) => {
    setActiveRoute(routeId);
  };

  const handleToggleChange = () => {
    setShowTime(!showTime);
  };

  // 동선에 포함된 여행지만 필터링
  const activeRouteLocations = activeRoute
    ? routes[activeRoute].map((point) =>
        locations.find(
          (loc) => loc.position[0] === point[0] && loc.position[1] === point[1]
        )
      )
    : [];

  const navigate = useNavigate();

  const handleOutClick = () => {
    navigate('/Home');
  };

  const handlePrevLink = () => {
    navigate('/MakePlanRoom1');
  };

  const handleSaveClick = () => {
    setIsModalOpen(true);
  };

  const handleSaveAsImage = () => {
    const element = document.querySelector('#map-container'); // 캡처할 요소 선택
    html2canvas(element).then((canvas) => {
      const dataURL = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = dataURL;
      link.download = 'travel-plan.png';
      link.click();
    });
    setIsSaved(true);
    setIsModalOpen(false);
    setShowDownImage(true);
  };

  const handleSaveAsExcel = () => {
    // 현재 활성화된 동선에 포함된 여행지만 필터링
    const filteredLocations = activeRoute
      ? locations.filter((location) =>
          routes[activeRoute].some(
            (point) =>
              point[0] === location.position[0] &&
              point[1] === location.position[1]
          )
        )
      : locations;

    // 엑셀 파일에 포함할 데이터 생성
    const data = filteredLocations.map((location) => ({
      ID: location.id,
      Name: location.name,
    }));

    // 워크북 및 워크시트 생성
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Locations');

    // 엑셀 파일 생성 및 다운로드
    XLSX.writeFile(wb, 'travel-plan.xlsx');

    setIsSaved(true);
    setIsModalOpen(false);
    setShowDownImage(true);
  };

  //장소위치조정
  const getOrder = (index) => {
    const itemsPerLine = 3;
    const lineNumber = Math.floor(index / itemsPerLine);

    // 3번째 위치부터 오른쪽 정렬
    if (lineNumber >= 1) {
      if (lineNumber % 2 === 0) {
        // 짝수 번째 줄 (3, 5, 7, ...)
        return itemsPerLine - (index % itemsPerLine); // 오른쪽부터 정렬
      } else {
        // 홀수 번째 줄 (4, 6, 8, ...)
        return index % itemsPerLine; // 왼쪽부터 정렬
      }
    }

    // 첫 번째 줄은 중앙 정렬
    return index;
  };

  return (
    <Container>
      <HeaderWrapper>
        <Prevbt onClick={handlePrevLink} />
        <TitleWrapper>
          <Title>국내 여행 제목</Title>
          <Subtitle>2024/04/04 ~ 2024/04/06</Subtitle>
        </TitleWrapper>
        <Out onClick={handleOutClick} />
      </HeaderWrapper>
      <FlexContainer>
        <MapSection>
          <SectionTitle>여행 장소</SectionTitle>
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
                  {location.name && <Popup>{location.name}</Popup>}
                </Marker>
              ))}
              {activeRoute && (
                <Polyline
                  positions={routes[activeRoute]}
                  color="blue"
                  weight={5}
                />
              )}
            </LeafletMapContainer>
          </StyledMapContainer>
        </MapSection>
        <InfoSection>
          <InfoContainer id="map-container">
            <ButtonContainer>
              <Button
                onClick={() => handleRouteClick(1)}
                className={activeRoute === 1 ? 'active' : ''}
              >
                여행 동선 1
              </Button>
              <Button
                onClick={() => handleRouteClick(2)}
                className={activeRoute === 2 ? 'active' : ''}
              >
                여행 동선 2
              </Button>
              {/* 추가 동선 버튼 */}
            </ButtonContainer>
            <RouteContainer>
              {activeRoute && (
                <FlexWrap>
                  {activeRouteLocations.map((location, index) => {
                    const isIncludedInRoute = location !== undefined;
                    return (
                      <React.Fragment key={location.id}>
                        <Item
                          isIncludedInRoute={isIncludedInRoute}
                          order={getOrder(index)} // 순서 설정
                        >
                          <Circle />
                          <p style={{ position: 'relative', top: '10px' }}>
                            {location.name}
                          </p>
                          {showTime &&
                            index < activeRouteLocations.length - 1 && (
                              <RouteButton
                                onClick={() =>
                                  openDirections(
                                    activeRouteLocations[index].position,
                                    activeRouteLocations[index + 1].position
                                  )
                                }
                              />
                            )}
                        </Item>
                      </React.Fragment>
                    );
                  })}
                </FlexWrap>
              )}
            </RouteContainer>
          </InfoContainer>
          <BottomWrapper>
            <ToggleLabel>
              <span>길찾기</span>
              <ToggleSwitch
                type="checkbox"
                checked={showTime}
                onChange={handleToggleChange}
              />{' '}
            </ToggleLabel>
            <Save onClick={handleSaveClick}></Save>
          </BottomWrapper>
        </InfoSection>
      </FlexContainer>
      <Modal open={isModalOpen}>
        <h2>여행 동선을 저장할 방법을 선택해주세요!</h2>
        <ModalButton onClick={handleSaveAsImage}>사진으로 저장</ModalButton>
        <ModalButton onClick={handleSaveAsExcel}>엑셀로 저장</ModalButton>
      </Modal>
      <DownImageContainer show={showDownImage} />
    </Container>
  );
}

export default PlanRoomResult;
