import React from "react";
import { useNavigate } from "react-router-dom";
import "./ComputeServiceWelcome.css"; // Ensure you create this CSS file for styling
import Sidebar from "../../../Components/Sidebar/Sidebar";
import Header from "../../../Components/Header/Header";
 
const ComputeServiceWelcome = () => {
  const navigate = useNavigate();
 
  const handleBackClick = () => {
    navigate(-1); // Navigate back to the previous page
  };
 
  return (
    <div className="compute-app">
      <Header />
      <div className="compute-main-layout">
        <Sidebar />
        <div className="compute-main-content">
          <h1>Welcome to Compute Services</h1>
          <p>Manage and optimize your compute resources efficiently from this panel.</p>
          <button className="compute-back-button" onClick={handleBackClick}>Go Back</button>
        </div>
      </div>
    </div>
  );
};
 
export default ComputeServiceWelcome;