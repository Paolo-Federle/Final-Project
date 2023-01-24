import { useState } from "react";
import '../../../CSS/UserForm.css'
import { useLocation } from 'react-router-dom';


export default function UserForm({ handleSubmit }) {
    const [user, setUser] = useState({ username: '', password: '' });
    const location = useLocation();
    const buttonText = location.pathname === '/register' ? 'Sign in' : 'Login';

    const handleSubmitDecorator = (e) => {
        e.preventDefault();
        handleSubmit(user);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({
            ...user,
            [name]: value
        });
    };

    return (

        <form className="userform-form" onSubmit={handleSubmitDecorator}>
            <div className="userform-username">
                <label htmlFor="username" className="userform-label">Username</label>
                <input className="userform-input" type="text" id="username" name="username" placeholder="Username" value={user.username} onChange={handleChange} />
            </div>
            <div className="userform-password">
                <label htmlFor="password" className="userform-label">Password</label>
                <input className="userform-input" type="password" id="password" name="password" placeholder="Password" value={user.password} onChange={handleChange} />
            </div>
            <button className="salmon-button userform-button" type="submit">{buttonText}</button>
        </form>
    );
}