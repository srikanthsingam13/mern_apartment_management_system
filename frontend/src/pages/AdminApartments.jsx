import { useEffect, useState } from "react";
import axios from "axios";

const empty = { apartmentNumber:"", title:"", location:"", bhk:"", rent:"", deposit:"", furnishing:"", description:"", image:"" };

function AdminApartments() {
  const [apartments,setApartments]=useState([]);
  const [form,setForm]=useState(empty);
  const [editId,setEditId]=useState(null);

  const load=async()=>setApartments((await axios.get("http://localhost:5000/apartment/all")).data);
  useEffect(()=>{load()},[]);

  const submit=async(e)=>{
    e.preventDefault();
    try{
      if(editId) await axios.put(`http://localhost:5000/apartment/update/${editId}`,form);
      else await axios.post("http://localhost:5000/apartment/add",form);
      alert(editId ? "Apartment updated" : "Apartment added");
      setForm(empty); setEditId(null); load();
    }catch(e){alert(e.response?.data?.message || "Operation failed")}
  };

  const edit=(a)=>{setEditId(a._id);setForm({...empty,...a})};
  const del=async(id)=>{if(confirm("Delete apartment?")){await axios.delete(`http://localhost:5000/apartment/delete/${id}`);load()}};

  return <div className="page">
    <h1>{editId ? "Edit Apartment" : "Add Apartment"}</h1>
    <form className="form-grid" onSubmit={submit}>
      <input placeholder="Apartment Number" value={form.apartmentNumber} onChange={e=>setForm({...form,apartmentNumber:e.target.value})}/>
      <input placeholder="Title" value={form.title} onChange={e=>setForm({...form,title:e.target.value})}/>
      <input placeholder="Location" value={form.location} onChange={e=>setForm({...form,location:e.target.value})}/>
      <select value={form.bhk} onChange={e=>setForm({...form,bhk:e.target.value})}><option value="">BHK</option><option>1 BHK</option><option>2 BHK</option><option>3 BHK</option><option>4 BHK</option></select>
      <input type="number" placeholder="Monthly Rent" value={form.rent} onChange={e=>setForm({...form,rent:e.target.value})}/>
      <input type="number" placeholder="Security Deposit" value={form.deposit} onChange={e=>setForm({...form,deposit:e.target.value})}/>
      <select value={form.furnishing} onChange={e=>setForm({...form,furnishing:e.target.value})}><option value="">Furnishing</option><option>Unfurnished</option><option>Semi Furnished</option><option>Fully Furnished</option></select>
      <input placeholder="Image URL" value={form.image} onChange={e=>setForm({...form,image:e.target.value})}/>
      <textarea placeholder="Description" value={form.description} onChange={e=>setForm({...form,description:e.target.value})}/>
      <button>{editId ? "Update Apartment" : "Add Apartment"}</button>
    </form>

    <h2>Apartment List</h2>
    <table><thead><tr><th>Number</th><th>Title</th><th>Location</th><th>BHK</th><th>Rent</th><th>Status</th><th>Actions</th></tr></thead>
    <tbody>{apartments.map(a=><tr key={a._id}><td>{a.apartmentNumber}</td><td>{a.title}</td><td>{a.location}</td><td>{a.bhk}</td><td>₹{a.rent}</td><td>{a.status}</td><td><button onClick={()=>edit(a)}>Edit</button> <button onClick={()=>del(a._id)}>Delete</button></td></tr>)}</tbody></table>
  </div>;
}
export default AdminApartments;