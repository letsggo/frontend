import React from 'react';
import styled from 'styled-components';

const InputContainer = styled.div`
  width: 70%;
  display: flex;
  flex-direction: column;
  margin-bottom: 1vw;
`;

const StyledInput = styled.input`
  width: 100%;
  height: 55px;
  background-color: white;
  border: 1px solid #4ec3f3;
  border-radius: 5px;
  padding: 0 1vw;
  box-sizing: border-box;
  outline: none;
  font-size: 15px;
  margin: 10px 0;
`;

const ErrorMessage = styled.span`
  color: red;
  font-size: 0.8vw;
  margin-top: 0.5vw;
`;

const InputSignup = ({ placeholder, type, value, onChange, error }) => {
  return (
    <InputContainer>
      <StyledInput
        placeholder={placeholder}
        type={type}
        value={value}
        onChange={onChange}
        error={error}
        aria-invalid={!!error} // 접근성을 위한 속성
      />
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </InputContainer>
  );
};

export default InputSignup;