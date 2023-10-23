import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../assets/styles/contact.css';
const Contact=()=>{

    const [userData, setUserData] = useState({});

    useEffect(() => {
      // Function to fetch user's data
      const fetchUserData = async () => {
        try {
          const response = await axios.post('/contact'); // Replace with your actual backend route
  
          if (response.status === 200) {
            const { name,email,phone} = response.data;
            setUserData({ name,email,phone });
          } else {
            // Handle other response statuses (e.g., unauthorized)
            console.error('Failed to fetch user data');
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      };
  
      // Call the fetchUserData function to retrieve user data
      fetchUserData();
    }, []);



    return(
<div className='body-container'>
<h1>Contact with us</h1>
<h6>We'd love to respond to your queries and help you succeed. Feel free to get in touch with us.</h6>

<div className='container'>
    <div className='contact-container'>
    <h2>Reach Us</h2>
    <p>Phone: 9632119392</p>
    <p>Email: <a href="mailto:jayaprasadb718@gmail.com">jayaprasadb718@gmail.com</a></p>
    <p>Address: Alike</p>
</div>
<div className='form-container'>
    <h2>Get in touch with us</h2>
    <form className='formbox'>
        <label for="name">Name:</label>
        <input type="text" id="name" name="name"  defaultValue={userData.name} required/>

        <label for="email">Email:</label>
        <input type="email" id="email" name="email"  defaultValue={userData.email} required/>

        <label for="phone">Phone Number:</label>
        <input type="tel" id="phone" name="phone"  defaultValue={userData.phone}  required/>

        <label for="message">Message:</label>
        <textarea id="message" name="message" rows="4" cols="50" required/>
        <div className='butn'>
        <input type="submit" value="Send Message"/>
        </div>

   </form>
   </div>
  </div>
  </div>
    )
}

export default Contact;