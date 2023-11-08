import { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

export const SignIn = () => {
  const navigate = useNavigate();
  const [gmail, setGmail] = useState('');
  const [password, setPassword] = useState('')

  const handleSignIn = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('https://node-mongodb-api-datn.onrender.com/v1/api/user/login', {
        gmail,
        password,
      });
      if (response.status === 200) {
        const token = response.data;
        localStorage.setItem('token', token);
        navigate('/dashboard')
      } else {
        console.error('Login failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }
  return (
    <div className="form-container sign-in">
      <form onSubmit={handleSignIn}>
        <h1>Sign In</h1>
        <input type="email" placeholder="Email" value={gmail} onChange={(e) => setGmail(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <a href="#">Forget Your Password?</a>
        <button type="submit">Sign In</button>
      </form>
    </div>

  )
}
