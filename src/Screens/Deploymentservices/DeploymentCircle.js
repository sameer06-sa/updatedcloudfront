import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import DeploymentSidebar from "../../Screens/Deploymentservices/DeploymentSidebar";
 
const apiUrl = process.env.REACT_APP_API_URL;
 
export default function DeploymentCircle() {
  const [deploymentCircles, setDeploymentCircles] = useState([]);  // State to hold deployment circles
  const navigate = useNavigate();
 
  // Fetch deployment circles from the backend when the component mounts
  useEffect(() => {
    const fetchDeploymentCircles = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/deploymentCircles`);
        setDeploymentCircles(response.data);  // Set the fetched data to state
      } catch (error) {
        console.error("Error fetching deployment circles:", error);
      }
    };
    fetchDeploymentCircles();
  }, []);  // Empty dependency array ensures it runs once on component mount
 
  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="w-64 fixed left-0 top-0 h-screen bg-gray-100 shadow-lg">
        <DeploymentSidebar />
      </div>
 
      {/* Main Content */}
      <div className="flex flex-col w-full p-6 mt-8 ml-64">
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
 
        {/* Display Deployment Circles in Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {deploymentCircles.length === 0 ? (
            <div className="flex flex-col items-center justify-center text-center space-y-4">
              <h2 className="text-lg font-semibold text-gray-900">You do not have any work scheduled yet</h2>
              <p className="text-gray-500 text-sm">
                <a href="#" className="text-blue-500 underline">
                  Schedule Work
                </a>{" "}
                from your product backlog or create new work items.
              </p>
              <button
                onClick={() => navigate("/circle/new")}
                className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm"
              >
                + Create Task
              </button>
            </div>
          ) : (
            deploymentCircles.map((circle) => (
              <div
                key={circle._id}
                className="max-w-sm w-full bg-white shadow-lg rounded-lg overflow-hidden p-4"
              >
                <h3 className="text-xl font-semibold text-gray-900">{circle.name}</h3>
                <p className="text-gray-500 text-sm mt-1">{circle.projectName}</p>
 
                {/* Dates displayed in order: End Date, Start Date */}
                <div className="flex flex-col mt-4 text-gray-600">
                <div>
                    <span className="font-medium">Start:</span> {circle.startDate}
                  </div>
                  <div>
                    <span className="font-medium">End:</span> {circle.endDate}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}