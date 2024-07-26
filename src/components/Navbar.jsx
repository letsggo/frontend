import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import LogoImg from './logo.svg';

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
const Logo = styled.img`
  height: 45px;
  margin-left: 10px;
`;
const NavbarMiddle = styled.div`
  color: white;
`;
const NavbarRight = styled.div`
    ul{
        display: flex;
    }
    ul>li{
        padding:5px;
        margin-right: 14px;
        list-style-type:none;
    }
    ul>li>.link{
        font-weight: bold;
        color:white;
        text-decoration: none;
        &:hover{
            cursor:pointer;
        }     
`;
function Navbar() {
  return (
    <NavbarContainer>
      <NavbarWrap>
        <NavbarLeft>
          <Link to="/">
            <Logo src={LogoImg} alt="Logo" />
          </Link>
        </NavbarLeft>
        <NavbarMiddle>**검색기능**</NavbarMiddle>
        <NavbarRight>
          <ul>
            <li>
              <Link className="link" to="/Home">
                홈
              </Link>
            </li>
            <li>
              <Link className="link" to="/MyPage">
                마이페이지
              </Link>
            </li>
            <li>
              <Link className="link" to="/LogIn">
                로그인
              </Link>
            </li>
            <li>
              <Link className="link" to="/MakePlanRoom1">
                여행 계획하기
              </Link>
            </li>
          </ul>
        </NavbarRight>
      </NavbarWrap>
    </NavbarContainer>
  );
}

export default Navbar;