import React, { useState } from 'react';
import { useNavigate} from 'react-router-dom';

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
       
        window.alert('Successfully Registered');
        navigate('/login');
        // Redirect the user to the dashboard or another protected route
      }
      else if(response.status === 400)
      {
        window.alert('fill all the feild ');
      }
      else if(response.status === 401)
      {
        window.alert('email already registered');
      }
      else if(response.status ===402)
      {
        window.alert('password is not matching');
      }
      else
       {
         window.alert('failed');
        // Display an error message to the user
      }
    } catch (error) {
      console.error('Error during signin:', error);
    }
  };

  return (
    <div>
      <h2>Signup</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div>
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
        <div>
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
        <div>
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
        <div>
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
        <div>
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
        <div>
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
        <div>
          <label htmlFor="image">Image</label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Register</button>
      
       
      </form>
    </div>
  );
};

export default Signin;
