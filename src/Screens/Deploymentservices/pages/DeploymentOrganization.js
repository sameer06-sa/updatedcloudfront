import React from "react";
import DeploymentSidebar from "../../../Screens/Deploymentservices/DeploymentSidebar";

const Organization = () => {
  return (
    <div className="flex">
      <DeploymentSidebar />
      <div className="flex-grow p-6">
        <h1 className="text-xl font-bold">Organization</h1>
      </div>
    </div>
  );
};

export default Organization;
