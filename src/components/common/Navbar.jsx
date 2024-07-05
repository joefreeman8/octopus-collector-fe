import { Link } from "react-router-dom"

export default function Navbar() {
  return (
    <nav className="navbar bg-base-100 shadow-lg">
      <div className="gap-3">
        <Link to='/'>Home</Link>
        <Link to='/octopus'>Octopus</Link>
      </div>
      <div className="gap-2">
      </div>
    </nav>
  )
}
