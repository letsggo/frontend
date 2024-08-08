import styled from "styled-components";
import ItemCard from "./item-card";

const ListContainer = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    background-color: white;
    margin-top: 2.1vw;
`;

const ListCard = ({ travel }) => {
    return (
        <ListContainer>
            {travel.map((item, index) => (
                <ItemCard 
                    key={index}
                    id={item.id}
                    name={item.name} 
                    username={item.username}
                    date={item.date} // date 속성 추가
                />
            ))}
        </ListContainer>
    );
};

export default ListCard;
