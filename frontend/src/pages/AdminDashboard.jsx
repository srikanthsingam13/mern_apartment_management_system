import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  const navigate = useNavigate();
  const [apartments, setApartments] = useState([]);
  const [users, setUsers] = useState([]);
  const [requests, setRequests] = useState([]);
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    if (!localStorage.getItem("admin")) return navigate("/admin/login");
    load();
  }, []);

  const load = async () => {
    try {
      const [a,u,r,p] = await Promise.all([
        axios.get("http://localhost:5000/apartment/all"),
        axios.get("http://localhost:5000/user/all"),
        axios.get("http://localhost:5000/rental/all"),
        axios.get("http://localhost:5000/payment/all")
      ]);
      setApartments(a.data); setUsers(u.data); setRequests(r.data); setPayments(p.data);
    } catch (e) { console.log(e); }
  };

  const totalPayment = payments.reduce((t,p) => t + Number(p.amount || 0), 0);

  return (
    <div className="page">
      <h1>Admin Dashboard</h1>
      <div className="stats">
        <div><b>Total Apartments</b><strong>{apartments.length}</strong></div>
        <div><b>Available</b><strong>{apartments.filter(a=>a.status==="AVAILABLE").length}</strong></div>
        <div><b>Rented</b><strong>{apartments.filter(a=>a.status==="RENTED").length}</strong></div>
        <div><b>Users</b><strong>{users.length}</strong></div>
        <div><b>Waiting Requests</b><strong>{requests.filter(r=>r.status==="WAITING").length}</strong></div>
        <div><b>Total Payments</b><strong>₹{totalPayment}</strong></div>
      </div>
      <div className="menu-buttons">
        <button onClick={()=>navigate("/admin/apartments")}>Manage Apartments</button>
        <button onClick={()=>navigate("/admin/requests")}>Manage Requests</button>
        <button onClick={()=>navigate("/admin/payments")}>View Payments</button>
      </div>
    </div>
  );
}
export default AdminDashboard;