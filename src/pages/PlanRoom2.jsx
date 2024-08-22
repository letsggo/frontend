import React, { useState } from 'react';
import styled from 'styled-components';
import { FaArrowCircleDown, FaArrowCircleUp, FaPlus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'; // 추가

const Container = styled.div`
  display: flex;
  width: 100%;
`;

const Left = styled.div`
  width: 600px;
  margin-top: -50px;
  margin-left: -90px;
`;

const Middle = styled.div`
  width: 570px;
  height: 770px;
  background-color: #D9D9D9;
  margin-left: 30px;
  display: flex;
  justify-content: flex-start;  
  align-items: flex-start;      
  padding-top: 20px;            
`;

const Right = styled.div`
  width: 400px;
  height: 770px;
  
  border-radius: 5px;
  background-color:#ECECEC;
  margin-left: 30px;
  overflow-y: auto;
  flex-grow: 1;
  padding: 10px;
  position: relative; 

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #d2d2d2;
    border-radius: 6px;
  }
`;

const RouteButton = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #63caf4;
  border: none;
  border-radius: 5px;
  color: white;
  font-size: 16px;
  cursor: pointer;
  margin-bottom: 20px; 
`;

const Section = styled.div`
  margin-bottom: 20px;
`;

const SectionHeader = styled.div`
  background-color: #333;
  color: white;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
`;

const SectionBody = styled.div`
  background-color: #f0f0f0;
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
  padding: 10px;
`;

const Circle = styled.div`
  background-color: #d2d2d2;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 5px;
`;

const Square = styled.div`
  background-color: #d2d2d2;
  width: 80px;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 5px;
`;

const VoteResults = styled.div`
  width: 100%;
`;

const Timeline = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
  position: relative;
  &::before {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    width: 4px;
    background-color: black;
    left: 50%;
    transform: translateX(-50%);
  }
`;

const CircleButton = styled.div`
  background-color: #a0a0a0;
  border-radius: 50%;
  width: 80px;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-weight: bold;
  margin-bottom: 20px;
  position: relative;
  z-index: 1;
`;

const SquareButton = styled.div`
  background-color: #a0a0a0;
  width: 80px;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-weight: bold;
  margin-bottom: 20px;
  position: relative;
  z-index: 1;
`;

const PlusButton = styled.div`
  background-color: white;
  border: 2px solid black;
  border-radius: 5px;
  width: 60px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: black;
  font-weight: bold;
  margin-bottom: 20px;
  position: relative;
  z-index: 1;
  cursor: pointer;
`;

const PlanRoom2 = () => {
  const [openSections, setOpenSections] = useState({});
  const [timelineItems, setTimelineItems] = useState([]);
  const navigate = useNavigate();

  const toggleSection = (section) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleGoToResult = () => {
    navigate('/planroomresult');
  };

  const handleAddToTimeline = (item) => {
    setTimelineItems((prev) => [...prev, item]);
  };

  const handleRightClick = (event, index) => {
    event.preventDefault(); // 기본 컨텍스트 메뉴 방지
    const confirmed = window.confirm('삭제하시겠습니까?');
    if (confirmed) {
      setTimelineItems((prev) => prev.filter((_, i) => i !== index));
    }
  };

  return (
    <Container>
      <Left>
        {/* 다른 컴포넌트 */}
      </Left>
  
      <Middle>
        <VoteResults>
          <h3>투표 결과로 선정된 장소</h3>
          {/* 숙소 리스트 */}
          <Section>
            <SectionHeader onClick={() => toggleSection('section1')}>
              <div>숙소</div>
              {openSections['section1'] ? <FaArrowCircleUp /> : <FaArrowCircleDown />}
            </SectionHeader>
            <SectionBody isOpen={openSections['section1']}>
              <div style={{ display: 'flex' }}>
                <Circle onClick={() => handleAddToTimeline('숙소1')}>숙소1</Circle>
                <Circle onClick={() => handleAddToTimeline('숙소2')}>숙소2</Circle>
              </div>
            </SectionBody>
          </Section>
          {/* 후보군 리스트1 */}
          <Section>
            <SectionHeader onClick={() => toggleSection('section2')}>
              <div>후보군 리스트1</div>
              {openSections['section2'] ? <FaArrowCircleUp /> : <FaArrowCircleDown />}
            </SectionHeader>
            <SectionBody isOpen={openSections['section2']}>
              <div style={{ display: 'flex' }}>
                <Square onClick={() => handleAddToTimeline('장소1')}>장소1</Square>
                <Square onClick={() => handleAddToTimeline('장소2')}>장소2</Square>
                <Square onClick={() => handleAddToTimeline('장소3')}>장소3</Square>
              </div>
            </SectionBody>
          </Section>
          {/* 후보군 리스트2 */}
          <Section>
            <SectionHeader onClick={() => toggleSection('section3')}>
              <div>후보군 리스트2</div>
              {openSections['section3'] ? <FaArrowCircleUp /> : <FaArrowCircleDown />}
            </SectionHeader>
            <SectionBody isOpen={openSections['section3']}>
              <div style={{ display: 'flex' }}>
                <Square onClick={() => handleAddToTimeline('장소4')}>장소4</Square>
                <Square onClick={() => handleAddToTimeline('장소5')}>장소5</Square>
                <Square onClick={() => handleAddToTimeline('장소6')}>장소6</Square>
              </div>
            </SectionBody>
          </Section>
          {/* 후보군 리스트3 */}
          <Section>
            <SectionHeader onClick={() => toggleSection('section4')}>
              <div>후보군 리스트3</div>
              {openSections['section4'] ? <FaArrowCircleUp /> : <FaArrowCircleDown />}
            </SectionHeader>
            <SectionBody isOpen={openSections['section4']}>
              <div style={{ display: 'flex' }}>
                <Square onClick={() => handleAddToTimeline('장소7')}>장소7</Square>
                <Square onClick={() => handleAddToTimeline('장소8')}>장소8</Square>
                <Square onClick={() => handleAddToTimeline('장소9')}>장소9</Square>
              </div>
            </SectionBody>
          </Section>
        </VoteResults>
      </Middle>
      <Right>
        <RouteButton onClick={handleGoToResult}>여행 동선 보러가기</RouteButton>
        <Timeline>
          {timelineItems.map((item, index) => (
            <CircleButton 
              key={index} 
              onContextMenu={(event) => handleRightClick(event, index)}
            >
              {item}
            </CircleButton>
          ))}
          <PlusButton onClick={() => handleAddToTimeline('추가 항목')}>
            <FaPlus />
          </PlusButton>
        </Timeline>
      </Right>
    </Container>
  );
};

export default PlanRoom2;