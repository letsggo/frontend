import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import LogoImg from './logo.svg';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const NavbarContainer = styled.div`
  background-color: #1f637f;
`;
const NavbarWrap = styled.div`
  max-width: 1920px;
  height: 60px;
  display: flex;
  align-items: center;
`;
const NavbarLeft = styled.div`
    margin-left: 200px;
    display: flex;
    div {
        font-size: 18px;
        font-weight: 600;
        margin-top: 12px;
        color: white;
    }
`;
const Logo = styled.img`
  height: 45px;
  margin-left: 10px;
`;
const NavbarRight = styled.div`
    margin-left: auto;
    margin-right: 200px;
    ul>li {
        list-style-type: none;
    }
    ul>li>.link {
        border: 2px white solid;
        border-radius: 20px;
        background-color: white;
        padding: 5px 15px;
        font-weight: bold;
        color: black;
        text-decoration: none;
        &:hover {
            cursor: pointer;
        }     
`;

function MainNavbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, [location]);

  const handleLogout = () => {
    const token = localStorage.getItem('token');
    const refreshToken = localStorage.getItem('refreshToken');
    
    if (!token || !refreshToken) {
        console.error('토큰이 존재하지 않습니다.');
        return;
    }
    
    axios.post('http://43.200.238.249:5000/users/logout', {}, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(response => {
      if (response.status === 200) {
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken'); 
        localStorage.removeItem('username');
        setIsLoggedIn(false);
        navigate('/'); 
      }
    })
    .catch(error => {
      console.error('로그아웃 실패:', error);
      alert('로그아웃에 실패했습니다. 다시 시도해주세요.');
    });
  };  

  return (
    <NavbarContainer>
      <NavbarWrap>
        <NavbarLeft>
          <Link to="/">
            <Logo src={LogoImg} alt="Logo" />
          </Link>
          <div>가볼까</div>
        </NavbarLeft>
        <NavbarRight>
          <ul>
            <li>
              {isLoggedIn ? (
                <div className="link" onClick={handleLogout}>
                  로그아웃
                </div>
              ) : (
                <Link className="link" to="/Login">
                  로그인/회원가입
                </Link>
              )}
            </li>
          </ul>
        </NavbarRight>
      </NavbarWrap>
    </NavbarContainer>
  );
}

export default MainNavbar;