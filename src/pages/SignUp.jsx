import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import InputSignup from '../styles/input-signup'; // 사용자 정의 입력 컴포넌트
import SearchIcon from '../assets/images/searchIcon.png';
import { useNavigate } from 'react-router-dom';

const API_URL = 'http://43.200.238.249:5000/users/user'; // 서버 URL

const LogoImage = styled.img`
  width: 280px;
  height: auto;
  margin-bottom: 10px;
`;

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 4vw;

  @media (max-width: 768px) {
    padding: 8vw;
  }
`;

const Intro = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 30px;
`;

const SignupTitle = styled.h1`
  font-size: 35px;
  color: black;
  font-weight: bold;
  margin-top: 2vw;

  @media (max-width: 768px) {
    font-size: 6vw;
    margin-top: 5vw;
  }
`;

const SignupButton = styled.button`
  width: 70%;
  height: 55px;
  border: none;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  margin-top: 20px;
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

const TermsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 70%;
  margin-top: 1vw;
`;

const TermsCheckbox = styled.input.attrs({ type: 'checkbox' })`
  appearance: none; /* 기본 체크박스 스타일 제거 */
  width: 20px; /* 동그라미 크기 설정 */
  height: 20px;
  border-radius: 50%; /* 동그라미 모양으로 설정 */
  border: 2px solid #4ec3f3; /* 동그라미 테두리 색상 설정 */
  outline: none; /* 포커스 시 테두리 제거 */
  margin-right: 10px;
  /* 체크 상태 스타일 */
  &:checked {
    background-color: #4ec3f3; /* 체크 상태 배경 색상 */
    border: 2px solid #4ec3f3; /* 체크 상태 테두리 색상 */
    position: relative;
  }

  /* 체크 표시 스타일 */
  &:checked::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: white; /* 체크 표시 색상 */
    transform: translate(-50%, -50%);
  }
`;

const TermsText = styled.p`
  font-size: 20px;
  margin-top: 1vw;
`;

const GoogleSignup = styled.p`
  width: 70%;
  height: 55px;
  border: 1px solid #4ec3f3;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  margin-top: 20px;
  font-size: 20px;
  color: black;
  font-weight: bold;
  background-color: white;

  @media (max-width: 768px) {
    width: 100%;
    height: 8vw;
    font-size: 3.5vw;
  }
`;

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isAgreed, setIsAgreed] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const navigate = useNavigate();

  const handleEmail = (event) => {
    const value = event.target.value;
    setEmail(value);
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setEmailError(
      emailPattern.test(value) ? '' : '유효한 이메일 주소를 입력해주세요.'
    );
  };

  const handlePassword = (event) => {
    const value = event.target.value;
    setPassword(value);
    const passwordPattern = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*?_])/;
    if (!value) {
      setPasswordError('비밀번호를 입력해주세요.');
    } else if (value.length < 4) {
      setPasswordError('비밀번호는 4자리 이상이어야 합니다.');
    } else if (value.length > 12) {
      setPasswordError('비밀번호는 최대 12자리까지 입력 가능합니다.');
    } else if (!passwordPattern.test(value)) {
      setPasswordError('비밀번호는 영어, 숫자, 특수문자를 포함해야 합니다.');
    } else {
      setPasswordError('');
    }
  };

  const handleConfirmPassword = (event) => {
    const value = event.target.value;
    setConfirmPassword(value);
    setConfirmPasswordError(
      value !== password ? '비밀번호가 일치하지 않습니다.' : ''
    );
  };

  const handleSignup = async () => {
    if (!emailError && !passwordError && !confirmPasswordError && isAgreed) {
      try {
        const userData = { email, password, confirmPassword };
        const response = await axios.post(API_URL, userData);
        if (response.status === 201) {
          console.log(response);
          alert('가입이 완료되었습니다.');
          navigate('/emailcheck', { state: { email } }); // 이메일 확인 페이지로 이동
        }
      } catch (error) {
        const errorMessage = error.response?.data?.message || error.message;
        alert(`가입 중 오류가 발생했습니다: ${errorMessage}`);
      }
    } else {
      alert('모든 필드를 올바르게 입력하고 동의해주세요.');
    }
  };

  const handleGoogleSignup = () => {
    window.location.href = ''; // 구글 로그인 URL로 변경
  };

  return (
    <PageContainer>
      <LogoImage src={SearchIcon} alt="로고" />
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
            margin: '15px 15px',
            fontSize: '32px',
            fontWeight: 'bold',
            color: '#F08080',
          }}
        >
          가볼까
        </p>
      </Intro>
      <SignupTitle>회원가입</SignupTitle>
      <InputSignup
        placeholder="이메일 주소를 입력해주세요"
        type="email"
        value={email}
        onChange={handleEmail}
        error={emailError}
      />
      <InputSignup
        placeholder="비밀번호를 입력해주세요"
        type="password"
        value={password}
        onChange={handlePassword}
        error={passwordError}
      />
      <InputSignup
        placeholder="비밀번호를 다시 입력해주세요"
        type="password"
        value={confirmPassword}
        onChange={handleConfirmPassword}
        error={confirmPasswordError}
      />
      <TermsContainer>
        <TermsCheckbox
          type="checkbox"
          checked={isAgreed}
          onChange={() => setIsAgreed(!isAgreed)}
        />
        <TermsText>이용약관, 개인정보처리방침에 동의합니다.</TermsText>
        <a
          style={{
            color: '#4F4F4F',
            marginLeft: '80px',
          }}
          href="/terms-of-service"
          target="_blank"
          rel="noopener noreferrer"
        >
          이용약관 및 개인정보처리방침 &gt;
        </a>
      </TermsContainer>
      <SignupButton onClick={handleSignup}>회원가입</SignupButton>
      <div
        style={{
          borderTop: '2px solid #dcdcdc' /* 회색 선 */,
          width: '70%',
          margin: '20px 0' /* 버튼 사이의 간격 조정 */,
        }}
      ></div>
      <GoogleSignup onClick={handleGoogleSignup}>
        구글로 동의하고 시작하기
      </GoogleSignup>
    </PageContainer>
  );
};

export default SignUp;
