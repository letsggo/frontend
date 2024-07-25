import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Main from './pages/Main';
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import MyPage from './pages/MyPage';
import MyLocationList from './pages/MyLocationList';
import Setting from './pages/Setting';
import MakePlanRoom1 from './pages/MakePlanRoom1';
import MakePlanRoom2 from './pages/MakePlanRoom2';
import NotFound from './pages/NotFound';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import styled from 'styled-components';
import FindPassword from './pages/FindPassword';
import FindPasswordSend from './pages/FindPasswordsend';
import EmailCheck from './pages/emailcheck';

const AppContainer = styled.div`
  display: flex;
`;

const ContentContainer = styled.div`
  flex: 1;
  padding: 20px;
`;

function App() {
  return (
    <Router>
      <Navbar />
      <AppContainer>
        <Sidebar />
        <ContentContainer>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/Home" element={<Home />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/SignUp" element={<SignUp />} />
            <Route path="/MyPage" element={<MyPage />} />
            <Route path="/MyLocationList" element={<MyLocationList />} />
            <Route path="/Setting" element={<Setting />} />
            <Route path="/MakePlanRoom1" element={<MakePlanRoom1 />} />
            <Route path="/MakePlanRoom2" element={<MakePlanRoom2 />} />
            <Route path="/findpassword" element={<FindPassword />} />
                <Route path="/find-password-send" element={<FindPasswordSend />} />
                <Route path="/emailcheck" element={<EmailCheck />} />
            <Route path="/*" element={<NotFound />} />
          </Routes>
        </ContentContainer>
      </AppContainer>
    </Router>
  );
}

export default App;
