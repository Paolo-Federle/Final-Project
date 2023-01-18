import HeaderMenu from "./header/HeaderMenu"
import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
const apiUrl = process.env.REACT_APP_API_URL
const jwtSecret = process.env.JWT_SECRET


function Games({ userData, setUserData }) {
    const [rooms, setRooms] = useState([])
    const [newRoomName, setNewRoomName] = useState('')

    // useEffect(() => {
    //     fetch(`${apiUrl}/room/user/${userId}`)
    //         .then(res => res.json())
    //         .then(data => setRooms(data))
    //         .catch(error => console.error(error))
    // }, [])

    // const token = localStorage.getItem("token");
    // const [header, payload, signature] = token.split(".");
    // const decodedPayload = JSON.parse(atob(payload));
    // const userId = decodedPayload.id;
    // console.log('userId is ', userId);

    // const token = localStorage.getItem("token");
    // const decoded = jwt.decode(token);
    // const userId = decoded.id;

    return (
        <>
            <Routes>
                <Route path="/" element={<HeaderMenu userData={userData} setUserData={setUserData} />} />
            </Routes>
            <div className="Gamepage">
                <h1>Games</h1>
                <ul>
                    {rooms.map(room => (
                        <li key={room.id}>{room.name}</li>
                    ))}
                </ul>
                <h2>Create Room</h2>
                {/* <form onSubmit={createRoom}>
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