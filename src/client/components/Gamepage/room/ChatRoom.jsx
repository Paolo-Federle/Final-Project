import HeaderMenu from '../../header/HeaderMenu'
import RoomCanvas from './RoomCanvas'
import React, { useState, useEffect, useMemo, useRef } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Link, useParams } from 'react-router-dom'
import debounce from 'lodash'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import '../../../CSS/ChatRoom.css'

const apiUrl = process.env.REACT_APP_API_URL

function ChatRoom({ userData, setUserData }) {
    const { id } = useParams()
    const [messages, setMessages] = useState([])
    const [inputMessage, setInputMessage] = useState('')
    const messageContainerRef = useRef(null)

    // Fetch messages from server
    const fetchMessages = async () => {
        try {
            const response = await fetch(`${apiUrl}/message/room/${id}`)
            if (!response.ok) throw new Error("Failed to fetch messages")
            const data = await response.json()
            setMessages(data.data)
        } catch (error) {
            console.log(error)
        }
    }

    // Fetch messages when component mounts and when room ID changes
    useEffect(() => {
        fetchMessages()
    }, [id])

    // Scroll to bottom of message container when messages change
    useEffect(() => {
        messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight
    }, [messages])

    // Send message to server
    const handleSubmit = async (e) => {
        e.preventDefault()
        if (inputMessage.trim() === '') return

        try {
            const response = await fetch(`${apiUrl}/message`, {
                method: 'POST',
                body: JSON.stringify({
                    content: debouncedInput,
                    roomId: id,
                    userId: userData.userId
                }),
                headers: { 'Content-Type': 'application/json' }
            })
            if (!response.ok) throw new Error("Failed to create message")
            const data = await response.json()
            fetchMessages()
            setInputMessage('')
        } catch (error) {
            console.log(error)
        }
    }

    const debouncedInput = useMemo(() => debounce(inputMessage, 500), [inputMessage])

    return (
        <div className=''>
            <div className=''>
                {/* foreground */}
                <Routes>
                    <Route path="/" element
                        ={<HeaderMenu userData={userData} setUserData={setUserData} />} />
                </Routes>
                <div className='page-container'>
                    <div className='canvas-space'>
                        <Routes>
                            <Route path="/" element
                                ={<RoomCanvas userData={userData} setUserData={setUserData} />} />
                        </Routes>
                    </div>
                    <div className='ChatRoom-space'>
                        <div ref={messageContainerRef} className='message-container'>
                            <h1>ChatRoom</h1>
                            {messages.map(message => (
                                <div className={`${message.senderId === userData.userId ? 'sent message' : 'received message'} chat-message-container`}>
                                    <p className="sent-by">{message.sender.username}</p>
                                    <p className="message-content">{message.content}</p>
                                    <p className="sent-at">Sent at: {new Date(message.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                                </div>
                            ))}
                            <form className='chat-form' onSubmit={handleSubmit}>
                                <input className='chat-form-input' type="text" value={inputMessage} onChange={e => setInputMessage(e.target.value)} placeholder="Type your message here..." />
                                <button className='chat-form-submit' type="submit">
                                    <FontAwesomeIcon icon={faArrowRight} />
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChatRoom;