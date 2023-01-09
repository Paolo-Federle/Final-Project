import './App.css';
import LoginPage from './components/users/login/LoginPage';
import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

// const apiUrl = 'http://localhost:4000';

function App() {
  const [userData, setUserData] = useState('')


  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LoginPage setUserData={setUserData}/>} />
      </Routes>
    </div>
  );
}

export default App;