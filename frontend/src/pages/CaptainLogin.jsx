import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'


const CaptainLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [captainData, setCaptainData] = useState({});
  
  const submitHandler = (e) => {
    e.preventDefault();
    setCaptainData({
      email: email,
      password: password  
    })
    
    
   setEmail('');
   setPassword('');
   
  }
  
  return (
      <div className='p-7 h-screen  flex flex-col justify-between '>
      <div>
         <img className='w-20 mb-2' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmoJcsV2aZSkAm3nmwtyjuiekrT3H5U7pvjQ&s'/>
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
        <p className='text-center'>Join a fleet <Link to='/captain-signup' className='text-blue-600'> Register as Captain</Link></p>
      </div>
       <div>
         <Link to='/login' className='bg-[#f3c164] flex items-center justify-center text-white font-semibold mb-5 rounded px-4 py-2 rounded w-full text-xl placeholder:text-base' >Sign as User</Link> 
       </div>
    </div>
  )
}

export default CaptainLogin
