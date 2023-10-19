import React, { useState } from 'react';
import axios from 'axios';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [emailSent, setEmailSent] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSendResetEmail = async () => {
    try {
      const response = await axios.post('/send-reset-email', { email });

      if (response.status === 200) {
        setEmailSent(true);
        console.log('Reset email sent successfully');
      } else {
        console.error('Failed to send reset email');
      }
    } catch (error) {
      console.error('Error sending reset email:', error);
    }
  };

  return (
    <div>
      <h2>Forgot Password</h2>
      <div>
        <label>Email:</label>
        <input type="email" value={email} onChange={handleEmailChange} required />
      </div>
      {!emailSent ? (
        <button type="button" onClick={handleSendResetEmail}>
          Send Reset Password Email
        </button>
      ) : (
        <p>Reset email sent! Check your inbox.</p>
      )}
    </div>
  );
}

export default ForgotPassword;
