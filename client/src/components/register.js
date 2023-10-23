import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/styles/register.css';

const Signin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    work: '',
    password: '',
    cpassword: '',
    image: null, // Add image field to the form data
  });

  const handleChange = (e) => {
    if (e.target.name === 'image') {
      // Handle image file separately
      setFormData({ ...formData, image: e.target.files[0] });
    } else {
      // Handle other form fields
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData(); // Create a FormData object

    // Append form fields to the FormData object
    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }

    // Send the signup data to your backend API
    try {
      const response = await fetch('/signup', {
        method: 'POST',
        body: formDataToSend, // Use the FormData object as the body
      });

      if (response.status === 201) {
        console.log('Successfully Registered');
        window.alert('Successfully Registered');
        navigate('/login');
        // Redirect the user to the dashboard or another protected route
      } else {
        console.error('Signin failed');
        window.alert('failed');
        // Display an error message to the user
      }
    } catch (error) {
      console.error('Error during signin:', error);
    }
  };

  return (
    <div className='body-container'>
   
       
    <div className='signup-container'> 
   
      <form onSubmit={handleSubmit} encType="multipart/form-data" className='form-box'>
      <h2>Signup</h2>
        <div className='input-box'>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
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
          <label htmlFor="phone">Phone</label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>
        <div className='input-box'>
          <label htmlFor="work">Work</label>
          <input
            type="text"
            id="work"
            name="work"
            value={formData.work}
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
        <div className='input-box'>
          <label htmlFor="cpassword">Confirm Password</label>
          <input
            type="password"
            id="cpassword"
            name="cpassword"
            value={formData.cpassword}
            onChange={handleChange}
            required
          />
        </div>
        <div className='input-box'>
          <label htmlFor="image">Image</label>
          <div className='choose-image'>
          <input  
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleChange}
            required
          />
         </div>
        </div>
        <div className='btn'>
        <button type="submit">Register</button>
        </div>
      </form>
    </div>
    </div>
  );
};

export default Signin;
