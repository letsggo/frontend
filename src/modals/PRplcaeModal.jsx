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
        display: block !important;
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
const Img=styled.div`
    width:120px;
    height:120px;
    background-color:grey;
    border-radius:10px;
`;
const PRplaceModal = ({ isOpen, onClose, place, isPlace  }) => {    
    if (!isOpen) return null;   
    if(isPlace){
        return (
            <ModalOverlay>
                <ModalContent>
                    <img src={place.location_img} alt={place.location_name} />
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
                    <Img src={grey} alt={place.name} />
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
