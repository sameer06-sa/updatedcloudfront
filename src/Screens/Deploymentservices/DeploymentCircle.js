import React from "react";
import { useNavigate } from "react-router-dom";
import DeploymentSidebar from "../../Screens/Deploymentservices/DeploymentSidebar";

export default function DeploymentCircle() { 
  const navigate = useNavigate(); 

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="w-64 fixed left-0 top-0 h-screen bg-gray-100 shadow-lg">
        <DeploymentSidebar />
      </div>

      {/* Main Content */}
      <div className="flex flex-col w-full bg-white p-6 mt-8 ml-64">
        {/* Top Section */}
        <div className="flex items-center justify-between">
          {/* Project Title with Dropdown Arrow */}
          <div className="flex items-center gap-2 cursor-pointer">
            <h1 className="text-2xl font-bold">sample_project</h1>
            <span className="text-gray-500">▼</span>
          </div>

          {/* Right Section: New Task Button & Dropdown Below */}
          <div className="flex flex-col items-end gap-2">
            <button
              onClick={() => navigate("/circle/new")} 
              className="bg-blue-600 hover:bg-blue-700 mt-8 text-white px-4 py-2 rounded-lg text-sm"
            >
              + New Task
            </button>
            <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm w-28">
              <option>Circle 1</option> 
            </select>
          </div>
        </div>

        {/* Deployment Circle Tab & Bottom Border */}
        <div className="flex flex-col mt-1 border-b pb-1">
          <button className="text-blue-600 font-medium border-b-2 border-blue-600 pb-2 w-fit">
            Circle
          </button>
        </div>

        {/* Main Content - Pushed Further Down */}
        <div className="flex flex-col items-center justify-center h-[60vh] text-center mt-12">
          {/* No Work Message */}
          <h2 className="text-lg font-semibold text-gray-900 mt-4">
            You do not have any work scheduled yet
          </h2>
          <p className="text-gray-500 text-sm mt-2">
            <a href="#" className="text-blue-500 underline">
              Schedule Work
            </a>{" "}
            from your product backlog or create new work items.
          </p>

          {/* Create Task Button */}
          <button
            onClick={() => navigate("/circle/new")} 
            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm"
          >
            + Create Task
          </button>
        </div>
      </div>
    </div>
  );
}
