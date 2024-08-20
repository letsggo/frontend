import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import image from './이미지 업로드.png';

// 스타일 컴포넌트 정의
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
  .right{
    display: flex;
    margin-left:150px;
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
  color:#614D4D;
  background-color: #f8df00;
  padding: 0px 5px;
  border-radius: 5px;
  font-weight: 600;
  height: 35px;
  line-height: 35px;
  margin-top: 5px;
  margin-right:10px;
`;
const Plus = styled.button`
  border: none;
  background: none;
  font-size: 20px;
  font-weight: 700;
  cursor: pointer;
  margin-top: 5px;
  margin-left:20px;
`;
const Name=styled.div`
  width:100px;
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

  useEffect(() => {
    fetchLists();
  }, []);

  useEffect(() => {
    console.log('Selected lists updated:', selectedLists);
  }, [selectedLists]);
  
  useEffect(() => {
    console.log('Detail lists updated:', detailLists);
  }, [detailLists]);

  const fetchLists = useCallback(async () => {
    try {
      const response = await axios.get('http://43.200.238.249:5000/users/lists', {
        headers: { Authorization: `Bearer ${token}` }
      });

      const nameIdMap = response.data.reduce((acc, list) => {
        acc[list.list_name] = list.list_id;
        return acc;
      }, {});
      setListNameId(nameIdMap);
      setSelectedLists(response.data.map(list => ({
        list_name: list.list_name,
        image: image
      })));
      setOpenIndexes(new Array(response.data.length).fill(false));
    } catch (error) {
      console.error('Error fetching lists:', error.response ? error.response.data : error.message);
    }
  }, [token]);

  const fetchListDetails = useCallback(async (listId, listName) => {
    try {
      const response = await axios.get(`http://43.200.238.249:5000/users/lists/${listId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const details = response.data;
      console.log('Server response:', details);

      if (details.places && Array.isArray(details.places)) {
        const placeNames = details.places.map(place => place.place_name);
        setDetailLists(prevDetails => ({
          ...prevDetails,
          [listName]: placeNames
        }));
      } else {
        console.error('Unexpected response format:', details);
      }
    } catch (error) {
      console.error('Error fetching list details:', error.response ? error.response.data : error.message);
    }
  }, [token]);

  const handleListClick = useCallback((index) => {

    setOpenIndexes(prevIndexes => {
      const newIndexes = [...prevIndexes];
      newIndexes[index] = !newIndexes[index];
      return newIndexes;
    });

    setIcon(prevIcon => {
      const newIcon = { ...prevIcon };
      newIcon[index] = openIndexes[index] ? '▶' : '▼';
      return newIcon;
    });

    const listName = selectedLists[index]?.list_name;
    if (listName && !detailLists[listName]) {
      const listId = listNameId[listName];
      if (listId) {
        fetchListDetails(listId, listName);
      }
    }
  }, [openIndexes, selectedLists, detailLists, listNameId, fetchListDetails]);

  const getModalPosition = useCallback((event, parentElement) => {
    const buttonRect = event.target.getBoundingClientRect();
    const parentRect = parentElement.getBoundingClientRect();
    return {
      left: buttonRect.right - parentRect.left - 100,
      top: buttonRect.top - parentRect.top,
    };
  }, []);

  const handleEdit = useCallback((detailIndex, listName, event) => {
    event.stopPropagation();
    setModalEdit({
      visible: true,
      index: detailIndex,
      listName,
      ...getModalPosition(event, event.target.parentElement),
    });
  }, [getModalPosition]);

  const handleFix = useCallback((index, event) => {
    event.stopPropagation();
    setModalInfo({
      visible: true,
      index,
      ...getModalPosition(event, event.target.parentElement),
    });
  }, [getModalPosition]);

  const handleDelete = useCallback(async (isEdit, listId) => {
    console.log(listId);
    try {
      const response = await axios.delete(`http://43.200.238.249:5000/users/lists/${listId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.status === 200) {
        if (isEdit) {
          const newDetailList = [...(detailLists[modalEdit.listName] || [])];
          newDetailList.splice(modalEdit.index, 1);
          setDetailLists(prev => ({
            ...prev,
            [modalEdit.listName]: newDetailList
          }));
        }

        const newSelectedLists = selectedLists.filter((_, idx) => idx !== modalInfo.index);
        setSelectedLists(newSelectedLists);

        setOpenIndexes(prev => prev.map((val, idx) => idx === modalInfo.index ? false : val));
        
        console.log('selectedLists(delete):', newSelectedLists);
        console.log('List deleted successfully');
      } else {
        throw new Error('Failed to delete the list');
      }
    } catch (error) {
      console.error('Error deleting the list:', error.response ? error.response.data : error.message);
    }

    closeModal(isEdit);
  }, [modalEdit, detailLists, modalInfo, selectedLists, token]);

  const handleRefresh = useCallback(() => {
    setSelectedLists([]);
    setOpenIndexes([]);
    closeModal(false);
  }, []);

  const closeModal = useCallback((isEdit) => {
    if (isEdit) {
      setModalEdit({ visible: false, index: null, left: 0, top: 0 });
    } else {
      setModalInfo({ visible: false, index: null, left: 0, top: 0 });
    }
  }, []);

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
            <img src={image} alt="Location Thumbnail" />
            <Name>{list.list_name || '장소 이름 없음'}</Name>
            <div className='right'>
              <Kakao>카카오 연동</Kakao>
              <Plus onClick={(event) => handleFix(index, event)} className='Plus'>⋮</Plus>
            </div>
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
                detailLists[list.list_name].map((detail, detailIndex) => (
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
