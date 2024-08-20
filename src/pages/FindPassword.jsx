import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import SearchIcon from '../assets/images/searchIcon.png';

// 이메일 전송 API 호출 함수
const sendEmailApi = async (email) => {
  const response = await fetch('https://jsonplaceholder.typicode.com/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email }),
  });

  if (!response.ok) {
    throw new Error('이메일 전송 실패');
  }

  return response.json();
};

// Styled components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1vw;

  @media (max-width: 768px) {
    padding: 8vw;
  }
`;

const Intro = styled.div`
  display: flex;
  flex-direction: row;
`;

const Title = styled.h1`
  font-size: 40px;
  margin: 80px 0;
`;

const Instruction = styled.p`
  margin: 10px;
  font-size: 27px;
  color: black;
`;

const SubInstruction = styled.p`
  margin: 60px 0 10px 0;
  font-size: 19px;
  font-weight: 600;
  color: black;
`;

const EmailInput = styled.input`
  width: 55%;
  height: 55px;
  background-color: white;
  border: 1px solid #4ec3f3;
  border-radius: 5px;
  padding: 0 5vw;
  box-sizing: border-box;
  outline: none;
  font-size: 20px;
  margin: 10px 0;
`;

const SendEmailButton = styled.button`
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

const Message = styled.p`
  color: ${(props) => (props.error ? 'red' : 'green')};
  margin-top: 20px;
`;

const BackToLogin = styled.p`
  margin-top: 20px;
`;

const Link = styled.a`
  color: #4f4f4f;
  text-decoration: none;
`;

// Main component
const FindPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setError('');
  };

  const handleSubmit = async () => {
    if (!email) {
      setError('이메일 주소를 입력하세요.');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('유효한 이메일 주소를 입력하세요.');
      return;
    }

    setLoading(true);
    setMessage('');
    setError('');

    try {
      await sendEmailApi(email);
      setMessage('비밀번호 재설정 메일이 발송되었습니다.');
      navigate('/find-password-send', { state: { email } });
    } catch (error) {
      setError('이메일 전송 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <img src={SearchIcon} alt="로고" style={{ marginBottom: '30px' }} />
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
      <Title>비밀번호 찾기</Title>
      <Instruction>저런, 비밀번호를 잊으셨나요?</Instruction>
      <Instruction>가볼까가 도와드릴게요!</Instruction>
      <SubInstruction>
        가입한 이메일 주소를 입력하시면, 비밀번호 재설정 메일을 보내드려요!
      </SubInstruction>
      <EmailInput
        type="email"
        placeholder="0000@naver.com"
        value={email}
        onChange={handleEmailChange}
      />
      <SendEmailButton onClick={handleSubmit} disabled={loading}>
        {loading ? '전송 중...' : '이메일 보내기'}
      </SendEmailButton>
      {message && <Message>{message}</Message>}
      {error && <Message error>{error}</Message>}
      <BackToLogin>
        또는 <Link href="/login">로그인 화면으로 돌아가기</Link>
      </BackToLogin>
    </Container>
  );
};

export default FindPassword;
