import React from "react";
import { AlertCircle, CheckCircle } from "lucide-react"; 
import DeploymentHeader from "../DeploymentHeader";
import DeploymentSidebar from "../../../Screens/Deploymentservices/DeploymentSidebar";

const DeploymentProject = () => {
  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="w-64 fixed left-0 top-0 h-screen bg-gray-100 shadow-lg">
        <DeploymentSidebar />
      </div>

      {/* Main Content */}
      <div className="flex flex-col w-full p-6 mt-6 mb-6 ml-64">
        {/* Header */}
        <DeploymentHeader />

        <header className="flex items-center p-4 space-x-3 border-b border-gray-300 items-center mb-8">
          <div className="flex items-center">
            {/* D Letter for Deployment */}
            <div
              className="w-10 h-10 text-white flex items-center justify-center rounded-full text-lg mr-4"
              style={{ backgroundColor: "#5328FF" }} 
            >
              D
            </div>
            {/* Project Name */}
            <h1 className="text-2xl font-bold">sample_project</h1>
          </div>
        </header>

        {/* About Section */}
        <section className="bg-white p-6 rounded-2xl shadow-md mb-8">
          <h2 className="text-xl font-semibold mb-2">About this project</h2>
          <p className="text-gray-600 mb-4">
            Describe your project to help everyone understand what you are planning to do.
          </p>
          <button className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700">
            + Add Project Description
          </button>
        </section>

        {/* Project Statistics Section */}
        <section className="bg-white p-6 rounded-2xl shadow-md mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Project Statistics</h2>
            <select className="border w-64 rounded-lg px-3 py-1 text-gray-600">
              <option>Last 7 days</option>
              <option>Last 30 days</option>
              <option>Last Year</option>
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {/* Work in Progress */}
            <div className="bg-red-100 p-4 rounded-lg flex items-center">
              <AlertCircle className="text-red-600 text-4xl mr-4" /> 
              <div>
                <div className="text-4xl font-bold text-red-600">1</div>
                <p className="font-medium">Work in progress</p>
              </div>
            </div>
            {/* Work Completed */}
            <div className="bg-blue-100 p-4 rounded-lg flex items-center">
              <CheckCircle className="text-blue-600 text-4xl mr-4" /> 
              <div>
                <div className="text-4xl font-bold text-blue-600">2</div>
                <p className="font-medium">Work completed</p>
              </div>
            </div>
          </div>
        </section>

        {/* Team Members Section */}
        <section className="bg-white p-6 rounded-2xl shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Team Members</h2>
            <button className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700">
              + Add Member
            </button>
          </div>
          <div className="grid grid-cols-1 gap-4">
            {/* Team Member Suresh */}
            <div className="flex items-center p-4 bg-gray-100 rounded-lg">
              <div
                className="w-10 h-10 text-white flex items-center justify-center rounded-full text-lg mr-4"
                style={{ backgroundColor: "#5328FF" }}
              >
                S
              </div>
              <p className="font-medium">Suresh</p>
            </div>
            {/* Team Member Ramesh */}
            <div className="flex items-center p-4 bg-gray-100 rounded-lg">
              <div className="w-10 h-10 bg-green-500 text-white flex items-center justify-center rounded-full text-lg mr-4">
                R
              </div>
              <p className="font-medium">Ramesh</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default DeploymentProject;
