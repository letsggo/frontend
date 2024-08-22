
import React  from "react"; 
import styled from "styled-components";
import grey from './grey.png';

const ModalOverlay = styled.div`
    position:fixed; 
    left:460px;
    top:700px;
`;

const ModalContent = styled.div`
    background: white;
    color:black;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    position: relative;
    width:700px;
    height: 120px;
    display: flex;
    img{
        width:120px;
        height:120px;
        border-radius:10px;
    }
    div{
        margin-left:30px;
    }
`;

const CloseButton = styled.button`
    position: absolute;
    top: 10px;
    right: 10px;
    background: transparent;
    border: none;
    font-size: 16px;
    cursor: pointer;
`;

const PRplaceModal = ({ isOpen, onClose, place, isPlace  }) => {
    if (!isOpen) return null;

    if(isPlace){
        return (
            <ModalOverlay>
                <ModalContent>
                    <CloseButton onClick={onClose}>X</CloseButton>
                    <img src={place.location_img} alt={place.location_name}/>
                    <div>
                        <h3>{place.location_name}</h3>
                        <p>{place.location_address}</p>
                    </div>
                </ModalContent>
            </ModalOverlay>
        );
    }else{
        return (
            <ModalOverlay>
                <ModalContent>
                    <CloseButton onClick={onClose}>X</CloseButton>
                    <img src={grey} alt={place.name}/>
                    <div>
                        <h3>{place.name}</h3>
                        <p>{place.address}</p>
                    </div>
                </ModalContent>
            </ModalOverlay>
        );
    }
};

export default PRplaceModal;
