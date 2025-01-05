import React, { useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const [emailId, setEmailId] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const navigate = useNavigate();


  const handleRequestOtp = async () => {
    try {
      const res = await axios.post(BASE_URL+'/forget-password', { emailId },{withCredentials:true});
      setMessage(res.data.message);
      setOtpSent(true);
      setError("");
    } catch (err) {
      console.log(err);
      setError(err.message || 'Something went wrong');
      setMessage("");
    }  
  };
  const handleNavigateToReset = ()=>{
    navigate('/reset-password', { state: { emailId } });
   }
  return (
    <div className ="flex justify-center mt-4">
    <div className="card bg-black w-96 shadow-xl ">
     <div className="card-body">
          <h2 className="text-xl font-semibold mb-4">Forgot Password</h2>
          <label className="form-control w-full max-w-xs"> 
      <div className="label">
    <span className="label-text">Email ID</span>
      </div>
  <input type="text" value = {emailId} onChange={(e)=>{setEmailId(e.target.value)}} placeholder="Enter your emailId" className="input input-bordered w-full max-w-xs" />
     </label>
          {!otpSent && <div className="card-actions justify-center mt-3">
          <button
            onClick={handleRequestOtp}
            className="btn text-black bg-vibrantClay"
          >
          Send OTP
          </button>
          </div>}
          {message && <p className="mt-4 text-green-600">{message}</p>}
          {error && <p className="mt-4 text-red-600">{error}</p>}
          {otpSent && (
        <button onClick={handleNavigateToReset} className="btn text-black bg-vibrantClay">
          Go to Reset Password
        </button>
      )}
      </div>
</div>
</div>
  );
};

export default ForgotPassword;
