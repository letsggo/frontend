import React, { useState, useEffect } from 'react';
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
  border-left:none;
  border-right:none;
  padding: 10px 30px 10px 50px;
  display: flex;
  gap: 10px;
`;

const Plus = styled.button`
  border: ${props => props.voteIng ? '2px #F08080 solid' : (props.skip ? 'none' : '2px #63CAF4 solid')};
  border-radius: ${props => props.voteIng ? '5px' : (props.skip ? '5px' : '50px')};
  background-color: ${props => props.skip ? '#F08080' : 'transparent'};
  color: ${props => props.skip ? 'white' : 'black'};
  width: ${props => props.voteIng ?'70px' : (props.skip ? '70px' : '50px')};
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
  const [voteIng, setVoteIng] = useState(selectedLists.map(() => true));
  const [skippedList, setSkippedList] = useState([]);

  useEffect(() => {
    const storedSkippedList = localStorage.getItem('skippedList');
    if (storedSkippedList) {
      try {
        setSkippedList(JSON.parse(storedSkippedList));
      } catch (error) {
        console.error("JSON parsing error:", error);
        setSkippedList([]);
      }
    } else {
      setSkippedList([]);
    }
  }, []);

  useEffect(() => {
    const newVoteIng = selectedLists.map((_, index) => !skippedList.includes(index));
    setVoteIng(newVoteIng);
  }, [skippedList, selectedLists]);

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
    shareVoteDetails(selectedDetails); //세부정보 공유
    const newVoteIng = [...voteIng]; //투표 상태 업데이트
    newVoteIng[index] = false;
    setVoteIng(newVoteIng);
    localStorage.setItem('voteIng', JSON.stringify(newVoteIng));
  };


  return (
    <div>
      {selectedLists.map((list, index) => (
        <div key={index}>
          <ListItem>
            <div onClick={() => handleListClick(index)}>{toggleIcon[index] || '▶'}</div>
            <img src={image} alt="item" />
            {list}
            <Plus className='Plus' voteIng={voteIng[index]} skip={skippedList.includes(index)}>
              {skippedList.includes(index) ? '투표Skip' : (voteIng[index] ? '진행 중' : '완료')}
            </Plus>
          </ListItem>
          {openIndexes.includes(index) && (
            <SubList>
              {detailLists[index] && detailLists[index].map((detail, detailIndex) => (
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



