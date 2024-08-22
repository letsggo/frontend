import React, { useEffect, useState } from 'react';
import useAxios from '../useAxios';
import styled from 'styled-components';
import InputLogin from '../styles/input-login';
import SearchIcon from '../assets/images/searchIcon.png';
import { useNavigate } from 'react-router-dom';

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

const LoginP = styled.p`
  font-size: 35px;
  color: black;
  font-weight: bold;
  margin-top: 2vw;

  @media (max-width: 768px) {
    font-size: 6vw;
    margin-top: 5vw;
  }
`;

const LoginContainer = styled.div`
  margin-top: 2vw;
  width: 650px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2vw;

  @media (max-width: 768px) {
    width: 80vw;
  }
`;

const LoginButton = styled.button`
  width: 120%;
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

const FindSignupContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 120%;
  margin-top: 14px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const FindAccountText = styled.p`
  font-size: 15px;
  color: rgba(0, 0, 0, 0.8);
  cursor: pointer;
  text-align: left;
  width: auto;

  &:hover {
    text-decoration: underline;
  }

  @media (max-width: 768px) {
    font-size: 2.5vw;
    width: 100%;
  }
`;

const SignupPrompt = styled.p`
  font-size: 15px;
  color: rgba(0, 0, 0, 0.8);
  cursor: pointer;
  text-align: right;
  width: auto;

  @media (max-width: 768px) {
    font-size: 3vw;
    margin-top: 3vw;
    text-align: left;
  }
`;

const LogoImage = styled.img`
  width: 280px;
  height: auto;
  margin-bottom: 10px;

  @media (max-width: 768px) {
    width: 60vw;
  }
`;

const GoogleSignup = styled.p`
  width: 120%;
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

const LoginPage = () => {
  const axiosInstance = useAxios();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/Home');
    }
  }, [navigate]);

  useEffect(() => {
    setIsDisabled(!(email && password && !emailError && !passwordError));
  }, [email, password, emailError, passwordError]);

  const handleEmail = (event) => {
    const value = event.target.value;
    setEmail(value);
    setEmailError(value ? '' : '이메일을 입력해주세요.');
  };

  const handlePassword = (event) => {
    const value = event.target.value;
    setPassword(value);
    const passwordPattern = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*?_])/;
    if (!value) {
      setPasswordError('비밀번호를 입력해주세요.');
    } else if (value.length < 4) {
      setPasswordError('최소 4자리 이상 입력해주세요.');
    } else if (value.length > 12) {
      setPasswordError('최대 12자리까지 입력 가능합니다.');
    } else if (!passwordPattern.test(value)) {
      setPasswordError('비밀번호는 영어, 숫자, 특수문자를 포함해야 합니다.');
    } else {
      setPasswordError('');
    }
  };

  const handleLogin = () => {
    const userData = { email, password };
    setIsLoading(true);
    axiosInstance
      .post('/users/login', userData)
      .then((response) => {
        console.log('로그인 응답 데이터:', response.data);
        if (response.status === 200) {
          const { accessToken, refreshToken } = response.data; // 리프레시 토큰도 받음
          if (accessToken && refreshToken) {
            localStorage.setItem('token', accessToken);
            localStorage.setItem('refreshToken', refreshToken); // 리프레시 토큰 저장
            navigate('/Home');
          } else {
            console.error('토큰이 누락되었습니다.');
          }
        }
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          alert('아이디 또는 비밀번호를 다시 확인해주세요.');
        }
        console.error('로그인 요청 실패:', error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleFindAccount = () => {
    navigate('/findpassword'); // 비밀번호 찾기 페이지로 이동
  };

  const handleSignup = () => {
    navigate('/signup'); // 회원가입 페이지로 이동
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

      <LoginP>로그인</LoginP>
      <LoginContainer>
        <InputLogin
          placeholder="이메일"
          type="email"
          value={email}
          onChange={handleEmail}
          error={emailError}
        />
        <InputLogin
          placeholder="비밀번호"
          type="password"
          value={password}
          onChange={handlePassword}
          error={passwordError}
        />
        <LoginButton disabled={isDisabled || isLoading} onClick={handleLogin}>
          {isLoading ? '로딩 중...' : '로그인'}
        </LoginButton>
        <FindSignupContainer>
          <FindAccountText onClick={handleFindAccount}>
            아이디/비밀번호 찾기
          </FindAccountText>
          <SignupPrompt onClick={handleSignup}>회원가입</SignupPrompt>
        </FindSignupContainer>
        <div
          style={{
            borderTop: '2px solid #dcdcdc' /* 회색 선 */,
            width: '120%',
            margin: '20px 0' /* 버튼 사이의 간격 조정 */,
          }}
        ></div>
        <GoogleSignup onClick={handleGoogleSignup}>구글 로그인</GoogleSignup>
      </LoginContainer>
    </PageContainer>
  );
};

export default LoginPage;