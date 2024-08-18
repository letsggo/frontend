import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from 'react-router-dom';
import Main from './pages/Main';
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import MyPage from './pages/MyPage';
import MyLocationList from './pages/MyLocationList';
import Setting from './pages/Setting';
import MakePlanRoom1 from './pages/MakePlanRoom1';
import MakePlanRoom2 from './pages/MakePlanRoom2';
import PlanRoomResult from './pages/PlanRoomResult';
import PlanRoom1 from './pages/PlanRoom1';
import PlanRoom2 from './pages/PlanRoom2';
import NotFound from './pages/NotFound';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import styled from 'styled-components';
import FindPassword from './pages/FindPassword';
import FindPasswordSend from './pages/FindPasswordsend';
import EmailCheck from './pages/emailcheck';
import StartPlanRoom from './pages/StartPlanRoom';
import Notice from './pages/Notice';
import PrNavbar from './components/PrNavbar';
import MainNavbar from './components/MainNavbar';

const AppContainer = styled.div`
  display: flex;
  margin-top: 60px;
`;

const ContentContainer = styled.div`
  flex: 1;
  padding: 20px;
  margin-left: 70px;
`;

function App() {
  const location = useLocation();
  const MainNavBarPages = [
    '/',
    '/login',
    '/SignUp',
    '/emailcheck',
    '/findpassword',
  ];
  const sideBarPages = [
    '/Home',
    '/MakePlanRoom1',
    '/MakePlanRoom2',
    '/StartPlanRoom',
    '/MyPage',
    '/MyPage2',
    '/MyPage3',
    '/Notice',
    '/Setting',
    '/MyLocationList',
  ];

  return (
    <>
      {MainNavBarPages.includes(location.pathname) ? (
        <MainNavbar />
      ) : location.pathname === '/PlanRoom1' ? (
        <PrNavbar />
      ) : (
        <Navbar />
      )}
      <AppContainer>
        {sideBarPages.includes(location.pathname) && <Sidebar />}
        <ContentContainer>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/Home" element={<Home />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/SignUp" element={<SignUp />} />
            <Route path="/MyPage" element={<MyPage />} />
            <Route path="/MakePlanRoom1" element={<MakePlanRoom1 />} />
            <Route path="/MakePlanRoom2" element={<MakePlanRoom2 />} />
            <Route path="/StartPlanRoom" element={<StartPlanRoom />} />
            <Route path="/PlanRoomResult" element={<PlanRoomResult />} />
            <Route path="/MyLocationList" element={<MyLocationList />} />
            <Route path="/findpassword" element={<FindPassword />} />
            <Route path="/find-password-send" element={<FindPasswordSend />} />
            <Route path="/emailcheck" element={<EmailCheck />} />
            <Route path="/PlanRoom1" element={<PlanRoom1 />} />
            <Route path="/Setting" element={<Setting />} />
            <Route path="/Notice" element={<Notice />} />
            <Route path="/PlanRoom2" element={<PlanRoom2 />} />
            <Route path="/*" element={<NotFound />} />
          </Routes>
        </ContentContainer>
      </AppContainer>
    </>
  );
}

function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default AppWrapper;
