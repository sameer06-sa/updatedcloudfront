import React from "react";
import { useNavigate } from "react-router-dom";
import { FaBriefcase, FaCog, FaUserCircle } from "react-icons/fa";

const DeploymentHeader = () => {
  const navigate = useNavigate();

  return (
    <header className="w-full bg-white shadow fixed py-1 top-0 left-0 right-0 z-10">
      <div className="flex justify-between items-center px-5 h-12">
        {/* Logo */}
        <h1 className="text-xl font-light">StatusTracker</h1>

        {/* Search Bar */}
        <div className="flex-grow ml-6 flex justify-center">
          <input
            type="text"
            placeholder="Search"
            className="border border-gray-300 rounded-lg px-4 py-1 text-sm w-32"
          />
        </div>

        {/* Icons */}
        <div className="flex items-center space-x-4 mr-2">
          <span className="cursor-pointer" onClick={() => navigate("/work")}>
            <FaBriefcase className="text-gray-500 text-xl" />
          </span>
          <span className="cursor-pointer" onClick={() => navigate("/settings")}>
            <FaCog className="text-gray-500 text-xl" />
          </span>
          <span>
            <FaUserCircle className="text-gray-500 text-2xl" />
          </span>
        </div>
      </div>
    </header>
  );
};

export default DeploymentHeader;
