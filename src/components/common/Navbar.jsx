import { Link, useNavigate } from "react-router-dom"
import { isAuthenticated, removeToken } from "../../lib/auth"


export default function Navbar({ toast }) {
  const isLoggedIn = isAuthenticated()
  const navigate = useNavigate()

  function handleLogout() {
    toast.info("Goodbye, come back soon 🐙", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    })
    removeToken()
    navigate('/')
  }
  return (
    <nav className="navbar z-10 bg-base-200 shadow-lg w-full">
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
