import React, { useState } from 'react';
import { registerUserApi } from '../../apis/Api';
import { toast } from 'react-toastify';

const Register = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [firstNameError, setFirstNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const handleFirstname = (e) => {
    setFirstName(e.target.value);
  };

  const handleLastname = (e) => {
    setLastName(e.target.value);
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };

  const validate = () => {
    let isValid = true;
    setFirstNameError('');
    setLastNameError('');
    setEmailError('');
    setPasswordError('');
    setConfirmPasswordError('');

    if (firstName.trim() === '') {
      setFirstNameError('Firstname is Required');
      isValid = false;
    }

    if (lastName.trim() === '') {
      setLastNameError('Lastname is Required');
      isValid = false;
    }

    if (email.trim() === '') {
      setEmailError('Email is Required');
      isValid = false;
    }

    if (password.trim() === '') {
      setPasswordError('Password is Required');
      isValid = false;
    }

    if (confirmPassword.trim() === '') {
      setConfirmPasswordError('Confirm Password is Required');
      isValid = false;
    }

    if (password.trim() !== confirmPassword.trim()) {
      setConfirmPasswordError('Password does not match');
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    const data = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
    };

    registerUserApi(data).then((res) => {
      if (res.data.success === false) {
        toast.error(res.data.message);
      } else {
        toast.success(res.data.message);
      }
    });
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{
        backgroundImage: `url(https://media.timeout.com/images/105723504/image.jpg)`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
      }}
    >
      <div className="card p-5 w-50 shadow-lg rounded" style={{ backgroundColor: 'rgba(0, 0, 0, 0.9)', color: 'white' }}>
        <h1 className="text-center mb-4">Create an Account</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <label>Firstname</label>
            <input
              type="text"
              className={`form-control ${firstNameError ? 'is-invalid' : ''}`}
              value={firstName}
              onChange={handleFirstname}
              placeholder="Enter your firstname"
              style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)', color: 'white' }}
            />
            {firstNameError && <div className="invalid-feedback">{firstNameError}</div>}
          </div>
          <div className="form-group mb-3">
            <label>Lastname</label>
            <input
              type="text"
              className={`form-control ${lastNameError ? 'is-invalid' : ''}`}
              value={lastName}
              onChange={handleLastname}
              placeholder="Enter your lastname"
              style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)', color: 'white' }}
            />
            {lastNameError && <div className="invalid-feedback">{lastNameError}</div>}
          </div>
          <div className="form-group mb-3">
            <label>Email Address</label>
            <input
              type="email"
              className={`form-control ${emailError ? 'is-invalid' : ''}`}
              value={email}
              onChange={handleEmail}
              placeholder="Enter your email address"
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
              onChange={handlePassword}
              placeholder="Enter your password"
              style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)', color: 'white' }}
            />
            {passwordError && <div className="invalid-feedback">{passwordError}</div>}
          </div>
          <div className="form-group mb-3">
            <label>Confirm Password</label>
            <input
              type="password"
              className={`form-control ${confirmPasswordError ? 'is-invalid' : ''}`}
              value={confirmPassword}
              onChange={handleConfirmPassword}
              placeholder="Confirm your password"
              style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)', color: 'white' }}
            />
            {confirmPasswordError && <div className="invalid-feedback">{confirmPasswordError}</div>}
          </div>
          <button type="submit" className="btn btn-light w-100 mt-3">Create Account</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
