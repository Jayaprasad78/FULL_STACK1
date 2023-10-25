import React, { useState } from 'react';
import { useNavigate,Link } from 'react-router-dom';
import '../assets/styles/login.css';


const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.status === 200) {
        window.alert('Successfully signed in');
        navigate('/');
        // Redirect the user or perform other actions as needed
      } else if (response.status === 401) {
        window.alert('Incorrect password');
      } else if (response.status === 404) {
        window.alert('User not found');
      } else {
        window.alert('Signin failed');
      }
    } catch (error) {
      console.error('Error during signin:', error);
      window.alert('An error occurred');
    }
  };

  return (
    <div className='body-container'>
    <div className='signup-container'>
     
      <form onSubmit={handleSubmit} className='form-box'>
      <h2>Login</h2>
        <div className='input-box'>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className='input-box'>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <Link className="forget-pass" to="/forgot-pass">
        Forgot your password?.
      </Link>
        <div className='btn'>
        <button type="submit">click to login</button>
        </div>
      </form>
    </div>
    </div>
  );
};

export default Login;
