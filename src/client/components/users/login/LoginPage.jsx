import UserForm from './UserForm';
import apiUrl from '../../../App.js'

const LoginPage = ({ }) => {
  const handleRegister = async ({ username, password }) => {
    fetch(`${apiUrl}/user/register/`, {
      method: "POST",
      headers: { "Content-type": "application/JSON" },
      body: JSON.stringify({ username, password }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  }

  const handleLogin = async ({ username, password }) => {
    fetch(`${apiUrl}/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    })
      .then((res) => res.json())
      .then((res) => localStorage.setItem("token", res.data)
      );
  };

  return (
    <div>
      <h1>Final Project</h1>
      <h1>Register</h1>
      <UserForm handleSubmit={handleRegister} />

      <h1>Login</h1>
      <UserForm handleSubmit={handleLogin} />
    </div>
  )
}

export default LoginPage