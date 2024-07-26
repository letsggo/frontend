import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import InputSignup from '../styles/input-signup'; // 사용자 정의 입력 컴포넌트
import SearchIcon from "../assets/images/searchIcon.png";
import { useNavigate } from 'react-router-dom';

const API_URL = 'https://jsonplaceholder.typicode.com/users';

const LogoImage = styled.img`
    width: 280px;
    height: auto;
    margin-bottom: 10px;
`;

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 5vw;
`;

const SignupTitle = styled.h1`
    font-size: 2.5vw;
    margin-bottom: 5vw;
`;

const SignupButton = styled.button`
    width: 50%;
    height: 3vw;
    border: none;
    border-radius: 0.5vw;
    background-color: grey;
    color: white;
    font-size: 1.2vw;
    cursor: pointer;
    margin-top: 2vw;
`;

const TermsContainer = styled.div`
    display: flex;
    align-items: center;
    margin-top: 1vw;
`;

const TermsCheckbox = styled.input`
    margin-right: 0.5vw;
`;

const TermsText = styled.p`
    font-size: 0.8vw;
    margin-top: 1vw;
    text-align: center;
`;

const GoogleSignup = styled.p`
    font-size: 0.9vw;
    color: #007bff;
    cursor: pointer;
    margin-top: 2vw;
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
        setEmailError(emailPattern.test(value) ? '' : "유효한 이메일 주소를 입력해주세요.");
    };

    const handlePassword = (event) => {
        const value = event.target.value;
        setPassword(value);
        setPasswordError(value.length < 4 ? "비밀번호는 4자리 이상이어야 합니다." : '');
    };

    const handleConfirmPassword = (event) => {
        const value = event.target.value;
        setConfirmPassword(value);
        setConfirmPasswordError(value !== password ? "비밀번호가 일치하지 않습니다." : '');
    };

    const handleSignup = async () => {
        if (!emailError && !passwordError && !confirmPasswordError && isAgreed) {
            try {
                const userData = { email, password };
                const response = await axios.post(API_URL, userData);
                if (response.status === 201) {
                    console.log(response);
                    alert("가입이 완료되었습니다.");
                    navigate('/emailcheck', { state: { email } }); // 이메일 확인 페이지로 이동
                }
            } catch (error) {
                const errorMessage = error.response?.data?.message || error.message;
                alert(`가입 중 오류가 발생했습니다: ${errorMessage}`);
            }
        } else {
            alert("모든 필드를 올바르게 입력하고 동의해주세요.");
        }
    };

    const handleGoogleSignup = () => {
        window.location.href = ''; // 구글 로그인 URL로 변경
    };

    return (
        <PageContainer>
            <LogoImage src={SearchIcon} alt="로고" />
            <SignupTitle>회원가입</SignupTitle>
            <InputSignup placeholder="이메일 주소를 입력해주세요" type="email" value={email} onChange={handleEmail} error={emailError} />
            <InputSignup placeholder="비밀번호를 입력해주세요" type="password" value={password} onChange={handlePassword} error={passwordError} />
            <InputSignup placeholder="비밀번호를 다시 입력해주세요" type="password" value={confirmPassword} onChange={handleConfirmPassword} error={confirmPasswordError} />
            <TermsContainer>
                <TermsCheckbox type="checkbox" checked={isAgreed} onChange={() => setIsAgreed(!isAgreed)} />
                <TermsText>이용약관, 개인정보처리방침에 동의합니다.</TermsText>
            </TermsContainer>
            <SignupButton onClick={handleSignup}>회원가입</SignupButton>
            <GoogleSignup onClick={handleGoogleSignup}>구글로 동의하고 시작하기</GoogleSignup>
        </PageContainer>
    );
};

export default SignUp;
