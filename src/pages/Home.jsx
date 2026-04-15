import { Link } from "react-router-dom"

function Home() {
  return (
    <div className="home">
      <h1>Welcome to Auth Dashboard</h1>
      <p>Manage your tasks securely with authentication</p>

      <div className="home-buttons">
        <Link to="/login">
          <button>Login</button>
        </Link>

        <Link to="/signup">
          <button className="signup-btn">Signup</button>
        </Link>
      </div>
    </div>
  )
}

export default Home