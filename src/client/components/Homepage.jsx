import React, { useState } from 'react';
import { Routes, Route, Link, Outlet } from 'react-router-dom'
import HeaderMenu from "./header/HeaderMenu"
import apiUrl from '../App.js'

function HomePage({ userData, setUserData }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return (
        <div className="home-page ">
            <Routes>
                <Route path="/" element={<HeaderMenu userData={userData} setUserData={setUserData}/>} />
            </Routes>
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