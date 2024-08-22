import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

// 전체
const Container = styled.div`
  width: 90%;
  max-width: 900px;
  margin: 0 auto;
  box-sizing: border-box;
`;

// 알림 리스트 스타일
const NotificationList = styled.div`
  list-style: none;
  padding: 0;
  margin: 0;
`;

// 알림 아이템 스타일
const NotificationItem = styled.div`
  background-color: #f9f9f9;
  border: 3px solid skyblue;
  padding: 15px; /* 패딩 조정 */
  margin-bottom: 15px;
  border-radius: 4px;
  cursor: pointer;
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.2); /* 그림자 효과 */

  &:hover {
    background-color: #e1e1e1;
  }
`;

// 제목 스타일
const Title = styled.h3`
  font-size: 20px;
  margin: 3px 10px;
  color: #333;
`;

// 상세 내용 스타일
const Content = styled.p`
  font-size: 17px;
  margin: 3px 10px;
  color: #666;
`;

function Notice() {
  const navigate = useNavigate();

  // 알림 데이터
  const notifications = [
    {
      id: 1,
      title: '가볼까 회원가입을 축하합니다!',
      content:
        '가볼까 회원가입을 축하합니다. 이제 다양한 여행 계획을 시작해 보세요!',
      url: '/login',
      timestamp: new Date(),
    },
    {
      id: 2,
      title: '첫 여행 계획방 만들기를 축하합니다!',
      content: '함께 여행을 계획 중인 친구들을 초대해보세요!',
      url: '/StartPlanRoom',
      timestamp: new Date() - 1000000,
    },
    // 추가 알림 데이터
  ];

  // 알림 클릭 핸들러
  const handleNotificationClick = (url) => {
    navigate(url);
  };

  return (
    <Container>
      <h2 style={{ marginLeft: '10px' }}>알림</h2>
      <NotificationList>
        {notifications
          .sort((a, b) => b.timestamp - a.timestamp) // 최신 알림이 최상단
          .map((notification) => (
            <NotificationItem
              key={notification.id}
              onClick={() => handleNotificationClick(notification.url)}
            >
              <Title>{notification.title}</Title>
              <Content>{notification.content}</Content>
            </NotificationItem>
          ))}
      </NotificationList>
    </Container>
  );
}

export default Notice;