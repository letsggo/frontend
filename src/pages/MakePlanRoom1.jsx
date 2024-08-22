
import React, { useState, useRef } from 'react';
import ImgUpload from './이미지 업로드.png';
import Calendar from 'react-calendar';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import TimePicker from 'react-time-picker';
import 'react-calendar/dist/Calendar.css';
import 'react-time-picker/dist/TimePicker.css';
import { format } from 'date-fns';
import moment from 'moment';
import axios from 'axios';
import NextImage from '../buttonimage/nextbutton.png';
import DateImage from '../buttonimage/date화살표.png';
import customIcon from '../buttonimage/customicon.png';
/*컨테이너 및 구역 나눔*/
const FullContainner = styled.div`
  margin: 0 auto;
  justify-content: center;
  width: 1000px;
  max-width: 1200px;
  box-sizing: border-box;
`;

const PlanContainer = styled.div`
  display: flex;
  gap: 50px;
`;

const ContentContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const TimeContainer = styled.div`
  flex: 1;
`;

/* PlanTop 및 PlanBottom */
const PlanTop = styled.div`
  display: flex;
  div {
    font-size: 20px;
    font-weight: bold;
  }
`;
const PlanBottom = styled.div`
  display: flex;
  div {
    font-size: 20px;
    font-weight: bold;
  }
`;
/*이미지, 텍스트*/
const Img = styled.img`
  width: 100%;
  height: 300px;
  object-fit: contain;
  cursor: pointer;
  border-radius: 30px;
`;
const Text = styled.div`
  position: relative;
  > div {
    margin: 10px 0;
  }
  > input {
    padding: 10px 20px;
    width: 500px;
    height: 25px;
    font-size: 16px;
    border-radius: 10px;
    border: 2px solid #4ec3f3;
    &::placeholder {
      color: #818181;
      font-weight: bold;
      font-size: 14px;
    }
    &:focus {
      border-color: #4ec3f3;
      outline: none;
    }
  }
  > textarea {
    padding: 20px;
    font-size: 16px;
    cols: 10;
    border-radius: 20px;
    border: 2px solid #4ec3f3;
    width: 500px;
    &::placeholder {
      color: #818181;
      font-weight: 600;
      font-size: 13px;
    }
    &:focus {
      border-color: #4ec3f3;
      outline: none;
    }
  }
`;

const Count = styled.div`
  position: absolute;
  color: #9f9f9f; /* 카운트 색상 */
  pointer-events: none; /* 클릭 방지 */
`;

const TitleCount = styled(Count)`
  top: 12.5%;
  right: 20px;
`;

const ExplainCount = styled(Count)`
  top: 40%;
  right: 20px;
`;

//여행 기간//
const TravelTitle = styled.div`
  font-size: 20px;
  font-weight: bold;
`;

const ToggleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  > div {
    font-size: 16px;
    font-weight: bold;
  }
`;

const ToggleLabel = styled.label`
  margin: 10px 0;
  display: flex;
  align-items: center;
  cursor: pointer;
  > span {
    font-size: 16px;
    font-weight: bold;
  }
`;

const ToggleSwitch = styled.input`
  appearance: none;
  width: 45px;
  height: 18px;
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
    transform: translateX(30px);
    background: #f08080; /* 체크된 상태의 스위치 버튼 색상 변경 */
  }

  &::before {
    content: '';
    position: absolute;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    left: -7px;
    top: -4px;
    background: #f08080; /* 스위치 버튼의 기본 색상 변경 */
    transition: transform 0.2s ease;
  }
`;
/*캘린더*/
const CalendarContainer = styled.div`
  display: flex;
  justify-content: center;
`;
const StyledCalendar = styled(Calendar)`
  border: none; /* 기본 테두리 제거 */
  border-radius: 10px; /* 테두리 반경 설정 */
  background-color: transparent; /* 배경색을 투명으로 설정 */

  .react-calendar {
    border: none; /* React Calendar의 기본 테두리 제거 */
  }

  .react-calendar__tile--now {
    border: 2px solid #f08080; /* 현재 날짜 테두리 설정 */
    border-radius: 50%; /* 현재 날짜의 테두리 반경 설정 */
  }

  .react-calendar__tile--range:not(.react-calendar__tile--start):not(
      .react-calendar__tile--end
    ) {
    background: #f08080; /* 시작일 및 종료일의 배경색 */
    color: white;
    border-radius: 50%; /* 시작일 및 종료일의 둥근 모서리 */
  }

  .react-calendar__tile:hover {
    background: #f08080; /* 날짜 선택 호버시 배경색 설정 */
    border-radius: 50%; /* 호버 시 날짜의 테두리 반경 설정 */
    color: white;
  }
`;
const DateDisplay = styled.div`
  width: 100%;
  heigth: 10px;
  margin: 20px 0px;
  display: flex;
  align-items: center;
  border: 2px solid #f08080;
  border-radius: 10px;
`;
const DateText = styled.p`
  font-size: 15px;
  font-weight: 600;
  margin: 0 47.5px;
  background-color: none;
`;
const Separator = styled.div`
  width: 50px;
  height: 45px;
  background: url(${DateImage}) no-repeat center center;
  background-size: 45px 45px; /* 이미지 크기를 버튼 크기에 맞춤 */
  border: none; /* 버튼 테두리 제거 */
`;

/*시간*/
const TimeDisplay = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  font-size: 15px;
`;
const StyledTimePicker = styled(TimePicker)`
  .react-time-picker__wrapper {
    border: 2px solid #f08080;
    background-color: transparent; /* 수정 */
    border-radius: 10px;
    padding: 8px 15px;
    font-size: 15px;
    position: relative;
  }

  .react-time-picker__inputGroup {
    display: flex;
    align-items: center;
    position: relative;
  }

  .react-time-picker__inputGroup::before {
    content: '';
    position: absolute;
    right: 1px;
    top: 70%;
    transform: translateY(-50%);
    width: 20px;
    height: 20px;
    background-image: url(${customIcon});
    background-size: contain;
    background-repeat: no-repeat;
    cursor: pointer;
  }

  .react-time-picker__clock-button {
    display: none;
  }
`;
/*페이지 이동 버튼*/
const NextButton = styled.button`
  margin: 20px 0px;
  width: 100%;
  height: 60px;
  background: url(${NextImage}) no-repeat center center;
  background-size: contain; /* 이미지 크기를 버튼 크기에 맞춤 */
  border: none; /* 버튼 테두리 제거 */
  cursor: pointer; /* 커서 모양을 포인터로 변경 */
`;

function MakePlanRoom1() {
  const [image, setImage] = useState(ImgUpload);
  const [title, setTitle] = useState(''); // 여행 제목 상태 관리
  const [explain, setExplain] = useState(''); // 여행 설명 상태 관리
  const [dateRange, setDateRange] = useState([new Date(), new Date()]);
  const [startDate, endDate] = dateRange;
  const [startTime, setStartTime] = useState('00:00');
  const [endTime, setEndTime] = useState('00:00');
  const [showTime, setShowTime] = useState(false);
  const [imageFile, setImageFile] = useState(null);

  const timePickerRef = useRef(null);
  const fileInputRef = useRef(null);
  const region = '지역'; // MakePlanRoom2 이전에 미리 초기값 설정 (formData 넘기려고..)
  const status = 1;

  const titleMaxLength = 30;
  const explainMaxLength = 300;

  const handleTitleChange = (e) => {
    if (e.target.value.length <= titleMaxLength) {
      setTitle(e.target.value);
    }
  };

  const handleExplainChange = (e) => {
    if (e.target.value.length <= explainMaxLength) {
      setExplain(e.target.value);
    }
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImageFile(file);
      setImage(URL.createObjectURL(file));
    }
  };

  const onDateChange = (range) => {
    setDateRange(range);
  };

  const handleToggleChange = () => {
    setShowTime(!showTime);
  };

  const navigate = useNavigate();

  const handleLink = async (travelId) => {
    const [startDate, endDate] = dateRange;
    const token = localStorage.getItem('token');
    console.log('JWT Token:', JSON.stringify(token));
    // FormData 생성
    const formData = new FormData();
    formData.append('title', title);
    formData.append('start_date', format(startDate, 'yyyy-MM-dd'));
    formData.append('end_date', format(endDate, 'yyyy-MM-dd'));
    formData.append('explain', explain);
    formData.append('start_time', showTime ? startTime : '00:00');
    formData.append('end_time', showTime ? endTime : '00:00');
    formData.append('region', region); // 추가된 지역
    formData.append('status', status);

    if (image) {
      formData.append('travel_image', imageFile); // 선택된 파일 추가

      try {
        const response = await axios.post(
          'http://43.200.238.249:5000/travel-plans/makeRoom',
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'multipart/form-data',
            },
          }
        );

        const travelId = response.data.travel_id;
        console.log('응답 데이터(FormData):', response.data);
        console.log('여행 계획방 ID:', travelId);

        navigate('/MakePlanroom2', { state: { travelId } });
      } catch (error) {
        console.error(
          '에러 발생:',
          error.response ? error.response.data : error.message
        );
        if (error.response) {
          console.error('서버 응답 오류:', error.response.data);
        }
      }
    }
  };

  const handleIconClick = () => {
    if (timePickerRef.current) {
      timePickerRef.current.openClock(); // 시간 선택 팝업 열기
    }
  };

  return (
    <FullContainner>
      <h1>여행 계획방 만들기 (1/2)</h1>
      <PlanContainer>
        <ContentContainer>
          <PlanTop>
            <div>
              <div>대표 이미지</div>
              <Img
                src={image}
                alt="image_upload"
                id="image_upload"
                onClick={() => {
                  if (fileInputRef.current) {
                    fileInputRef.current.click();
                  } else {
                    console.warn('File input element is null/undefined');
                  }
                }}
              />
              <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                style={{ display: 'none' }}
                onChange={handleImageUpload}
              />
            </div>
          </PlanTop>
          <PlanBottom>
            <Text>
              <div>여행 제목</div>
              <input
                type="text"
                placeholder="여기에 여행 제목을 적어주세요"
                maxLength={30} // 최대 길이 설정
                value={title}
                onChange={handleTitleChange}
              />
              <TitleCount>{title.length} / 30</TitleCount>
              <div>여행 설명</div>
              <textarea
                cols="55"
                rows="10"
                placeholder="여기에 이번 여행이 어떤 여행인지 설명을 적어주세요"
                maxLength={300} // 최대 길이 설정
                value={explain}
                onChange={handleExplainChange}
              />
              <ExplainCount>{explain.length} / 300</ExplainCount>
            </Text>
          </PlanBottom>
        </ContentContainer>
        <TimeContainer>
          <TravelTitle>여행기간</TravelTitle>
          <ToggleContainer>
            <div>날짜를 선택해주세요</div>
            <ToggleLabel>
              <span>시간 설정</span>
              <ToggleSwitch
                type="checkbox"
                checked={showTime}
                onChange={handleToggleChange}
              />
            </ToggleLabel>
          </ToggleContainer>
          <CalendarContainer>
            <StyledCalendar
              selectRange={true}
              onChange={onDateChange}
              value={dateRange}
              calendarType="gregory"
              showNeighboringMonth={false}
              next2Label={null}
              prev2Label={null}
              minDetail="year"
              formatDay={(locale, date) => moment(date).format('D')} // 일 제거 숫자만 보이게
              formatYear={(locale, date) => moment(date).format('YYYY')} // 네비게이션 눌렀을때 숫자 년도만 보이게
              formatMonthYear={(locale, date) =>
                moment(date).format('YYYY. MM')
              }
            />
          </CalendarContainer>
          <DateDisplay>
            <DateText>{format(startDate, 'yyyy. MM. dd')}</DateText>
            <Separator></Separator>
            <DateText>{format(endDate, 'yyyy. MM. dd')}</DateText>
          </DateDisplay>
          {showTime && (
            <TimeDisplay>
              시작 시간
              <StyledTimePicker
                ref={timePickerRef}
                onChange={setStartTime}
                value={startTime}
                format="HH:mm"
                clearIcon={null}
                onClick={handleIconClick}
              />
              종료 시간
              <StyledTimePicker
                ref={timePickerRef}
                onChange={setEndTime}
                value={endTime}
                format="HH:mm"
                clearIcon={null}
              />
            </TimeDisplay>
          )}
        </TimeContainer>
      </PlanContainer>
      <NextButton onClick={handleLink}></NextButton>
    </FullContainner>
  );
}

export default MakePlanRoom1;
