import { Link } from 'react-router-dom'
import '../../CSS/HeaderMenu.css'
import { useState, useEffect } from 'react'

const HeaderMenu = ({ userData }) => {

  const [isLoggedIn, setIsLoggedIn] = useState(userData ? true : false)
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    if (userData) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [userData]);



  return (
    <div className='default-background'>
      <div className='menu-container default-foreground'>
        <h3><Link to='/'>Homepage</Link></h3>
        <h3><Link to='/project'>Projects</Link></h3>
        <h3><Link to='/games'>Games</Link></h3>
        <h3><Link to='/account'>Account (temp)</Link></h3>
        <div>
          <h3 className='profile-link' onClick={() => setShowDropdown(!showDropdown)}>Profile</h3>
          <div className={`dropdown-container ${showDropdown ? 'open' : ''}`}>
            {isLoggedIn ? (
              <>
                <Link to='/account'>My account</Link>
                <Link to='/logout'>Log out</Link>
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
                <button className='salmon-button' type='submit'>Sign in</button>
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