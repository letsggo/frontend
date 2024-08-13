import React , {useState} from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import LogoImg from './logo.svg';
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
    display:flex;
    color: white;
    font-size:20px;
    font-weight:700;
    position: absolute;
    left:45%;
`;
const NavbarRight = styled.div`
    display:flex;
    position: absolute;
    right: 50px;
`;
/*로고*/
const Logo = styled.img`
  height: 45px;
  margin-left: 10px;
`;
/*사진*/
const ProfileImg=styled.img`
    width:45px;    
    height:45px;
    border-radius:22.5px;
    margin:5px;
`;
/*기간 모달*/
const Modal=styled.div`
    display:flex;
    position: fixed;
    left:53%;
    top:10px;
    width:300px;
    height:50px;
    background-color:black;
    div{
        margin-left:30px;
        line-height:50px;
    }
    button{
        margin-left:60px;
        margin-top:5px;
        width:20px; height:20px;
        border-radius:20px;
        border:none;
    }
`;
function Navbar() {
    const [modalOpen,setModalOpen]=useState(false);
    const showPeriod=()=>{
        setModalOpen(true)
    }

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
                    <div>여행 기간 7/31~8/2</div>
                    <button onClick={()=>{setModalOpen(false)}}>X</button>
                </Modal>
            )}
        </NavbarMiddle>
        <NavbarRight>
            <ProfileImg src={Img} alt={Img} />
            <ProfileImg src={Img} alt={Img} />
            <ProfileImg src={Img} alt={Img} />
        </NavbarRight>
      </NavbarWrap>
    </NavbarContainer>
  );
}

export default Navbar;
