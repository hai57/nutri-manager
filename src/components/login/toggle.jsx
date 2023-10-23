export const ToggleContainer = ({ handleRegisterClick, handleLoginClick }) => {
  return (
    <div className="toggle-container">
      <div className="toggle">
        <div className="toggle-panel toggle-left">
          <h1>Welcome Back!</h1>
          <p>Enter your personal details to use all of site features</p>
          <button className="hidden" id="login" onClick={handleLoginClick}>Sign In</button>
        </div>
        <div className="toggle-panel toggle-right">
          <h1>Hello, Friend!</h1>
          <p>Register with your personal details to use all of site features</p>
          <button className="hidden" id="register" onClick={handleRegisterClick}>Sign Up</button>
        </div>
      </div>
    </div>
  )
}
