import React, { useRef, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Check } from 'lucide-react';
import styles from './VerifyCode.css';

function VerifyCode({ addNotification }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [otpInput, setOtpInput] = useState(new Array(6).fill('')); // OTP state
  const [error, setError] = useState('');
  const [showToast, setShowToast] = useState(false);

  const email = location.state?.email || 'No email provided'; // Email from location state
  const generatedOtp = localStorage.getItem('otp'); // Retrieve OTP from localStorage

  // Use a single ref object to store all input refs
  const inputRefs = useRef([]);

  const handleInputChange = (e, index) => {
    const value = e.target.value;

    // Update OTP state
    const updatedOtp = [...otpInput];
    updatedOtp[index] = value;
    setOtpInput(updatedOtp);

    // Move to the next input if available
    if (value.length === 1 && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && index > 0 && !e.target.value) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleVerify = () => {
    const otpString = otpInput.join('');
    if (otpString.length !== 6) {
      setError('Please enter the 6-digit OTP.');
      return;
    }

    if (otpString === generatedOtp) {
      setShowToast(true); // Show the toast

      addNotification(`You have successfully logged into your account with ${email}.`); // Add notification

      setTimeout(() => {
        navigate('/home'); // Navigate after the toast is shown
      }, 2000); // Show toast for 2 seconds
      // alert('OTP verified successfully!');
      // navigate('/home');
    } else {
      setError('Invalid OTP. Please try again.');
    }
  };

  return (
    <div className="verifyCode-container">
      <div className="verification-container">
        <h2 className="app-main-name">Application Name</h2>
        <div className="verification-container-inner">
          <div className="header-section">
            <label className="password-label" id="application">
              Application Name
            </label>
            <div className="email-wrapper">
              <p className="email-section">{email}</p>
            </div>
          </div>
          <h3>Enter Code</h3>
          <p className="info-text">
            ✉️ We emailed a code to <span className='otp-mail'>{email}</span>. <br />
            Please enter the code to sign in.
          </p>
          <div className="otp-container">
            {otpInput.map((value, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                className="otp-box"
                value={value}
                ref={(el) => (inputRefs.current[index] = el)} // Store refs in the object
                onChange={(e) => handleInputChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
              />
            ))}
          </div>
          {error && <p className="error-message">{error}</p>}
          <div className="buttons">
            <button className="verify-code-btn btn-cancel" onClick={() => navigate('/verify-identity')}>
              Cancel
            </button>
            <button className="verify-code-btn btn-verify" onClick={handleVerify}>
              Verify
            </button>
          </div>
        </div>

        {showToast && (
          <div className={styles.toast}>
            <Check size={16} />
            Signed in successfully!
          </div>
        )}
      </div>
    </div>
  );
}

export default VerifyCode;
