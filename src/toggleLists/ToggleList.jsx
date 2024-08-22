import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import image from './즐겨찾기.svg';
import grey from './grey.png';
import PRplaceModal from '../modals/PRplcaeModal';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const ListItem = styled.div`
  padding: 10px;
  width: 90%;
  height: 40px;
  line-height: 40px;
  border: 1px solid #ccc;
  border-left: none;
  border-right: none;
  cursor: pointer;
  display: flex;
  position: relative;
  gap: 10px;
  .Plus {
    margin-left: auto;
  }
`;

const SubList = styled.div`
  background-color: #f9f9f9;
  border-radius: 4px;
  min-height: 100px; /* 빈 리스트라도 최소 높이 유지 */
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
  img {
    width: 40px;
    height: 40px;
    border-radius: 5px;
  }
  div {
    display: flex;
  }
  .detail {
    width: 170px;
    margin-left: 20px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    display: inline-block;
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

const RenameModal = styled.div`
  position: fixed;
  left: ${props => props.left}px;
  top: ${props => props.top}px;
  background-color: white;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 280px;
  height: 80px;
  z-index: 100;
  pointer-events: auto;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: transparent;
  border: none;
  font-size: 16px;
  cursor: pointer;
  color: black;
`;

const InputButton = styled.div`
  display: flex;
  position: relative;
  margin-top: 10px;
  input {
    width: 180px;
    height: 32px;
    border-radius: 30px;
    border-color: #FFD700;
    padding-right: 90px;
  }
  button {
    position: absolute;
    left: 190px;
    top: 4px;
    width: 80px;
    height: 30px;
    border: none;
    border-radius: 30px;
    background-color: #FFD700;
    font-weight: 600;
    color: white;
  }
`;

const ToggleList = ({ selectedLists, setSelectedLists, Right, droppableId }) => {
  const [openIndexes, setOpenIndexes] = useState([]);
  const [modalInfo, setModalInfo] = useState({ visible: false, index: null, left: 0, top: 0 });
  const [modalEdit, setModalEdit] = useState({ visible: false, index: null, left: 0, top: 0 });
  const [toggleIcon, setIcon] = useState({});
  const [detailLists, setDetailLists] = useState({});
  const [modalRename, setModalRename] = useState(false);
  const [renameValue, setRenameValue] = useState('');
  const [skipVote, setSkipVote] = useState([]);
  const [listNameId, setListNameId] = useState({});
  const [MyLists, setMyLists] = useState([]);
  const [beforeRename, setBeforeRename] = useState([]);
  const [renamedLists, setRenamedLists] = useState(selectedLists);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalPlace, setModalPlace] = useState({});
  const token = localStorage.getItem('token');
  const [modalOpen2,setModalOpen2]=useState(false);

  useEffect(() => {
    fetchLists();
  }, []);

  useEffect(()=>{
    console.log('detailed!!',detailLists)
  },[detailLists])
  useEffect(() => {
    console.log('selectedLists:', selectedLists);
  }, [selectedLists]);
  useEffect(()=>{
    console.log('place:',modalPlace);
  },[modalPlace])

  const openModal2 = (place) => {
    setModalOpen(true);
    setModalPlace(place);
  };
  const closeModal2 = () => {
    setModalOpen(false);
  };

  const fetchLists = async () => {
    try {
      const response = await axios.get('http://43.200.238.249:5000/users/lists', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const nameIdMap = response.data.reduce((acc, list) => {
        acc[list.list_name] = list.list_id;
        return acc;
      }, {});
      setListNameId(nameIdMap);
      setMyLists(response.data.map(list => ({
        list_name: list.list_name,
        image: { image }
      })));
      setOpenIndexes(new Array(response.data.length).fill(false));
    } catch (error) {
      console.error('Error fetching lists:', error.response ? error.response.data : error.message);
    }
  };

  const fetchListDetails = async (listId, listName) => {
    try {
      const response = await axios.get(`http://43.200.238.249:5000/users/lists/${listId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const details = response.data;
      const places = details.places.map(place => ({
        name: place.place_name,
        address: place.address
      }));
      console.log('before detail:',detailLists)
      setDetailLists(prevDetails => ({
        ...prevDetails,
        [listName]: places
      }));
      console.log('after detail:',detailLists)
    } catch (error) {
      console.error('Error fetching list details:', error.response ? error.response.data : error.message);
    }
  };

  useEffect(() => {
    console.log('Updated detailLists:', detailLists);
  }, [detailLists]);

  const handleListClick = (index) => {
    setOpenIndexes(prevIndexes => {
      const newIndexes = [...prevIndexes];
      newIndexes[index] = !newIndexes[index];
      return newIndexes;
    });
    setIcon(prevIcon => ({
      ...prevIcon,
      [index]: openIndexes[index] ? '▶' : '▼'
    }));
    const listName = MyLists[index]?.list_name;
    if (listName && !detailLists[listName]) {
      const listId = listNameId[listName];
      if (listId) {
        fetchListDetails(listId, listName);
      }
    }
  };

  const handleEdit = (detailIndex, listIndex, event) => {
    event.stopPropagation();
    const buttonRect = event.target.getBoundingClientRect();
    const parentRect = event.target.parentElement.getBoundingClientRect();
    setModalEdit({
      visible: true,
      index: detailIndex,
      listIndex,
      left: buttonRect.right - parentRect.left - 100,
      top: buttonRect.top - parentRect.top + 150,
    });
  };

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

  const handleDelete = (isSubList) => {
    if (isSubList) {
      const listName = selectedLists[modalEdit.listIndex];
      const newDetails = [...detailLists[listName]];
      newDetails.splice(modalEdit.index, 1);  // 세부 항목 삭제

      setDetailLists(prevDetails => ({
        ...prevDetails,
        [listName]: newDetails,
      }));
    } else {
      const newSelectedLists = [...selectedLists];
      newSelectedLists.splice(modalInfo.index, 1);
      setSelectedLists(newSelectedLists);
    }
    closeModal(isSubList);
  };

  const closeModal = (isEdit) => {
    if (isEdit) {
      setModalEdit({ visible: false, index: null, left: 0, top: 0 });
    } else {
      setModalInfo({ visible: false, index: null, left: 0, top: 0 });
    }
  };

  const handleRename = () => {
    closeModal(false);
    const newSelectedLists = selectedLists.map((item) =>
      beforeRename.includes(item) ? renameValue : item
    );
    setRenamedLists(newSelectedLists);
    setModalRename(false);
  };

  const renameModalClose = () => {
    closeModal(false);
    setModalRename(false);
  };

  useEffect(() => {
    const storedSkippedList = localStorage.getItem('skippedList');
    if (storedSkippedList) {
      try {
        setSkipVote(JSON.parse(storedSkippedList));
      } catch (error) {
        console.error("JSON parsing error:", error);
        setSkipVote([]);
      }
    }
  }, []);

  const handleSkipVote = (index) => {
    const existingSkippedList = localStorage.getItem('skippedList');
    let newSkippedList = [];

    if (existingSkippedList) {
      try {
        newSkippedList = JSON.parse(existingSkippedList);
      } catch (error) {
        console.error("JSON parsing error:", error);
        newSkippedList = [];
      }
    }

    if (newSkippedList.includes(index)) {
      newSkippedList = newSkippedList.filter(item => item !== index);
    } else {
      newSkippedList.push(index);
    }

    localStorage.setItem('skippedList', JSON.stringify(newSkippedList));

    setSkipVote(prevSkipVote => {
      const updatedSkipVote = [...prevSkipVote];
      updatedSkipVote[index] = !updatedSkipVote[index];
      return updatedSkipVote;
    });
  };

  const skippedList = JSON.parse(localStorage.getItem('skippedList') || '[]');
  const mapLists = Right ? renamedLists : selectedLists;

  useEffect(() => {
    localStorage.setItem('renamedLists', JSON.stringify(renamedLists));
  }, [renamedLists]);

  const onDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination) return;

    if (source.droppableId === destination.droppableId) {
      const listIndex = parseInt(source.droppableId.replace('sublist-', ''), 10);
      const listName = selectedLists[listIndex];
      const listDetails = detailLists[listName] || [];

      const [movedItem] = listDetails.splice(source.index, 1);
      listDetails.splice(destination.index, 0, movedItem);

      setDetailLists({
        ...detailLists,
        [listName]: listDetails
      });

    } else {
      const sourceIndex = parseInt(source.droppableId.replace('sublist-', ''), 10);
      const destinationIndex = parseInt(destination.droppableId.replace('sublist-', ''), 10);

      const sourceListName = selectedLists[sourceIndex];
      const destinationListName = selectedLists[destinationIndex];

      const sourceListDetails = detailLists[sourceListName] || [];
      const destinationListDetails = detailLists[destinationListName] || [];

      const [movedItem] = sourceListDetails.splice(source.index, 1);
      destinationListDetails.splice(destination.index, 0, movedItem);

      setDetailLists({
        ...detailLists,
        [sourceListName]: sourceListDetails,
        [destinationListName]: destinationListDetails
      });
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId={droppableId} type="ITEM">
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {mapLists.map((list, index) => (
              <div key={index}>
                <ListItem>
                  <div onClick={() => handleListClick(index)}>
                    {toggleIcon[index] || '▶'}
                  </div>
                  <img src={image} alt={skipVote} />
                  {list}
                  <Plus onClick={(event) => handleFix(index, event)} className='Plus'>⋮</Plus>
                  {modalInfo.visible && modalInfo.index === index && (
                    <>
                      <Overlay onClick={() => closeModal(false)} />
                      <Modal left={modalInfo.left} top={modalInfo.top}>
                        <button onClick={() => handleDelete(false)}>Delete</button><br />
                        {Right && 
                          <>
                            <button onClick={() => {
                              setModalRename(true);
                              setBeforeRename(beforeRename.concat(list));
                            }}>
                              Rename
                            </button><br />
                            <button onClick={() => handleSkipVote(index)}>
                              {skippedList.includes(index) ? 'Skip 취소' : '투표 Skip'}
                            </button><br />
                          </>
                        }
                      </Modal>
                    </>
                  )}
                </ListItem>
                {openIndexes[index] && (
                  <Droppable droppableId={`sublist-${index}`} type="SUBLIST">
                    {(provided) => (
                      <SubList ref={provided.innerRef} {...provided.droppableProps}>
                        {detailLists[selectedLists[index]]?.map((detail, detailIndex) => (
                          <Draggable key={detailIndex} draggableId={`${index}-${detailIndex}`} index={detailIndex}>
                            {(provided, snapshot) => (
                              <Place
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                onClick={()=>{openModal2(detail)}}
                                style={{ 
                                  ...provided.draggableProps.style, 
                                  opacity: snapshot.isDragging ? 0.5 : 1 
                                }}
                              >
                                <div>
                                  <img src={grey} alt={image} />
                                  <div className='detail'>{detail.name}</div>
                                </div>
                                <Plus onClick={(event) => handleEdit(detailIndex, index, event)}>⋮</Plus>
                                <PRplaceModal isOpen={modalOpen} onClose={closeModal2} place={modalPlace} isPlace={false} />
                                {modalEdit.visible && modalEdit.index === detailIndex && (
                                  <>
                                    <Overlay onClick={() => closeModal(true)} />
                                    <Modal left={modalEdit.left} top={modalEdit.top}>
                                      <button onClick={() => handleDelete(true)}>Delete</button>
                                      <br />
                                    </Modal>
                                  </>
                                )}
                              </Place>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </SubList>
                    )}
                  </Droppable>
                )}
              </div>
            ))}
            {modalRename && (
              <RenameModal left={modalInfo.left + 1000} top={modalInfo.top + 50}>
                <div>후보지 이름 변경</div>
                <CloseButton onClick={renameModalClose}>X</CloseButton>
                <InputButton>
                  <input
                    type='text'
                    value={renameValue}
                    onChange={(e) => setRenameValue(e.target.value)}
                  />
                  <button onClick={handleRename}>변경하기</button>
                </InputButton>
              </RenameModal>
            )}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default ToggleList;

