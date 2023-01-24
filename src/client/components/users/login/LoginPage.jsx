import UserForm from './UserForm'
import { Link } from 'react-router-dom'
import { useEffect, useState } from "react";
import '../../../CSS/LoginPage.css'
const apiUrl = process.env.REACT_APP_API_URL

const LoginPage = ({setUserData}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = async ({ username, password }) => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    }
    try {
      const response = await fetch(`${apiUrl}/user/login`, options)
      if (!response.ok) {
        throw new Error("Invalid Credentials");
      }
      const data = await response.json();
      localStorage.setItem("token", data.data);
      setUserData({...data,token:data.data});
      console.log(localStorage)
      setIsLoggedIn(true);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      window.location.href = "/";
    }
  }, [isLoggedIn]);

  return (
    <div className='center gradient-background gradient-login'>
      <div className='white-space'>
        <h1>Login</h1>
        <UserForm handleSubmit={handleLogin} />
        <br />
        <Link to='/register'>
          Need and account? Register
        </Link>
      </div>
    </div>
  )
}

export default LoginPage