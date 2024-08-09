import React, { useEffect, useState } from 'react';
import axios from "axios";
import styled from "styled-components";
import InputLogin from "../styles/input-login";
import SearchIcon from "../assets/images/searchIcon.png";
import { useNavigate } from 'react-router-dom'; 

const API_URL = 'http://localhost:3000/';

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 4vw;
`;

const LoginP = styled.p`
    font-size: 2.5vw;
    color: black;
    font-weight: bold;
    margin-top: 2vw;
`;

const LoginContainer = styled.div`
    margin-top: 2vw;
    width: 31.7vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2vw;
`;

const LoginButton = styled.button`
    width: 150%;
    height: 3vw;
    border: none;
    border-radius: 0.5vw;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
    margin-top: 2vw;
    font-size: 1.2vw;
    color: white;
    font-weight: bold;
    background-color: grey;
`;

const FindAccountText = styled.p`
    font-size: 0.8vw;
    color: black;
    cursor: pointer;
    margin-top: 0.5vw;
    text-align: right;
    width: 150%;
    &:hover {
        text-decoration: underline;
    }
`;

const SignupPrompt = styled.p`
    font-size: 0.9vw;
    color: #000;
    margin-top: 1.5vw;
    cursor: pointer;
`;

const LogoImage = styled.img`
    width: 280px;
    height: auto;
    margin-bottom: 10px;
`;

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [isDisabled, setIsDisabled] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        setIsDisabled(!(email && password && !emailError && !passwordError));
    }, [email, password, emailError, passwordError]);

    const handleEmail = (event) => {
        const value = event.target.value;
        setEmail(value);
        setEmailError(value ? '' : "이메일을 입력해주세요.");
    };

    const handlePassword = (event) => {
        const value = event.target.value;
        setPassword(value);
        const passwordPattern = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*?_])/;
        if (!value) {
            setPasswordError("비밀번호를 입력해주세요.");
        } else if (value.length < 4) {
            setPasswordError("최소 4자리 이상 입력해주세요.");
        } else if (value.length > 12) {
            setPasswordError("최대 12자리까지 입력 가능합니다.");
        } else if (!passwordPattern.test(value)) {
            setPasswordError("비밀번호는 영어, 숫자, 특수문자를 포함해야 합니다.");
        } else {
            setPasswordError('');
        }
    };

    const handleLogin = () => {
        const userData = { email, password };
        setIsLoading(true);

        axios.post(API_URL, userData)
            .then(response => {
                if (response.status === 200) {
                    const { token, username } = response.data;
                    localStorage.setItem('token', token);
                    localStorage.setItem('username', username);
                    navigate('/home2'); // home2 페이지로 이동
                    window.location.href = "/";
                }
            })
            .catch(error => {
                if (error.response && error.response.status === 401) {
                    alert("아이디 또는 비밀번호를 다시 확인해주세요.");
                }
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    const handleFindAccount = () => {
        navigate('/findpassword'); // findpassword 페이지로 이동
    };

    const handleSignup = () => {
        navigate('/signup');
    };

    return (
        <PageContainer>
            <LogoImage src={SearchIcon} alt="로고" />
            <LoginP>로그인</LoginP>
            <LoginContainer>
                <FindAccountText onClick={handleFindAccount}>아이디/비밀번호 찾기</FindAccountText>
                <InputLogin placeholder="이메일" type="email" value={email} onChange={handleEmail} error={emailError} />
                <InputLogin placeholder="비밀번호" type="password" value={password} onChange={handlePassword} error={passwordError} />
                <LoginButton disabled={isDisabled || isLoading} onClick={handleLogin}>
                    {isLoading ? '로딩 중...' : '로그인하기'}
                </LoginButton>
                <SignupPrompt onClick={handleSignup}>서비스가 처음이라면, 회원가입 하러가기</SignupPrompt>
            </LoginContainer>
        </PageContainer>
    );
};

export default LoginPage;
