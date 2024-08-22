import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { MdHome } from 'react-icons/md';
import { TiHeartFullOutline } from 'react-icons/ti';
import { IoMdSettings } from 'react-icons/io';

// Sidebar 전체 컨테이너 스타일
const SidebarContainer = styled.div`
  background-color: #f1f1f1;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  width: 70px;
  position: fixed;
  top: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

// 상단 아이콘 영역 스타일
const TopIcons = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50px 0 0 0;
  flex: 1;
`;

// 하단 배경 영역 스타일
const BottomBackground = styled.div`
  background-color: #e9ecef;
  padding: 10px 0;
  width: 100%;
  position: absolute;
  bottom: 0;
  display: flex;
  justify-content: center;
`;

// 네비게이션 아이템 스타일
const NavItem = styled.div`
  margin: 10px 0;
`;

// 네비게이션 링크 스타일
const NavLink = styled(Link)`
  text-decoration: none;
  color: #1f637f;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  width: 60px;
  height: 60px;
  font-size: 40px;
  text-align: center;

  &:hover {
    background-color: #dee2e6;
  }
`;

// Sidebar 컴포넌트
const Sidebar = () => {
  return (
    <SidebarContainer>
      <TopIcons>
        <NavItem>
          <NavLink to="/Home">
            <MdHome />
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/MyLocationList">
            <TiHeartFullOutline />
          </NavLink>
        </NavItem>
      </TopIcons>
      <BottomBackground>
        <NavItem>
          <NavLink to="/Setting">
            <IoMdSettings />
          </NavLink>
        </NavItem>
      </BottomBackground>
    </SidebarContainer>
  );
};

export default Sidebar;