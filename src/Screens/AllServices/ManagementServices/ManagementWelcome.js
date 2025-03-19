import React from "react";
import { useNavigate } from "react-router-dom";
import "./ManagementWelcome.css"; // Ensure you create this CSS file for styling
import Sidebar from "../../../Components/Sidebar/Sidebar";
import Header from "../../../Components/Header/Header";
 
const ManagementWelcome = () => {
  const navigate = useNavigate();
 
  const handleBackClick = () => {
    navigate(-1); // Navigate back to the previous page
  };
 
  return (
    <div className="Management-app">
      <Header />
      <div className="management-main-layout">
        <Sidebar />
        <div className="management-main-content">
          <h1>Welcome to Management Services</h1>
          <p>Manage and monitor all essential administrative services from this panel.</p>
          <button className="Management-back-button" onClick={handleBackClick}>Go Back</button>
        </div>
      </div>
    </div>
  );
};
 
export default ManagementWelcome;