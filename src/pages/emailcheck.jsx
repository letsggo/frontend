import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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

const FindPassword = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const container = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '50px',
        textAlign: 'center',
    };

    const title = {
        fontSize: '24px',
        marginBottom: '20px',
    };

    const instruction = {
        marginBottom: '50px',
        fontSize: '30px',
        color: 'black',
    };

    const subInstruction = {
        marginBottom: '20px',
        fontSize: '15px',
        color: 'black',
    };

    const emailInput = {
        padding: '10px',
        width: '500px',
        marginBottom: '20px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        backgroundColor: 'lightgrey',
    };

    const sendEmailButton = {
        padding: '15px 40px',
        backgroundColor: 'grey',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        marginBottom: '20px',
    };

    const messageStyle = {
        color: error ? 'red' : 'green',
        marginTop: '20px',
    };

    const backToLogin = {
        marginTop: '20px',
    };

    const link = {
        color: 'black',
        textDecoration: 'none',
    };

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
        <div style={container}>
            <img src={SearchIcon} alt="로고" style={{ marginBottom: '30px' }} />
            <h1 style={title}>비밀번호 찾기</h1>
            <p style={instruction}>저런, 비밀번호를 잊으셨나요? 가볼까가 도와드릴게요!</p>
            <p style={subInstruction}>가입한 이메일 주소를 입력하시면, 비밀번호 재설정 메일을 보내드려요!</p>
            <input
                type="email"
                placeholder="가입한 이메일 주소 입력하기"
                style={emailInput}
                value={email}
                onChange={handleEmailChange}
            />
            <button style={sendEmailButton} onClick={handleSubmit} disabled={loading}>
                {loading ? '전송 중...' : '이메일 보내기'}
            </button>
            {message && <p style={messageStyle}>{message}</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <p style={backToLogin}>또는 <a href="/login" style={link}>로그인 화면으로 돌아가기</a></p>
        </div>
    );
};

export default FindPassword;
