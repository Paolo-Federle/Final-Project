import React, { useState } from 'react';
import { Routes, Route, Link, Outlet } from 'react-router-dom'
import HeaderMenu from "./header/HeaderMenu"
import apiUrl from '../App.js'

function HomePage({ userData, setUserData }) {
    console.log(userData.token)

    return (

        <div className="background">
            {/* add grey, padding and 100vh ^^ */}
            {/* add white */}
            <div className='foreground'>
                <Routes>
                    <Route path="/" element={<HeaderMenu userData={userData} setUserData={setUserData} />} />
                </Routes>
                <h1>Welcome</h1>
                {userData.token ? (
                    <div>
                        <p>You are logged in!</p>
                        <Link to="/games">Start playing</Link>
                    </div>
                ) : (
                    <div>
                        <p>
                            Don't have an account? <button className='salmon-button'><Link to="/register" className='white-text'>Register</Link></button>
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default HomePage