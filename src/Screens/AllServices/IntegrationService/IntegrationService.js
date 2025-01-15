import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./IntegrationService.css"; // Ensure path is correct
import Sidebar from "../../../Components/Sidebar/Sidebar";
import UsersSidebar from "../../../Settings/UsersSidebar"; // Ensure this file exists
import Header from "../../../Components/Header/Header";

const IntegrationServicesPage = () => {
  const [activeService, setActiveService] = useState("Integration Services");
  const navigate = useNavigate(); // React Router hook for navigation

  // Handle service click and navigation
  const handleServiceClick = (serviceName, route) => {
    setActiveService(serviceName); // Set active service
    navigate(route); // Navigate to the specified route
  };

  // Navigate to Hub Ingest creation
  const handleCreateClick = () => {
    navigate("/hub-ingest");
  };

  const services = [
    { name: "Integration Services", icon: "🔗", route: "/integration" },
    { name: "Management Services", icon: "⚙️", route: "/management" },
    { name: "Database Services", icon: "💾", route: "/database" },
    { name: "Network Services", icon: "🌐", route: "/network" },
    { name: "Compute Services", icon: "🖥️", route: "/compute" },
    { name: "Security Services", icon: "🔒", route: "/security" },
  ];

  return (
    <div className="app">
      {/* Top Bar */}
      <Header />

      {/* Main Layout */}
      <div className="main-layout">
        {/* Primary Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <div className="main-content">
          {/* Content Header */}
          <div className="content-header">
            <h1>
              All Services <span>| {activeService}</span>
            </h1>
            <input
              type="text"
              className="search-input"
              placeholder="Search Services..."
            />
          </div>
          <div className="services-list-container">
          {/* Service List */}
          <ul className="services-list">
            {services.map((service, index) => (
              <li
                key={index}
                className={`service-item ${
                  activeService === service.name ? "active" : ""
                }`}
                onClick={() => handleServiceClick(service.name, service.route)}
              >
                <span className="icon">{service.icon}</span>
                <span className="text">{service.name}</span>
              </li>
            ))}
          </ul>

          {/* Action Buttons */}
          <main className="content">
            <div className="actions">
              <button className="actions-button" onClick={handleCreateClick}>
                Hub Ingest
              </button>
              <button className="actions-button">Service Bus</button>
              <button className="actions-button">Logic Apps</button>
              <button className="actions-button">Properties</button>
              <button className="actions-button">Data Access</button>
            </div>
          </main>
        </div>
        </div>
      </div>
    </div>
  );
};

export default IntegrationServicesPage;
