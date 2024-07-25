import React from 'react';
import styled from 'styled-components';

const InputContainer = styled.div`
    width: 50%;
    display: flex;
    flex-direction: column;
    margin-bottom: 1vw;
`;

const StyledInput = styled.input`
    width: 100%;
    padding: 1vw;
    background-color: lightgrey;
    border: 1px solid ${props => (props.error ? 'red' : '#ccc')};
    border-radius: 0.5vw;
    font-size: 1vw;
    box-sizing: border-box;
    transition: border-color 0.2s;

    &:focus {
        border-color: ${props => (props.error ? 'red' : '#007BFF')};
        outline: none;
    }
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
                aria-invalid={!!error}  // 접근성을 위한 속성
            />
            {error && <ErrorMessage>{error}</ErrorMessage>}
        </InputContainer>
    );
};

export default InputSignup;
