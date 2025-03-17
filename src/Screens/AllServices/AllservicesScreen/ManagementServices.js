import React from 'react';
import Sidebar from '../../../Components/Sidebar/Sidebar';
import Header from "../../../Components/Header/Header";

function ManagementServices() {
  return (
    <div className="app-container">
      <Header />
      <Sidebar />
      <div className="content">
        <h1>Management Services</h1>
        <p>This is the Management Services page.</p>
      </div>
    </div>
  );
}

export default ManagementServices;