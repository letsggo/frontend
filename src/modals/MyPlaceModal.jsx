import React  from "react"; 
import styled from "styled-components";

const ModalOverlay = styled.div`
    position: fixed;
    top: 55%;
    left: 0;
    right: 0;
    bottom: 0;
    // display: flex;
    // justify-content: center;
    // align-items: center;
    z-index: 1000;
`;

const ModalContent = styled.div`
    background: black;
    color:white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    position: relative;
    width:350px;
    height: 250px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const CloseButton = styled.button`
    position: absolute;
    top: 10px;
    right: 10px;
    background: transparent;
    border: none;
    font-size: 16px;
    cursor: pointer;
    color:white;
`;

const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <ModalOverlay>
            <ModalContent>
                <CloseButton onClick={onClose}>X</CloseButton>
                {children}
            </ModalContent>
        </ModalOverlay>
    );
};

export default Modal;