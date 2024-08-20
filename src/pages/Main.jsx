import React from 'react';
import { useNavigate } from 'react-router-dom';

const Main = () => {
  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    padding: '20px',
    backgroundColor: '#f8f9fa',
  };

  const headingStyle = {
    fontSize: '2.5em',
    marginBottom: '20px',
  };

  const paragraphStyle = {
    fontSize: '1.2em',
    marginBottom: '30px',
  };

  const buttonStyle = {
    padding: '10px 20px',
    fontSize: '1.2em',
    backgroundColor: '#4EC3F3', 
    color: 'white', 
    fontWeight: 'bold', 
    border: 'none',
    borderRadius: '30px', 
    cursor: 'pointer',
    marginBottom: '40px',
  };

  const videoContainerStyle = {
    marginBottom: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const videoStyle = {
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  };

  const cardContainerStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: '40px',
  };

  const cardStyle = {
    backgroundColor: '#343a40',
    color: 'white',
    borderRadius: '10px',
    padding: '20px',
    margin: '10px',
    width: '300px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  };

  const footerStyle = {
    marginTop: '40px',
    padding: '20px',
    backgroundColor: '#1F637F', 
    color: 'white', 
    textAlign: 'center',
    width: '100%',
    fontSize: '0.9em',
  };
  

  const footerContentStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '10px',
  };

  const footerLineStyle = {
    borderBottom: '1px solid #495057',
    width: '80%',
    marginBottom: '10px',
  };

  const navigate = useNavigate();

  const handleOutClick = () => {
    navigate('/MakePlanRoom1');
  };

  return (
    <div style={containerStyle}>
      <h1 style={headingStyle}>국내 여행을 계획하고 있으신가요?</h1>
      <p style={paragraphStyle}>
        <b>가볼까</b>와 동행자와 함께 여행을 빠르고 쉽게 계획할 수 있어요!
      </p>
      <button style={buttonStyle} onClick={handleOutClick}>
        여행 계획 하러 가기
      </button>

      <div style={videoContainerStyle}>
        <iframe
          style={videoStyle}
          width="800"
          height="450"
          src="https://www.youtube.com/embed/EVQi_NvLNWI?si=XI_weZOYVVQgMO2H"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      </div>

      <div style={cardContainerStyle}>
        <div style={cardStyle}>
          <h2>여행 동행자와 함께 여행 계획을!</h2>
          <p>
            가볼까에서는 모두 다함께 참여할 수 있어요! 더 이상 따로 찾고 따로
            계획하지 않아도 돼요!
          </p>
        </div>
        <div style={cardStyle}>
          <h2>가볼까의 주요 장점 제목 222</h2>
          <p>가볼까의 장점 설명글 가볼까의 장점 설명글 가볼까의 장점 설명글</p>
        </div>
        <div style={cardStyle}>
          <h2>가볼까의 주요 장점 제목 444</h2>
          <p>가볼까의 장점 설명글 가볼까의 장점 설명글 가볼까의 장점 설명글</p>
        </div>
      </div>

      <footer style={footerStyle}>
        <div style={footerContentStyle}>
          <div>UMC 6기 타이거지부 ‘가볼까’</div>
          <div style={footerLineStyle}></div>
          <div>
            <strong>PM:</strong> 로진 | <strong>FE:</strong> 이서, 조이, 클로이
          </div>
          <div>
            <strong>Design:</strong> 여니 | <strong>BE:</strong> 이노, 제타, 쥬쥬
          </div>
          <div style={footerLineStyle}></div>
          <div>© GABOLKKA ALL RIGHTS RESERVED.</div>
        </div>
      </footer>
    </div>
  );
};

export default Main;