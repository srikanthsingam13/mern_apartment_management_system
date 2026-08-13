import { useEffect,useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import StatusBadge from "../components/StatusBadge";

function UserDashboard(){
  const user=JSON.parse(localStorage.getItem("user"));
  const navigate=useNavigate();
  const [requests,setRequests]=useState([]);
  const [payments,setPayments]=useState([]);

  const load=async()=>{
    if(!user) return navigate("/login");
    const [r,p]=await Promise.all([
      axios.get(`http://localhost:5000/rental/user/${user._id}`),
      axios.get(`http://localhost:5000/payment/user/${user._id}`)
    ]);
    setRequests(r.data);setPayments(p.data);
  };
  useEffect(()=>{load()},[]);

  const total=payments.reduce((t,p)=>t+Number(p.amount||0),0);

  return <div className="page"><h1>Welcome, {user?.name}</h1>
    <div className="stats">
      <div><b>Requests</b><strong>{requests.length}</strong></div>
      <div><b>Accepted/Paid</b><strong>{requests.filter(r=>["PAYMENT PENDING","PAID"].includes(r.status)).length}</strong></div>
      <div><b>Payments</b><strong>{payments.length}</strong></div>
      <div><b>Total Paid</b><strong>₹{total}</strong></div>
    </div>

    <h2>My Rental Requests</h2>
    <table><thead><tr><th>Apartment</th><th>Location</th><th>Rent</th><th>Status</th><th>Action</th></tr></thead><tbody>
      {requests.map(r=><tr key={r._id}><td>{r.apartmentId?.apartmentNumber}</td><td>{r.apartmentId?.location}</td><td>₹{r.apartmentId?.rent}</td><td><StatusBadge status={r.status}/></td><td>
        {r.status==="PAYMENT PENDING" && <button onClick={()=>navigate("/payment",{state:{request:r}})}>Pay Now</button>}
      </td></tr>)}
    </tbody></table>

    <h2>Payment History</h2>
    <table><thead><tr><th>Apartment</th><th>Amount</th><th>Status</th><th>Date</th></tr></thead><tbody>
      {payments.map(p=><tr key={p._id}><td>{p.apartmentId?.apartmentNumber}</td><td>₹{p.amount}</td><td><StatusBadge status={p.status}/></td><td>{new Date(p.paymentDate).toLocaleDateString()}</td></tr>)}
    </tbody></table>
  </div>
}
export default UserDashboard;