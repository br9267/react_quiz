import React from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import {useState } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';
function Register({onFormSwitch, setisAuth}) {
  const cookie = new Cookies();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleChangeUsername = (event) => {
    setUsername(event.target.value);
  }

  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
}

const handleChangePassword = (event) => {
  setPassword(event.target.value);
}

const handleSubmit = async (event) => {
  event.preventDefault(); 
   await axios.post("http://localhost:3001/register", {username,email, password})
  .then((response) => {
    const {token,user_id,username,email,password_hash} = response.data;
    cookie.set("token",token);
    cookie.set("userId",user_id);
    cookie.set("username",username);
    cookie.set("email",email);
    cookie.set("password_hash",password_hash);
    setisAuth(true);
  });
}

  return (
    <div className='m-4 p-4'>
      <div className='row'>
     <div className='container card shadow p-4 col-lg-5 col-md-12'>
     <form onSubmit={handleSubmit}>
     <div className="mb-3">
           <label>Username</label>
           <input
             type=""
             className="form-control"
             placeholder="Enter username"
             onChange={handleChangeUsername}
           />
           </div>
             <div className="mb-3">
           <label>Email address</label>
           <input
             type="email"
             className="form-control"
             placeholder="Enter email"
             onChange={handleChangeEmail}
           />
         </div>
         <div className="mb-3">
           <label>Password</label>
           <input
             type="password"
             className="form-control"
             placeholder="Enter password"
             onChange={handleChangePassword}
           />
         </div>
         <div className="d-grid">
           <button type="submit" className="btn btn-primary">
             Submit
           </button>
         </div>
         <p className="forgot-password text-right">
          
         </p>
         
       </form>
       <button onClick={() => onFormSwitch('SignUp')}>Already a member? Sign Up!</button>
       </div>
       </div>
       </div>
   );
}

export default Register