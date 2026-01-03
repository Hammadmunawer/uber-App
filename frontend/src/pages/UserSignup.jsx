import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'

const UserSignup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
   const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
  const [userData, setUserData] = useState({});

const submitHandler = (e) => {
  e.preventDefault();
const payload = {
    fullName: {
      firstName,
      lastName
    },
    email,
    password
  };
  setUserData(payload);
 
  
  console.log(payload);
  
 setEmail('');
 setFirstName('');  
  setLastName('');
 setPassword('');
 
}
  
  return (
    <div className='p-7 h-screen  flex flex-col justify-between '>
      <div>
         <img className='w-20 mb-10' src='https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png'/>
      <form onSubmit={(e)=>{
        submitHandler(e)      }}>
          <h3 className='mb-2 text-base font-medium'>What's your Name</h3> 
        <div className='flex gap-4 mb-5'>
              <input 
        className='bg-[#eeeeee] w-1/2 rounded px-4 py-2  border  text-base placeholder:text-sm' required type="text" placeholder='First Name' value={firstName}
        onChange={(e) => setFirstName(e.target.value)} />
           <input 
        className='bg-[#eeeeee] w-1/2 rounded px-4 py-2  border text-base placeholder:text-sm'  type="text" placeholder='Last Name' value={lastName}
        onChange={(e) => setLastName(e.target.value)} />
        </div>



        <h3 className='mb-2 text-base font-medium'>What's your email</h3> 
        <input 
        className='bg-[#eeeeee] mb-5 rounded px-4 py-2  border w-full text-xl placeholder:text-sm ' required type="email" placeholder='email@example.com' value={email}
        onChange={(e) => setEmail(e.target.value)}
        />
        <h3 className='mb-2 text-base font-medium'>Enter Your Password</h3>
        <input 
        className='bg-[#eeeeee] mb-5 rounded px-4 py-2  border w-full text-base placeholder:text-sm'value={password}
        onChange={(e) => setPassword(e.target.value)} required type="password" placeholder='Enter your password' />
        <button  className='bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2 rounded w-full text-base placeholder:text-sm ' >Login</button> 
     
      </form>
        <p className='text-center'>Aleardy have an account <Link to='/login' className='text-blue-600'> Login here </Link></p>
      </div>
       <div>
         <p className='text-[10px] leading-tight'>By proceeding, you consent to our Terms of Service and Privacy Policy</p>
       </div>
    </div>
  )
}

export default UserSignup
