
import React from 'react';

const Home = () => {
  const containerStyle = {
    textAlign: 'center',
    padding: '50px',
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
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  };

  const buttonHoverStyle = {
    backgroundColor: '#0056b3',
  };

  const videoContainerStyle = {
    marginTop: '40px',
    height: '300px',
    backgroundColor: '#ccc',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  return (
    <div style={containerStyle}>
      <h1 style={headingStyle}>국내 여행을 계획하고 있으신가요?</h1>
      <p style={paragraphStyle}>가볼까?와 동행자와 함께 여행을 빠르고 쉽게 계획할 수 있어요!</p>
      <button
        style={buttonStyle}
        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = buttonHoverStyle.backgroundColor)}
        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = buttonStyle.backgroundColor)}
      >
        여행 계획 하러 가기
      </button>
      <div style={videoContainerStyle}>
        <p>(서비스 소개 영상)</p>
      </div>
    </div>
  );
};

export default Home;