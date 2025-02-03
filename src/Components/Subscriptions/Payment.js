import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';
import './Payment.css';
import axios from 'axios';
 
const apiUrl = process.env.REACT_APP_API_URL;
 
const Payment = () => {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({
    fullName: '',
    email: '',
    mobile: '',
  });
  const [formData, setFormData] = useState({
    address: '',
    area: '',
    townCity: '',
    state: '',
    pincode: '',
    cardNumber: '',
  });
  const [errors, setErrors] = useState({});
 
  useEffect(() => {
    const token = localStorage.getItem('token');
    const userEmail = localStorage.getItem('userData')
      ? JSON.parse(localStorage.getItem('userData')).email
      : null;
 
    if (!token || !userEmail) {
      alert('User session expired. Please log in again.');
      navigate('/signin');
      return;
    }
 
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/user/${userEmail}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserDetails(response.data.data);
      } catch (error) {
        console.error('Error fetching user details:', error);
        alert('Failed to fetch user details. Redirecting to login...');
        navigate('/signin');
      }
    };
 
    fetchUserDetails();
  }, [navigate]);
 
  const validateFields = () => {
    const newErrors = {};
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.area.trim()) newErrors.area = 'Area is required';
    if (!formData.townCity.trim()) newErrors.townCity = 'Town/City is required';
    if (!formData.state.trim()) newErrors.state = 'State is required';
    if (!formData.pincode.trim()) newErrors.pincode = 'Pincode is required';
    else if (!/^\d{6}$/.test(formData.pincode)) newErrors.pincode = 'Pincode must be a 6-digit number';
 
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
 
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
 
  const handleNext = (e) => {
    e.preventDefault();
    if (!validateFields()) return;
 
    // Save form data or pass it to the next page if needed
    localStorage.setItem('paymentFormData', JSON.stringify(formData));
 
    // Redirect to the PaymentDetails page
    navigate('/paymentdetails');
  };
 
  const handleBack = () => {
    navigate('/subscriptions');
  };
 
  return (
    <div className="App">
      <Header />
      <div className="payment-details-container">
        <Sidebar />
        <div className="content">
          <div className="payment-form-container">
            <h2 className='pay'>Payment Details</h2>
            <form onSubmit={handleNext}>
              <div className="form-group2">
                <label>Full Name</label>
                <input type="text" value={userDetails.fullName} readOnly />
              </div>
              <div className="form-group2">
                <label>Email ID</label>
                <input type="email" value={userDetails.email} readOnly />
              </div>
              <div className="form-group2">
                <label>Mobile Number</label>
                <input type="text" value={userDetails.mobile} readOnly />
              </div>
              <div className="form-group2">
                <label>Address</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="Enter your address"
                />
                {errors.address && <small className="error">{errors.address}</small>}
              </div>
              <div className="form-group2">
                <label>Area</label>
                <input
                  type="text"
                  name="area"
                  value={formData.area}
                  onChange={handleInputChange}
                  placeholder="Enter your area"
                />
                {errors.area && <small className="error">{errors.area}</small>}
              </div>
              <div className="form-group2">
                <label>Town/City</label>
                <input
                  type="text"
                  name="townCity"
                  value={formData.townCity}
                  onChange={handleInputChange}
                  placeholder="Enter your town/city"
                />
                {errors.townCity && <small className="error">{errors.townCity}</small>}
              </div>
              <div className="form-group2">
                <label>State</label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  placeholder="Enter your state"
                />
                {errors.state && <small className="error">{errors.state}</small>}
              </div>
              <div className="form-group2">
                <label>Pincode</label>
                <input
                  type="text"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleInputChange}
                  placeholder="Enter your pincode"
                />
                {errors.pincode && <small className="error">{errors.pincode}</small>}
              </div>
              <div className="button-group2">
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