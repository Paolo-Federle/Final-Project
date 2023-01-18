import './App.css';
import LoginPage from './components/users/login/LoginPage'
import Homepage from './components/Homepage'
import Games from './components/Gamepage/Gamepage';
import Account from './components/users/login/Account';
import ProjectPage from './components/Projectpage';
import RegisterPage from './components/users/login/RegisterPage';
import { useState, useEffect } from 'react'
import { Routes, Route, Navigate, Outlet } from 'react-router-dom'


function App() {
  const [userData, setUserData] = useState({
    token: null,
    username: null,
    userId: null
  });

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      const [header, payload, signature] = token.split(".");
      const decodedPayload = JSON.parse(atob(payload));
      setUserData({
        token,
        username: decodedPayload.username,
        userId: decodedPayload.id
      });
    }
  }, [token]);


  return (
    <div className='app-background'>
      <div className="App">
        <Routes>
          <Route path="/" element={<Homepage userData={userData} setUserData={setUserData} />} />
          <Route path="/project" element={<ProjectPage userData={userData} setUserData={setUserData} />} />
          <Route path="/register" element={<RegisterPage userData={userData} />} name="register" />
          <Route path="/login" element={<LoginPage setUserData={setUserData} />} name="login" />
          <Route element={<AuthenticateUser />}>
            <Route path="/games" element={<Games userData={userData} setUserData={setUserData} />} />
            <Route path="/account" element={<Account userData={userData} setUserData={setUserData} />} />
          </Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;

function isLoggedIn() {
  const loadedToken = localStorage.getItem('token')
  return !(loadedToken === '')
}

const AuthenticateUser = ({ children, redirectPath = '/' }) => {
  if (!isLoggedIn()) {
    return <Navigate to={redirectPath} replace />
  }

  return <Outlet />
}