import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const login = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/admin/login", { username, password });
      localStorage.setItem("admin", JSON.stringify(res.data.admin));
      alert(res.data.message);
      navigate("/admin/dashboard");
    } catch (e) {
      alert(e.response?.data?.message || "Admin login failed");
    }
  };

  return (
    <div className="form-container">
      <h1>Admin Login</h1>
      <form onSubmit={login}>
        <input placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
        <button>Admin Login</button>
      </form>
      <p>Demo: admin / admin123</p>
    </div>
  );
}

export default AdminLogin;