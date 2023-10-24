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
      
    
    <div className='about-img'>
      {/* <img className='image' src={img} alt="image" />*/}
      {userData.image && (
          <img
            src={`data:${userData.image.contentType};base64,${userData.image.data}`}
            alt="User's Profile"
          />
        )}
    </div>
      

        <div className='about-name'>
        {/* <p>Jayaprasad B</p>*/}
       <p>{userData.name}</p>
        </div>
        

       
      
     
        <div className='about-phonenumber'>
        <h2>Number:</h2>
       {/* <p>&nbsp;+91&nbsp;9632119392</p>*/}
         <p>{userData.phone}</p>
        </div>

        
        <div className='about-email'>
        <h2>email:</h2>
       {/*   <p>&nbsp;jayaprasadb718@gmail.com</p>*/}
       <p>{userData.email}</p>
        </div>
       
        <div className='about-work'>
        <h2>work:</h2>
        {/*  <p>&nbsp;&nbsp;software engineer</p>*/}
       <p>{userData.work}</p>
        </div>

        <div className='space'>
           <h2>&nbsp;</h2>

        </div>


     
    </div>
  );
}

export default About;
//A