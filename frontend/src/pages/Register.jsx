import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "", phone: "" });
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/user/register", form);
      alert("Registration successful");
      navigate("/login");
    } catch (e) {
      alert(e.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="form-container">
      <h1>User Registration</h1>
      <form onSubmit={submit}>
        <input placeholder="Name" value={form.name} onChange={e => setForm({...form, name:e.target.value})} />
        <input placeholder="Email" value={form.email} onChange={e => setForm({...form, email:e.target.value})} />
        <input type="password" placeholder="Password" value={form.password} onChange={e => setForm({...form, password:e.target.value})} />
        <input placeholder="Phone" value={form.phone} onChange={e => setForm({...form, phone:e.target.value})} />
        <button>Register</button>
      </form>
    </div>
  );
}

export default Register;