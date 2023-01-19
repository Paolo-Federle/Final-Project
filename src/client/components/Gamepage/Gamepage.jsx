import HeaderMenu from "../header/HeaderMenu"
import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
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
                // console.log('response', response)
                const data = await response.json();
                // console.log('data', data.data)
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
            // alert user that the name field is required
            alert("Please enter a room name.")
            return;
        }
        // rest of the handleSubmit function 
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name: newRoomName })
        }
        try {
            const response = await fetch(`${apiUrl}/room`, options);
            if (!response.ok) {
                throw new Error("failed to fetch");
            }
            const data = await response.json();
            // update the rooms state to show the newly created room
            // setRooms([...rooms, data.data])
            // Reset the newRoomName state after the form is submitted
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
        <>
            <Routes>
                <Route path="/" element={<HeaderMenu userData={userData} setUserData={setUserData} />} />
            </Routes>
            <div className="Gamepage">
                <h1>Games</h1>
                {Array.isArray(rooms) && rooms.length > 0
                    ? rooms.map(room => <p key={room.id}>This is room <strong>{room.name}</strong> with ID:{room.id}</p>)
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
        </>
    );
}

export default Games