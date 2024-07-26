import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const SidebarContainer = styled.div`
  background-color: #f8f9fa;
  padding: 7px;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  width: 70px;
  display: flex;
  height: 90vh;
  flex-direction: column;
  justify-content: space-between;
`;

const TopNavList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
  width: 100%;
`;

const BottomNavList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
  width: 100%;
  margin-top: auto;
`;

const NavItem = styled.li`
  margin: 10px 0;
`;

const NavLink = styled(Link)`
  text-decoration: none;
  color: #333;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  border-radius: 4px;
  background-color: #e9ecef;
  width: 50px;
  height: 50px;
  font-size: 20px;
  text-align: center;

  &:hover {
    background-color: #dee2e6;
  }
`;

const Sidebar = () => {
  return (
    <SidebarContainer>
      <TopNavList>
        <NavItem>
          <NavLink to="/Home">홈</NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/MyLocationList">나의 장소</NavLink>
        </NavItem>
      </TopNavList>
      <BottomNavList>
        <NavItem>
          <NavLink to="/Setting">설정</NavLink>
        </NavItem>
      </BottomNavList>
    </SidebarContainer>
  );
};

export default Sidebar;
