import HeaderMenu from "../header/HeaderMenu"
import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
const apiUrl = process.env.REACT_APP_API_URL
const jwtSecret = process.env.JWT_SECRET


function Games({ userData, setUserData }) {
    const [rooms, setRooms] = useState([])
    const [newRoomName, setNewRoomName] = useState('')

    const getRoomsForUser = async () => {
        const options = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        }
        try {
            console.log(userData)
            console.log(`${apiUrl}/room/user/${userData.userId}`)
            if (userData.token === null) {
                throw new Error("Not logged");
            }
            const response = await fetch(`${apiUrl}/room/user/${userData.userId}`, options)
            if (!response.ok) {
                throw new Error("failed to fetch");
            }
            // console.log('response', response)
            const data = await response.json();
            // console.log('data', data.data)
            if (data.data.length > 0) {
                setRooms(data.data)
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getRoomsForUser()
    }, [])

    return (
        <>
            <Routes>
                <Route path="/" element={<HeaderMenu userData={userData} setUserData={setUserData} />} />
            </Routes>
            <div className="Gamepage">
                <h1>Games</h1>
                {Array.isArray(rooms) && rooms.length > 0
                    ? rooms.map(room => <p key={room.id}>This is a room with ID:{room.id}</p>)
                    : <p>There's no room to show</p>
                }
                {/* <h2>Create Room</h2>
                <form onSubmit={createRoom}>
                    <input
                        type="text"
                        value={newRoomName}
                        onChange={e => setNewRoomName(e.target.value)}
                    />
                    <button type="submit">Create</button>
                </form> */}
            </div>
        </>
    );
}

export default Games