import { useEffect,useState } from "react";
import axios from "axios";
import { useNavigate,useParams } from "react-router-dom";

function ApartmentDetails(){
  const {id}=useParams();
  const [a,setA]=useState(null);
  const navigate=useNavigate();
  const user=JSON.parse(localStorage.getItem("user"));

  useEffect(()=>{axios.get(`http://localhost:5000/apartment/${id}`).then(r=>setA(r.data))},[id]);

  const request=async()=>{
    if(!user) return navigate("/login");
    try{
      await axios.post("http://localhost:5000/rental/request",{userId:user._id,apartmentId:id});
      alert("Rental request submitted");
      navigate("/dashboard");
    }catch(e){alert(e.response?.data?.message || "Request failed")}
  };

  if(!a) return <div className="page">Loading...</div>;
  return <div className="page detail">
    {a.image && <img src={a.image} alt={a.title}/>}
    <h1>{a.title}</h1><p>{a.description}</p><p><b>Location:</b> {a.location}</p><p><b>BHK:</b> {a.bhk}</p><p><b>Rent:</b> ₹{a.rent}</p><p><b>Deposit:</b> ₹{a.deposit}</p><p><b>Furnishing:</b> {a.furnishing}</p>
    <button disabled={a.status!=="AVAILABLE"} onClick={request}>{a.status==="AVAILABLE" ? "Request to Rent" : "Not Available"}</button>
  </div>
}
export default ApartmentDetails;