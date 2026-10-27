
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("userId");
    localStorage.removeItem("name");
    localStorage.removeItem("email");

    navigate("/login");
  }

  return (
    <nav className="navbar">
      <Link to="/" className="brand">
        TicketsGO
      </Link>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/buses">Search Buses</Link>

        {token && <Link to="/my-bookings">My Bookings</Link>}

        {role === "ADMIN" && (
          <Link to="/admin">Admin Dashboard</Link>
        )}

        {!token ? (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register" className="nav-button">
              Register
            </Link>
          </>
        ) : (
          <button onClick={logout} className="logout-button">
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}
