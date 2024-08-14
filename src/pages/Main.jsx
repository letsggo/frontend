import React from 'react';
import { useNavigate } from 'react-router-dom'; // useHistory 대신 useNavigate 사용

const Main = () => {
  const navigate = useNavigate(); // useHistory 대신 useNavigate 사용

  const handleButtonClick = () => {
    navigate('/startplanroom'); // startplanroom으로 이동
  };

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
    marginBottom: '50px',
    height: '450px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const videoStyle = {
    width: '100%',
    height: '100%',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  };

  const footerStyle = {
    marginTop: '40px',
    padding: '20px',
    backgroundColor: '#343a40',
    color: 'white',
    textAlign: 'center',
    width: '100%',
  };

  // 카드 컨테이너 1
  const cardContainer1Style = {
    backgroundColor: '#f8f9fa',
    color: 'black',
    borderRadius: '10px',
    padding: '15px',
    margin: '10px',
    width: '350px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginRight: '500px',
  };

  // 카드 컨테이너 2
  const cardContainer2Style = {
    backgroundColor: '#f8f9fa',
    color: 'black',
    borderRadius: '10px',
    padding: '20px',
    margin: '10px',
    width: '300px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginLeft: '500px',
    marginTop:'-180px',
  };

  // 카드 컨테이너 3
  const cardContainer3Style = {
    backgroundColor: '#f8f9fa',
    color: 'black',
    borderRadius: '10px',
    padding: '20px',
    margin: '10px',
    width: '300px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginRight: '500px',
    marginTop:'-150px',
  };

  


// 이미지 스타일 추가
const image1Style = {
    width: '100%', // 원하는 크기로 조정
    height: '300PX',
    position: 'relative', // 부모 요소의 position을 relative로 설정
    left: '500px', // 카드 컨테이너와 같은 위치로 설정
    top: '-250px', // 이미지 위치를 위로 올리기 위해 음수 값 설정
};


const image2Style={
    width:'100%',
    height:'300px',
    position:'relative',
    right:'480px',
    top:'-250px',
};

const image3Style={
  width:'100%',
  height:'300px',
  position:'relative',
  left:'480px',
  top:'-270px',
};


  return (
    <div style={containerStyle}>
      <h1 style={headingStyle}>국내 여행을 계획하고 있으신가요?</h1>
      <p style={paragraphStyle}>가볼까?와 동행자와 함께 여행을 빠르고 쉽게 계획할 수 있어요!</p>
      <button style={buttonStyle} onClick={handleButtonClick}>여행 계획 하러 가기</button>

      <div style={videoContainerStyle}>
        <video style={videoStyle} controls>
          <source src="/videos/intro.mp4" type="video/mp4" />
          비디오를 지원하지 않는 브라우저입니다.
        </video>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '40px' }}>
        <div style={cardContainer1Style}>
          <h2>여행 동행자와 함께 여행 계획을!</h2>
          <p>가볼까에서는 모두 다함께 참여할 수 있어요! 더 이상 따로 찾고 따로 계획하지 않아도 돼요!</p>
          <button style={buttonStyle}>바로 시작하기</button>
          <img src="/path/to/image1.jpg" alt="" style={image1Style} /> {/* 이미지 추가 */}
        </div>

        <div style={cardContainer2Style}>
          <h2>가볼까의 주요 장점 제목 222</h2>
          <p>가볼까의 장점 설명글 가볼까의 장점 설명글 가볼까의 장점 설명글</p>
          <button style={buttonStyle}>바로 시작하기</button>
          <img src="/path/to/image2.jpg" alt="" style={image2Style} />
        </div>

        <div style={cardContainer3Style}>
          <h2>가볼까의 주요 장점 제목 444</h2>
          <p>가볼까의 장점 설명글 가볼까의 장점 설명글 가볼까의 장점 설명글</p>
          <button style={buttonStyle}>바로 시작하기</button>
          <img src="/path/to/image3.jpg" alt="" style={image3Style} />
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