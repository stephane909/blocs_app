import { Link } from '@tanstack/react-router'

export function Header() {
  return (
    <header>
      <nav>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/projects">Projects</Link>
        <Link to="/map">Map</Link>
      </nav>
    </header>
  )
}
