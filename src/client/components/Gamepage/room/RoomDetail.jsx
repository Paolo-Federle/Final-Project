import HeaderMenu from '../../header/HeaderMenu'
import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Link, useParams } from 'react-router-dom'
const apiUrl = process.env.REACT_APP_API_URL


const RoomDetail = ({ userData, setUserData }) => {
    const { id } = useParams();
    const [room, setRoom] = useState({});
    const [users, setUsers] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetchRoom();
    }, [users]);

    const fetchRoom = async () => {
        try {
            const response = await fetch(`${apiUrl}/room/${id}`);
            if (!response.ok) {
                throw new Error("failed to fetch");
            }
            const data = await response.json();
            setRoom(data.data);
            setUsers(data.data.users);
        } catch (error) {
            console.log(error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const username = e.target.userId.value;
        try {
            const response = await fetch(`${apiUrl}/room/adduserByUsername`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ roomId: id, username }),
            });
            if (!response.ok) {
                const data = await response.json();
                if (response.status === 400) {
                    setMessage("User is already in the room");
                } else {
                    setMessage(data.message);
                }
            } else {
                setMessage("User added to room successfully");
                const data = await response.json();
                setRoom(data);
                setUsers(data.users);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const removeUser = async (username) => {
        try {
            const response = await fetch(`${apiUrl}/room/${id}/user`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({roomId: id, username }),
            });
            if (!response.ok) {
                const data = await response.json();
                setMessage(data.message);
            } else {
                const data = await response.json();
                setRoom(data);
                setUsers(data.users);
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='background'>
            <div className='foreground'>
                <Routes>
                    <Route path="/" element
                        ={<HeaderMenu userData={userData} setUserData={setUserData} />} />
                </Routes>
                <h2>Room name: {room.name}</h2>
                <p>Room id: {room.id}</p>
                <p>Room description: {room.description}</p>
                <form onSubmit={handleSubmit}>
                    <input type="text" name="userId" placeholder="Enter user nickname" />
                    <button type="submit">Add user</button>
                    {message && <span> {message}</span>}
                </form>
                {room.users && (
                    <div>
                        <h3>Users in this room:</h3>
                        {room.users.map((user) => (
                            <p key={user.id}>
                                {user.username}
                                <button onClick={() => removeUser(user.username)}>Remove</button>
                            </p>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default RoomDetail;