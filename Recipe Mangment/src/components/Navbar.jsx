import { Link, NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="nav-inner">
        <Link to="/" className="brand">
          <span className="brand-icon">🍲</span>
          <span>
            Recipe<span className="brand-accent">Book</span>
          </span>
        </Link>
        <nav className="nav-links">
          <NavLink to="/" end>
            Home
          </NavLink>
          <NavLink to="/favorites">Favorites</NavLink>
          <NavLink to="/add" className="nav-add">
            + Add Recipe
          </NavLink>
        </nav>
      </div>
    </header>
  );
}