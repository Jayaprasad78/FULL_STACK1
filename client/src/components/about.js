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
    <div className='body-container'>
    <div className='about-container'>

      <div className='about-header'>
      <h1>About Page</h1>
      </div>
      
    
    <div className='about-img'>
      <img className='about-image' src={img} alt="image" />
      <p>We're here to assist you.We believe that authentication should be hassle-free.Our user interface is designed with simplicity in mind, ensuring that even first-time users can navigate our platform with ease.Our support team is ready to answer your questions and resolve any issues you may encounter.</p>
     
    </div>
      

        <div className='about-section'>
       <h1>Jayaprasad B</h1>

        <p>Number:<span>&nbsp;+91&nbsp;9632119392</span></p>
       
        
        <p>Email:<span>&nbsp;jayaprasadb718@gmail.com</span></p>
         
       
        <p>work:<span>&nbsp;&nbsp;Software Engineer</span></p>
        

        
     </div>
        </div>
     
    </div>
  );
}

export default About;
//A