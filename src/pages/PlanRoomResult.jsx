import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';
import html2canvas from 'html2canvas';
import * as XLSX from 'xlsx';
import KakaoMap from '../components/KakaoMap';

import OutImage from '../buttonimage/outbutton.png';
import prevImage from '../buttonimage/prebutton.png';
import DownImage from '../buttonimage/down.png';
import ExdownImage from '../buttonimage/exdown.png';
import SaveImage from '../buttonimage/save.png';
import TravelImage from '../buttonimage/travel.png';
import RouteImage from '../buttonimage/route.png';

const Container = styled.div`
  width: 90%;
  max-width: 1200px;
  margin: 0 auto;
  box-sizing: border-box;
`;

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
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
  margin-left: 150px;
  width: 50px;
  height: 50px;
  background: url(${OutImage}) no-repeat center center;
  background-size: contain;
  border: none;
  cursor: pointer;
`;

const Title = styled.div`
  font-size: 40px;
  font-weight: 600;
  margin: 20px 0;
  text-align: center;
`;

const Subtitle = styled.div`
  font-size: 21px;
  margin-bottom: 20px;
  font-weight: 500;
  text-align: center;
  width: 100%;
`;

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
  height: 620px;
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
  font-weight: 600;
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
  gap: 55px;
`;

const Circle = styled.div`
  position: absolute;
  top: -20px;
  left: 50%;
  transform: translateX(-50%);
  width: 40px;
  height: 40px;
  background-color: #f08080;
  border-radius: 50%;
  z-index: 2;
`;

const Item = styled.div`
  display: flex;
  position: relative;
  z-index: 1;
  margin: 67px 30px;
  order: ${({ order }) => order};
`;

const RouteButton = styled.div`
  position: absolute;
  right: -90px;
  top: 50%;
  transform: translateY(-50%);
  width: 50px;
  height: 20px;
  background: url(${RouteImage}) no-repeat center center;
  background-size: contain;
  border: none;
  cursor: pointer;
`;

const BottomWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ToggleLabel = styled.label`
  margin-top: 10px;
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const ToggleSwitch = styled.input`
  appearance: none;
  width: 40px;
  height: 20px;
  background: white;
  border-radius: 20px;
  border: 1px solid #f08080;
  position: relative;
  outline: none;
  cursor: pointer;
  margin-left: 10px;

  &:checked {
    background: white;
  }

  &:checked::before {
    transform: translateX(20px);
    background: #f08080;
  }

  &::before {
    content: '';
    position: absolute;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    left: -5px;
    top: -2px;
    background: #f08080;
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
  top: 80%;
  left: 70%;
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
  border-radius: 20px;
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

const ExdownImageContainer = styled.div`
  display: ${(props) => (props.show ? 'flex' : 'none')};
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 300px;
  height: 300px;
  background: url(${ExdownImage}) no-repeat center center;
  background-size: contain;
  z-index: 1000;
`;

const testLocations = [
  {
    id: '1',
    name: '서울타워',
    lat: 37.5512,
    lng: 126.9881,
    address: '서울특별시 용산구 남산공원길 105',
  },
  {
    id: '2',
    name: '경복궁',
    lat: 37.5789,
    lng: 126.9769,
    address: '서울특별시 종로구 세종로 1-1',
  },
  {
    id: '3',
    name: '명동',
    lat: 37.5636,
    lng: 126.9827,
    address: '서울특별시 중구 명동2가',
  },
  {
    id: '4',
    name: '동대문 디자인 플라자',
    lat: 37.5665,
    lng: 127.009,
    address: '서울특별시 중구 을지로 281',
  },
  {
    id: '5',
    name: '이태원',
    lat: 37.5345,
    lng: 126.9944,
    address: '서울특별시 용산구 이태원동',
  },
  {
    id: '6',
    name: '한강 공원',
    lat: 37.5207,
    lng: 126.9936,
    address: '서울특별시 영등포구 여의도동 84-1',
  },
  {
    id: '7',
    name: '북촌 한옥마을',
    lat: 37.5827,
    lng: 126.983,
    address: '서울특별시 종로구 계동길 37',
  },
  {
    id: '8',
    name: '삼청동 카페거리',
    lat: 37.5859,
    lng: 126.9816,
    address: '서울특별시 종로구 삼청동',
  },
];

const dummyRoutes = [
  {
    route_title: '여행 첫날',
    locations: [testLocations[0], testLocations[1], testLocations[2],testLocations[3], testLocations[4], testLocations[5], testLocations[7]],
  },
  {
    route_title: '여행 둘째날',
    locations: [testLocations[0], testLocations[1],testLocations[3], testLocations[4], testLocations[5], testLocations[7]],
  },
  {
    route_title: '여행 셋째날',
    locations: [testLocations[6], testLocations[7],testLocations[1], testLocations[2],testLocations[3],],
  },
];

function PlanRoomResult() {
  const [activeRoute, setActiveRoute] = useState(0);
  const [showTime, setShowTime] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isExcelDownload, setIsExcelDownload] = useState(false);
  const [isImageDownload, setIsImageDownload] = useState(false);
  const location = useLocation();
  const [travelPlan, setTravelPlan] = useState({
    title: '서울 여행',
    start_date: '2024-08-22',
    end_date: '2024-08-25',
  });
  const [routes, setRoutes] = useState(dummyRoutes);

  const handleRouteButtonClick = (startLocation, endLocation) => {
    const url = `https://www.google.com/maps/dir/?api=1&origin=${startLocation.lat},${startLocation.lng}&destination=${endLocation.lat},${endLocation.lng}`;
    window.open(url, '_blank');
  };

  const handleRouteClick = (routeId) => {
    setActiveRoute(routeId);
  };

  const handleToggleChange = () => {
    setShowTime(!showTime);
  };

  useEffect(() => {
    let timer;
    if (isImageDownload) {
      timer = setTimeout(() => {
        setIsImageDownload(false);
      }, 1000);
    }
    return () => clearTimeout(timer);
  }, [isImageDownload]);

  useEffect(() => {
    let timer;
    if (isExcelDownload) {
      timer = setTimeout(() => {
        setIsExcelDownload(false);
      }, 1000);
    }
    return () => clearTimeout(timer);
  }, [isExcelDownload]);

  const activeRouteLocations = routes[activeRoute]?.locations || [];

  const navigate = useNavigate();

  const handleOutClick = () => {
    navigate('/Home');
  };

  const handlePrevLink = () => {
    navigate('/MakePlanRoom1');
  };

  const handleSaveClick = () => {
    setIsModalOpen((prevState) => !prevState);
  };

  const handleSaveAsImage = () => {
    const mapContainer = document.querySelector('#map-container');
    html2canvas(mapContainer).then((canvas) => {
      const dataURL = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = dataURL;
      link.download = 'travel-plan.png';
      link.click();
    });
    setIsModalOpen(false);
    setIsImageDownload(true);
  };

  const handleSaveAsExcel = () => {
    const wb = XLSX.utils.book_new();

    routes.forEach((route, routeIndex) => {
      const data = route.locations.map((place) => ({
        Order: routeIndex + 1,
        Title: route.route_title,
        Name: place.name,
        Address: place.address,
      }));

      const ws = XLSX.utils.json_to_sheet(data);
      XLSX.utils.book_append_sheet(wb, ws, `Route ${routeIndex + 1}`);
    });

    XLSX.writeFile(wb, 'travel-plan.xlsx');

    setIsModalOpen(false);
    setIsExcelDownload(true);
  };

  return (
    <Container>
      <HeaderWrapper>
        <Prevbt onClick={handlePrevLink} />
        <TitleWrapper>
          <Title>{travelPlan.title}</Title>
          <Subtitle>
            {`${travelPlan.start_date} ~ ${travelPlan.end_date}`}
          </Subtitle>
        </TitleWrapper>
        <Out onClick={handleOutClick} />
      </HeaderWrapper>
      <FlexContainer>
        <MapSection>
          <SectionTitle>여행 장소</SectionTitle>
          <StyledMapContainer>
            <KakaoMap
              center={{ lat: 37.5512, lng: 126.9881 }}
              zoom={7}
              locations={routes.flatMap((route) => route.locations)}
              width="600px"
              height="620px"
            />
          </StyledMapContainer>
        </MapSection>
        <InfoSection>
          <InfoContainer id="map-container">
            <ButtonContainer>
              {routes.map((route, index) => (
                <Button
                  key={index}
                  onClick={() => handleRouteClick(index)}
                  className={activeRoute === index ? 'active' : ''}
                >
                  {route.route_title}
                </Button>
              ))}
            </ButtonContainer>
            <RouteContainer>
              <FlexWrap>
                {activeRouteLocations.map((location, index) => (
                  <Item key={location.id} order={index + 1}>
                    <Circle
                      style={{
                        backgroundColor: index === 0 ? '#FFD700' : 'default',
                      }}
                    />
                    <p
                      style={{
                        position: 'relative',
                        top: '10px',
                        fontWeight: '600',
                      }}
                    >
                      {location.name}
                    </p>
                    {showTime && index < activeRouteLocations.length - 1 && (
                      <RouteButton
                        onClick={() =>
                          handleRouteButtonClick(
                            activeRouteLocations[index],
                            activeRouteLocations[index + 1]
                          )
                        }
                      />
                    )}
                  </Item>
                ))}
              </FlexWrap>
            </RouteContainer>
          </InfoContainer>
          <BottomWrapper>
            <ToggleLabel>
              <span style={{ fontWeight: 'bold' }}>길찾기</span>
              <ToggleSwitch
                type="checkbox"
                checked={showTime}
                onChange={handleToggleChange}
              />
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
      <DownImageContainer show={isImageDownload} />
      <ExdownImageContainer show={isExcelDownload} />
    </Container>
  );
}

export default PlanRoomResult;
