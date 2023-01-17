import './App.css';
import LoginPage from './components/users/login/LoginPage'
import Homepage from './components/Homepage'
import HeaderMenu from './components/header/HeaderMenu'
import Games from './components/Gamepage';
import Account from './components/users/login/Account';
import ProjectPage from './components/Projectpage';
import RegisterPage from './components/users/login/RegisterPage';
import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

function App() {
  const [userData, setUserData] = useState('')
  
  // console.log(localStorage)
  useEffect(() => {
    if (localStorage) {
      setUserData(localStorage)
    }
  });
  

  return (
    <div className='app-background'>
      <div className="App">
        <Routes>
          <Route path="/" element={<HeaderMenu setUserData={setUserData} />} />
        </Routes>
        <Routes>
          <Route path="/" element={<Homepage setUserData={setUserData} />} />
          <Route path="/project" element={<ProjectPage setUserData={setUserData} />} />
          <Route path="/games" element={<Games setUserData={setUserData} />} />
          <Route path="/account" element={<Account setUserData={setUserData} />} />
          <Route path="/register" element={<RegisterPage setUserData={setUserData} />} name="register" />
          <Route path="/login" element={<LoginPage setUserData={setUserData} />} name="login" />
        </Routes>
      </div>
    </div>
  );
}

export default App;