import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { MdHome } from "react-icons/md";
import { TiHeartFullOutline } from "react-icons/ti";
import { IoMdSettings } from "react-icons/io";

const SidebarContainer = styled.div`
  background-color: #F1F1F1;
  padding: 7px;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  width: 70px;
  display: flex;
  height: 92vh;
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
  color: #1f637f;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;  
  width: 50px;
  height: 50px;
  font-size: 40px;
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
          <NavLink to="/Home"><MdHome /></NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/MyLocationList"><TiHeartFullOutline /></NavLink>
        </NavItem>
      </TopNavList>
      <BottomNavList>
        <NavItem>
          <NavLink to="/Setting"><IoMdSettings /></NavLink>
        </NavItem>
      </BottomNavList>
    </SidebarContainer>
  );
};

export default Sidebar;
