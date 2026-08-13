import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const admin = JSON.parse(localStorage.getItem("admin"));

  const logoutUser = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const logoutAdmin = () => {
    localStorage.removeItem("admin");
    navigate("/admin/login");
  };

  return (
    <nav className="navbar">
      <h2>Apartment Rental</h2>
      <div className="nav-links">
        {admin ? (
          <>
            <Link to="/admin/dashboard">Dashboard</Link>
            <Link to="/admin/apartments">Apartments</Link>
            <Link to="/admin/requests">Requests</Link>
            <Link to="/admin/payments">Payments</Link>
            <button onClick={logoutAdmin}>Logout</button>
          </>
        ) : user ? (
          <>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/apartments">Apartments</Link>
            <Link to="/profile">Profile</Link>
            <button onClick={logoutUser}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
            <Link to="/admin/login">Admin</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;