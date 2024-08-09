import React, { useState } from 'react';
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
  justify-content: space-between;
  
  img {
    width: 40px;
    height: 40px;
    border-radius: 40px;
  }
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

const ToggleListPlace = ({ placeLists, setPlaceLists }) => {
  const [modalInfo, setModalInfo] = useState({ visible: false, index: null, left: 0, top: 0 });

  const handleFix = (index, event) => {
    event.stopPropagation();
    const buttonRect = event.target.getBoundingClientRect();
    const parentRect = event.target.parentElement.getBoundingClientRect();
    setModalInfo({
      visible: true,
      index,
      left: buttonRect.right - parentRect.left - 100,
      top: buttonRect.top - parentRect.top,
    });
  };

  const handleDelete = () => {
    const newSelectedLists = [...placeLists];
    newSelectedLists.splice(modalInfo.index, 1);
    setPlaceLists(newSelectedLists);
    closeModal();
  };

  const closeModal = () => {
    setModalInfo({ visible: false, index: null, left: 0, top: 0 });
  };

  return (
    <div>
      {placeLists.length > 0 && placeLists.map((list, index) => (
        <ListItem key={index}>
          <img src={image} alt={list} />
          {list}
          <Plus onClick={(event) => handleFix(index, event)}>⋮</Plus>
          {modalInfo.visible && modalInfo.index === index && (
            <>
              <Overlay onClick={closeModal} />
              <Modal left={modalInfo.left} top={modalInfo.top}>
                <button onClick={handleDelete}>Delete</button><br />
              </Modal>
            </>
          )}
        </ListItem>
      ))}
    </div>
  );
};

export default ToggleListPlace;
