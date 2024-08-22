import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 20px;
  background-color: white;
`;

const Heading = styled.h1`
  font-size: 50px;
  margin-bottom: 20px;
`;

const Paragraph = styled.p`
  font-size: 25px;
  margin-bottom: 50px;
  b {
    color: #f08080;
    font-size: 33px;
  }
`;

const Button = styled.button`
  padding: 15px 30px; /* 패딩을 늘려서 버튼의 크기를 키움 */
  font-size: 1.5em; /* 폰트 크기를 늘려서 버튼 텍스트를 키움 */
  background-color: #4ec3f3;
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 30px;
  cursor: pointer;
  margin-bottom: 40px;
  min-width: 200px; /* 최소 너비를 설정하여 버튼의 가로 크기를 일정하게 유지 */
  height: 60px; /* 버튼의 높이 설정 */
`;

const VideoContainer = styled.div`
  margin-bottom: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Video = styled.iframe`
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 40px;
`;

const LeftCard = styled.div`
  background-color: #f08080;
  color: white;
  border-radius: 10px;
  padding: 20px;
  margin: 10px;
  width: 300px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.2);
  p {
    font-weight: bold;
    text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.2); /* 그림자 추가 */
  }
`;

const CenterCard = styled.div`
  background-color: #63caf4;
  color: white;
  border-radius: 10px;
  padding: 20px;
  margin: 10px;
  width: 300px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  align-items: center;
  p {
    text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.2); /* 그림자 추가 */
    font-weight: bold;
  }
`;

const RightCard = styled.div`
  background-color: #ffd700;
  color: white;
  border-radius: 10px;
  padding: 20px;
  margin: 10px;
  width: 300px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  align-items: center;
  p {
    text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.2); /* 그림자 추가 */
    font-weight: bold;
  }
`;

const Footer = styled.footer`
  margin-top: 40px;
  padding: 20px;
  background-color: white;
  color: black;
  text-align: center;
  width: 100%;
  font-size: 20px;
`;

const FooterContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const FooterLine = styled.div`
  border-bottom: 1px solid #495057;
  width: 120%;
  margin-bottom: 10px;
`;

const Main = () => {
  const navigate = useNavigate();

  const handleOutClick = () => {
    navigate('/MakePlanRoom1');
  };

  return (
    <Container>
      <Heading>국내 여행을 계획하고 있으신가요?</Heading>
      <Paragraph>
        <b>가볼까</b>와 동행자와 <b>함께 여행을 빠르고 쉽게 계획</b>할 수
        있어요!
      </Paragraph>
      <Button onClick={handleOutClick}>여행 계획 하러 가기</Button>

      <VideoContainer>
        <Video
          width="800"
          height="450"
          src="https://www.youtube.com/embed/EVQi_NvLNWI?si=XI_weZOYVVQgMO2H"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></Video>
      </VideoContainer>

      <CardContainer>
        <LeftCard>
          <h2>💙 기존에 사용하던 지도 APP을 활용할 수 있어요!</h2>
          <p>
            • 네이버지도, 카카오맵 등으로 찾은 장소를 url 복사로 간단하게
            가져와요
          </p>
          <p>• 저장해둔 나의 즐겨찾기 목록을 연동할 수 있어요</p>
        </LeftCard>
        <CenterCard>
          <h2>💛 실시간으로 동행자와 자유로이 동선을 만들 수 있어요!</h2>
          <p>
            • '가볼까'에서 공동작업과 버블채팅으로 별도의 SNS 없이 여행 계획을
            끝내요
          </p>
          <p>
            • 동행자와 같이 후보지를 만들어 투표하고, 장소카드로 쉽게 여행
            동선을 만들어요
          </p>
          <p>
            • '여행기간'이나 '플랜B'등 원하는 방식에 맞춰 원하는 대로 동선을
            만들어요
          </p>
        </CenterCard>
        <RightCard>
          <h2>❤️ '가볼까'의 핵심은 빠른 여행 계획 과정이에요!</h2>
          <p>
            • 서비스 내에서 일일히 장소를 다시 찾을 필요 없이 찾아둔 장소 바로
            가져와요
          </p>
          <p>
            • 단계별로 여행 계획 과정으로 더욱 빠르고 체계적으로 여행 동선
            만들어요
          </p>
          <p>
            • 원하는 대로 동선을 여러 개 만들고, 다양한 방식으로 동선 결과를 볼
            수 있어요
          </p>
        </RightCard>
      </CardContainer>

      <Footer>
        <FooterContent>
          <div>UMC 6기 타이거지부 ‘가볼까’</div>
          <FooterLine></FooterLine>
          <div>
            <strong>PM:</strong> 로진 | <strong>FE:</strong> 이서, 조이, 클로이
          </div>
          <div>
            <strong>Design:</strong> 여니 | <strong>BE:</strong> 이노, 제타,
            쥬쥬
          </div>
          <FooterLine></FooterLine>
          <div>© GABOLKKA ALL RIGHTS RESERVED.</div>
        </FooterContent>
      </Footer>
    </Container>
  );
};

export default Main;
