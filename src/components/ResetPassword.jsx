import axios from 'axios';
import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { BASE_URL } from '../utils/constants';

const ResetPassword = () => {
    const location = useLocation();
    const {emailId} = location.state;
    const navigate = useNavigate()
    const [password,setPassword] = useState("");
    const [confirmPassword,setConfirmPassword] = useState("");
    const [otp,setOtp] = useState("");
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const handleResetPassword = async ()=>{
        try{
              const res = await axios.post(BASE_URL + "/reset-password",{emailId,otp,newPassword:password},{withCredentials:true});
                 setMessage(res.data.message);
                 setError("");
                 setTimeout(() => navigate('/login'), 2000);
        }
        catch(err){
            
               setError(err.message || "something went wrong");
               setMessage("");
        }
    }
  return (
    <div className ="flex justify-center mt-4">
    <div className="card bg-black w-96 shadow-xl ">
 <div className="card-body">
 <h2 className="card-title">Reset Password</h2>
 <label className="form-control w-full max-w-xs"> 
  <div className="label">
    <span className="label-text">Enter OTP</span>
  </div>
  <input type="text" value = {otp} onChange={(e)=>{setOtp(e.target.value)}} placeholder="Enter OTP" className="input input-bordered w-full max-w-xs" />
   </label>
 <label className="form-control w-full max-w-xs"> 
  <div className="label">
    <span className="label-text">Password</span>
  </div>
  <input type="text" value = {password} onChange={(e)=>{setPassword(e.target.value)}} placeholder="Password" className="input input-bordered w-full max-w-xs" />
   </label>
   <label className="form-control w-full max-w-xs"> 
  <div className="label">
    <span className="label-text">Confirm Password</span>
  </div>
  <input type="text" value = {confirmPassword} onChange={(e)=>{setConfirmPassword(e.target.value)}} placeholder="Confirm Password" className="input input-bordered w-full max-w-xs" />
   </label>
   <div className="card-actions justify-center mt-3">
      <button onClick = {handleResetPassword} className="btn text-black bg-vibrantClay">Reset Password</button>
    </div>
    {message && <p className="mt-4 text-green-600">{message}</p>}
    {error && <p className="mt-4 text-red-600">{error}</p>}
 </div>
</div>
</div>
  )
}

export default ResetPassword