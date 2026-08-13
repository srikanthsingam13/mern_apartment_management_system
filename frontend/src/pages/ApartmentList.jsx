import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import StatusBadge from "../components/StatusBadge";

function ApartmentList(){
  const [apartments,setApartments]=useState([]);
  const [search,setSearch]=useState("");
  const [bhk,setBhk]=useState("");
  const [maxRent,setMaxRent]=useState("");

  const load=async()=>{
    let url="http://localhost:5000/apartment/all";
    const res=await axios.get(url);
    let data=res.data.filter(a=>a.status==="AVAILABLE");
    if(search) data=data.filter(a=>a.location.toLowerCase().includes(search.toLowerCase()));
    if(bhk) data=data.filter(a=>a.bhk===bhk);
    if(maxRent) data=data.filter(a=>Number(a.rent)<=Number(maxRent));
    setApartments(data);
  };
  useEffect(()=>{load()},[search,bhk,maxRent]);

  return <div className="page"><h1>Available Apartments</h1>
    <div className="filters">
      <input placeholder="Search location" value={search} onChange={e=>setSearch(e.target.value)}/>
      <select value={bhk} onChange={e=>setBhk(e.target.value)}><option value="">All BHK</option><option>1 BHK</option><option>2 BHK</option><option>3 BHK</option><option>4 BHK</option></select>
      <input type="number" placeholder="Max rent" value={maxRent} onChange={e=>setMaxRent(e.target.value)}/>
    </div>
    <div className="cards">{apartments.map(a=><div className="card" key={a._id}>
      {a.image && <img src={a.image} alt={a.title}/>}
      <h2>{a.title}</h2><p>{a.location}</p><p>{a.bhk}</p><p>₹{a.rent}/month</p><StatusBadge status={a.status}/><br/>
      <Link to={`/apartment/${a._id}`}>View Details</Link>
    </div>)}</div>
  </div>
}
export default ApartmentList;