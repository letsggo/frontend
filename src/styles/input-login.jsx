import styled from "styled-components";

const InputContainer = styled.div`
    position: relative;
    width: 150%;
    display: flex;
    flex-direction: column;
`

const InputBox = styled.input`
    width: 100%;
    height: 3vw;
    background-color: lightgrey;
    border: none;
    border-radius: 5px;
    padding: 0 1vw;
    box-sizing: border-box;
    outline: none;
    font-size: 0.8vw;
`

const ErrorP = styled.p`
    font-size: 0.6vw;
    font-weight: bold;
    color: #FF0000;
    position: absolute;
    left: 0;
    bottom: -1.9vw; 
    padding-left: 0.5vw;
`
const LoginButton = styled.button`
    width: 100%;
    height: 3vw;
    background-color: #007BFF;
    color: white;
    border: none;
    border-radius: 5px;
    font-size: 1vw;
    cursor: pointer;

    &:hover {
        background-color: #0056b3;
    }

    &:disabled {
        background-color: #ccc;
        cursor: not-allowed;
    }
`;

const InputLogin = ({placeholder, type, value, onChange, error}) => {
    return (
        <InputContainer>
            <InputBox placeholder={placeholder} type={type} value={value} onChange={onChange}/>
            {error && <ErrorP>{error}</ErrorP>}
        </InputContainer>
    )
}



export default InputLogin;