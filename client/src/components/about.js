import React, { useEffect, useState } from 'react';
import axios from 'axios';
import img from '../assets/images/test-img.jpg'
function About() {
  const [userData, setUserData] = useState({});

  useEffect(() => {
    // Function to fetch user's data
    const fetchUserData = async () => {
      try {
        const response = await axios.post('/about'); // Replace with your actual backend route
        console.log(response);
        if (response.status === 200) {
          const { work, phone,name,email,image } = response.data;
         
          setUserData({ work, phone,name,email,image });
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

    <div className='about-container'>

      <div className='about-header'>
      <h1>About Page</h1>
      </div>
      
    
    <div className='about-div'>
      <img className='about-image' src={img} alt="image" />
     
    </div>
      

        <div className='about-name'>
       <p>Jayaprasad B</p>
        </div>
        

       
      
     
        <div className='about-phonenumber'>
        <h2>Number:</h2>
       <p>&nbsp;+91&nbsp;9632119392</p>
        </div>

        
        <div className='about-email'>
        <h2>email:</h2>
          <p>&nbsp;jayaprasadb718@gmail.com</p>
       
        </div>
       
        <div className='about-work'>
        <h2>work:</h2>
         <p>&nbsp;&nbsp;software engineer</p>
       
        </div>

        


     
    </div>
  );
}

export default About;
//A