import React,{useState} from 'react';
import KakaoMap from '../components/KakaoMap';
import styled from 'styled-components';
import ToggleMyLocation from '../toggleLists/ToggleMyLocation';
import img from '../modals/카카오맵 로고.png';
import img2 from '../modals/카카오맵 안내.png';
import axios from 'axios';  // Axios import

/*모달*/
const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
`;
const ModalContent = styled.div`
    background: black;
    color:white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    position: relative;
    width:700px;
    height: 500px;
    // display: flex;
    // flex-direction: column;
    align-items: center;
    div{
        display:flex;
        div{
            margin-top:15px;
            margin-left:50px;
            align-items: center;
        }
    }
`;
const CloseButton = styled.button`
    position: absolute;
    top: 10px;
    right: 10px;
    background: transparent;
    border: none;
    color:white;
    font-size: 16px;
    cursor: pointer;
`;
const Title=styled.div`
    color:white;
    font-size:18px;
    font-weight:600;
    margin-top:10px;
    margin-left:30px;
    margin-bottom:20px;
`;
const Bold=styled.div`
    color:white;
    font-size:16px;
    font-weight:600;
    margin-top:30px;
    margin-left:50px;
`;
const IMG=styled.img`
    width:80px;
    height:80px;
    border-radius:10px;
    margin-left:80px;  
    margin-top:20px;
`;
const InputButton=styled.div`
    display:flex;
    margin-top:5px;
    position: relative;
    input{
        width:400px;
        height:40px;
        border-radius:30px;
        padding-right: 90px; 
    }
    button{
        position: absolute;
        left:400px;
        top:5px;
        width:90px;
        height:35px;
        border:none;
        border-radius:30px;
        background-color:#63CAF4;
        font-weight:600;
        color:white;
    }
`;
const IMG2=styled.img`
    width:600px;
    height:80px;
    border-radius:10px;
    margin-left:50px;  
    margin-top:60px;
`;
/*구역*/
const List=styled.div`
  width:500px;
`;
const ListBox=styled.div`
  width:500px;
  height:700px;
  background-color:#DADADA;
  border: 1px #DADADA solid;
  overflow-y: auto;
  flex-grow: 1;

  &::-webkit-scrollbar {
    width: 7px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #888; 
    border-radius: 6px;
  }

`;
const Map=styled.div`
  position:fixed;
  left:660px;
  top:60px;
`;
/*즐겨찾기 불러오기 버튼*/
const Button=styled.button`
  border:none;
  border-radius:30px;
  color:white;
  font-size:16px;
  font-weight:600;
  background-color:#63CAF4;
  padding:8px 15px;
`;
/*리스트 없을 때*/
const EmptyList=styled.div`
  width:500px;
  height:700px;
  div{
    text-align:center;
    line-height:600px;
    color:#4B4B4B;
    font-size:18px;
    font-weight:600;
  }
`;

function MyLocationList() {
  const [MyLocationLists, setMyLocationLists]=useState([]); 
  const [isEmpty,setIsEmpty]=useState(true);
  const [isOpen,setIsOpen]=useState(false);
  const [input,setInput]=useState('');//새로 입력받은 즐겨찾기 장소 링큰
  const [placeholder, setPlaceholder]=useState('공개로 설정된 즐겨찾기 URL을 입력해주세요');
  const token=localStorage.getItem('token');

  useState(()=>{
      if(MyLocationLists==='[]'){
        setIsEmpty(true);
      }else{
        setIsEmpty(false)
      }
  },[MyLocationLists]);

  const openModal=()=>{
    setIsOpen(true);
  };
  const closeModal=()=>{
    setIsOpen(false);
  };
  const handlePlace=(newPlaces)=>{
    setMyLocationLists([...MyLocationLists, newPlaces]); 
  };
  const handleSubmit = async () => {
    console.log('MyLocationLists',MyLocationLists);
    console.log('Sending request with token:', token);
    console.log('Sending request to URL:', input);
    try {
      const response = await axios.post(
        'http://43.200.238.249:5000/users/add-myPlace', 
        { url: input },
        {
          headers: {
            Authorization: `Bearer ${token}`  
          }
        }
      );
      console.log('Response received:', response);
      handlePlace(response.data.placeList);  // 받아온 장소 목록으로 업데이트
      closeModal();
    } catch (error) {
      console.error('Error fetching places:', error);
    }
  };
  
  return (
      <>
        <List>
            <h2>나의 장소</h2>
            <Button onClick={openModal}> + 지도앱에서 즐겨찾기 불러오기</Button><br/><br/>
            <ListBox>
                {isEmpty && <EmptyList><div>아직 불러온 즐겨찾기 목록이 없습니다.</div></EmptyList>}
                {!isEmpty && <ToggleMyLocation selectedLists={MyLocationLists} setSelectedLists={setMyLocationLists} />}
            </ListBox>
        </List>
        {isOpen && <ModalOverlay>
            <ModalContent>
                <Title>지도 앱에서 즐겨찾기 불러오기</Title>
                <div>
                    <Bold>1. 지도 앱 선택하기</Bold>
                    <div>-추후 연동 가능한 앱이 추가될 예정입니다.</div>
                </div>
                <IMG src={img} alt={img}/>
                <Bold>2. 공개로 설정된 즐겨찾기의 링크 입력하기</Bold>
                <div>
                    <div>&nbsp;URL</div>
                    <InputButton>
                        <input 
                            type='url'placeholder={placeholder} 
                            onFocus={()=>setPlaceholder('')} 
                            onBlur={() => setPlaceholder('공개로 설정된 즐겨찾기 URL을 입력해주세요')}
                            onChange={(e)=>setInput(e.target.value)}/>
                        <button onClick={handleSubmit}> 완료</button>
                    </InputButton>
                </div>
                <IMG2 src={img2} alt={img2}/>
                <CloseButton onClick={closeModal}>X</CloseButton>
            </ModalContent>
        </ModalOverlay>}
        <Map>
          <KakaoMap width="1000px" height="calc(100vh - 70px)"/>
        </Map>
      </>
  );
}

export default MyLocationList;