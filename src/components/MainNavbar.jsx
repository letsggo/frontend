import React,{useState,useEffect} from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import LogoImg from './logo.svg';
import { useLocation } from 'react-router-dom';

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
    display:flex;
    div{
        font-size:18px;
        font-weight:600;
        margin-top:12px;
        color:white;
    }
`;
const Logo = styled.img`
  height: 45px;
  margin-left: 10px;
`;
const NavbarRight = styled.div`
    margin-left:900px;
    ul>li{
        list-style-type:none;
    }
    ul>li>.link{
        border:2px white solid;
        border-radius:20px;
        background-color:white;
        padding: 5px 15px;
        font-weight: bold;
        color:black;
        text-decoration: none;
        &:hover{
            cursor:pointer;
        }     
`;
function MainNavbar() {
  const location=useLocation();
  const [isMain, setIsMain]=useState('로그인/회원가입')

  useEffect(()=>{
    if(location.pathname==='/'){
        setIsMain('로그인/회원가입');
      }else{
        setIsMain('로그인');
      }
  },[location, setIsMain]);

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
              <Link className="link" to="/LogIn">
                {isMain}
              </Link>
            </li>
          </ul>
        </NavbarRight>
      </NavbarWrap>
    </NavbarContainer>
  );
}

export default MainNavbar;