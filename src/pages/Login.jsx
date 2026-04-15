import { useState, useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import { useNavigate } from "react-router-dom"

function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const { login } = useContext(AuthContext)
  const navigate = useNavigate()

  function handleLogin(e) {
    e.preventDefault()

    const success = login(email, password)

    if (success) {
      navigate("/dashboard")
    } else {
      setError("Invalid email or password")
    }
  }

  return (
<div className="auth-container">

    <div>
      <h1>Login</h1>

      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Login</button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
    </div>
  )
 
}
 
export default Login