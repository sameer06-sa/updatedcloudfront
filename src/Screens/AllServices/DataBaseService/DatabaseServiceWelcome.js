import React from "react";
import { useNavigate } from "react-router-dom";
import "./DatabaseServiceWelcome.css"; // Ensure you create this CSS file for styling
import Sidebar from "../../../Components/Sidebar/Sidebar";
import Header from "../../../Components/Header/Header";
 
const DatabaseServiceWelcome = () => {
  const navigate = useNavigate();
 
  const handleBackClick = () => {
    navigate(-1); // Navigate back to the previous page
  };
 
  return (
    <div className="databaseservice-app">
      <Header />
      <div className="databaseservice-main-layout">
        <Sidebar />
        <div className="databaseservice-main-content">
          <h1>Welcome to Database Services</h1>
          <p>Manage and optimize your database resources efficiently from this panel.</p>
          <button className="databaseservice-back-button" onClick={handleBackClick}>Go Back</button>
        </div>
      </div>
    </div>
  );
};
 
export default DatabaseServiceWelcome;
 