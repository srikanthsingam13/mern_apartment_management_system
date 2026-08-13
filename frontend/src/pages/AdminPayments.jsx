import { useEffect, useState } from "react";
import axios from "axios";
import StatusBadge from "../components/StatusBadge";

function AdminPayments(){
  const [payments,setPayments]=useState([]);
  useEffect(()=>{axios.get("http://localhost:5000/payment/all").then(r=>setPayments(r.data))},[]);
  return <div className="page"><h1>Payments</h1><table><thead><tr><th>User</th><th>Email</th><th>Apartment</th><th>Amount</th><th>Type</th><th>Status</th><th>Date</th></tr></thead><tbody>
    {payments.map(p=><tr key={p._id}><td>{p.userId?.name}</td><td>{p.userId?.email}</td><td>{p.apartmentId?.apartmentNumber}</td><td>₹{p.amount}</td><td>{p.paymentType}</td><td><StatusBadge status={p.status}/></td><td>{new Date(p.paymentDate).toLocaleDateString()}</td></tr>)}
  </tbody></table></div>
}
export default AdminPayments;