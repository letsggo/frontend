import React , {useState} from "react"; 
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';
import Modal from "./Modal";
import Img from './이미지 업로드.png';

/*구역 나눔*/
const Container=styled.div`
    display:flex;
    div{
        font-size:18px;
        font-weight:600;
    }
`;
const Left=styled.div`
    margin-left:10%;
`;
const Right=styled.div`
    margin-left:100px;
    margin-top:3%;
`;
const Wrapper=styled.div`
    margin-top:-10px;
`;
/*메인 이미지*/
const MainImg=styled.img`
    width:500px;    
    height:300px;
    margin:10px 0;
`;
/*유저, 초대*/
const Users=styled.div`
    display:flex;
`;
const Invite=styled.button`
    margin-left:220px;
    font-size:16px !important;
    font-weight:600;
    background-color:white;
    border:white;
`;
/*프로필 사진*/
const ProfileBg=styled.div`
    margin:10px 0;
    width:500px;
    height:120px;
    border: 2px solid #DBDBDB;
    border-radius:10px;
    display:flex;
    .vertical-line{
        border-left: 2px solid #DBDBDB;
        height:100px;
        margin-top:5px;
        padding:5px;
    }
`;
const ProfileBox=styled.div`
    text-align:center;
    div{
        margin-top:-10px;
        margin-left:5px;
        width:90px;
        font-weight:400 !important;

        /*닉네임이 길 경우*/
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
`;
const ProfileImg=styled.img`
    width:70px;    
    height:70px;
    border-radius:35px;
    margin:10px;
`;
/*여행 설명 상자*/
const Info=styled.div`
    margin:10px 0;
    width:500px;
    height:180px;
    border: 2px solid #DBDBDB;
    border-radius:10px;
    padding:10px;
    box-sizing: border-box;
    font-weight:400 !important;
`;
const Region=styled.div`
    display: inline-block;
    padding: 0 10px;
    margin: 0 0 5px 0;
    font-size:16px !important;
    background-color:#FFD700;
    border-radius:100px;
    position:fixed;
`;
/*지도*/
const Map=styled.div`
    background-color:gray;
    width:500px;
    height:700px;
    padding:10px;
    margin:10px 0;
    box-sizing: border-box;
`;
/*버튼*/
const NaviButton=styled.button` 
    //visibility: hidden; //visible
    margin-top:0px;
    margin-left:270px;
    height:40px;
    padding: 0 20px;
    color:white;
    font-size:18px;
    font-weight:700;
    background-color:#F08080;
    border: #F08080;
    border-radius:100px;
`;
const EnterButton=styled.button`
    margin-top:300px;
    margin-left:110px;
    width:250px; height:60px;
    font-size:24px;
    padding: 0 10px;
    color:white;
    font-weight:700;
    background-color:#63CAF4;
    border:#63CAF4;
    border-radius:100px;
`;
/*모달 내부*/
const ModalInvite=styled.div`
    font-size: 14px !important;
    margin-left:-300px;
    margin-top:-30px;
`;
const CopyLink=styled.button`
    width:350px;
    height:50px;
    font-size: 18px !important;
    border-radius:100px;
    border:white;
    background-color:white;
    color:black;
`;

function StartPlanRoom1(){
    const navigate=useNavigate();
    const [modal,setModal]=useState(false);
    const [copy,setCopy]=useState(false);

    const openModal = () => setModal(true);
    const closeModal = () => setModal(false);

    const currentURL=window.location.href;
    const handleCopy=()=>{
        navigator.clipboard.writeText(currentURL)
        .then(()=>{
            setCopy(true);
            setTimeout(function() {
                setCopy(false);
                setModal(false);
              }, 1000);
        })
        .catch(()=>{
            alert('클립보드 복사 실패')
        })
    };
    const handleRoute=()=>{
        navigate('/PlanRoomResult');
    };
    const handleEnter=()=>{
        navigate('/PlanRoom1');
    };

    return(
        <Container>
            <Left>
                <h2>여행 제목</h2>
                <div>{`여행기간 : 시작~끝`}</div>
                <MainImg src={Img} alt={Img}/>
                <Users>
                    <div>{`함께하는 사람 (총 @명)`}</div>
                    <Invite onClick={openModal}>초대하기🔗</Invite>
                    <Modal isOpen={modal} onClose={closeModal}>
                            <ModalInvite>초대하기</ModalInvite><br />
                            <CopyLink onClick={handleCopy}>링크 복사하기</CopyLink>
                    </Modal>
                    <Modal isOpen={copy} onClose={closeModal}>
                            <div>초대하기 링크가 복사되었습니다!</div>
                    </Modal>
                </Users>
                <ProfileBg>
                    <ProfileBox>
                        <ProfileImg src={Img} alt={Img} />
                        <div>@나</div>
                    </ProfileBox>
                    <div class="vertical-line" />
                    <ProfileBox>
                        <ProfileImg src={Img} alt={Img} />
                        <div>Disney World</div>
                    </ProfileBox>
                    <ProfileBox>
                        <ProfileImg src={Img} alt={Img} />
                        <div>디즈니월드</div>
                    </ProfileBox>

                </ProfileBg>
                <div>여행설명</div>
                <Info>
                    <Region>지역이름</Region><br/>
                    <div>설명 설명 설명 설명</div>
                </Info>
            </Left>
            <Right>
                <NaviButton onClick={handleRoute}>여행 동선 결과 보기➜</NaviButton>
                <Wrapper>
                    <div>여행 계획방 입장하기</div>
                    <Map id="map">
                        <Region>지역이름</Region> 
                        <EnterButton onClick={handleEnter}>입장하기▶</EnterButton>
                    </Map>
                </Wrapper>
            </Right>
        

        </Container>
    )
}

export default StartPlanRoom1;