import React, { useState } from 'react';
import { Routes, Route, Link, Outlet } from 'react-router-dom'
import HeaderMenu from "./header/HeaderMenu"
import apiUrl from '../App.js'
import '../CSS/HomePage.css'

function HomePage({ userData, setUserData }) {

    return (
        <div className="background">
            <div className='foreground'>
                <Routes>
                    <Route path="/" element={<HeaderMenu userData={userData} setUserData={setUserData} />} />
                </Routes>
                <div className='homepage-container'>
                    <div className='left-side'>
                        <h1 className='welcome'>Welcome</h1>
                        <h2>We Set the Canvas,<br />You Draw Your Own Adventure.</h2>
                        <p className='home-paragraph'>With our built-in chat feature and canvas for drawing, you can bring your game to life and create a unique experience for your friends. </p>
                        {userData.token ? (
                            <div>
                                <p>You are logged in!</p>
                                <Link to="/games">Start playing</Link>
                            </div>
                        ) : (
                            <div>
                                <p>
                                    Don't have an account? <br /> <button className='salmon-button'><Link to="/register" className='white-text'>Register</Link></button>
                                </p>
                            </div>
                        )}</div>
                    <div className='right-side'>
                        <img src={`https://i.imgur.com/aumL3yS.jpg`} className="homepage-img" alt="" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomePage