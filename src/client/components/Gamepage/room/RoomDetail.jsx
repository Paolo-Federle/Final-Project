import HeaderMenu from '../../header/HeaderMenu'
import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Link, useParams } from 'react-router-dom'
const apiUrl = process.env.REACT_APP_API_URL


const RoomDetail = () => {
    const { id } = useParams();
    const [room, setRoom] = useState({});

    useEffect(() => {
        const fetchRoom = async () => {
            try {
                console.log("triggered")
                const response = await fetch(`${apiUrl}/room/${id}`);
                if (!response.ok) {
                    throw new Error("failed to fetch");
                }
                const data = await response.json();
                setRoom(data.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchRoom();
    }, [id]);

    return (
        <div className='background'>
            <div className='foreground'>
                <h2>Room name: {room.name}</h2>
                <p>Room id: {room.id}</p>
                <p>Room description: {room.description}</p>
            </div>
        </div>
    );
};

export default RoomDetail;