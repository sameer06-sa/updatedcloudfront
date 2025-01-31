import React, { useState } from "react";
import "./Datastore.css";
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
import { useNavigate } from "react-router-dom";

const Datastore = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const [services, setServices] = useState([
    { id: 1, name: "Sample Service", created: "20-12-2024", location: "India", status: "Available", details: "This is a sample" },
    { id: 2, name: "Test Service", created: "15-11-2024", location: "USA", status: "Unavailable", details: "This is a test service" },
  ]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredServices = services.filter((service) =>
    service.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const handleMenuClick = () => {
    navigate("/Datacloudsample");
    
  };

  return (
    <div className="app-container">
      {/* Header */}
      <div>{<Header />}</div>
      <div>{<Sidebar/>}</div>
      <header>
        <h1 className="data-store-header">Store</h1>
      </header>


      {/* Filter and Search Bar */}
      <div className="data-overview-search-bar11">
  <input
    type="text"
    placeholder="Filter"
    className="data-overview-search-input11"
  />
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="data-overview-search-icon11"
  >
    <path
      d="M5.64269 8.3795C3.77744 6.9845 2.44694 5.45 1.72019 4.5875C1.49519 4.3205 1.42169 4.12475 1.37744 3.7805C1.22594 2.6015 1.15019 2.012 1.49594 1.631C1.84169 1.25 2.45294 1.25 3.67544 1.25H12.3244C13.5469 1.25 14.1582 1.25 14.5039 1.63025C14.8497 2.01125 14.7739 2.60075 14.6224 3.77975C14.5774 4.124 14.5039 4.31975 14.2797 4.58675C13.5522 5.45075 12.2194 6.98825 10.3497 8.3855C10.2632 8.45278 10.1918 8.53735 10.1398 8.63382C10.0879 8.73029 10.0567 8.83653 10.0482 8.94575C9.86294 10.994 9.69194 12.116 9.58544 12.683C9.41369 13.5995 8.11544 14.1508 7.41944 14.642C7.00544 14.9345 6.50294 14.5865 6.44969 14.1335C6.25055 12.4074 6.08202 10.6779 5.94419 8.94575C5.93649 8.83549 5.90566 8.72809 5.85372 8.63053C5.80177 8.53297 5.72987 8.44744 5.64269 8.3795Z"
      stroke="#838383"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
</div>

      {/* Filter and Search Bar */}
      <div className="filter-bar">
        <div className="filter-input-container">
          <span className="filter-icon"></span>
          <input
            type="text"
            placeholder="Search Services"
            value={searchTerm}
            onChange={handleSearchChange}
            className="filter-input"
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="data-store-actions">
        <button className="data-store-create-button" onClick={handleMenuClick}>+ Create</button>
        <button className="data-store-refresh-button">⟳ Refresh</button>
      </div>

      {/* Table */}
      <table className="store-table">
        <thead>
          <tr>
            <th>
              <input type="checkbox" aria-label="Select all services" />
            </th>
            <th>Name</th>
            <th>Created</th>
            <th>Location</th>
            <th>Status</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {filteredServices.length > 0 ? (
            filteredServices.map((service) => (
              <tr key={service.id}>
                <td>
                  <input type="checkbox" aria-label={`Select ${service.name}`} />
                </td>
                <td>{service.name}</td>
                <td>{service.created}</td>
                <td>{service.location}</td>
                <td>{service.status}</td>
                <td>{service.details}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="no-results">
                No services found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Datastore;
