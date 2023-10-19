import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Home() {
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.post('/');
        console.log(response); // Log the entire response
        
        if (response.status === 200) {
          const { name } = response.data;
          console.log(name);
          setUserData({ name });
        } else {
          console.error('Failed to fetch user data');
        }
      } catch (error) {
        console.error('Error fetching user data:', error.message);
      }
    };
    
    fetchUserData();
  }, []);
  

  return (
    
      <div className='Home'>
        <h2 className='home-content'>WELCOME <span className='user-name'> {userData.name} </span> </h2>
        
      </div>
  );
}
export default Home;