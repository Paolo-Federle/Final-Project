import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import apiUrl from '../App.js'

function HomePage() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return (
        <div className="home-page ">
            <h1>Welcome</h1>
            {isLoggedIn ? (
                <div>
                    <p>You are logged in!</p>
                    <Link to="/game">Start playing</Link>
                </div>
            ) : (
                <div>
                    <p>
                        Don't have an account? <button className='salmon-button'><Link to="/register" className='white-text'>Register</Link></button>
                    </p>
                </div>
            )}
        </div>
    );
}

export default HomePage