import React from 'react'
import { Link , useNavigate} from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import {UserDataContext} from '../context/UserContext'


const UserSignup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
   const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
  const [userData, setUserData] = useState({});

  const navigate = useNavigate();

  const {user, setUser} = React.useContext(UserDataContext);  


const submitHandler = async (e) => {
  e.preventDefault();
const newUser = {
    fullName: {
      firstName:firstName,
      lastName:lastName
    },
    email,
    password
  };
  

  const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`, newUser);

  if(response.status === 201){
   const data= response.data;
   setUser(data.user);  
   localStorage.setItem('token', data.token);
    navigate('/home');
  } 
  
  console.log(newUser);
  
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
        <button  className='bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2 rounded w-full text-base placeholder:text-sm ' >Create Account</button> 
     
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
