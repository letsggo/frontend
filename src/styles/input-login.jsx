import styled from 'styled-components';

const InputContainer = styled.div`
  position: relative;
  width: 120%;
  display: flex;
  flex-direction: column;
`;

const InputBox = styled.input`
  width: 100%;
  height: 55px;
  background-color: white;
  border: 1px solid #4ec3f3;
  border-radius: 5px;
  padding: 0 1vw;
  box-sizing: border-box;
  outline: none;
  font-size: 15px;
`;

const ErrorP = styled.p`
  font-size: 0.6vw;
  font-weight: bold;
  color: #ff0000;
  position: absolute;
  left: 0;
  bottom: -1.9vw;
  padding-left: 0.5vw;
`;

const InputLogin = ({ placeholder, type, value, onChange, error }) => {
  return (
    <InputContainer>
      <InputBox
        placeholder={placeholder}
        type={type}
        value={value}
        onChange={onChange}
      />
      {error && <ErrorP>{error}</ErrorP>}
    </InputContainer>
  );
};

export default InputLogin;
