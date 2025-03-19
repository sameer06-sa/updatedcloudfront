import React from "react";
import { useNavigate } from "react-router-dom";
 import "./SecurityServiceWelcome.css"; // Ensure you create this CSS file for styling
import Sidebar from "../../../Components/Sidebar/Sidebar";
import Header from "../../../Components/Header/Header";
 
const SecurityServiceWelcome = () => {
  const navigate = useNavigate();
 
  const handleBackClick = () => {
    navigate(-1); // Navigate back to the previous page
  };
 
  return (
    <div className="security-app">
      <Header />
      <div className="security-main-layout">
        <Sidebar />
        <div className="security-main-content">
          <h1>Welcome to Security Services</h1>
          <p>Enhance and safeguard your system with our security solutions.</p>
          <button className="security-back-button" onClick={handleBackClick}>Go Back</button>
        </div>
      </div>
    </div>
  );
};
 
export default SecurityServiceWelcome;