import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch } from "react-redux";

import { authServiceApi } from "@/api/auth";
import { storage } from "@/utils/storage";
import { isauthorize } from "@/store/actions/authorzeAction";
import { Routing } from "@/utils/routing";
import { setSelf } from "@/store/actions/selfAction";

export const SignIn = () => {
  const [gmail, setGmail] = useState('');
  const [password, setPassword] = useState('')
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const handleSignIn = (e) => {
    e.preventDefault();
    authServiceApi.login({
      gmail: gmail,
      password: password
    })
      .then(res => {
        const { token, user } = res;
        dispatch(setSelf(user))
        storage.set('token', token);
        dispatch(isauthorize());
        navigate(Routing.users.path)

      })
      .catch((_err) => {
        toast.error(_err);
      });
  }
  return (
    <div className="form-container sign-in">
      <form onSubmit={handleSignIn}>
        <h1>Sign In</h1>
        <input type="text" placeholder="Email" value={gmail} onChange={(e) => setGmail(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <a href="#">Forget Your Password?</a>
        <button type="submit">Sign In</button>
      </form>
      <ToastContainer />
    </div>

  )
}
