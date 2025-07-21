import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const { isLoggedIn, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">Matrimony</Link>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>

            {isLoggedIn && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/matches">Matches</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/profile">Profile</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/requests">Requests</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/yourmatch">Your Matches</Link>
                </li>
              </>
            )}

            {!isLoggedIn && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">Login</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">Register</Link>
                </li>
              </>
            )}

            <li className="nav-item dropdown">
              <span
                className="nav-link dropdown-toggle"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {isLoggedIn ? `Hi, ${user?.name || "User"}` : "Account"}
              </span>
              <ul className="dropdown-menu dropdown-menu-end">
                {isLoggedIn ? (
                  <li><button className="dropdown-item" onClick={handleLogout}>Logout</button></li>
                ) : (
                  <li><Link className="dropdown-item" to="/login">Login</Link></li>
                )}
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
