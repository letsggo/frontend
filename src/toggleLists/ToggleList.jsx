import React, { useState,useEffect} from 'react';
import styled from 'styled-components';
import image from './이미지 업로드.png';

const ListItem = styled.div`
  padding: 10px;
  height: 40px;
  line-height: 40px;
  border: 1px solid #ccc;
  border-left:none;
  border-right:none;
  cursor: pointer;
  display: flex;
  position: relative; 
  gap:10px;
  img{
    width:40px;
    height:40px;
    border-radius:40px;
  }
  .Plus{
     margin-left: auto;
  }
`;

const SubList = styled.div`
  background-color:#f9f9f9;
  border-radius: 4px;
`;

const Place = styled.div`
  height: 40px;
  line-height: 40px;
  padding: 10px;
  border: 1px solid #ccc;
  border-left:none;
  border-right:none;
  padding:10px 30px 10px 50px;
  display: flex;
  justify-content:space-between;
  `;

const Plus = styled.button`
  border: none;
  background: none;
  font-size: 20px;
  font-weight: 700;
  cursor: pointer;
`;

const Modal = styled.div`
  background-color:black;
  position: absolute;
  left: ${props => props.left}px;
  top: ${props => props.top}px;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100px;
  z-index: 1000;
  button {
    color:white;
    background: none;
    border: none;
    font-size: 16px;
    cursor: pointer;
  }
`;
const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0);
  z-index: 999;
`;
const RenameModal=styled.div`
  position: absolute;
  left: ${props => props.left -300}px;
  top: ${props => props.top}px;
  background-color: white;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 280px;
  height:80px;
  z-index: 1000;
`;
const InputButton=styled.div`
    display:flex;
    position: relative;
    input{
        width:180px;
        height:32px;
        border-radius:30px;
        border-color:#FFD700;
        padding-right: 90px; 
    }
    button{
        position: absolute;
        left:190px;
        top:4px;
        width:80px;
        height:30px;
        border:none;
        border-radius:30px;
        background-color:#FFD700;
        font-weight:600;
        color:white;
    }
`;
const ToggleList = ({ selectedLists, setSelectedLists, Right }) => {
  const [openIndexes, setOpenIndexes] = useState([]);
  const [modalInfo, setModalInfo] = useState({ visible: false, index: null, left: 0, top: 0 }); //기본 모달
  const [modalEdit, setModalEdit] = useState({ visible: false, index: null, left: 0, top: 0 }); //상세 페이지 모달
  const [toggleIcon, setIcon] = useState({});
  const [detailLists, setDetailLists] = useState([]); // 예시 데이터
  const[modalRename, setModalRename]=useState(false);
  const [renameValue, setRenameValue]=useState('');
  const [skipVote, setSkipVote]=useState(selectedLists.map(() => false));

  const handleListClick = (index) => {
    if (openIndexes.includes(index)) {
      setOpenIndexes(openIndexes.filter(i => i !== index));
      setIcon({ ...toggleIcon, [index]: '▶' });
    } else {
      setOpenIndexes([...openIndexes, index]);
      setIcon({ ...toggleIcon, [index]: '▼' });
    }
    if (!detailLists[index]) {
      setDetailLists({ ...detailLists, [index]: ['상세1', '상세2'] });
    }
  };

  const handleEdit = (detailIndex,listIndex, event) => {
    event.stopPropagation();
    const buttonRect = event.target.getBoundingClientRect();
    const parentRect = event.target.parentElement.getBoundingClientRect();
    setModalEdit({
      visible: true,
      index: detailIndex,
      listIndex: listIndex,
      left: (buttonRect.left*2) - (parentRect.left+350),
      top: (buttonRect.bottom*2) - (parentRect.top +100) ,
    });
  };

  const handleFix = (index, event) => {
    event.stopPropagation();
    const buttonRect = event.target.getBoundingClientRect();
    const parentRect = event.target.parentElement.getBoundingClientRect();
    setModalInfo({
      visible: true,
      index,
      left: buttonRect.right - parentRect.left -100,
      top: buttonRect.top - parentRect.top,
    });
  };

  const handleDelete = (isEdit) => {
    if (isEdit) {
      const newDetailList = [...detailLists[modalEdit.listIndex]]; 
      newDetailList.splice(modalEdit.index, 1);
      setDetailLists({
        ...detailLists,
        [modalEdit.listIndex]: newDetailList
      });
    } else {
      const newSelectedLists = [...selectedLists];
      newSelectedLists.splice(modalInfo.index, 1);
      setSelectedLists(newSelectedLists);
      setOpenIndexes(openIndexes.filter(i => i !== modalInfo.index));
    }
    closeModal(isEdit);
  };

  const closeModal = (isEdit) => {
    if (isEdit) {
      setModalEdit({ visible: false, index: null, left: 0, top: 0 });
    } else {
      setModalInfo({ visible: false, index: null, left: 0, top: 0 });
    }
  };

  const handleRename =(isEdit)=>{
    closeModal(isEdit);
    setModalRename(true);
    const newSelectedLists = [...selectedLists];
    newSelectedLists[modalInfo.index]=renameValue;
    setSelectedLists(newSelectedLists);
    setOpenIndexes(openIndexes.filter(i => i !== modalInfo.index));
    setModalRename(false);
  }

  useEffect(() => {
    const storedSkippedList = localStorage.getItem('skippedList');
    if (storedSkippedList) {
      try {
        setSkipVote(JSON.parse(storedSkippedList)); // 초기 스킵 리스트 불러오기
      } catch (error) {
        console.error("JSON parsing error:", error);
        setSkipVote([]); // 오류 발생 시 빈 배열로 초기화
      }
    }
}, []);

const handleSkipVote = (index) => {
  const existingSkippedList = localStorage.getItem('skippedList');
  let newSkippedList = [];

  if (existingSkippedList) {
      try {
          newSkippedList = JSON.parse(existingSkippedList); // 이전 스킵 리스트 불러오기
      } catch (error) {
          console.error("JSON parsing error:", error);
          newSkippedList = []; // 오류 발생 시 빈 배열로 초기화
      }
  }

  if (newSkippedList.includes(index)) { // 인덱스가 이미 스킵된 경우
      newSkippedList = newSkippedList.filter(item => item !== index); // 삭제
  } else { // 인덱스를 스킵 리스트에 추가
      newSkippedList.push(index);
  }

  localStorage.setItem('skippedList', JSON.stringify(newSkippedList)); // 새로운 스킵 리스트 저장
  
  // 새로운 스킵 리스트에 기반하여 상태 업데이트
  setSkipVote((prevSkipVote) => {
      const updatedSkipVote = [...prevSkipVote]; // 기존 상태 복사
      updatedSkipVote[index] = !updatedSkipVote[index]; // 현재 인덱스의 상태 반전
      return updatedSkipVote; // 업데이트된 상태 반환
  });
};

  
  return (
    <div>
      {selectedLists.map((list, index) => (
        <div key={index}>
          <ListItem>
            <div onClick={() => handleListClick(index)}>{toggleIcon[index] || '▶'}</div>
            <img src={image} alt={image} />
            {list}
            <Plus onClick={(event) => handleFix(index, event)} className='Plus'>⋮</Plus>
            {modalInfo.visible && modalInfo.index === index && (
              <>
                <Overlay onClick={() => closeModal(false)} />
                <Modal left={modalInfo.left} top={modalInfo.top}>
                  <button onClick={() => { handleDelete(false) }}>Delete</button><br />
                  {Right && 
                    <>
                      <button onClick={() => setModalRename(true)} >Rename</button><br />
                      <button onClick={() => handleSkipVote(index)}>{skipVote[index] ? 'Skip 취소' : '투표 Skip' }</button><br />
                    </>
                  }
                </Modal>
                { modalRename &&
                    <RenameModal left={modalInfo.left} top={modalInfo.top}>
                      <div>후보지 이름 변경</div>
                      <InputButton>
                        <input type='text' onChange={(e)=>{setRenameValue(e.target.value)}}/>
                        <button onClick={() => { handleRename()}}> 변경하기</button>
                      </InputButton>
                    </RenameModal>
                }
              </>
            )}
          </ListItem>
          {openIndexes.includes(index) && (
            <SubList>
              {detailLists[index] && detailLists[index].map((detail, detailIndex) => (
                <Place key={detailIndex}>
                  {detail}
                  <Plus onClick={(event) => handleEdit(detailIndex, index, event)}>⋮</Plus>
                  {modalEdit.visible && modalEdit.index === detailIndex && (
                    <>
                      <Overlay onClick={() => closeModal(true)} />
                      <Modal left={modalEdit.left} top={modalEdit.top}>
                        <button onClick={() => { handleDelete(true) }}>Delete</button>
                      </Modal>
                    </>
                  )}  
                </Place>
              ))}
            </SubList>
          )}
        </div>
      ))}
    </div>
  );
};

export default ToggleList;