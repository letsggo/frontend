import React , {useState,useEffect} from "react"; 
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';
import Modal from "../modals/Modal";
import Img from './이미지 업로드.png';
import { IoSettingsOutline } from "react-icons/io5";
import { LuLink } from "react-icons/lu";
import KakaoMap from "../components/KakaoMap";
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { format } from 'date-fns';

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
    border-radius:15px;
`;
/*제목, 수정 아이콘*/
const Title=styled.div`
    display:flex;
    div{
        margin-top:25px;
        margin-left:15px;
        font-size:26px;    
    }
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
    z-index:100;
`;
const Region2=styled.div`
    margin-top:-700px;
`;
/*지도*/
const Map=styled.div`
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
    width:250px; height:60px;
    position:fixed;
    left:1000px;
    top:500px;
    font-size:24px;
    padding: 0 10px;
    color:white;
    font-weight:700;
    background-color:#63CAF4;
    border:#63CAF4;
    border-radius:100px;
    z-index:100;
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

function StartPlanRoom (){
    const location = useLocation();
    const navigate=useNavigate();
    const [modal,setModal]=useState(false);
    const [copy,setCopy]=useState(false);
    const [travelPlan, setTravelPlan] = useState(null);
    const [loading, setLoading] = useState(true);
    const [inviteLink, setInviteLink] = useState('');
    const [userInfoList,setUserInfoList]=useState([]);
    const [myInfo,setMyInfo]=useState({});
    const token=localStorage.getItem('token');
    const travelId = location.state?.travelId;

    useEffect(() => {
        if (travelId) {
            const fetchTravelPlanDetails = async () => {
                try {
                    console.log('Fetching travel plan details...');
                    const response = await axios.get(`http://43.200.238.249:5000/travel-plans/makeRoom/${travelId}`, {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                        },
                    });
                    setTravelPlan(response.data);
                    setLoading(false);
                } catch (error) {
                    console.error('Error fetching travel plan details:',  error.response ? error.response.data : error.message);
                }
            };
            fetchTravelPlanDetails();
        }else {
            console.log('No travelId provided');
            setLoading(false); // travelId가 없을 때도 로딩 완료 처리
        }
    }, [travelId, token]);

    const generateInviteLink = async () => {
        try {
            const response = await axios.post('http://43.200.238.249:5000/create', 
            { travel_id: travelId },
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            const link = response.data.inviteLink;
            setInviteLink(link);
            handleCopy();
        } catch (error) {
            console.error('Error generating invite link:', error);
        }
    };
    /*마이페이지 회원정보*/
    useEffect(() => {
        console.log('getUserInfo')
        const getUserInfo = async () => {
          try {
            const response = await axios.get('http://43.200.238.249:5000/users/info', {
              headers: {
                'Authorization': `Bearer ${token}`
              }
            });
            console.log('회원정보:', response.data);
            setMyInfo(response.data);
            setUserInfoList(prevUserInfoList => { //인원수 추출을 위해=>웹소켓 이후 수정
                const newUserInfo = response.data;
                const isDuplicate = prevUserInfoList.some(item => item.user_id === newUserInfo.user_id);

                if (!isDuplicate) {
                  return [...prevUserInfoList, newUserInfo];
                }
                return prevUserInfoList;
              });
          } catch (error) {
            console.error('오류 발생:', error);
          }
        };
        getUserInfo();
      }, [token]);

    const handleEdit=()=>{
        navigate('/Edit');
    }

    const openModal = () => setModal(true);
    const closeModal = () => setModal(false);

    const handleCopy=()=>{
        navigator.clipboard.writeText(inviteLink)
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
        navigate('/PlanRoom1', { state: { travelId }});
    };
    
    if (loading) {
        return <div>Loading...</div>; // 데이터가 로드될 때까지 로딩 화면 표시
    }

    if (!travelPlan) {
        return <div>No travel plan found</div>; // travelPlan이 없을 때
    }
    const date1=new Date(travelPlan.start_date);
    const startDate = format(date1, 'yyyy-MM-dd');
    const date2=new Date(travelPlan.end_date);
    const endDate = format(date2, 'yyyy-MM-dd');
    return(
        <Container>
            <Left>
                <Title>
                    <h2>{travelPlan.title}</h2>
                    <div onClick={handleEdit}><IoSettingsOutline /></div>
                </Title>
                <div>{`여행기간 : ${startDate}~${endDate}`}</div>
                <MainImg src={travelPlan.travel_image} alt={Img}/>
                <Users>
                    <div>{`함께하는 사람 (총 ${userInfoList.length}명)`}</div>
                    <Invite onClick={openModal}>초대하기<LuLink /></Invite>
                    <Modal isOpen={modal} onClose={closeModal}>
                            <ModalInvite>초대하기</ModalInvite><br />
                            <CopyLink onClick={generateInviteLink}>링크 복사하기</CopyLink>
                    </Modal>
                    <Modal isOpen={copy} onClose={closeModal}>
                            <div>초대하기 링크가 복사되었습니다!</div>
                    </Modal>
                </Users>
                <ProfileBg>
                    <ProfileBox>
                        <ProfileImg src={`http://43.200.238.249:5000${myInfo.profile_image}`} alt='my_prodile' />
                        <div>{myInfo.name}</div>
                    </ProfileBox>
                    <div className="vertical-line" />
                    <ProfileBox>
                        <ProfileImg src={Img} alt={Img} />
                        <div>친구1</div>
                    </ProfileBox>
                    <ProfileBox>
                        <ProfileImg src={Img} alt={Img} />
                        <div>친구2</div>
                    </ProfileBox>

                </ProfileBg>
                <div>여행설명</div>
                <Info>
                    <Region className="region1">{travelPlan.region}</Region><br/>
                    <div>{travelPlan.explain}</div>
                </Info>
            </Left>
            <Right>
                <NaviButton onClick={handleRoute}>여행 동선 결과 보기➜</NaviButton>
                <Wrapper>
                    <div>여행 계획방 입장하기</div>
                    <Map id="map">
                        <KakaoMap width='500px' height="700px" />
                        <Region2><Region className="region2">{travelPlan.region}</Region> </Region2>
                        <EnterButton onClick={handleEnter}>입장하기▶</EnterButton>
                    </Map>
                </Wrapper>
            </Right>
        

        </Container>
    )
}

export default StartPlanRoom;