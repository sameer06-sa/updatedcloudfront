import React, { useState } from "react";
import "./Datacloudoverview.css"; // Import the CSS file
import Header from "../Header/Header";
// import { Sidebar } from "lucide-react";
import Sidebar from "../Sidebar/Sidebar";
import { useNavigate } from "react-router-dom";

const Datacloudoverview = () => {
    const [selectedMenu, setSelectedMenu] = useState("Overview");
    const navigate = useNavigate();

  // Sample data for each menu section
  const menuData = {
    Overview: {
      title: "Overview",
      content: [
        { label: "Project Name", value: "Sample Project" },
        { label: "Location", value: "US East" },
        { label: "Subscription", value: "Premium Plan" },
        { label: "Created", value: "2023-01-01" },
        { label: "Last Modified", value: "2023-12-27" },
      ],
    },
    Store: {
      title: "Store",
      content: [
        { label: "Products", value: "20 Available" },
        { label: "Storage Used", value: "50GB" },
        { label: "Plans", value: "Standard & Premium" },
      ],
    },
    Dashboard: {
      title: "Dashboard",
      content: [
        { label: "Active Users", value: "250" },
        { label: "New Signups", value: "30 Today" },
        { label: "Total Revenue", value: "$5,000" },
      ],
    },
    Security: {
      title: "Security",
      content: [
        { label: "Encryption", value: "AES-256" },
        { label: "Authentication", value: "Multi-Factor Enabled" },
        { label: "Firewalls", value: "Active" },
      ],
    },
    Settings: {
      title: "Settings",
      content: [
        { label: "Theme", value: "Dark Mode" },
        { label: "Notifications", value: "Enabled" },
        { label: "Account Status", value: "Active" },
      ],
    },
    Docs: {
      title: "Docs",
      content: [
        { label: "Documentation", value: "Available Online" },
        { label: "Version", value: "v1.2.3" },
        { label: "Last Update", value: "2023-12-15" },
      ],
    },
  };

  const handleMenuClick = (menu) => {
    if (menu === "Store") {
      navigate("/Datastore");
    } else {
      setSelectedMenu(menu);
    }
  };

  return (
    <div className="Data-overview-app-container">
      <div>{<Header />}</div>
      <div>{<Sidebar/>}</div>
    
      <aside className="Data-overview-sidebar">
        <div className="Data-overview-sidebar-header">
          <h1>Data Store</h1>
          <p>Data cloud store</p>
        </div>
        {/* Filter Search Bar */}
        <div className="data-overview-search-bar">
  <input
    type="text"
    placeholder="Filter"
    className="data-overview-search-input"
  />
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="data-overview-search-icon"
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
        {/* Navigation Links */}
        <nav className="Data-overview-nav-links">
          <ul>
            {Object.keys(menuData).map((menu) => (
              <li
                key={menu}
                className={selectedMenu === menu ? "active" : ""}
                onClick={() => handleMenuClick(menu)}
              >
                {menu}
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="Data-overview-main-content">
        <h2>{menuData[selectedMenu].title}</h2>

        <div className="Data-overview-details-list">
          {menuData[selectedMenu].content.map((item, index) => (
            <div className="Data-overview-details-item" key={index}>
              <span className="Data-overview-details-label">{item.label}:</span>
              <span>{item.value}</span>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Datacloudoverview;
