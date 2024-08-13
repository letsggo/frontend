import React, { useState } from 'react';
import styled from 'styled-components';
import image from './이미지 업로드.png';

const ListItem = styled.div`
  padding: 10px;
  width:96%;
  height: 40px;
  line-height: 40px;
  border: 1px solid #ccc;
  border-left:none;
  border-right:none;
  background-color:white;
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


const ToggleMyLocation = ({ selectedLists, setSelectedLists }) => {
  const [openIndexes, setOpenIndexes] = useState([]);
  const [modalInfo, setModalInfo] = useState({ visible: false, index: null, left: 0, top: 0 }); //기본 모달
  const [modalEdit, setModalEdit] = useState({ visible: false, index: null, left: 0, top: 0 }); //상세 페이지 모달
  const [toggleIcon, setIcon] = useState({});
  const [detailLists, setDetailLists] = useState([]); // 예시 데이터

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
      left: (buttonRect.left*2) - (parentRect.left+450),
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
      top: buttonRect.top - parentRect.top ,
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

  const handleRefresh=(isEdit)=>{
        setSelectedLists([]);
        setOpenIndexes([]);
        closeModal(isEdit);
  }
  const closeModal = (isEdit) => {
    if (isEdit) {
      setModalEdit({ visible: false, index: null, left: 0, top: 0 });
    } else {
      setModalInfo({ visible: false, index: null, left: 0, top: 0 });
    }
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
                  <button onClick={()=>{handleRefresh(false)}}>Refresh</button>
                </Modal>
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

export default ToggleMyLocation;