import { useState } from "react";
import axios from "axios";

function Profile(){
  const user=JSON.parse(localStorage.getItem("user"));
  const [name,setName]=useState(user?.name||"");
  const [phone,setPhone]=useState(user?.phone||"");

  const update=async(e)=>{
    e.preventDefault();
    try{
      const res=await axios.put(`http://localhost:5000/user/update/${user._id}`,{name,phone});
      localStorage.setItem("user",JSON.stringify(res.data.user));
      alert("Profile updated successfully");
    }catch(e){alert(e.response?.data?.message||"Update failed")}
  };

  return <div className="form-container"><h1>My Profile</h1><form onSubmit={update}>
    <input value={name} onChange={e=>setName(e.target.value)} placeholder="Name"/>
    <input value={user?.email||""} disabled/>
    <input value={phone} onChange={e=>setPhone(e.target.value)} placeholder="Phone"/>
    <button>Update Profile</button>
  </form></div>
}
export default Profile;