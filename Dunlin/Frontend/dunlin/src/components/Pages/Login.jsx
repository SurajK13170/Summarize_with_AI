import React, { useState } from 'react';
import './Auth.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const res = await fetch('http://localhost:8080/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await res.json();
      
      if (res.ok) {
        setSuccess('Logged in successfully!');
        localStorage.setItem('token', data.token);
        window.location.href = '/';
      } else {
        setError(data.error || 'Error logging in. Please try again.');
      }
    } catch (err) {
      console.error(err);
      setError('Error logging in. Please try again.');
    }
  };

  return (
    <div className='auth-container'>
      <div className='auth-box'>
        <h2 className='auth-title'>Login</h2>
        <form className='auth-form' onSubmit={handleLogin}>
          <div className='input-group'>
            <label htmlFor='email'>Email</label>
            <input
              id='email'
              type='email'
              placeholder='Enter your email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className='auth-input'
            />
          </div>
          <div className='input-group'>
            <label htmlFor='password'>Password</label>
            <input
              id='password'
              type='password'
              placeholder='Enter your password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className='auth-input'
            />
          </div>
          <button type='submit' className='auth-button'>Login</button>
        </form>
        {error && <p className='auth-error'>{error}</p>}
        {success && <p className='auth-success'>{success}</p>}
      </div>
    </div>
  );
}

export default Login;
