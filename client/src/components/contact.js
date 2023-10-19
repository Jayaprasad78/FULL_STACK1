import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Contact = () => {
  const [userData, setUserData] = useState({});
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Function to fetch user's data
    const fetchUserData = async () => {
      try {
        const response = await axios.post('/contact'); // Use GET to retrieve user data

        if (response.status === 200) {
          const { name, email, phone } = response.data;
          setUserData({ name, email, phone });
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send a POST request to your backend server with the message data
      const response = await axios.post('/send-email', {
        name: userData.name,
        email: userData.email,
        phone: userData.phone,
        message: message,
      });

      if (response.status === 200) {
        console.log('Message sent successfully');
        window.alert('Message sent successfully');
        setMessage('');
        // Optionally, you can reset the form fields here
      } else {
        console.error('Failed to send message');
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div>
      <h1>Contact Us</h1>
      <p>Phone: 9632119392</p>
      <p>Email: <a href="mailto:jayaprasadb718@gmail.com">jayaprasadb718@gmail.com</a></p>
      <p>Address: Alike</p>

      <h2>Contact Form</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" defaultValue={userData.name} required /><br /><br />

        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" defaultValue={userData.email} required /><br /><br />

        <label htmlFor="phone">Phone Number:</label>
        <input type="tel" id="phone" name="phone" defaultValue={userData.phone} required /><br /><br />

        <label htmlFor="message">Message:</label><br />
        <textarea
          id="message"
          name="message"
          rows="4"
          cols="50"
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        /><br /><br />

        <input type="submit" value="Send Message" />
      </form>
    </div>
  );
};

export default Contact;
