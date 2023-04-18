import React from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import {useState } from 'react';
import axios from 'axios';
function SignUp({onFormSwitch, setisAuth}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

   const handleChangeEmail = (event) => {
      setEmail(event.target.value);
  }

  const handleChangePassword = (event) => {
    setPassword(event.target.value); 
  }

  const handleSubmit = (event) => {
    axios.post("http://127.0.0.1:3001/handleLogin", {email, password})
    .then((response) => response.json())
    .then((res) => {
    console.log(res);
  });
    //setisAuth(true);
  }

  return (
   <div className='m-4 p-4'>
     <div className='row'>
    <div className='container card shadow p-4 col-lg-5 col-md-12'>
    <form onSubmit={handleSubmit}>
       
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

      </form>
      <button onClick={() => onFormSwitch('Register')}>Not a member? Register Up!</button>
      </div>
      </div>
      </div>
  );
}

export default SignUp