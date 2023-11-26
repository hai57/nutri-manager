import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import { authServiceApi } from "@/api/auth";
import { storage } from "@/utils/storage";

export const SignIn = () => {
  const [gmail, setGmail] = useState('');
  const [password, setPassword] = useState('')
  const navigate = useNavigate();

  const handleSignIn = (e) => {
    e.preventDefault();
    authServiceApi.login({
      gmail: gmail,
      password: password
    })
      .then(res => {
        const { userId, token } = res;
        storage.set('userId', userId);
        storage.set('token', token);
        navigate('/dashboard')
      })
      .catch(error => {
        toast.error("Invalid email or password");
      });
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
      <ToastContainer />
    </div>

  )
}
