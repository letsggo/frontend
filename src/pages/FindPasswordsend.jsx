import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import styled from 'styled-components';
import SearchIcon from '../assets/images/searchIcon.png';

// Styled components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 50px;
  text-align: center;
  font-family: Arial, sans-serif;
  color: #333;
`;

const Intro = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 50px;
`;

const Title = styled.h1`
  font-size: 35px;
  margin: 0;
`;

const Instruction = styled.p`
  font-size: 20px;
  margin-bottom: 30px;
`;

const EmailContainer = styled.div`
  display: flex;
  padding: 50px 4px;
  flex-direction: column;
  width: 70%;
  margin: 50px 0 30px 0;
  border-radius: 5px;
  border: 1px solid #f08080;
`;
const EmailDisplay = styled.p`
  font-weight: bold;
  color: #f08080;
  font-size: 30px;
  margin-bottom: 30px;
`;

const BackButton = styled(Link)`
  width: 55%;
  height: 55px;
  border: none;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  margin-top: 30px;
  font-size: 20px;
  color: white;
  font-weight: bold;
  background-color: #4ec3f3;

  @media (max-width: 768px) {
    width: 100%;
    height: 8vw;
    font-size: 3.5vw;
  }
`;

const ResendButton = styled.button`
  width: 55%;
  height: 55px;
  border: none;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  margin-top: 30px;
  font-size: 20px;
  color: white;
  font-weight: bold;
  background-color: #4ec3f3;

  @media (max-width: 768px) {
    width: 100%;
    height: 8vw;
    font-size: 3.5vw;
  }
`;

const FindPasswordSend = () => {
  const location = useLocation();
  const email = location.state?.email || '이메일 주소를 확인할 수 없습니다.';

  const handleResendEmail = () => {
    alert(`재전송된 이메일이 ${email}로 전송되었습니다!`);
  };

  return (
    <Container>
      <img src={SearchIcon} alt="로고" style={{ marginBottom: '25px' }} />
      <Intro>
        <p style={{ margin: '', fontSize: '24px', fontWeight: 'bold' }}>
          동행자와 함께 여행 일정을 계획하는
        </p>
        <p
          style={{
            marginLeft: '7px',
            fontSize: '24px',
            fontWeight: 'bold',
            color: '#F08080',
          }}
        >
          실시간 여행 계획
        </p>
        <p style={{ marginLeft: '10px', fontSize: '24px', fontWeight: 'bold' }}>
          플랫폼
        </p>
        <p
          style={{
            margin: '12px 15px',
            fontSize: '32px',
            fontWeight: 'bold',
            color: '#F08080',
          }}
        >
          가볼까
        </p>
      </Intro>
      <Title>비밀번호 재설정 이메일</Title>
      <Title>전송 완료</Title>
      <EmailContainer>
        <EmailDisplay>{email}</EmailDisplay>
        <Instruction>위의 이메일로 전송된 메일을 확인해주세요!</Instruction>
      </EmailContainer>
      <BackButton to="/Home">가볼까 홈으로</BackButton>

      <ResendButton onClick={handleResendEmail}>이메일 재전송</ResendButton>
    </Container>
  );
};

export default FindPasswordSend;
