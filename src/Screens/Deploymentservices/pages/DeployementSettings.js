import React from "react";
import DeploymentSidebar from "../../../Screens/Deploymentservices/DeploymentSidebar";

const Settings = () => {
  return (
    <div className="flex">
      <DeploymentSidebar />
      <div className="flex-grow p-6">
        <h1 className="text-xl font-bold">Settings</h1>
      </div>
    </div>
  );
};

export default Settings;
