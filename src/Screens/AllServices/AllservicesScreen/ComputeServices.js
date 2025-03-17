import React from 'react';
import Sidebar from '../../../Components/Sidebar/Sidebar';
import Header from "../../../Components/Header/Header";

function ComputeServices() {
  return (
    <div className="app-container">
      <Header />
      <Sidebar />
      <div className="content">
        <h1>Compute Services</h1>
        <p>This is the Compute Services page.</p>
      </div>
    </div>
  );
}

export default ComputeServices;