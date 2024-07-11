import { Link, useNavigate } from "react-router-dom"
import { isAuthenticated, removeToken } from "../../lib/auth"


export default function Navbar() {
  const isLoggedIn = isAuthenticated()
  const navigate = useNavigate()

  function handleLogout() {
    removeToken()
    navigate('/')
  }
  return (
    <nav className="navbar bg-base-200 shadow-lg">
      <div className="navbar-start gap-3">
        <Link className="btn hover:text-nord-warning" to='/'>Home</Link>
        <Link className="btn hover:text-nord-warning" to='/octopus'>View Octopus</Link>
      </div>
      <div className="navbar-end gap-3">
        {isLoggedIn ? (
          <button className="btn hover:text-nord-warning" onClick={handleLogout}>Logout</button>
        ) : (
          <>
            <Link className="btn hover:text-nord-warning" to='/sign-up'>Sign Up</Link>
            <Link className="btn hover:text-nord-warning" to='/login'>Login</Link>
          </>
        )}
      </div>
    </nav>
  )
}
