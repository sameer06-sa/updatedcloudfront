import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import emailjs from "emailjs-com";
import { toast, ToastContainer } from "react-toastify"; // Import Toastify components
import "react-toastify/dist/ReactToastify.css"; // Import CSS for Toastify
import "./Preview.css";
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";

const apiUrl = process.env.REACT_APP_API_URL;

const Preview = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const formData = location.state; // Data passed from the previous page
  const token = localStorage.getItem("token");

  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState(null);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [isOtpSent, setIsOtpSent] = useState(false);

  // Generate a random 6-digit OTP
  const generateOtp = () => {
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
    console.log("Generated OTP:", otpCode); // Log OTP here
    return otpCode;
  };

  const handleSendOtp = async () => {
    const otpCode = generateOtp();
    setGeneratedOtp(otpCode);

    console.log("Generated OTP in handleSendOtp:", otpCode); // Log OTP here

    try {
      await emailjs.send(
        "service_uyq3r8o", // Replace with your EmailJS service ID
        "template_sh0hz4d", // Replace with your EmailJS template ID
        {
          user_email: formData.email,
          otp: otpCode,
        },
        "qx5KtVJMcBAQaIxDe" // Replace with your EmailJS user ID
      );

      toast.success("OTP sent to your email!"); // Show success toast
      setIsOtpSent(true);
    } catch (error) {
      console.error("Error sending OTP:", error);
      toast.error("Failed to send OTP. Please try again."); // Show error toast
    }
  };

  const handleVerifyOtp = () => {
    console.log("Entered OTP:", otp); // Log entered OTP
    console.log("Generated OTP:", generatedOtp); // Log generated OTP

    if (otp === generatedOtp) {
      toast.success("OTP verified successfully!"); // Show success toast
      setIsOtpVerified(true);
    } else {
      toast.error("Invalid OTP. Please try again."); // Show error toast
    }
  };

  const handleConfirmSubscription = async () => {
    if (!isOtpVerified) {
      toast.warning("Please verify the OTP before confirming your subscription."); // Show warning toast
      return;
    }

    try {
      // Make the API call to update the subscription
      const response = await axios.put(
        `http://localhost:3000/api/user/subscription`, // Update your API URL
        {
          subscriptionType: formData.subscriptionType,
          durationInDays: formData.durationInDays,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Pass the token for authentication
          },
        }
      );

      if (response.data.success) {
        toast.success("Subscription updated successfully!"); // Show success toast
        navigate("/freetrail");
      } else {
        toast.error("Failed to update subscription: " + response.data.message); // Show error toast
      }
    } catch (error) {
      console.error("Error updating subscription:", error.message);
      toast.error("An error occurred while updating your subscription. Please try again."); // Show error toast
    }
  };

  return (
    <div>
      <Header/>
      <div>
        <Sidebar/>
        <div className="preview-container1">
          <h2>Preview Subscription Details</h2>
          <div className="preview-details">
            <p>
              <strong>Email:</strong> {formData.email}
            </p>
            <p>
              <strong>Subscription Type:</strong> {formData.subscriptionType}
            </p>
            <p>
              <strong>Duration:</strong> {formData.durationInDays} days
            </p>
            <p>
              <strong>Card Holder Name:</strong> {formData.cardHolderName}
            </p>
            <p>
              <strong>Card Number:</strong> {formData.cardNumber}
            </p>
            <p>
              <strong>Expiry Date:</strong> {formData.expire}
            </p>
          </div>
          <div className="otp-section">
            {!isOtpSent && (
              <button className="send-otp-button" onClick={handleSendOtp}>
                Send OTP
              </button>
            )}
            {isOtpSent && !isOtpVerified && (
              <div>
                <input
                  type="text"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="otp-input"
                />
                <button className="verify-otp-button" onClick={handleVerifyOtp}>
                  Verify OTP
                </button>
              </div>
            )}
            {isOtpVerified && <p className="otp-verified">OTP Verified Successfully!</p>}
          </div>
          <div className="preview-buttons">
            <button className="back-button" onClick={() => navigate(-1)}>
              Back
            </button>
            <button
              className="confirm-button"
              onClick={handleConfirmSubscription}
              disabled={!isOtpVerified} // Disable the button if OTP is not verified
            >
              Confirm Subscription
            </button>
          </div>

          {/* ToastContainer is required to show the toast messages */}
          <ToastContainer />
        </div>
      </div>
    </div>
  );
};

export default Preview;