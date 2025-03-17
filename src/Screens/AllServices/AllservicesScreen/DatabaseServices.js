import React from 'react';
import Sidebar from '../../../Components/Sidebar/Sidebar';
import Header from "../../../Components/Header/Header";

function DatabaseServices() {
  return (
    <div className="app-container">
      <Header />
      <Sidebar />
      <div className="content">
        <h1>Database Services</h1>
        <p>This is the Database Services page.</p>
      </div>
    </div>
  );
}

export default DatabaseServices;