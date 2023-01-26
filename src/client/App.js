import './App.css';
import LoginPage from './components/users/login/LoginPage'
import Homepage from './components/Homepage'
import Games from './components/Gamepage/Gamepage';
import RoomDetail from './components/Gamepage/room/RoomDetail';
import ChatRoom from './components/Gamepage/room/ChatRoom';
import Account from './components/users/login/Account';
import ProjectPage from './components/Projectpage';
import RegisterPage from './components/users/login/RegisterPage';
import RoomCanvas from './components/Gamepage/room/RoomCanvas'
import { useState, useEffect } from 'react'
import { Routes, Route, Navigate, Outlet } from 'react-router-dom'
import io from 'socket.io-client'
const ENDPOINT = "http://127.0.0.1:4001";


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

  const [response, setResponse] = useState("");

  // useEffect(() => {
  //   const socket = io(ENDPOINT);
  //   socket.on("FromAPI", data => {
  //     setResponse(data);
  //   });
  //   return () => socket.disconnect();
  // }, []);

  return (
    <div>
      <Routes>
        <Route path="/register" element={<RegisterPage userData={userData} />} name="register" />
        <Route path="/login" element={<LoginPage setUserData={setUserData} />} name="login" />
        <Route index path="/" element={<Homepage userData={userData} setUserData={setUserData} />} />
        <Route path="/project" element={<ProjectPage userData={userData} setUserData={setUserData} />} />
        <Route path="/canvas" element={<RoomCanvas userData={userData} setUserData={setUserData} />} />
        <Route element={<AuthenticateUser userData={userData} redirectPath="/login" />}>
          <Route path="/games" element={<Games userData={userData} setUserData={setUserData} />} />
          <Route path="/account" element={<Account userData={userData} setUserData={setUserData} />} />
          <Route path="/games/rooms/:id/detail" element={<RoomDetail userData={userData} setUserData={setUserData} />} />
          <Route path="/games/rooms/:id/chat" element={<ChatRoom userData={userData} setUserData={setUserData} />} />
        </Route>

      </Routes>
      {/* <p>
        It's <time dateTime={response}>{response}</time>
      </p> */}
    </div>
  );
}

export default App;

function isLoggedIn(userData) {
  return userData.token !== null && userData.token !== undefined;
}

const AuthenticateUser = ({ userData, children, redirectPath = '/login' }) => {
  if (!isLoggedIn(userData)) {
    return <Navigate to={redirectPath} replace />
  }

  return <Outlet />
}