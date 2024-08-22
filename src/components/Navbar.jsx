import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import LogoImg from './logo.svg';
import { FaBell } from 'react-icons/fa';
import { FaUserCircle } from 'react-icons/fa';

const NavbarContainer = styled.div`
  background-color: #1f637f;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
`;

const NavbarWrap = styled.div`
  max-width: 1920px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 auto;
  padding: 0 20px;
  box-sizing: border-box;
`;

const NavbarLeft = styled.div`
  display: flex;
  align-items: center;
`;

const Logo = styled.img`
  height: 45px;
  margin-left: 10px;

  @media (max-width: 768px) {
    height: 35px; /* Smaller logo on smaller screens */
  }
`;

const NavbarRight = styled.div`
  display: flex;
  align-items: center;

  ul {
    display: flex;
    margin: 0;
    padding: 0;
    list-style: none;
  }

  ul > li {
    padding: 5px;
    margin-right: 20px;
  }

  ul > li > .link {
    font-weight: bold;
    color: white;
    text-decoration: none;
    font-size: 30px;

    @media (max-width: 768px) {
      font-size: 24px; /* Smaller font size on smaller screens */
    }
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