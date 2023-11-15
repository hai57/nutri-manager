import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
      storage.set('token', res);
      navigate('/dashboard')
    })
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
