import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const userLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userData, setUserData] = useState({});

const submitHandler = (e) => {
  e.preventDefault();
  const payload = {
    email,
    password
  };

  setUserData(payload);

  console.log(payload); 
  
 setEmail('');
 setPassword('');
 
}

  return (
    <div className='p-7 h-screen  flex flex-col justify-between '>
      <div>
         <img className='w-16 mb-10' src='https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png'/>
      <form onSubmit={(e)=>{
        submitHandler(e)      }}>
        <h3 className='mb-2 text-lg font-medium'>What's your email</h3> 
        <input value={email} 
        onChange={(e)=>{
             setEmail(e.target.value);
               
        }}
        className='bg-[#eeeeee] mb-7 rounded px-4 py-2  border w-full text-xl placeholder:text-base' required type="email" placeholder='email@example.com' />
        <h3 className='mb-2 text-lg font-medium'>Enter Your Password</h3>
        <input 
        value={password} 
        onChange={(e)=>{
             setPassword(e.target.value);
               
        }}
        className='bg-[#eeeeee] mb-7 rounded px-4 py-2  border w-full text-xl placeholder:text-base' required type="password" placeholder='Enter your password' />
        <button  className='bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2 rounded w-full text-xl placeholder:text-base' >Login</button> 
     
      </form>
        <p className='text-center'>new here? <Link to='/signup' className='text-blue-600'> Create new Account</Link></p>
      </div>
       <div>
         <Link to='/captain-login' className='bg-[#10b461] flex items-center justify-center text-white font-semibold mb-5 rounded px-4 py-2 rounded w-full text-xl placeholder:text-base' >Sign as Captain</Link> 
       </div>
    </div>
  ) 
}

export default userLogin
