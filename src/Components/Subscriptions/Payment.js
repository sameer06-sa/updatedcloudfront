import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';
import './Payment.css';
import axios from 'axios';

const Payment = () => {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({
    fullName: '',
    email: '',
    mobile: '',
  });
  const [cardNumber, setCardNumber] = useState('');
  const [cardError, setCardError] = useState('');
  const [timeoutId, setTimeoutId] = useState(null);

  useEffect(() => {
    const userEmail = localStorage.getItem('userData')
      ? JSON.parse(localStorage.getItem('userData')).email
      : null;

    if (!userEmail) {
      alert('User session expired. Please log in again.');
      navigate('/signin');
      return;
    }

    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/user/${userEmail}`);
        setUserDetails(response.data.data);
      } catch (error) {
        console.error('Error fetching user details:', error);
        alert('Failed to fetch user details. Please try again later.');
        navigate('/signin');
      }
    };

    fetchUserDetails();
  }, [navigate]);

  const validateCardNumber = (number) => {
    let sum = 0;
    let shouldDouble = false;

    for (let i = number.length - 1; i >= 0; i--) {
      let digit = parseInt(number.charAt(i), 10);
      if (shouldDouble) {
        digit *= 2;
        if (digit > 9) digit -= 9;
      }
      sum += digit;
      shouldDouble = !shouldDouble;
    }

    return sum % 10 === 0;
  };

  const handlePayment = async (e) => {
    e.preventDefault();

    if (!validateCardNumber(cardNumber)) {
      setCardError('Please enter a valid card number');
      return;
    }
    setCardError('');

    const paymentData = {
      name: userDetails.fullName,
      mobileNumber: userDetails.mobile,
      amount: 5,
    };

    try {
      const response = await axios.post('http://localhost:3000/api/payment/create-order', paymentData);
      if (response.data && response.data.url) {
        window.location.href = response.data.url;

        const timer = setTimeout(() => {
          alert('Payment failed. Redirecting to payment failure page.');
          navigate('/payment-failure');
        }, 60000);
        setTimeoutId(timer);
      } else {
        throw new Error('Payment URL not returned');
      }
    } catch (error) {
      console.error('Error initiating payment:', error.message);
      alert('Error initiating payment. Please try again.');
    }
  };

  useEffect(() => {
    const handlePaymentSuccess = async () => {
      try {
        const subscriptionData = {
          userId: userDetails._id,
          subscriptionType: 'FreeTrial',
          durationInDays: 30,
        };

        const response = await axios.post('http://localhost:3000/api/user/subscription', subscriptionData);
        if (response.data.success) {
          alert('Payment successful. Redirecting to Free Trial page.');
          navigate('/free-trial');
        } else {
          throw new Error('Subscription update failed.');
        }
      } catch (error) {
        console.error('Error updating subscription:', error);
        alert('Error processing subscription. Please contact support.');
      }
    };

    if (timeoutId) {
      clearTimeout(timeoutId);
      handlePaymentSuccess();
    }
  }, [timeoutId, navigate, userDetails]);

  const handleBack = () => {
    navigate('/subscriptions');
  };

  return (
    <div className="App">
      <Header />
      <div className="payment-details-container">
        <Sidebar />
        <div className="content">
          <div className="form-container">
            <h1 className="form-title">Start Free Trial</h1>
            <form className="form" onSubmit={handlePayment}>
              <div className="form-group">
                <label htmlFor="fullName">Full Name:</label>
                <input type="text" id="fullName" name="fullName" value={userDetails.fullName} readOnly />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email ID:</label>
                <input type="email" id="email" name="email" value={userDetails.email} readOnly />
              </div>
              <div className="form-group">
                <label htmlFor="mobile">Phone Number:</label>
                <input type="text" id="mobile" name="mobile" value={userDetails.mobile} readOnly />
              </div>
              <div className="form-group">
                <label htmlFor="address">Address:</label>
                <input type="text" id="address" name="address" />
              </div>
              <div className="form-group">
                <label htmlFor="area">Area:</label>
                <input type="text" id="area" name="area" />
              </div>
              <div className="form-group">
                <label htmlFor="townCity">Town/City:</label>
                <input type="text" id="townCity" name="townCity" />
              </div>
              <div className="form-group">
                <label htmlFor="state">State:</label>
                <input type="text" id="state" name="state" />
              </div>
              <div className="form-group">
                <label htmlFor="pincode">Pincode:</label>
                <input type="text" id="pincode" name="pincode" />
              </div>
              {cardError && <div className="error-message">{cardError}</div>}
              <div className="form-buttons">
                <button type="button" className="back" onClick={handleBack}>
                  Back
                </button>
                <button type="submit" className="next">
                  Next
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
