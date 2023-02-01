import RoomCanvas from '../RoomCanvas'
import React, { useState, useEffect, useMemo, useRef } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'


const SendMessageForm = ({ onSubmit }) => {
    const [message, setMessage] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        onSubmit(message);
        setMessage('');
    };

    const handleKeyDown = async (e) => {
        if (!history.length) return;

        let newIndex = index;
        if (e.key === 'ArrowUp') {
            if (history.length <= Math.abs(newIndex)) return;
            newIndex--;
            setInputMessage(history[history.length + newIndex].content.content);
        } else if (e.key === 'ArrowDown') {
            if (newIndex >= 0) {
                setInputMessage('');
                return;
            }
            newIndex++;
            if (history.length <= Math.abs(newIndex)) return;
            setInputMessage(history[history.length + newIndex].content.content);
        }
        setIndex(newIndex);
    };

    return (
        <form className='chat-form' onSubmit={handleSubmit}>
            <input className='chat-form-input' type="text" value={inputMessage} onKeyDown={handleKeyDown} onChange={e => setInputMessage(e.target.value)} placeholder="Type your message here..." />
            <button className='chat-form-submit' type="submit">
                <FontAwesomeIcon icon={faArrowRight} />
            </button>
        </form>
    );
};

export default SendMessageForm;