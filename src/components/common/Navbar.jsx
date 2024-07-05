import { Link } from "react-router-dom"

export default function Navbar() {
  return (
    <nav className="navbar bg-base-100 shadow-lg">
      <div className="gap-3">
        <Link className="hover:text-nord-warning" to='/'>Home</Link>
        <Link className="hover:text-nord-warning" to='/octopus'>View Octopus</Link>
      </div>
      <div className="gap-2">
      </div>
    </nav>
  )
}
