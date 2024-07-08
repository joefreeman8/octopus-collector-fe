import { Link } from "react-router-dom"

export default function Navbar() {
  return (
    <nav className="navbar bg-base-200 shadow-lg">
      <div className="navbar-start gap-3">
        <Link className="hover:text-nord-warning" to='/'>Home</Link>
        <Link className="hover:text-nord-warning" to='/octopus'>View Octopus</Link>
      </div>
      <div className="navbar-end gap-3">
        <Link to='/sign-up'>Sign Up</Link>
        <Link to='/login'>Login</Link>
      </div>
    </nav>
  )
}
