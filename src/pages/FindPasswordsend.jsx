import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import SearchIcon from "../assets/images/searchIcon.png"; 

const FindPasswordSend = () => {
    const location = useLocation();
    const email = location.state?.email || '이메일 주소를 확인할 수 없습니다.';

    const container = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '50px',
        textAlign: 'center',
        fontFamily: 'Arial, sans-serif',
        color: '#333',
    };

    const title = {
        fontSize: '28px',
        marginBottom: '20px',
    };

    const instruction = {
        fontSize: '18px',
        marginBottom: '20px',
    };

    const emailDisplay = {
        fontWeight: 'bold',
        fontSize: '20px',
        marginBottom: '50px',
    };

    const backButton = {
        padding: '10px 90px',
        backgroundColor: 'grey',
        color: 'white',
        border: 'none',
        borderRadius: '3px',
        cursor: 'pointer',
        textDecoration: 'none',
        margin: '10px 0',
    };

    const resendButton = {
        padding: '12px 100px',
        backgroundColor: 'black',
        color: 'white',
        border: 'none',
        borderRadius: '2px',
        cursor: 'pointer',
        
    };

    const handleResendEmail = () => {
        
        alert(`재전송된 이메일이 ${email}로 전송되었습니다!`);
    };

    return (
        <div style={container}>
            <img src={SearchIcon} alt="로고" style={{ marginBottom: '25px' }} />
            <h1 style={title}>비밀번호 재설정 이메일 전송 완료</h1>
            <p style={emailDisplay}>{email}</p>
            <p style={instruction}>위의 이메일로 전송된 메일을 확인해주세요!</p>
            
            <Link to="/Home" style={backButton}>가볼까 홈으로</Link>
            
            <button style={resendButton} onClick={handleResendEmail}>
                이메일 재전송
            </button>
        </div>
    );
};

export default FindPasswordSend;
