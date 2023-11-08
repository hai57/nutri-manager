import { useState } from "react";

import { SignIn } from "./signIn"
import { SignUp } from "./signUp"
import { ToggleContainer } from "./toggle"

export const LoginWrapper = () => {
  const [isActive, setIsActive] = useState(false);

  const handleRegisterClick = () => {
    setIsActive(true);
  };

  const handleLoginClick = () => {
    setIsActive(false);
  };
  return (
    <div className="login-container">
      <div className={`container ${isActive ? "active" : ""}`} >
        <SignUp />
        <SignIn />
        <ToggleContainer
          handleLoginClick={handleLoginClick}
          handleRegisterClick={handleRegisterClick}
        />
      </div>
    </div>
  )
}
