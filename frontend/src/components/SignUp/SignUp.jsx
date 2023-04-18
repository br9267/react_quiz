import React from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import { Link } from 'react-router-dom';

function SignUp() {
  return (
   <div className='m-4 p-4'>
     <div className='row'>
    <div className='container card shadow p-4 col-lg-5 col-md-12'>
    <form>
       
            <div className="mb-3">
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
          />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
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
      </div>
      </div>
      </div>
  );
}

export default SignUp