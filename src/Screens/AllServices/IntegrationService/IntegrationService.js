import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./IntegrationService.css"; // Ensure path is correct
import Sidebar from "../../../Components/Sidebar/Sidebar";
import Header from "../../../Components/Header/Header";
import {
  HubRounded,
  Settings,
  Storage,
  Lan,
  Dns,
  Security,
} from "@mui/icons-material";
 
const IntegrationService = () => {
  const [activeService, setActiveService] = useState("Integration Services");
  const [serviceData, setServiceData] = useState([
    "Hub Ingest",
    "Service",
    "Integration Data 3",
    "Integration Data 4",
    "Integration Data 5",
  ]); // Default service data for "Integration Services"
 
  const navigate = useNavigate();
 
  const serviceDetails = {
    "Integration Services": [
      "Hub Ingest",
      "Service",
      "Integration Data 3",
      "Integration Data 4",
      "Integration Data 5",
    ],
    "Management Services": [
      "Management Data 1",
      "Management Data 2",
      "Management Data 3",
      "Management Data 4",
      "Management Data 5",
    ],
    "Database Services": [
      "Database Data 1",
      "Database Data 2",
      "Database Data 3",
      "Database Data 4",
      "Database Data 5",
    ],
    "Network Services": [
      "Network Data 1",
      "Network Data 2",
      "Network Data 3",
      "Network Data 4",
      "Network Data 5",
    ],
    "Compute Services": [
      "Compute Data 1",
      "Compute Data 2",
      "Compute Data 3",
      "Compute Data 4",
      "Compute Data 5",
    ],
    "Security Services": [
      "Security Data 1",
      "Security Data 2",
      "Security Data 3",
      "Security Data 4",
      "Security Data 5",
    ],
  };
 
  const handleServiceClick = (serviceName) => {
    setActiveService(serviceName);
    setServiceData(serviceDetails[serviceName] || []);
  };
 
  const handleHubIngestClick = () => {
    navigate("/hub-ingest");
  };
 
  const services = [
    { name: "Integration Services", icon: <HubRounded sx={{ color: "#8000FF" }} /> },
    { name: "Management Services", icon: <Settings sx={{ color: "#F97000" }} /> },
    { name: "Database Services", icon: <Storage sx={{ color: "#35FF45" }} /> },
    { name: "Network Services", icon: <Lan sx={{ color: "#5500FF" }} /> },
    { name: "Compute Services", icon: <Dns sx={{ color: "#3946FF" }} /> },
    { name: "Security Services", icon: <Security sx={{ color: "D80101" }} /> },
  ];
 
  return (
    <div className="app">
      <Header />
      <div className="int-main-layout">
        <Sidebar />
        <div className="int-main-content">
          <div className="int-content-header">
            <h1>
              All Services <span>| {activeService}</span>
            </h1>
            <input
              type="text"
              className="int-search-input"
              placeholder="Search Services..."
            />
          </div>
          <div className="services-list-container">
            <ul className="int-services-list">
              {services.map((service, index) => (
                <li
                  key={index}
                  className={`int-service-item ${
                    activeService === service.name ? "active" : ""
                  }`}
                  onClick={() => handleServiceClick(service.name)}
                >
                  <span className="icon">{service.icon}</span>
                  <span className="text">{service.name}</span>
                </li>
              ))}
            </ul>
            <main className="int-content">
              <div className="int-actions">
                {serviceData.map((data, index) => (
                  <button
                    onClick={handleHubIngestClick}
                    key={index}
                    className={`actions-button box${index + 1}`}
                  >
                    {data}
                  </button>
                ))}
              </div>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
};
 
export default IntegrationService;