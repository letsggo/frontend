import styled from 'styled-components';

export const PageContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

export const Container = styled.div`
  width: 70%;
  display: flex;
  flex-direction: column;
  background-color: white;
`;

export const Title = styled.p`
  font-size: 1.8vw;
  font-weight: 700;
  color: #1d1b20;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ButtonContainer = styled.div`
  display: flex;
  gap: 1.5vw;
`;

export const TopButton = styled.button`
  width: 6.7vw;
  height: 2.1vw;
  border: 0.15vw solid #ffcb3c;
  background-color: #ffcb3c;
  border-radius: 44vw;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 1.25vw;
  font-weight: 400;
  line-height: 0.8vw;
  letter-spacing: 0.025vw;
  color: black;
`;

export const SortDiv = styled.div`
  padding: 10px;
  border-radius: 5px;
  display: flex;
  align-items: center;
`;

export const NewTripButton = styled.button`
  width: 100%;
  height: 3vw;
  background-color: #4b2c19;
  border: none;
  border-radius: 20px;
  font-size: 1.5vw;
  font-weight: bold;
  color: white;
  margin-top: 30vw;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
`;
