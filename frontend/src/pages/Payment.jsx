import { useState } from "react";
import axios from "axios";
import { useLocation,useNavigate } from "react-router-dom";

function Payment(){
  const location=useLocation();
  const navigate=useNavigate();
  const user=JSON.parse(localStorage.getItem("user"));
  const request=location.state?.request;
  const [amount,setAmount]=useState(request?.apartmentId?.deposit||"");

  if(!request) return <div className="page"><h2>No payment request selected.</h2><button onClick={()=>navigate("/dashboard")}>Back</button></div>;

  const pay=async(e)=>{
    e.preventDefault();
    try{
      await axios.post("http://localhost:5000/payment/create",{
        userId:user._id,
        apartmentId:request.apartmentId._id,
        amount:Number(amount),
        paymentType:"SECURITY_DEPOSIT"
      });
      alert("Payment successful");
      navigate("/dashboard");
    }catch(e){alert(e.response?.data?.message||"Payment failed")}
  };

  return <div className="form-container"><h1>Security Deposit Payment</h1>
    <p>Apartment: {request.apartmentId.apartmentNumber}</p>
    <p>Deposit: ₹{request.apartmentId.deposit}</p>
    <form onSubmit={pay}><input type="number" value={amount} onChange={e=>setAmount(e.target.value)}/><button>Pay Now</button></form>
    <small>Demo payment: no real payment gateway is connected.</small>
  </div>
}
export default Payment;