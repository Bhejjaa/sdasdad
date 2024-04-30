import React, { useState } from 'react';
import { loginUserApi } from '../../apis/Api';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const validation = () => {
    let isValid = true;
    setEmailError('');
    setPasswordError('');

    if (email === '' || !email.includes('@')) {
      setEmailError('Email is empty or invalid');
      isValid = false;
    }
    if (password.trim() === '') {
      setPasswordError('Password is empty');
      isValid = false;
    }

    return isValid;
  };
  const navigate=useNavigate()
  const handleLogin = (e) => {
    e.preventDefault();
    if (!validation()) return;

    const data = {
      email: email,
      password: password,
    };

    loginUserApi(data).then((res) => {
      if (res.data.success === false) {
        toast.error(res.data.message);
      } else {
        toast.success(res.data.message);
        localStorage.setItem('token', res.data.token);
        const convertedData = JSON.stringify(res.data.user);
        localStorage.setItem('user', convertedData);
        navigate("/");
      }
    });
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100 vw-100" style={{ backgroundImage: `url(https://www.treetoptoyshop.com.au/cdn/shop/files/treetop-toy-shop-hero.jpg?v=1686888122&width=2400)`, backgroundSize: 'cover' }}>
      <div className="card p-5 w-50 shadow-lg rounded" style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)', color: 'white' }}>
        <h1 className="text-center mb-4">Login to your Account</h1>
        <form onSubmit={handleLogin}>
          <div className="form-group mb-3">
            <label>Email</label>
            <input 
              type="email"
              className={`form-control ${emailError ? 'is-invalid' : ''}`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)', color: 'white' }}
            />
            {emailError && <div className="invalid-feedback">{emailError}</div>}
          </div>
          <div className="form-group mb-3">
            <label>Password</label>
            <input 
              type="password"
              className={`form-control ${passwordError ? 'is-invalid' : ''}`}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)', color: 'white' }}
            />
            {passwordError && <div className="invalid-feedback">{passwordError}</div>}
          </div>
          <button type="submit" className="btn btn-light w-100 mt-3">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
