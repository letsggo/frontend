import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageContainer, Container, Title, Header, ButtonContainer, TopButton, SortDiv, NewTripButton } from '../styles/home2style';
import ListCard from '../components/home2/list-card';
import axios from "axios";

const Home2 = () => {
    const [travel, setTravel] = useState([]);
    const [sortOption, setSortOption] = useState('latest');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('');
                setTravel(response.data);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchData();
    }, []);

    const handleSortChange = (event) => {
        setSortOption(event.target.value);
    };

    const sortedTravel = [...travel].sort((a, b) => {
        if (sortOption === 'latest') {
            return new Date(b.date) - new Date(a.date);
        } else if (sortOption === 'name') {
            return a.name.localeCompare(b.name);
        }
        return 0;
    });

    const handleNewTrip = () => {
        navigate('/startplanroom');
    };

    return (
        <PageContainer>
            <Container>
                <Title>내가 참여한 여행</Title>
                <Header>
                    <ButtonContainer>
                        <TopButton>모든여행</TopButton>
                        <TopButton>국내여행</TopButton>
                        <TopButton>해외여행</TopButton>
                    </ButtonContainer>
                    <SortDiv>
                        <select id="sortOptions" value={sortOption} onChange={handleSortChange}>
                            <option value="latest">최신순</option>
                            <option value="name">이름순</option>
                        </select>
                    </SortDiv>
                </Header>
                <ListCard travel={sortedTravel} />
                <NewTripButton onClick={handleNewTrip}>새로운 여행 계획하기</NewTripButton>
            </Container>
        </PageContainer>
    );
};

export default Home2;
