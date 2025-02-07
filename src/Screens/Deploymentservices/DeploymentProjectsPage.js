import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaBriefcase, FaCog, FaUserCircle } from "react-icons/fa";
import ProjectCard from "./DeploymentProjectCard"; 
import { fetchProjects } from "./services/deploymentProjectService";

const DeploymentProjectsPage = () => {
  const [filterText, setFilterText] = useState("");
  const [activeTab, setActiveTab] = useState("Projects");
  const navigate = useNavigate();

  const projects = [
    { title: "sample_project", type: "Web App", color: "bg-blue-700" },
    { title: "api_service", type: "API", color: "bg-purple-600" },
    { title: "mobile_app", type: "Mobile", color: "bg-blue-400" },
  ];

  const filteredProjects = projects.filter(
    (project) =>
      project.title &&
      project.title.toLowerCase().includes(filterText.toLowerCase())
  );

  const renderContent = () => {
    switch (activeTab) {
      case "Projects":
        return (
          <div className="grid grid-cols-3 gap-4">
            {filteredProjects.map((project, index) => (
              <ProjectCard
                key={index}
                title={project.title}
                type={project.type}
                color={project.color}
                onClick={() => navigate(`/projects/${project.title}`)}
              />
            ))}
          </div>
        );
      case "My work":
        return <p className="text-gray-600">No work assigned yet.</p>;
      case "Pull requests":
        return <p className="text-gray-600">No pull requests available.</p>;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-white-100 flex flex-col items-center py-2">
      <header className="w-full max-w-9xl px-6">
        <div className="flex justify-between items-center border-b pb-4">
          <h1 className="text-xl font-light">StatusTracker</h1>
          <div className="relative flex items-center">
            <input
              type="text"
              placeholder="Search"
              className="border border-gray-300 rounded-lg mr-80 pl-4 py-2 text-sm w-64"
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
            />
          </div>
          <div className="flex items-center space-x-20">
            <span
              className="flex items-center space-x-2 cursor-pointer"
              onClick={() => navigate("/work")}
            >
              <FaBriefcase className="text-gray-500 text-xl" />
            </span>
            <span
              className="flex items-center space-x-2 cursor-pointer"
              onClick={() => navigate("/settings")}
            >
              <FaCog className="text-gray-500 text-xl" />
            </span>
            <span className="flex items-center space-x-2">
              <FaUserCircle className="text-gray-500 text-2xl" />
            </span>
          </div>
        </div>
      </header>

      <main className="w-full max-w-8xl px-6 mt-4">
        <div className="flex justify-between items-start">
          <h2 className="text-lg font-semibold">Projects</h2>
          <div className="flex flex-col space-y-2 items-end">
            <button
              className="bg-blue-600 text-white px-7 py-2 rounded-lg shadow hover:bg-blue-700 transition"
              onClick={() => navigate("/projects/new")}
            >
              + New Project
            </button>
            <div>
              <input
                type="text"
                placeholder="Filter Projects"
                className="border border-gray-300 rounded-lg px-10 ml-16 py-2 text-sm"
                value={filterText}
                onChange={(e) => setFilterText(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="flex space-x-10 border-b">
          <button
            className={`pb-1 ${
              activeTab === "Projects"
                ? "text-blue-600 font-bold border-b-2 border-blue-600"
                : "text-black-600"
            }`}
            onClick={() => setActiveTab("Projects")}
          >
            Projects
          </button>
          <button
            className={`pb-1 ${
              activeTab === "My work"
                ? "text-blue-600 font-bold border-b-2 border-blue-600"
                : "text-black-600"
            }`}
            onClick={() => setActiveTab("My work")}
          >
            My work
          </button>
          <button
            className={`pb-1 ${
              activeTab === "Pull requests"
                ? "text-blue-600 font-bold border-b-2 border-blue-600"
                : "text-black-600"
            }`}
            onClick={() => setActiveTab("Pull requests")}
          >
            Pull requests
          </button>
        </div>

        <div className="mt-6">{renderContent()}</div>
      </main>
    </div>
  );
};

export default DeploymentProjectsPage;
