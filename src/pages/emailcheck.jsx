import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import SearchIcon from "../assets/images/searchIcon.png";


const resendEmailApi = async (email) => {
    const response = await fetch('https://jsonplaceholder.typicode.com/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
    });

    if (!response.ok) {
        throw new Error('이메일 재전송 실패');
    }

    return response.json();
};

const EmailCheck = ({ email }) => {
    const navigate = useNavigate();

    const handleHomeClick = () => {
        navigate('/home');
    };

    const handleResendEmail = async () => {
        try {
            await resendEmailApi(email);
            alert('재전송 메일이 발송되었습니다.');
        } catch (error) {
            alert('재전송 중 오류가 발생했습니다: ' + error.message);
        }
    };

    return (
        <CheckEmailContainer>
            <LogoImage src={SearchIcon} alt="로고" />
            <Title>이메일 확인</Title>
            <Message>가볼까에서 여행을 계획하러 가기 전에</Message>
            <EmailDisplay>{email}</EmailDisplay>
            <Message>이메일로 전송된 메일을 확인해주세요!</Message>
            <Button onClick={handleHomeClick}>가볼까 홈으로</Button>
            <ResendButton onClick={handleResendEmail}>이메일 재전송</ResendButton>
        </CheckEmailContainer>
    );
};

export default EmailCheck;

const LogoImage = styled.img`
    width: 400px;
    height: auto;
    margin-bottom: 15px;
`;

const CheckEmailContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 400px;
    border-radius: 10px;
    padding: 20px;
    background-color: white;
    position: absolute;
    top: 44%;
    left: 50%;
    transform: translate(-50%, -50%);
`;

const Title = styled.h2`
    font-size: 1.5em;
    margin-bottom: 70px;
`;

const Message = styled.p`
    font-size: 1.2em;
    margin: 5px 0;
`;

const EmailDisplay = styled.p`
    font-weight: bold;
    font-size: 1.2em;
    margin: 10px 0;
`;

const Button = styled.button`
    margin-top: 70px;
    padding: 10px 60px;
    font-size: 1em;
    color: white;
    background-color: grey;
    border: none;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
        background-color: #0056b3;
    }
`;

const ResendButton = styled(Button)`
    margin-top: 20px; 
    background-color: black; 
    
    &:hover {
        background-color: #ec971f; 
    }
`;
