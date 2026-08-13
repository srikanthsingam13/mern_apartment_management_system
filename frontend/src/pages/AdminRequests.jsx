import { useEffect, useState } from "react";
import axios from "axios";
import StatusBadge from "../components/StatusBadge";

function AdminRequests(){
  const [requests,setRequests]=useState([]);
  const load=async()=>setRequests((await axios.get("http://localhost:5000/rental/all")).data);
  useEffect(()=>{load()},[]);
  const action=async(id,type)=>{await axios.put(`http://localhost:5000/rental/${type}/${id}`);load()};
  return <div className="page"><h1>Rental Requests</h1><table><thead><tr><th>User</th><th>Email</th><th>Apartment</th><th>Rent</th><th>Status</th><th>Action</th></tr></thead><tbody>
    {requests.map(r=><tr key={r._id}><td>{r.userId?.name}</td><td>{r.userId?.email}</td><td>{r.apartmentId?.apartmentNumber}</td><td>₹{r.apartmentId?.rent}</td><td><StatusBadge status={r.status}/></td><td>{r.status==="WAITING" && <><button onClick={()=>action(r._id,"accept")}>Accept</button> <button onClick={()=>action(r._id,"deny")}>Deny</button></>}</td></tr>)}
  </tbody></table></div>
}
export default AdminRequests;