import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import emailjs from 'emailjs-com';
import './VerifyIdentity.css';

function VerifyIdentity() {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || 'No email provided';
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [error, setError] = useState('');

  const sendOtp = async () => {
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setError('Invalid email address.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const otp = Math.floor(100000 + Math.random() * 900000); // Generate 6-digit OTP

      // EmailJS configuration
      const serviceID = 'service_hf8jgsu';
      const templateID = 'template_qq2xn7u';
      const userID = '1ExTfjeSdW4N0Uyag';

      const templateParams = {
        otp, // The generated OTP
        email, // User's email
      };

      // Use EmailJS to send the email
      await emailjs.send(serviceID, templateID, templateParams, userID);

      setOtpSent(true);
      // alert(`OTP sent to ${email}!`);

      // Store OTP in localStorage (for demonstration; ideally use secure backend validation)
      localStorage.setItem('otp', otp);

      // Navigate to OTP verification page
      navigate('/verify-code', { state: { email } });
    } catch (err) {
      console.error('Error sending email:', err);
      setError('Failed to send OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h2>Application Name</h2>
        <div className="card-outer">
          <div className="content">
            <p className="app-name">Application Name</p>
            <p className="email">{email}</p>
            <h3>Verify your identity</h3>
            <div
              className="verification-option"
              onClick={sendOtp}
              style={{ cursor: loading ? 'not-allowed' : 'pointer' }}
            >
              <span className="email-icon">📧</span>
              <span className="emailD">
                {loading ? 'Sending OTP...' : (
                  <>
                    <strong>Email:</strong> {email}
                  </>
                )}
              </span>
            </div>
            {otpSent && <p className="success-message">OTP sent to your email address.</p>}
            {error && <p className="error-message">{error}</p>}
            {/* <div className="options">
              <a href="#" className="link">
                I have a code
              </a>
              <a href="#" className="link">
                I don't have any of these
              </a>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default VerifyIdentity;
