import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import LogoImg from './logo.svg';
import { FaBell } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";

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
  margin-left:200px;
`;
const Logo = styled.img`
  height: 45px;
  margin-left: 10px;
`;
const NavbarRight = styled.div`
    margin-left:900px;
    ul{
        display: flex;
    }
    ul>li{
        padding:5px;
        margin-right:35px;
        list-style-type:none;
    }
    ul>li>.link{
      font-weight: bold;
      color:white;
      text-decoration: none;
      &:hover{
          cursor:pointer;
      }     
      font-size:30px;
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
        <NavbarRight>
          <ul>
            <li>
              <Link className="link" to="/Notice">
                <FaBell />
              </Link>
            </li>
            <li>
              <Link className="link" to="/MyPage">
                <FaUserCircle />
              </Link>
            </li>
          </ul>
        </NavbarRight>
      </NavbarWrap>
    </NavbarContainer>
  );
}

export default Navbar;
