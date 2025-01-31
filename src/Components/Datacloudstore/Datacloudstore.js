import React, { useState } from "react";
import "./Datacloudstore.css";
import Header from "../../Components/Header/Header";
import Sidebar from "../../Components/Sidebar/Sidebar";

const Datacloudstore = () => {
  const [activeMenu, setActiveMenu] = useState("Detail"); // Track the selected menu

  const handleMenuClick = (menu) => {
    setActiveMenu(menu); // Set active menu item
  };

  return (
    <div className="datastorage-container">
        <Header />
        <Sidebar />
     
      <aside className="datastorage-sidebar">
        <h2 className="sidebar-title">Data Cloud Store</h2>
        <nav className="menu">
          <div
            className={`datastorage-menu-item ${activeMenu === "Detail" ? "active" : ""}`}
            onClick={() => handleMenuClick("Detail")}
          >
            <span>📄</span> Detail
          </div>
          <div
            className={`datastorage-menu-item ${activeMenu === "Dashboard" ? "active" : ""}`}
            onClick={() => handleMenuClick("Dashboard")}
          >
            <span>📊</span> Dashboard
          </div>
          <div
            className={`datastorage-menu-item ${activeMenu === "Store" ? "active" : ""}`}
            onClick={() => handleMenuClick("Store")}
          >
            <span>🛒</span> Store
          </div>
          <div
            className={`datastorage-menu-item ${activeMenu === "Settings" ? "active" : ""}`}
            onClick={() => handleMenuClick("Settings")}
          >
            <span>⚙️</span> Settings
          </div>
        </nav>
        <div className="sidebar-footer">
          <div
            className={`datastorage-menu-item ${activeMenu === "Docs" ? "active" : ""}`}
            onClick={() => handleMenuClick("Docs")}
          >
            <span>📚</span> Docs
          </div>
        </div>
      </aside>

      {/* Content Area */}
      <main className="datastorage-content-area">
        {activeMenu === "Detail" && <div className="content">This is the Detail section.</div>}
        {activeMenu === "Dashboard" && <div className="content">This is the Dashboard section.</div>}
        {activeMenu === "Store" && <div className="content">This is the Store section.</div>}
        {activeMenu === "Settings" && <div className="content">This is the Settings section.</div>}
        {activeMenu === "Docs" && <div className="content">This is the Docs section.</div>}
      </main>
    </div>
  );
};

export default Datacloudstore;
