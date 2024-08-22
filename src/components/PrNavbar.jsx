import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import LogoImg from './logo.svg';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { format } from 'date-fns';
import Img from './이미지 업로드.png';

/*구역 나눔*/
const NavbarContainer = styled.div`
  background-color: #1f637f;
`;
const NavbarWrap = styled.div`
  max-width: 1920px;
  height: 60px;
  display: flex;
  align-items: center;
`;
const NavbarLeft = styled.div``;
const NavbarMiddle = styled.div`
    display: flex;
    color: white;
    font-size: 20px;
    font-weight: 700;
    position: absolute;
    left: 45%;
`;
const NavbarRight = styled.div`
    display: flex;
    position: absolute;
    right: 50px;
`;
/*로고*/
const Logo = styled.img`
  height: 45px;
  margin-left: 10px;
`;
/*사진*/
const ProfileImg = styled.img`
    width: 45px;    
    height: 45px;
    border-radius: 22.5px;
    margin: 5px;
`;

/*기간 모달*/
const Modal = styled.div`
    display: flex;
    position: fixed;
    left: 53%;
    top: 10px;
    width: 400px;
    height: 50px;
    background-color: black;
    div {
        margin-left: 20px;
        line-height: 50px;
        font-weight: 600 !important;
        color: white;
    }
    button {
        margin-left: 40px;
        margin-top: 5px;
        width: 20px;
        height: 20px;
        color: white;
        border: none;
        background: none;
        cursor: pointer;
    }
`;

function Navbar() {
    const [modalOpen, setModalOpen] = useState(false);
    const showPeriod = () => {
        setModalOpen(true);
    }

    /*백 연결*/
    const location = useLocation();
    const token = localStorage.getItem('token');
    const travelId = location.state?.travelId;
    const [travelPlan, setTravelPlan] = useState(null);
    const [myInfo, setMyInfo] = useState({});

    useEffect(() => {
        if (travelId) {
            const fetchTravelPlanDetails = async () => {
                try {
                    console.log('Fetching travel plan details...');
                    const response = await axios.get(`http://43.200.238.249:5000/travel-plans/makeRoom/${travelId}`, {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                        },
                    });
                    setTravelPlan(response.data);
                } catch (error) {
                    console.error('Error fetching travel plan details:', error.response ? error.response.data : error.message);
                }
            };
            fetchTravelPlanDetails();
        } else {
            console.log('No travelId provided');
        }
    }, [travelId, token]);

    useEffect(() => {
        const getUserInfo = async () => {
            try {
                const response = await axios.get('http://43.200.238.249:5000/users/info', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                console.log('회원정보:', response.data);
                setMyInfo(response.data);
            } catch (error) {
                console.error('오류 발생:', error);
            }
        };
        getUserInfo();
    }, [token]);

    if (!travelPlan) {
        return <div>No travel plan found</div>; // travelPlan이 없을 때
    }

    const date1 = new Date(travelPlan.start_date);
    const startDate = format(date1, 'yyyy-MM-dd');
    const date2 = new Date(travelPlan.end_date);
    const endDate = format(date2, 'yyyy-MM-dd');

    return (
        <NavbarContainer>
            <NavbarWrap>
                <NavbarLeft>
                    <Link to="/">
                        <Logo src={LogoImg} alt="Logo" />
                    </Link>
                </NavbarLeft>
                <NavbarMiddle>
                    <div>국내 여행 제목</div>
                    <div onClick={showPeriod}>ⓘ</div>
                    {modalOpen && (
                        <Modal>
                            <div>{`여행기간 ${startDate}~${endDate}`}</div>
                            <button onClick={() => { setModalOpen(false) }}>X</button>
                        </Modal>
                    )}
                </NavbarMiddle>
                <NavbarRight>
                    <ProfileImg src={`http://43.200.238.249:5000${myInfo.profile_image}`} alt='profile_image' />
                    <ProfileImg src={Img} alt='profile_image' />
                    <ProfileImg src={Img} alt='profile_image' />
                </NavbarRight>
            </NavbarWrap>
        </NavbarContainer>
    );
}

export default Navbar;