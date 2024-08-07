import React from 'react';

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
    backgroundColor: 'lightgrey',
    color: 'black',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginBottom: '40px',
  };

  const videoContainerStyle = {
    marginBottom: '40px',
    height: '300px',
    backgroundColor: '#ccc',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.5em',
    color: 'black',
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
    backgroundColor: '#343a40',
    color: 'white',
    textAlign: 'center',
    width: '100%',
  };

  return (
    <div style={containerStyle}>
      <h1 style={headingStyle}>국내 여행을 계획하고 있으신가요?</h1>
      <p style={paragraphStyle}>가볼까?와 동행자와 함께 여행을 빠르고 쉽게 계획할 수 있어요!</p>
      <button style={buttonStyle}>여행 계획 하러 가기</button>
      
      <div style={videoContainerStyle}>
        (서비스 소개 영상)
      </div>

      <div style={cardContainerStyle}>
        <div style={cardStyle}>
          <h2>여행 동행자와 함께 여행 계획을!</h2>
          <p>가볼까에서는 모두 다함께 참여할 수 있어요! 더 이상 따로 찾고 따로 계획하지 않아도 돼요!</p>
          <button style={buttonStyle}>바로 시작하기</button>
        </div>
        <div style={cardStyle}>
          <h2>가볼까의 주요 장점 제목 222</h2>
          <p>가볼까의 장점 설명글 가볼까의 장점 설명글 가볼까의 장점 설명글</p>
          <button style={buttonStyle}>바로 시작하기</button>
        </div>
        <div style={cardStyle}>
          <h2>가볼까의 주요 장점 제목 444</h2>
          <p>가볼까의 장점 설명글 가볼까의 장점 설명글 가볼까의 장점 설명글</p>
          <button style={buttonStyle}>바로 시작하기</button>
        </div>
      </div>

      <footer style={footerStyle}>
        UMC 6기 타이거지부 ‘가볼까’<br />
        메일: 010711yj@swu.ac.kr | 고객센터: 0000-0000<br />
        서울시 OO구 OO로OO길 OO OOOO (우편번호00000)<br />
        © GABOLKKA ALL RIGHTS RESERVED.
      </footer>
    </div>
  );
};

export default Main;
