import React, { useState } from 'react';
import styled from 'styled-components';
import Modal from 'react-modal';

// 모달 스타일
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    transform: 'translate(-50%, -50%)',
  },
};

// 기본 스타일
const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px;
`;

const InputContainer = styled.div`
  display: flex;
  margin-bottom: 10px;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-right: 10px;
`;

const Button = styled.button`
  padding: 10px;
  border: none;
  border-radius: 5px;
  background-color: #4caf50;
  color: white;
  cursor: pointer;
`;

const ChatButton = styled(Button)`
  background-color: #007bff;
`;

// 메인 컴포넌트
const ChatApp = () => {
  const [message, setMessage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setMessage(value);

    // 입력값이 '/'일 경우 모달 열기
    if (value === '/') {
      setIsModalOpen(true);
      setMessage(''); // 모달 열기 전에 입력 필드 비우기
    }
  };

  return (
    <ChatContainer>
      <InputContainer>
        <Input
          type="text"
          value={message}
          onChange={handleInputChange}
          placeholder="메시지를 입력하세요"
        />
        <Button onClick={() => setIsModalOpen(true)}>전송</Button>
      </InputContainer>
      <ChatButton onClick={() => setIsModalOpen(true)}>모달 열기</ChatButton>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        style={customStyles}
        contentLabel="Chat Modal"
      >
        <h2>채팅 모달</h2>
        <p>{message}</p>
        <Button onClick={() => setIsModalOpen(false)}>닫기</Button>
      </Modal>
    </ChatContainer>
  );
};

export default ChatApp;
