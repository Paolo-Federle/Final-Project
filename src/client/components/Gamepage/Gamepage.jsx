import HeaderMenu from "../header/HeaderMenu"
import RoomDetail from "./room/RoomDetail"

import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Link } from 'react-router-dom'
const apiUrl = process.env.REACT_APP_API_URL


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
            if (userData.userId !== undefined) {
                const response = await fetch(`${apiUrl}/room/user/${userData.userId}`, options)
                if (!response.ok) {
                    throw new Error("failed to fetch");
                }
                const data = await response.json();
                if (data.data.length > 0) {
                    setRooms(data.data)
                }
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!newRoomName) {
            alert("Please enter a room name.")
            return;
        }
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name: newRoomName })
        }
        try {
            const response = await fetch(`${apiUrl}/room/user/${userData.userId}`, options);
            if (!response.ok) {
                throw new Error("failed to fetch");
            }
            const data = await response.json();
            getRoomsForUser()
            setNewRoomName('');
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (userData.token) {
            getRoomsForUser();
        } else {
            setRooms([]);
        }
    }, [userData]);

    return (
        <div className="background">
            <div className="foreground">
                <Routes>
                    <Route path="/" element={<HeaderMenu userData={userData} setUserData={setUserData} />} />
                </Routes>
                <div className="Gamepage">
                    <h1>Games</h1>
                    {Array.isArray(rooms) && rooms.length > 0
                        ? rooms.map(room => (
                            <div key={room.id}>
                                <span>Room: </span>
                                <Link to={`/games/rooms/${room.id}/detail`}>{room.name}</Link>
                                <span> link to </span>
                                <Link to={`/games/rooms/${room.id}/chat`}>chat</Link>

                            </div>
                        ))
                        : <p>There's no room to show</p>
                    }
                    <h2>Create Room</h2>
                    <form onSubmit={handleSubmit}>
                        <label>
                            Room Name:
                            <input type="text" value={newRoomName} onChange={e => setNewRoomName(e.target.value)} />
                        </label>
                        <input type="submit" value="Submit" />
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Games