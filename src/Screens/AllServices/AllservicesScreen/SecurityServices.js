import React from 'react';
import Sidebar from '../../../Components/Sidebar/Sidebar';
import Header from "../../../Components/Header/Header";

function SecurityServices() {
  return (
    <div className="app-container">
      <Header />
      <Sidebar />
      <div className="content">
        <h1>Security Services</h1>
        <p>This is the Security Services page.</p>
      </div>
    </div>
  );
}

export default SecurityServices;