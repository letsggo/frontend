import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import AddbuttonImage from '../buttonimage/addbutton.png';
import DeletebuttonImage from '../buttonimage/deletebutton.png';
import VectorImage from '../buttonimage/vector.png';
import NextImage from '../buttonimage/nextbutton.png';
import Image1 from '../mapimage/1.png';
import Image2 from '../mapimage/2.png';
import Image3 from '../mapimage/3.png';
import Image4 from '../mapimage/4.png';
import Image5 from '../mapimage/5.png';
import Image6 from '../mapimage/6.png';
import Image7 from '../mapimage/7.png';
import Image8 from '../mapimage/8.png';
import Image9 from '../mapimage/9.png';
import Image10 from '../mapimage/10.png';
import Image11 from '../mapimage/11.png';
import Image12 from '../mapimage/12.png';
import Image13 from '../mapimage/13.png';
import Image14 from '../mapimage/14.png';
import Image15 from '../mapimage/15.png';
import Image16 from '../mapimage/16.png';
import Image17 from '../mapimage/17.png';
import Image18 from '../mapimage/18.png';

const Container = styled.div`
  margin: 0 auto;
  justify-content: center;
  width: 1000px;
  max-width: 1200px;
  height: 850px;
  box-sizing: border-box;
  > h1 {
    margin: 0;
  }
`;

const FlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;
  height: 100%;
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
  height: 48%;
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
  top: 8%;
  transform: translateY(-50%); /* 수직 중앙 정렬 */
  background-size: 30px 30px; /* 이미지 크기 조정 */
  padding: 20px;
  align-items: center;
  border: none;
`;

const SearchResultsContainer = styled.div`
  position: absolute; /* InputContainer 내에서 절대 위치 설정 */
  width: 100%;
  height: 83%;
  max-height: 83%; /* 최대 높이 설정 */
  overflow-y: auto; /* 스크롤 활성화 */
  z-index: 10; /* z-index 추가 */
`;

const SearchResultItem = styled.div`
  display: flex;
  align-items: center; /* 수직 중앙 정렬 */
  border: none;
  box-shadow: 0px 3px 8px rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  padding: 15px;
  margin: 10px;
  cursor: pointer;
  background: #fff;
  transition: background 0.3s ease;
  position: relative;

  &:hover {
    background: #f0f0f0;
  }
`;

const SearchResultImage = styled.img`
  width: 60px;
  height: 60px;
  object-fit: cover; /* 비율 유지하며 잘림 방지 */
  border-radius: 8px;
  margin-right: 10px;
`;

const SearchResultContent = styled.div`
  display: flex;
  flex-direction: column; /* 제목과 설명을 세로 방향으로 배치 */
`;

const SearchResultTitle = styled.h4`
  font-size: 14px;
  margin: 0 0 5px 0;
  color: #333;
`;

const SearchResultDescription = styled.p`
  font-size: 14px;
  margin: 0 0 0 25px;
  color: #666;
`;

const VectorIcon0 = styled.img`
  position: absolute;
  left: 19%;
  top: 68%;
  transform: translateY(-50%);
  width: 16px; /* 아이콘 크기 조정 */
  height: 20px; /* 아이콘 크기 조정 */
`;

//지도//
const StyledMapContainer = styled.div`
  width: 466px;
  height: 676.734px;
  background-size: contain;
  margin-top: 50px;
  border-radius: 8px;
  position: relative; /* 자식 요소들의 절대 위치를 기준으로 설정 */
`;
const MapPiece = styled.img`
  position: absolute;
  width: 50px;
  height: auto;
  cursor: pointer;
  filter: ${({ isSelected }) =>
    isSelected
      ? 'brightness(1.5) sepia(1.7) hue-rotate(5deg) saturate(2)'
      : 'none'};

  &:hover {
    filter: brightness(1.5) sepia(1.7) hue-rotate(5deg) saturate(2); /* 색상을 노란색으로 변경 */
  }
`;
const MapImage1 = styled(MapPiece)`
  top: 51%;
  left: 67.5%;
  width: 32.551px;
  height: 44.668px;
  z-index: 10;
`;
const MapImage2 = styled(MapPiece)`
  top: 29.5%;
  left: 51%;
  width: 194.844px;
  height: 202.12px;
`;
const MapImage3 = styled(MapPiece)`
  top: 0;
  left: 31%;
  width: 263.247px;
  height: 207.967px;
`;
const MapImage4 = styled(MapPiece)`
  top: 62.5%;
  left: 3.5%;
  width: 208.921px;
  height: 167.137px;
`;
const MapImage5 = styled(MapPiece)`
  top: 53.5%;
  left: 45%;
  width: 171.927px;
  height: 165.463px;
`;
const MapImage6 = styled(MapPiece)`
  top: 65.5%;
  left: 76%;
  width: 43.647px;
  height: 50.399px;
`;
const MapImage7 = styled(MapPiece)`
  top: 7.3%;
  left: 16%;
  width: 151.702px;
  height: 172.971px;
`;
const MapImage8 = styled(MapPiece)`
  top: 37.8%;
  left: 30%;
  width: 38.047px;
  height: 47.256px;
  z-index: 10;
`;
const MapImage9 = styled(MapPiece)`
  top: 29.3%;
  left: 8%;
  width: 174.025px;
  height: 152.846px;
`;
const MapImage10 = styled(MapPiece)`
  top: 27.5%;
  left: 38%;
  width: 142.311px;
  height: 166.093px;
`;
const MapImage11 = styled(MapPiece)`
  top: 90.5%;
  left: 0;
  width: 96.646px;
  height: 61.995px;
`;
const MapImage12 = styled(MapPiece)`
  top: 15.5%;
  left: 10.5%;
  width: 77.112px;
  height: 50.411px;
`;
const MapImage13 = styled(MapPiece)`
  top: 57%;
  left: 83%;
  width: 34.402px;
  height: 54.089px;
`;
const MapImage14 = styled(MapPiece)`
  top: 16%;
  left: 25.5%;
  width: 36.926px;
  height: 29.632px;
`;
const MapImage15 = styled(MapPiece)`
  top: 43.3%;
  left: 38%;
  width: 23.386px;
  height: 32.168px;
`;
const MapImage16 = styled(MapPiece)`
  top: 66.8%;
  left: 23.3%;
  width: 26.361px;
  height: 25.989px;
`;
const MapImage17 = styled(MapPiece)`
  top: 49.5%;
  left: 15.5%;
  width: 163.824px;
  height: 110.81px;
`;
const MapImage18 = styled(MapPiece)`
  top: 21.4%;
  left: 93.2%;
  width: 32.773px;
  height: 22.09px;
`;
//등록된숙소
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
  padding: 5px;
  width: 150px;
  height: 250px;
  margin: 5px;
  position: relative; /* 삭제 버튼을 절대 위치로 설정하기 위한 기준 */
  flex-shrink: 0; /* 항목이 축소되지 않도록 설정 */
`;

const ImageContainer = styled.div`
  flex: 0 0 30%;
`;

const Image = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 8px;
`;

const InfoContainer = styled.div`
  flex: 1;
`;

const AccommodationTitle = styled.h3`
  font-size: 14px;
  margin: 5px 0px;
`;

const AccommodationDescription = styled.p`
  display: flex;
  font-size: 12px;
  margin: 5px 0 0 30px;
  color: #666;
`;

const VectorIcon = styled.img`
  background: url(${VectorImage}) no-repeat center center;
  position: absolute;
  left: 1px;
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
  right: -3px;
  top: 7%;
  transform: translateY(-50%); /* 수직 중앙 정렬 */
  background-size: 30px 30px; /* 이미지 크기 조정 */
  padding: 20px;
  align-items: center;
  border: none;
`;

/*페이지 이동 버튼*/
const NextButton = styled.button`
  margin: 40px 0 0 0;
  width: 100%;
  height: 65px;
  background: url(${NextImage}) no-repeat center center;
  background-size: contain; /* 이미지 크기를 버튼 크기에 맞춤 */
  border: none; /* 버튼 테두리 제거 */
  cursor: pointer; /* 커서 모양을 포인터로 변경 */
`;

/* MakePlanRoom2 컴포넌트 */
function MakePlanRoom2() {
  const [accommodation, setAccommodation] = useState('');
  const [registeredAccommodations, setRegisteredAccommodations] = useState([]);
  const [searchResults, setSearchResults] = useState([]); // 검색 결과 상태 추가
  const location = useLocation();
  const navigate = useNavigate();

  const [selectedMapPieces, setSelectedMapPieces] = useState([]); // 선택된 지도 조각들을 상태로 관리

  const handleMapClick = (index) => {
    setSelectedMapPieces(
      (prevSelected) =>
        prevSelected.includes(index)
          ? prevSelected.filter((i) => i !== index) // 이미 선택된 경우 해제
          : [...prevSelected, index] // 선택되지 않은 경우 추가
    );
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `http://43.200.238.249:5000/travel-plans/search?q=${encodeURIComponent(
          accommodation
        )}`
      );
      // 검색 결과를 콘솔에 출력합니다.
      console.log('Search results:', response.data);
      setSearchResults(response.data); // 상태 업데이트
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  const handleAddAccommodation = (item) => {
    setRegisteredAccommodations([
      ...registeredAccommodations,
      {
        name: item.title,
        description: item.address,
        imageUrl: item.firstimage || 'https://via.placeholder.com/150', // 이미지 URL 설정
      },
    ]);
    setAccommodation('');
    setSearchResults([]); // 검색 결과 초기화
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearch(); // 검색 수행
    }
  };

  const handleDeleteAccommodation = (index) => {
    setRegisteredAccommodations((prev) => prev.filter((_, i) => i !== index));
  };

  const handleLink = async () => {
    try {
      const travelId = location.state?.travelId;
      const token = localStorage.getItem('token'); // 토큰을 localStorage에서 가져옵니다

      if (!token) {
        console.error('JWT 토큰이 없습니다');
        return;
      }

      console.log('Travel ID:', travelId); // travelId를 콘솔에 출력합니다

      // 모든 등록된 숙소를 서버로 전송
      await Promise.all(
        registeredAccommodations.map(async (acc) => {
          try {
            const response = await axios.post(
              'http://43.200.238.249:5000/travel-plans/accommodations',
              {
                travel_id: travelId,
                title: acc.name,
                address: acc.description,
                firstimage: acc.imageUrl,
              },
              {
                headers: {
                  Authorization: `Bearer ${token}`, // 실제 JWT 토큰을 Authorization 헤더에 설정합니다
                },
              }
            );
            console.log('숙소가 성공적으로 등록되었습니다:', response.data);
          } catch (err) {
            console.error(
              '숙소 등록 중 오류 발생:',
              err.response ? err.response.data : err.message
            );
          }
        })
      );

      // 선택된 지역을 서버로 전송
      const regionMap = {
        1: '대구광역시',
        2: '경상북도',
        3: '강원도',
        4: '전라남도',
        5: '경상남도',
        6: '부산광역시',
        7: '경기도',
        8: '세종특별자치시',
        9: '충청남도',
        10: '충청북도',
        11: '제주도',
        12: '인천광역시',
        13: '울산광역시',
        14: '서울특별시',
        15: '대전광역시',
        16: '광주광역시',
        17: '전라북도',
        18: '울릉도,독도',
      };

      // 선택된 지역들을 쉼표로 구분된 문자열로 변환
      const selectedRegionsString = selectedMapPieces
        .map((piece) => regionMap[piece])
        .join(', ');

      console.log('선택된 지역:', selectedRegionsString); // 선택된 지역을 콘솔에 출력

      const response = await axios.put(
        `http://43.200.238.249:5000/travel-plans/makeRoom/${travelId}`,
        {
          region: selectedRegionsString,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log('지역이 성공적으로 등록되었습니다:', response.data);
      // 서버로 전송 후 페이지 이동
      navigate('/StartPlanRoom', { state: { travelId } });
    } catch (error) {
      console.error(
        '숙소 및 지역 등록 중 오류 발생:',
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <Container>
      <h1>여행 계획방 만들기 (2/2)</h1>
      <FlexContainer>
        <MapSection>
          <SectionTitle>여행 지역</SectionTitle>
          <div>여행을 예정하는 지역을 모두 선택해주세요</div>
          <StyledMapContainer>
            <MapImage1
              src={Image1}
              isSelected={selectedMapPieces.includes(1)}
              onClick={() => handleMapClick(1)}
            />
            <MapImage2
              src={Image2}
              isSelected={selectedMapPieces.includes(2)}
              onClick={() => handleMapClick(2)}
            />
            <MapImage3
              src={Image3}
              isSelected={selectedMapPieces.includes(3)}
              onClick={() => handleMapClick(3)}
            />
            <MapImage4
              src={Image4}
              isSelected={selectedMapPieces.includes(4)}
              onClick={() => handleMapClick(4)}
            />
            <MapImage5
              src={Image5}
              isSelected={selectedMapPieces.includes(5)}
              onClick={() => handleMapClick(5)}
            />
            <MapImage6
              src={Image6}
              isSelected={selectedMapPieces.includes(6)}
              onClick={() => handleMapClick(6)}
            />
            <MapImage7
              src={Image7}
              isSelected={selectedMapPieces.includes(7)}
              onClick={() => handleMapClick(7)}
            />
            <MapImage8
              src={Image8}
              isSelected={selectedMapPieces.includes(8)}
              onClick={() => handleMapClick(8)}
            />
            <MapImage9
              src={Image9}
              isSelected={selectedMapPieces.includes(9)}
              onClick={() => handleMapClick(9)}
            />
            <MapImage10
              src={Image10}
              isSelected={selectedMapPieces.includes(10)}
              onClick={() => handleMapClick(10)}
            />
            <MapImage11
              src={Image11}
              isSelected={selectedMapPieces.includes(11)}
              onClick={() => handleMapClick(11)}
            />
            <MapImage12
              src={Image12}
              isSelected={selectedMapPieces.includes(12)}
              onClick={() => handleMapClick(12)}
            />
            <MapImage13
              src={Image13}
              isSelected={selectedMapPieces.includes(13)}
              onClick={() => handleMapClick(13)}
            />
            <MapImage14
              src={Image14}
              isSelected={selectedMapPieces.includes(14)}
              onClick={() => handleMapClick(14)}
            />
            <MapImage15
              src={Image15}
              isSelected={selectedMapPieces.includes(15)}
              onClick={() => handleMapClick(15)}
            />
            <MapImage16
              src={Image16}
              isSelected={selectedMapPieces.includes(16)}
              onClick={() => handleMapClick(16)}
            />
            <MapImage17
              src={Image17}
              isSelected={selectedMapPieces.includes(17)}
              onClick={() => handleMapClick(17)}
            />
            <MapImage18
              src={Image18}
              isSelected={selectedMapPieces.includes(18)}
              onClick={() => handleMapClick(18)}
            />
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
            <AddButton onClick={handleSearch}></AddButton>
            <SearchResultsContainer>
              {searchResults.map((item, index) => (
                <SearchResultItem
                  key={index}
                  onClick={() => handleAddAccommodation(item)}
                >
                  <SearchResultImage
                    src={item.firstimage || 'https://via.placeholder.com/60'}
                    alt={item.title}
                  />
                  <SearchResultContent>
                    <SearchResultTitle>{item.title}</SearchResultTitle>
                    <SearchResultDescription>
                      {item.address}
                    </SearchResultDescription>
                  </SearchResultContent>
                  <VectorIcon0 src={VectorImage} alt="Vector Icon" />
                </SearchResultItem>
              ))}
            </SearchResultsContainer>
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
      <NextButton onClick={handleLink}></NextButton>
    </Container>
  );
}

export default MakePlanRoom2;
