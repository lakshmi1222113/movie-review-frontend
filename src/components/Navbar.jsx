import { Link, useNavigate } from "react-router-dom";
import "../styles/Navbar.css";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="logo">
        🎬 Movie Hub
      </div>

      <ul className="nav-links">
        <li>
          <Link to="/home">Home</Link>
        </li>

       

        <li>
          <Link to="/profile">👤 Profile</Link>
        </li>

        <li>
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;