import React, { useEffect, useState } from 'react';
import axios from 'axios';

function About() {
  const [userData, setUserData] = useState({});

  useEffect(() => {
    // Function to fetch user's data
    const fetchUserData = async () => {
      try {
        const response = await axios.post('/about'); // Replace with your actual backend route
        console.log(response);
        if (response.status === 200) {
          const { work, phone,name,image } = response.data;
         
          setUserData({ work, phone,name,image });
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

  return (
    <div>
      <h1>About Page</h1>
      <div>
        <h2>User's Work</h2>
        <p>{userData.work}</p>

        <h2>User's Phone Number</h2>
        <p>{userData.phone}</p>

        <h2>User's  name</h2>
        <p>{userData.name}</p>

        <h2>User's Image</h2>
        {userData.image && (
          <img
            src={`data:${userData.image.contentType};base64,${userData.image.data}`}
            alt="User's Profile"
          />
        )}


      </div>
    </div>
  );
}

export default About;
