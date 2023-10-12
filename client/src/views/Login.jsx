import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();

  // Define state variables for form inputs
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make an HTTP POST request to the server to log in the user
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/auth/login`,
        {
          email: email,
          password: password,
        }
      );

      if (response.status === 200) {
        // Login successful, extract token from response data
        const token = response.data.token;

        // Store the token in localStorage (you might want to use more secure methods)
        localStorage.setItem('token', token);

        // Redirect to the home page
        navigate('/home');
      } else {
        console.log(response.data.message);
      }
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <div className='container'>
      <div className='form-container'>
        <div className='form-header'>
          <h1 className='title'>Welcome Back!</h1>
          <span className='subtitle'>Let's begin the adventure</span>
        </div>
        <form onSubmit={handleSubmit} className='form-content'>
          <div className='form-group'>
            <label htmlFor='email' className='label'>
              Email
            </label>
            <input
              type='email'
              id='email'
              className='input'
              placeholder='Enter your email address'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className='form-group'>
            <label htmlFor='password' className='label'>
              Password
            </label>
            <input
              type='password'
              id='password'
              className='input'
              placeholder='Enter your password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type='submit' className='form-btn'>
            Login
          </button>
          <Link to='/register' className='form-register'>
            Are you new? Register here
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
