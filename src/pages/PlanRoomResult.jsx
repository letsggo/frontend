import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import OutImage from '../buttonimage/outbutton.png';
import prevImage from '../buttonimage/prebutton.png';
import DownImage from '../buttonimage/down.png';
import ExdownImage from '../buttonimage/exdown.png';
import SaveImage from '../buttonimage/save.png';
import TravelImage from '../buttonimage/travel.png';
import RouteImage from '../buttonimage/route.png';
import html2canvas from 'html2canvas';
import * as XLSX from 'xlsx';
import KakaoMap from '../components/KakaoMap'; // KakaoMap 컴포넌트 임포트

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
    background: white; /* 체크된 상태의 배경색 변경 */
  }

  &:checked::before {
    transform: translateX(20px);
    background: #f08080; /* 체크된 상태의 스위치 버튼 색상 변경 */
  }

  &::before {
    content: '';
    position: absolute;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    left: -5px;
    top: -2px;
    background: #f08080; /* 스위치 버튼의 기본 색상 변경 */
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

function PlanRoomResult() {
  const [activeRoute, setActiveRoute] = useState(1);
  const [showTime, setShowTime] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isExcelDownload, setIsExcelDownload] = useState(false);
  const [isImageDownload, setIsImageDownload] = useState(false);
  const location = useLocation();
  const [travelPlan, setTravelPlan] = useState(null);
  const [routes, setRoutes] = useState([]);

  useEffect(() => {
    const fetchTravelPlan = async () => {
      try {
        const travelId = location.state?.travelId;
        const token = localStorage.getItem('token');

        if (!token) {
          console.error('JWT 토큰이 없습니다');
          return;
        }

        const response = await axios.get(
          `http://43.200.238.249:5000/travel-plans/makeRoom/${travelId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setTravelPlan(response.data);
      } catch (error) {
        console.error(
          '여행 계획 데이터 가져오기 오류:',
          error.response ? error.response.data : error.message
        );
      }
    };

    fetchTravelPlan();
  }, [location.state]);

  useEffect(() => {
    const fetchTravelRoutes = async () => {
      try {
        const travelId = location.state?.travelId;
        const routeTitle = '여행 첫날';
        const token = localStorage.getItem('token');

        if (!token) {
          console.error('JWT 토큰이 없습니다');
          return;
        }

        const response = await axios.get(
          `http://43.200.238.249:5000/travel/travel-plans/routes/${travelId}/${routeTitle}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setRoutes(response.data.routes);
      } catch (error) {
        console.error('여행 동선 데이터 가져오기 오류:', error);
      }
    };

    fetchTravelRoutes();
  }, [location.state]);

  const combinedLocations = [...routes.flat()];

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

  const activeRouteLocations =
    (routes[activeRoute] && routes[activeRoute].locations) || [];

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
    // Create a new workbook
    const wb = XLSX.utils.book_new();

    // Check if there are any routes
    if (routes.length === 0) {
      // Create a worksheet with a message if no routes are available
      const ws = XLSX.utils.json_to_sheet([{ Message: '동선이 없습니다' }]);

      // Add the worksheet to the workbook
      XLSX.utils.book_append_sheet(wb, ws, 'No Routes');
    } else {
      // Iterate over each route and create a sheet for each route
      routes.forEach((route, routeIndex) => {
        // Prepare data for the sheet
        const data = route.map((place) => ({
          Order: place.route_order,
          Title: place.route_title, // Adding the title column
          Name: place.place_name,
          Address: place.place_address,
        }));

        // Create a worksheet
        const ws = XLSX.utils.json_to_sheet(data);

        // Add the worksheet to the workbook
        XLSX.utils.book_append_sheet(
          wb,
          ws,
          `Route ${routeIndex + 1} - ${
            route[0]?.route_title || 'Unknown Title'
          }`
        );
      });
    }

    // Save the workbook
    XLSX.writeFile(wb, 'travel-plan.xlsx');

    setIsModalOpen(false);
    setIsExcelDownload(true);
  };

  return (
    <Container>
      <HeaderWrapper>
        <Prevbt onClick={handlePrevLink} />
        <TitleWrapper>
          <Title>{travelPlan ? travelPlan.title : '국내 여행 제목'}</Title>
          <Subtitle>
            {travelPlan
              ? `${travelPlan.start_date.slice(
                  0,
                  10
                )} ~ ${travelPlan.end_date.slice(0, 10)}`
              : '날짜를 가져오는 중...'}
          </Subtitle>
        </TitleWrapper>
        <Out onClick={handleOutClick} />
      </HeaderWrapper>
      <FlexContainer>
        <MapSection>
          <SectionTitle>여행 장소</SectionTitle>
          <StyledMapContainer>
            <KakaoMap
              center={{ lat: 37.5665, lng: 126.978 }} // 기본 위치 설정
              zoom={15} // 기본 줌 레벨
              locations={combinedLocations} // 위치 데이터
              route={routes[activeRoute]} // 현재 활성화된 동선
              width="600px"
              height="620px"
            />
          </StyledMapContainer>
        </MapSection>
        <InfoSection>
          <InfoContainer id="map-container">
            <ButtonContainer>
              {routes.length > 0
                ? routes.map((route, index) => (
                    <Button
                      key={index}
                      onClick={() => handleRouteClick(index)}
                      className={activeRoute === index ? 'active' : ''}
                    >
                      {route.route_title || ` ${index + 1}`}
                    </Button>
                  ))
                : Array.from({ length: 3 }, (_, index) => (
                    <Button
                      key={index}
                      onClick={() => handleRouteClick(index)}
                      className={activeRoute === index ? 'active' : ''}
                    >
                      {`여행동선 ${index + 1}`}
                    </Button>
                  ))}
            </ButtonContainer>
            <RouteContainer>
              {activeRoute !== null && (
                <FlexWrap>
                  {activeRouteLocations.map((location, index) => {
                    const isIncludedInRoute = location !== undefined;

                    return (
                      isIncludedInRoute && ( // Only render if location is included in route
                        <Item
                          key={location.id}
                          isIncludedInRoute={isIncludedInRoute}
                          order={index + 1}
                        >
                          <Circle />
                          <p
                            style={{
                              position: 'relative',
                              top: '10px',
                              fontWeight: '600',
                            }}
                          >
                            {location.name}
                          </p>
                          {showTime &&
                            index < activeRouteLocations.length - 1 && (
                              <p>{/* 시간 표시 로직 */}</p>
                            )}
                        </Item>
                      )
                    );
                  })}
                </FlexWrap>
              )}
            </RouteContainer>
          </InfoContainer>
          <BottomWrapper>
            <ToggleLabel>
              <span style={{ fontWeight: 'bold' }}>길찾기</span>
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
      <DownImageContainer show={isImageDownload} />
      <ExdownImageContainer show={isExcelDownload} />
    </Container>
  );
}

export default PlanRoomResult;
