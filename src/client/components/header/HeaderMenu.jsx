import { Link } from 'react-router-dom'
import '../../CSS/HeaderMenu.css'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import LoginPage from '../users/login/LoginPage'

const HeaderMenu = ({ userData, setUserData }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const navigate = useNavigate()
  const handleLogout = (event) => {
    event.preventDefault()
    localStorage.removeItem("token")
    setUserData(null)
    navigate('../', { replace: true })
  }

  return (
    <div className='default-background'>
      <div className='menu-container default-foreground'>
        <h3><Link to='/'>Homepage</Link></h3>
        <h3><Link to='/project'>Projects</Link></h3>
        <h3><Link to='/games'>Games</Link></h3>
        <div>
          <h3 className='profile-link' onClick={() => setShowDropdown(!showDropdown)}>Profile</h3>
          <div className={`dropdown-container ${showDropdown ? 'open' : ''}`}>
            {userData ? (
              <>
                <Link to='/account'>My account</Link>
                <Link to='/logout' onClick={handleLogout}>Log out</Link>
              </>
            ) : (
              <form className='header-form'>
                <label>
                  Email address:
                  <br />
                  <input type='email' required />
                </label>
                <br />
                <label>
                  Password:
                  <br />
                  <input type='password' required />
                </label>
                <br />
                <button className='salmon-button' type='submit' handleSubmit={handleLogin}>Sign in</button>
                <br />
                <Link to='/register'>You don't have an account? Sign up</Link>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderMenu;