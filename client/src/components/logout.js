import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleLogout = async () => {
      try {
        // Send a GET request to your backend logout route
        const response = await fetch('/logout', {
          method: 'GET',
          credentials: 'include', // Include cookies in the request
        });

        if (response.status === 200) {
         
          window.alert('Logged out successfully');
          navigate('/login'); // Redirect to the login page after logout
        } else {
          console.error('Logout failed');
          window.alert('Logout failed');
          // Handle logout failure (e.g., display an error message)
        }
      } catch (error) {
        console.error('Error during logout:', error);
        // Handle any network or other errors that may occur during logout
      }
    };

    handleLogout(); // Call the logout function when the component mounts
  }, [navigate]);

  return (
    <div>
      <h2>Logging Out...</h2>
      {/* You can optionally display a loading message or spinner here */}
    </div>
  );
};

export default Logout;
