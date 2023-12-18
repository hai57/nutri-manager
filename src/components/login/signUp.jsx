import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { authServiceApi } from "@/api/auth";
import { storage } from "@/utils/storage";
import { isauthorize } from "@/store/actions/authorzeAction";
import { setSelf } from "@/store/actions/selfAction";
import { Routing } from "@/utils/routing";


export const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [newUser, setNewUser] = useState({
    name: '',
    age: '',
    gmail: '',
    address: '',
    password: ''
  });

  const handleSignUp = async (e) => {
    e.preventDefault();

    authServiceApi.register({
      name: newUser.name,
      gmail: newUser.gmail,
      password: newUser.password,
      age: newUser.age,
      address: newUser.address
    }).then((res) => {
      const { token, user } = res;
      dispatch(setSelf(user))
      storage.set('token', token);
      dispatch(setSelf(user));
      dispatch(isauthorize());
      navigate(Routing.users.path)
    }).catch((err) => {
      toast.error('An error occurred while signing up: ', err);
    })
  }

  return (
    <div className="form-container sign-up">
      <form onSubmit={handleSignUp}>
        <h1>Create Account</h1>
        <input
          type="text"
          placeholder="Name"
          value={newUser.name}
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Age"
          value={newUser.age}
          onChange={(e) => setNewUser({ ...newUser, age: e.target.value })}
        />
        <input
          type="text"
          placeholder="Address"
          value={newUser.address}
          onChange={(e) => setNewUser({ ...newUser, address: e.target.value })}
        />
        <input
          type="text"
          placeholder="Email"
          value={newUser.gmail}
          onChange={(e) => setNewUser({ ...newUser, gmail: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          value={newUser.password}
          onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
        />
        <button type="submit">Sign Up</button>
      </form>
      <ToastContainer />
    </div>
  );
};
