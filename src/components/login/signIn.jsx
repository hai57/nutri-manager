export const SignIn = () => {
  return (
    <div className="form-container sign-in">
      <form>
        <h1>Sign In</h1>
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <a href="#">Forget Your Password?</a>
        <button type="submit">Sign In</button>
      </form>
    </div>

  )
}
