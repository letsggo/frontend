import React  from "react"; 
import styled from "styled-components";

const ModalOverlay = styled.div`
    position: fixed !important;;
    top: 70%;
    left: 0px;
    right: 0;
    bottom: 0;
    z-index: 1000 !important;
`;

const ModalContent = styled.div`
    background: black;
    color:white;
    padding: 20px;
    border-radius: 8px;
    position: relative;
    width:600px;
    height: 100px;
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

const SetPlaceModal = ({ isOpen, onClose, children }) => {
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

export default SetPlaceModal;