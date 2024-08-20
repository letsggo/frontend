import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios'; // axios를 추가로 import합니다.
import image from './이미지 업로드.png';

const ListItem = styled.div`
  padding: 10px;
  height: 40px;
  line-height: 40px;
  border: 1px solid #ccc;
  border-left: none;
  border-right: none;
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
  gap: 10px;
`;

const Plus = styled.button`
  border: ${props => props.voteIng ? '2px #F08080 solid' : (props.skip ? 'none' : '2px #63CAF4 solid')};
  border-radius: ${props => props.voteIng ? '5px' : (props.skip ? '5px' : '50px')};
  background-color: ${props => props.skip ? '#F08080' : 'transparent'};
  color: ${props => props.skip ? 'white' : 'black'};
  width: ${props => props.voteIng ? '70px' : (props.skip ? '70px' : '50px')};
  margin-top: 5px;
  font-weight: 600;
  cursor: pointer;
`;

const VoteButton = styled.button`
  width: 300px;
  height: 40px;
  background-color: #F08080;
  border: none;
  border-radius: 30px;
  color: white;
  font-size: 16px;
  font-weight: 600;
  margin-left: 10px;
`;

const ToggleListVote = ({ selectedLists, setSelectedLists, shareVoteDetails }) => {
  const [openIndexes, setOpenIndexes] = useState([]);
  const [toggleIcon, setIcon] = useState({});
  const [detailLists, setDetailLists] = useState({});
  const [selectedDetails, setSelectedDetails] = useState({});
  const [voteIng, setVoteIng] = useState([]);
  const [skippedList, setSkippedList] = useState([]);
  const [listNameId, setListNameId] = useState({});
  const [MyLists, setMyLists] = useState([]);
  const[candidate_id,setCadidateId]=useState(0);
  const token=localStorage.getItem('token');

  useEffect(() => {
    const loadSkippedList = () => {
      const storedSkippedList = localStorage.getItem('skippedList');
      if (storedSkippedList) {
        try {
          const parsedSkippedList = JSON.parse(storedSkippedList);
          setSkippedList(parsedSkippedList);
        } catch (error) {
          console.error("JSON parsing error:", error);
          setSkippedList([]);
        }
      } else {
        setSkippedList([]);
      }
    };

    loadSkippedList();
  }, []);

  useEffect(() => {
    const handleStorageChange = () => {
      const updatedSkippedList = localStorage.getItem('skippedList');
      if (updatedSkippedList) {
        try {
          const parsedSkippedList = JSON.parse(updatedSkippedList);
          setSkippedList(parsedSkippedList);
        } catch (error) {
          console.error("JSON parsing error:", error);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  useEffect(() => {
    fetchLists();
  }, [token]);

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
        image: image
      })));
      setOpenIndexes(new Array(response.data.length).fill(false));
      setVoteIng(new Array(response.data.length).fill(true));
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
    setOpenIndexes(prevIndexes => {
      const newIndexes = [...prevIndexes];
      newIndexes[index] = !newIndexes[index];
      return newIndexes;
    });
    setIcon(prevIcon => ({
      ...prevIcon,
      [index]: openIndexes[index] ? '▶' : '▼'
    }));
    const listName = selectedLists[index];
    if (listName && !detailLists[listName]) {
      const listId = listNameId[listName];
      if (listId) {
        fetchListDetails(listId, listName);
      }
    }
  };

  const handleDetailSelect = (listIndex, detail) => {
    const newSelectedDetails = { ...selectedDetails };
    if (!Array.isArray(newSelectedDetails[listIndex])) {
      newSelectedDetails[listIndex] = [];
    }
    if (newSelectedDetails[listIndex].includes(detail)) {
      newSelectedDetails[listIndex] = newSelectedDetails[listIndex].filter(item => item !== detail);
    } else {
      newSelectedDetails[listIndex].push(detail);
    }
    setSelectedDetails(newSelectedDetails);
  };

  const handleSave = (index) => {
    setCadidateId(prevId=>prevId+1); // 후보지 ID 
    const user_id = 1; // user_id를 임의로 1로 설정
    const state = selectedDetails[index] ? true : false; // 투표 여부
    const skip = skippedList.includes(index); // 스킵 여부

    shareVoteDetails(selectedDetails); //세부정보 공유
    const newVoteIng = [...voteIng];
    newVoteIng[index] = false;
    setVoteIng(newVoteIng);
    localStorage.setItem('voteIng', JSON.stringify(newVoteIng));

    handleVote({candidate_id, user_id, state, skip, ranked: 1 }); //userId임의로 정함
  };

  /*투표 결과 저장*/
  const handleVote = async ({ candidate_id, user_id, state, skip, ranked }) => {
    const token = localStorage.getItem('token'); // JWT 토큰을 가져옵니다.
  
    const voteData = {
      candidate_id,
      user_id,
      state,
      skip,
      ranked: ranked || null, // ranked는 null일 수 있으므로 기본값을 null로 설정합니다.
    };
  
    try {
      const response = await axios.post(
        'http://43.200.238.249:5000/travel-plans/candidates/vote',
        voteData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      // 서버로부터 응답을 받았을 때의 처리
      console.log('투표 저장 성공:', response.data);
      return response.data; // 필요한 경우 호출된 곳에서 응답 데이터를 사용할 수 있도록 반환
    } catch (error) {
      console.error('투표 저장 실패:', error.response ? error.response.data : error.message);
      throw error; // 오류를 호출된 곳에서 처리할 수 있도록 예외를 던짐
    }
  };
  return (
    <div>
      {selectedLists.map((list, index) => (
        <div key={index}>
          <ListItem>
            <div onClick={() => handleListClick(index)}>{toggleIcon[index] || '▶'}</div>
            <img src={image} alt="List item" />
            {list} {/* list 객체에서 list_name을 사용 */}
            <Plus className='Plus' voteIng={voteIng[index]} skip={skippedList.includes(index)}>
              {skippedList.includes(index) ? '투표Skip' : (voteIng[index] ? '진행 중' : '완료')}
            </Plus>
          </ListItem>
          {openIndexes[index] && (
            <SubList>
              {detailLists[selectedLists[index]]?.map((detail, detailIndex) => (
                <Place key={detailIndex}>
                  <input
                    type='radio'
                    value={detail}
                    onChange={() => handleDetailSelect(index, detail)}
                  />
                  <span>{detail}</span>
                </Place>
              ))}
              <VoteButton onClick={() => handleSave(index)}>{voteIng[index] ? '투표하기' : '다시 투표하기'}</VoteButton>
              <hr />
            </SubList>
          )}
        </div>
      ))}
    </div>
  );
};

export default ToggleListVote;




