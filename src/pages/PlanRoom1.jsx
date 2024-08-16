import React, {useState,useEffect,useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styled from 'styled-components';
import ToggleList from "../toggleLists/ToggleList";
import ToggleListPlace from "../toggleLists/TogglesListPlace";
import ToggleListVote from "../toggleLists/ToggleListVote";
import MyPlaceModal from "../modals/MyPlaceModal";
import KakaoMap from "../components/KakaoMap";
import axios from 'axios';

/*구역 나눔*/
const Container=styled.div`
    margin-top: -20px;
    height: calc(100vh - 80px); 
    display:flex;
`;
const Left=styled.div`
    height: calc(100vh - 60px); 
    position:fixed;
    margin-left:-10px;
    width:340px;
`;
const Right=styled.div`
    width:340px;
    height: calc(100vh - 60px); 
    position:fixed;
    right:0;
`;
/*지도 부분*/
const Map=styled.div`
    width:955px;
    margin-left:340px;
    position:relative;
    z-index:1;
`;
/*##의 장소*/
const Place=styled.div`
    display:flex;
    justify-content: space-around;
    margin-left:-10px;
    margin-top:10px;
    margin-bottom: 10px; 
`;
const Button=styled.button`
    background:none;
    border:none;
    font-size:16px;
    font-weight:700;
    position:relative;
    color:${(props)=>(props.isClicked ? 'black' : 'gray')} 
`;
const Underline = styled.div`
    position:absolute;
    left: 0;
    right: 0; 
    bottom:-5px; 
    height: 5px;
    width:100%;
    background-color: ${(props)=>(props.isClicked ? 'black' : 'transparent')} 
`;
const PlaceSet=styled.div`
    position:fixed;
    top:92%;
`;
/*버튼*/
const ListButton=styled.button`
    background-color:#F08080;
    border:none;
    border-radius:20px;
    font-size:16px;
    font-weight:600;
    color:white;
    padding:10px 20px;
    margin-left:10px;
`;
const PlaceButton=styled.button`
    background-color:#FFD700;
    border:none;
    border-radius:20px;
    font-size:16px;
    font-weight:600;
    color:white;
    padding:10px 20px;
    margin-left:10px;
`;
const GoToVoteButton=styled.button`
    position:fixed;
    top:92%;
    width:280px;
    height:45px;
    margin-left:20px;
    border:none;
    border-radius:30px;
    color:white;
    font-size:18px;
    font-weight:600;
    background-color:#63CAF4;
`;
const MakeRouteButton=styled.button`
    position:fixed;
    top:92%;
    width:280px;
    height:45px;
    margin-left:20px;
    border:none;
    border-radius:30px;
    color:white;
    font-size:18px;
    font-weight:600;
    background-color:${props=>props.disabled ? 'gray':'#63CAF4'} ;
`;
/*후보지 등록, 투표*/
const Candidate=styled.div`
    display:flex;
    justify-content: space-around;
    margin-top:10px;
    margin-bottom: 10px; 
`;
/*나의 장소 불러오기 모달*/
const ModalTitle=styled.div`
    position:fixed;
    top:530px;  
    left:20px;
`;
const ModalContent1 = styled.div`
  padding: 15px 25px 0 0;
  width:300px;
  overflow-y: auto;
  flex-grow: 1;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #888; 
    border-radius: 6px;
  }

`;
const ModalList=styled.div`
    height:50px;
    line-height:50px;
    text-align:center;
`;
/*장소 등록하기 모달*/
const ModalTitle2=styled.div`
    position:fixed;
    top:680px;  
    left:20px;
    font-weight:600;
`;
const ModalContent2 = styled.div`
  margin-top:30px;
  width:600px;
  color:gray;
`;
const InputButton=styled.div`
    display:flex;
    margin-top:5px;
    position: relative;
    input{
        width:580px;
        height:35px;
        border-radius:30px;
        border-color:#FFD700;
        padding-right: 90px; 
    }
    button{
        position: absolute;
        left:500px;
        top:5px;
        width:90px;
        height:30px;
        border:none;
        border-radius:30px;
        background-color:#FFD700;
        font-weight:600;
        color:white;
    }
`;
const ModalOverlay = styled.div`
    position: fixed !important;;
    top: 70%;
    left: 0px;
    right: 0;
    bottom: 0;
    z-index: 1000 !important;
`;
const ModalContent = styled.div`
    background: black;
    color:white;
    padding: 20px;
    border-radius: 8px;
    position: relative;
    width:600px;
    height: 100px;
`;
const CloseButton = styled.button`
    position: absolute;
    top: 10px;
    right: 10px;
    background: transparent;
    border: none;
    font-size: 16px;
    cursor: pointer;
    color:white;
`;
/*후보지 만들기*/
const PlusButton=styled.button`
    background:none;
    border:none;
    width:300px;
    height:40px;
    font-size:16px;
    font-weight:600;
    text-align:left;
`;
/*채팅 모달*/
const Overlay = styled.div`
    position: absolute;
    padding: 10px;
    background-color:#4A4A4A;
    border-radius: 10px;
    z-index: 1000;
    input{
        background-color:#4A4A4A;
        border:none;
        outline: none;
        color:white;
         width: 20px;
        min-width: 20px;
        max-width: 400px;
        transition: width 0.1s;
    }
    input:focus{
        outline: none;
    }
    &::before {
        content: '';
        position: absolute;
        top: 16px; // 화살표 위치 조정
        left: -12px; // 왼쪽으로 위치 조정
        width: 0;
        height: 0;
        border-left: 8px solid transparent; /* 왼쪽 변 투명 */
        border-right: 8px solid transparent; /* 오른쪽 변 투명 */
        border-bottom: 20px solid #4A4A4A; /* 아래쪽 변 색상 */
        transform: translateY(50%) rotate(240deg); /* 대각선으로 회전 */
    }
`;

function PlanRoom1(){
    const [user,setUser]=useState(0);
    const [vote,setVote]=useState(0);
    const [modal1,setModal1]=useState(false);
    const [modal2,setModal2]=useState(false);
    const [selectedLists, setSelectedLists] = useState([]); //좌측 기존 리스트
    const [candidateList,setCandidateList]=useState([]); //우측 후보지 리스트
    const [placeLists, setPlaceLists]=useState([]); //URL로 추가한 장소
    const [placeholder, setPlaceholder]=useState('장소 공유 URL을 입력해주세요');
    const [voteDone, setVoteDone]=useState(false);
    const [inputValue, setInputValue] = useState('');
    const [voteDetails, setVoteDetails] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false); // 채팅 모달 상태
    const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 })
    const [chatValue,setChatValue]=useState('');
    const [lists,setLists]=useState([]);//나의 장소 불러오기
    const inputRef = useRef(null);
    const spanRef = useRef(null);
    const navigate=useNavigate();
    const token = localStorage.getItem('token');

    const shareVoteDetails = (details) => {
        setVoteDetails(details);
    }
    const openModal1  = () =>{
        setModal1(true);
    };
    const openModal2  = () =>{
        setModal2(true);
    };
    const closeModal1  = () =>{
        setModal1(false);
    };
    const closeModal2  = () =>{
        setModal2(false);
    };
    const handleListClick = (list) => {
        if (selectedLists.includes(list)) {
          setSelectedLists(selectedLists.filter((item) => item !== list)); 
        } else {
          setSelectedLists([...selectedLists, list]); 
        }
    };
    const handleCandidate=()=>{
        setCandidateList([...candidateList, `나의 후보 리스트 ${candidateList.length+1}`]); 
    };
    const handlePlace=()=>{
        setPlaceLists([...placeLists, inputValue]); 
    };
    /*동선 만들러 가기 버튼 유효성*/
    useEffect(() => {
        const skippedList=JSON.parse(localStorage.getItem('skippedList')) || [];
        const voteIng=JSON.parse(localStorage.getItem('voteIng')) || {};

        if (Object.keys(voteDetails).length === 0) {
            setVoteDone(false);
            return;
        }
    
        const allDetailsFilled = Object.values(voteDetails).every(value => 
            Array.isArray(value) && value.length > 0
        );
        
        const allSkippedOrDone = Object.keys(voteDetails).every(key => 
            skippedList.includes(key) || voteIng[key] === false
        );

        setVoteDone( allSkippedOrDone && allDetailsFilled && candidateList.length > 0);
    }, [voteDetails, candidateList]);

    const handlePlanRoom2 = () => {
        if (voteDone && candidateList.length > 0) {
          navigate('/PlanRoom2');
        }
    };

    /*커서 채팅*/
    useEffect(() => {
        if (isModalOpen && inputRef.current) {
            inputRef.current.focus(); //input에 커서
        }
    }, [isModalOpen]);

    useEffect(() => {  // 입력값에 따라 너비 조정
        if (spanRef.current) {
            spanRef.current.textContent = chatValue;
            const inputWidth = spanRef.current.offsetWidth;
            if (inputRef.current) {
                inputRef.current.style.width = `${Math.min(inputWidth, 400)}px`;
                
            }
        }
    }, [chatValue]);
    
    const handleKeyDown = useCallback((e) => {
        if (e.key === '/') {
            e.preventDefault();
            setIsModalOpen(true);
        } else if (e.key === 'Enter') {
            e.preventDefault();
            setIsModalOpen(false);
        }
    }, []);

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
        document.addEventListener('mousemove', handleMouseMove);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.addEventListener('mousemove', handleMouseMove);
        };
    }, [handleKeyDown]);

    const handleMouseMove = (e) => {
        setCursorPosition({ x: e.clientX, y: e.clientY });
    };
    // const lists=[
    //     '나의 장소 리스트1','나의 장소 리스트2','나의 장소 리스트3','나의 장소 리스트4','나의 장소 리스트5','나의 장소 리스트6',];

    /*백 연결*/
    useEffect(()=>{
        const fetchLists=async()=>{
            try{
                const response=await axios.get(
                    'http://43.200.238.249:5000/users/lists',
                    {
                        headers: {
                          Authorization: `Bearer ${token}`,
                        },
                      }
                    );
                    setLists(response.data);  
                  } catch (error) {
                    console.error('Error fetching lists:', error);
                  }
                };
                fetchLists();  
            }, [token]); 
    return(
        <Container>
            <Left>
                <Place>
                    <Button onClick={() => setUser(0)} isClicked={user===0}>나의 장소 <Underline isClicked={user===0}/></Button>
                    <Button onClick={() => setUser(1)} isClicked={user===1}>친구1 장소 <Underline isClicked={user===1}/></Button>
                    <Button onClick={() => setUser(2)} isClicked={user===2}>친구2 장소 <Underline isClicked={user===2}/></Button>
                </Place>
                {<ToggleListPlace placeLists={placeLists} setPlaceLists={setPlaceLists} />}
                {<ToggleList selectedLists={selectedLists} setSelectedLists={setSelectedLists} Right={false}/>}
                <PlaceSet>
                    <ListButton onClick={openModal1}>나의 장소 불러오기</ListButton>
                    <PlaceButton onClick={openModal2}>장소 등록</PlaceButton>
                </PlaceSet>
            </Left>
            <Map>
                <KakaoMap width="100%" height="calc(100vh - 60px)"/>  
            </Map>
            <Right>
                <Candidate>
                    <Button onClick={() => setVote(0)} isClicked={vote===0}>후보지 만들기 <Underline isClicked={vote===0}/></Button>
                    <Button onClick={() => setVote(1)} isClicked={vote===1}>투표하기🔒 <Underline isClicked={vote===1}/></Button> 
                </Candidate>
                { vote===0 && 
                    <>
                    <PlusButton onClick={handleCandidate}>새로운 후보지 추가 +</PlusButton>
                    <ToggleList selectedLists={candidateList} setSelectedLists={setCandidateList} Right={true}/>
                    <GoToVoteButton onClick={()=>{setVote(1)}}>투표 하러가기</GoToVoteButton>
                    </>
                }
                { vote===1 && 
                    <>
                    <ToggleListVote selectedLists={candidateList} setSelectedLists={setCandidateList} shareVoteDetails={shareVoteDetails} />
                    <MakeRouteButton
                        disabled={!voteDone || candidateList.length === 0}
                        onClick={handlePlanRoom2}>
                        동선 만들러 가기
                    </MakeRouteButton>
                    </>
                }
            </Right>
            {/*채팅, 모달들*/}
            <div style={{ position: 'relative' }}>
            {isModalOpen && (
                <Overlay style={{ left: cursorPosition.x, top: cursorPosition.y-1000}}>
                    <input
                        type="text"
                        className='input'
                        onChange={(e) => {setChatValue(e.target.value)
                            console.log('입력값:',chatValue);}
                        }
                        ref={inputRef}
                        value={chatValue}
                    />
                    <span ref={spanRef} style={{ position: 'absolute', visibility: 'hidden', whiteSpace: 'pre' }}>
                        {inputValue || '여기에 입력하세요'}
                    </span>
                </Overlay>
            )}
        </div>
        <MyPlaceModal isOpen={modal1} onClose={closeModal1}>
            {user===0 && (
                <>
                    <ModalTitle>나의 장소 불러오기</ModalTitle>
                    <ModalContent1>
                        {lists.map((list,index)=>(
                            <ModalList key={index} onClick={() => handleListClick(list)}>
                                {list}
                            </ModalList>
                        ))}
                    </ModalContent1>
                </>
            )}
            {user!==0 && <div>"나의 장소"에서만 불러올 수 있습니다.</div>}
        </MyPlaceModal>
        {modal2 &&
            <ModalOverlay>
                <ModalContent>
                    <CloseButton onClick={closeModal2}>X</CloseButton>
                    <ModalTitle2>장소 직접 등록하기</ModalTitle2>
                    <ModalContent2>
                        카카오맵 또는 네이버 지도에서 불러올 장소의 공유 링크를 입력해주세요
                        <InputButton>
                            <input 
                                type='url'placeholder={placeholder} 
                                onFocus={()=>setPlaceholder('')} 
                                onBlur={() => setPlaceholder("url을 입력하세요")}
                                onChange={(e)=>setInputValue(e.target.value)}/>
                            <button onClick={handlePlace}> 입력하기</button>
                        </InputButton>
                    </ModalContent2>
                </ModalContent>
            </ModalOverlay>
        }       
        </Container>
    );
}


export default PlanRoom1;