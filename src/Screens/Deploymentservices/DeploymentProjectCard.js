// src/Components/DeploymentProjectCard.js
import React from "react";
 
const DeploymentProjectCard = ({ projectName, projectCategory, color, onClick }) => (
  <div
    onClick={onClick}
    className="flex flex-col items-center justify-center bg-white border rounded-lg shadow-md p-4 hover:shadow-lg transition duration-300 cursor-pointer"
  >
    <div
      className={`flex items-center justify-center w-16 h-16 text-white font-bold text-2xl rounded-full ${color}`}
    >
      {projectName.charAt(0).toUpperCase()}
    </div>
    <h3 className="mt-2 font-semibold text-lg">{projectName}</h3>
    <p className="text-gray-500">{projectCategory}</p>
  </div>
);
 
export default DeploymentProjectCard;