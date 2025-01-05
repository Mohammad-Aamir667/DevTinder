import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';

const Login = () => {
  const [emailId,setEmailId] = useState("ayat123@gmail.com");
  const [firstName,setFirstName] = useState("");
  const [lastName,setLastName] = useState("");
  const [confirmPassword,setConfirmPassword] = useState("");
  const [isLoginForm,setIsLoginForm] = useState(true);
  const [password,setPassword] = useState("Ayat@123");
  const [error,setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store)=>store.user)
  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);
  const handleLogin = async()=>{
   try{
    const res = await axios.post(BASE_URL+ "/login",{
         emailId,
         password,
    },{withCredentials:true});
   dispatch(addUser(res.data))
   return navigate("/");
  }
    catch(err){
      setError(err?.response?.data);
    }

  }
  const handleSignUp = async ()=>{
           try{
            const res = await axios.post(BASE_URL+"/signup",
              {firstName,lastName,emailId,password},{withCredentials:true}
            );
            dispatch(addUser(res.data));
            return navigate("/profile");
           }
           catch(err){
            console.log(err.message);
           }
  }
 

  return ( 
  <div className ="flex justify-center mt-4">
     <div className="card bg-black w-96 shadow-xl ">
  <div className="card-body">
    <h2 className="card-title">{isLoginForm?"Login":"Sign Up"}</h2>
    {!isLoginForm && <label className="form-control w-full max-w-xs"> 
  <div className="label">
    <span className="label-text">First Name</span>
  </div>
  <input type="text" value = {firstName} onChange={(e)=>{setFirstName(e.target.value)}} placeholder="Enter Your First Name" className="input input-bordered w-full max-w-xs" />
   </label>}
{!isLoginForm && <label className="form-control w-full max-w-xs"> 
<div className="label">
<span className="label-text">Last Name</span>
</div>
<input type="text" value = {lastName} onChange={(e)=>{setLastName(e.target.value)}} placeholder="Enter Your Last Name" className="input input-bordered w-full max-w-xs" />
</label>}
    <label className="form-control w-full max-w-xs"> 
  <div className="label">
    <span className="label-text">Email ID</span>
  </div>
  <input type="text" value = {emailId} onChange={(e)=>{setEmailId(e.target.value)}} placeholder="Enter your emailId" className="input input-bordered w-full max-w-xs" />
</label>
<label className="form-control w-full max-w-xs">
  <div className="label">
    <span className="label-text">Password</span>
  </div>
  <input type="password" value = {password} onChange={(e)=>{setPassword(e.target.value)}} placeholder="Password" className="input input-bordered w-full max-w-xs" />
</label>
{!isLoginForm && <label className="form-control w-full max-w-xs">
  <div className="label">
    <span className="label-text">Confirm Password</span>
  </div>
  <input type="password" value = {confirmPassword} onChange={(e)=>{setConfirmPassword(e.target.value)}} placeholder="Confirm Password" className="input input-bordered w-full max-w-xs" />
</label>}
      {confirmPassword !== "" && password !== confirmPassword  && <p className = "text-red-500">Password does not match</p> }
     <p className = "text-red-500">{error}</p>
    <div className="card-actions justify-center mt-3">
      <button onClick = {isLoginForm?handleLogin:handleSignUp} className="btn text-black bg-vibrantClay">{isLoginForm?"Login":"Sign Up"}</button>
    </div>
    <div className="card-actions justify-center mt-2 mx-auto">
     {isLoginForm && <p 
      onClick={() => navigate("/forgot-password")} 
      className="hover:cursor-pointer text-blue-500 hover:underline"
    >
      Forgot Password?
    </p>
}
    </div>
    <div className="card-actions justify-center mt-3 mx-auto">
      <p className = "hover:cursor-pointer " onClick = {()=>{setIsLoginForm((value) => !value)}}>{isLoginForm?"New User":"Already registered"}</p>
    </div>
  </div>
</div>
</div>
  )
}

export default Login