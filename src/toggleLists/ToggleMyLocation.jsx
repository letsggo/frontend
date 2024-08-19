import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const ListItem = styled.div`
  padding: 10px;
  width: 96%;
  height: 40px;
  line-height: 40px;
  border: 1px solid #ccc;
  border-left: none;
  border-right: none;
  background-color: white;
  cursor: pointer;
  display: flex;
  position: relative;
  gap: 10px;
  img {
    width: 40px;
    height: 40px;
    border-radius: 40px;
  }
  .Plus {
    margin-left: auto;
  }
`;

const SubList = styled.div`
  background-color: #f9f9f9;
  border-radius: 4px;
`;

const Place = styled.div`
  height: 40px;
  line-height: 40px;
  padding: 10px;
  border: 1px solid #ccc;
  border-left: none;
  border-right: none;
  padding: 10px 30px 10px 50px;
  display: flex;
  justify-content: space-between;
`;

const Plus = styled.button`
  border: none;
  background: none;
  font-size: 20px;
  font-weight: 700;
  cursor: pointer;
  position: fixed;
  left: 570px;
  margin-top: 5px;
`;

const Modal = styled.div`
  background-color: black;
  position: absolute;
  left: ${props => props.left}px;
  top: ${props => props.top}px;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100px;
  z-index: 1000;
  button {
    color: white;
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
  z-index: 999;
`;

const Kakao = styled.div`
  //color: #544444;
  color:red;
  background-color: #f8df00;
  padding: 0px 5px;
  border-radius: 5px;
  font-weight: 600;
  height: 35px;
  line-height: 35px;
  position: fixed;
  left: 420px;
`;

const ToggleMyLocation = () => {
  const [openIndexes, setOpenIndexes] = useState([]);
  const [modalInfo, setModalInfo] = useState({ visible: false, index: null, left: 0, top: 0 });
  const [modalEdit, setModalEdit] = useState({ visible: false, index: null, left: 0, top: 0 });
  const [toggleIcon, setIcon] = useState({});
  const [detailLists, setDetailLists] = useState({});
  const [listNameId, setListNameId] = useState({});
  const [selectedLists, setSelectedLists] = useState([]);
  const token = localStorage.getItem('token');

  const fetchLists = async () => {
    try {
      const response = await axios.get('http://43.200.238.249:5000/users/lists', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const nameIdMap = response.data.reduce((acc, list) => {
        acc[list.list_name] = list.list_id;
        return acc;
      }, {});
      setListNameId(nameIdMap);

      setSelectedLists(response.data.map(list => ({
        list_name: list.list_name,
        image: "https://example.com/default-image.png" // 이미지 URL 설정
      })));

      setOpenIndexes(new Array(response.data.length).fill(false));
      setDetailLists({});
    } catch (error) {
      console.error('Error fetching lists:', error);
    }
  };


  // useEffect(() => {
  //   fetchLists();
  //   console.log('detailLists:',detailLists);
  //   console.log('selectedlists:',selectedLists);
  //   console.log('listNameId:',listNameId);
  // }, [detailLists,selectedLists,listNameId]);

  const fetchListDetails = async (listId, listName) => {
    try {
      const response = await axios.get(`http://43.200.238.249:5000/users/lists/${listId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const details = response.data;
      const placeNames = details.places.map(place => place.place_name);

      setDetailLists(prevDetails => ({
        ...prevDetails,
        [listName]: placeNames
      }));
    } catch (error) {
      console.error('Error fetching list details:', error.response ? error.response.data : error.message);
    }
  };

  const handleListClick = (index) => {
    console.log('before:',openIndexes[index]);
    setOpenIndexes(prevIndexes => {
      const newIndexes = [...prevIndexes];
      newIndexes[index] = !newIndexes[index];
      return newIndexes;
    });
    console.log('after:',openIndexes[index]);
    setIcon(prevIcon => ({
      ...prevIcon,
      [index]: openIndexes[index] ? '▶' : '▼'
    }));
  
    // 상세 데이터 요청
    const listName = selectedLists[index]?.list_name;
    if (listName && !detailLists[listName]) {
      const listId = listNameId[listName];
      if (listId) {
        fetchListDetails(listId, listName);
      }
    }
  };
  

  const handleEdit = (detailIndex, listName, event) => {
    event.stopPropagation();
    const buttonRect = event.target.getBoundingClientRect();
    setModalEdit({
      visible: true,
      index: detailIndex,
      listName,
      left: buttonRect.left,
      top: buttonRect.bottom,
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

  const handleDelete = async (isEdit, listId) => {
    console.log('detailLists:',detailLists);
    console.log('selectedlists:',selectedLists);
    console.log('listNameId:',listNameId);
    try {
      const response = await axios.delete(`http://43.200.238.249:5000/users/lists/${listId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to delete the list');
      }

      if (isEdit) {
        const newDetailList = [...(detailLists[modalEdit.listName] || [])];
        newDetailList.splice(modalEdit.index, 1);
        setDetailLists(prev => ({
          ...prev,
          [modalEdit.listName]: newDetailList
        }));
      } else {
        const newSelectedLists = selectedLists.filter((_, idx) => idx !== modalInfo.index);
        setSelectedLists(newSelectedLists);
        setOpenIndexes(prev => prev.map((val, idx) => idx === modalInfo.index ? false : val));
      }

      const result = await response.json();
      console.log(result.message);
    } catch (error) {
      console.error('Error deleting the list:', error);
    }

    closeModal(isEdit);
  };

  const handleRefresh = () => {
    setSelectedLists([]);
    setOpenIndexes([]);
    closeModal(false);
  };

  const closeModal = (isEdit) => {
    if (isEdit) {
      setModalEdit({ visible: false, index: null, left: 0, top: 0 });
    } else {
      setModalInfo({ visible: false, index: null, left: 0, top: 0 });
    }
  };

  useEffect(() => {
    console.log('Detail Lists:', detailLists);
  }, [detailLists]);

  if (!selectedLists || selectedLists.length === 0) {
    return null;
  }

  return (
    <div>
      {selectedLists.map((list, index) => (
        <div key={index}>
          <ListItem>
            <div onClick={() => handleListClick(index)}>
              {toggleIcon[index] || '▶'}
            </div>
            <img src={list.image} alt="Location Thumbnail" />
            {list.list_name || '장소 이름 없음'}
            <Kakao>카카오 연동</Kakao>
            <Plus onClick={(event) => handleFix(index, event)} className='Plus'>⋮</Plus>
            {modalInfo.visible && modalInfo.index === index && (
              <>
                <Overlay onClick={() => closeModal(false)} />
                <Modal left={modalInfo.left} top={modalInfo.top}>
                  <button onClick={() => handleDelete(false, listNameId[list.list_name])}>Delete</button><br />
                  <button onClick={handleRefresh}>Refresh</button>
                </Modal>
              </>
            )}
          </ListItem>
          {openIndexes[index] && (
            <SubList>
              {detailLists[list.list_name] && detailLists[list.list_name].length > 0 ? (
                (detailLists[list.list_name] || []).map((detail, detailIndex) => (
                  <Place key={detailIndex}>
                    {detail || '장소 이름 없음'}
                    <Plus onClick={(event) => handleEdit(detailIndex, list.list_name, event)}>⋮</Plus>
                    {modalEdit.visible && modalEdit.index === detailIndex && modalEdit.listName === list.list_name && (
                      <>
                        <Overlay onClick={() => closeModal(true)} />
                        <Modal left={modalEdit.left} top={modalEdit.top}>
                          <button onClick={() => handleDelete(true, detailLists[list.list_name][detailIndex]?.list_id)}>Delete</button>
                        </Modal>
                      </>
                    )}
                  </Place>
                ))
              ) : (
                <Place>장소 이름 없음</Place>
              )}
            </SubList>
          )}
        </div>
      ))}
    </div>
  );
};

export default ToggleMyLocation;
