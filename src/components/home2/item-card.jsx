import styled from "styled-components";

const CardContainer = styled.div`
    width: 21.9vw;
    height: 22.85vw;
    box-shadow: 0 0.3vw 0.3vw 0 #00000040;
`;

const ItemCard = ({ id, username, name }) => {
    return (
        <CardContainer>
            <p>{username}</p>
            <p>{name}</p>
        </CardContainer>
    );
};

export default ItemCard;
