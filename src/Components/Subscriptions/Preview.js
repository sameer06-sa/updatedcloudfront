import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import emailjs from "emailjs-com";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Preview.css";
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";

const apiUrl = process.env.REACT_APP_API_URL;

const Preview = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const formData = location.state;
  const token = localStorage.getItem("token");

  const [otp, setOtp] = useState("");
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Generate a random 6-digit OTP
  const generateOtp = () => Math.floor(100000 + Math.random() * 900000).toString();

  const handleSendOtp = async () => {
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      setError("Invalid email address.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const otpCode = generateOtp();

      // EmailJS configuration
      const serviceID = "service_13vkt98";
      const templateID = "template_mu5i71v";
      const userID = "etqX8Hii9egT7UVNW";

      const templateParams = {
        otp: otpCode,
        email: formData.email,
      };

      // Use EmailJS to send the email
      await emailjs.send(serviceID, templateID, templateParams, userID);

      setIsOtpSent(true);
      toast.success("OTP sent to your email!");
      // Store OTP in localStorage
      localStorage.setItem("sub_otp", otpCode);

    } catch (err) {
      console.error("Error sending email:", err);
      setError("Failed to send OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = () => {
    const storedOtp = localStorage.getItem("sub_otp");

    if (otp === storedOtp) {
      toast.success("OTP verified successfully!");
      setIsOtpVerified(true);
      localStorage.removeItem("sub_otp"); // Remove after verification
    } else {
      toast.error("Invalid OTP. Please try again.");
    }
  };

  const handleConfirmSubscription = async () => {
    if (!isOtpVerified) {
      toast.warning("Please verify the OTP before confirming your subscription.");
      return;
    }

    try {
      const response = await axios.put(
        `${apiUrl}/api/user/subscription`,
        {
          subscriptionType: formData.subscriptionType,
          durationInDays: formData.durationInDays,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        toast.success("Subscription updated successfully!");
        navigate("/freetrail");
      } else {
        toast.error("Failed to update subscription: " + response.data.message);
      }
    } catch (error) {
      toast.error("An error occurred while updating your subscription. Please try again.");
    }
  };

  return (
    <div>
      <Header />
      <div>
        <Sidebar />
        <div className="preview-container1">
          <h2>Preview Subscription Details</h2>
          <div className="preview-details">
            <p><strong>Email:</strong> {formData.email}</p>
            <p><strong>Subscription Type:</strong> {formData.subscriptionType}</p>
            <p><strong>Duration:</strong> {formData.durationInDays} days</p>
            <p><strong>Card Holder Name:</strong> {formData.cardHolderName}</p>
            <p><strong>Card Number:</strong> {formData.cardNumber}</p>
            <p><strong>Expiry Date:</strong> {formData.expire}</p>
          </div>
          <div className="otp-section">
            {!isOtpSent && (
              <button
                className="send-otp-button"
                onClick={handleSendOtp}
                disabled={loading}
              >
                {loading ? "Sending OTP..." : "Send OTP"}
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
            {error && <p className="error-message">{error}</p>}
          </div>
          <div className="preview-buttons">
            <button className="back-button" onClick={() => navigate(-1)}>
              Back
            </button>
            <button
              className="confirm-button"
              onClick={handleConfirmSubscription}
              disabled={!isOtpVerified}
            >
              Confirm Subscription
            </button>
          </div>

          <ToastContainer />
        </div>
      </div>
    </div>
  );
};

export default Preview;