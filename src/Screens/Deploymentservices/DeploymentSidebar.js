import React from "react";
import { Link } from "react-router-dom";
import { 
  Home, LayoutDashboard, Users, File, Settings, 
  GitBranch, GitCommit, GitPullRequest, Terminal 
} from "lucide-react"; 
import DeploymentHeader from "./DeploymentHeader"; // Import DeploymentHeader

const DeploymentSidebar = () => {
  const menuItems = [
    { name: "Home", icon: <Home />, route: "/" },
    { name: "Dashboards", icon: <LayoutDashboard />, route: "/dashboards" },
    { name: "Organization", icon: <Users />, route: "/organization" },
    { name: "Projects", icon: <GitBranch />, route: "/projects" },
    { name: "Code", icon: <GitCommit />, route: "/code" },
    { name: "Pipelines", icon: <GitPullRequest />, route: "/pipelines" },
    { name: "Build", icon: <Terminal />, route: "/build" },
    { name: "Test", icon: <File />, route: "/test" },
  ];

  return (
    <div>
      {/* Include DeploymentHeader Component */}
      <DeploymentHeader /> 

      {/* Sidebar - pushed down below header */}
      <div className="fixed left-0 w-64 bg-white text-black border-r border-gray-300 mt-12 h-[calc(100vh-4rem)]">
        {/* Sidebar content */}
        <div className="flex items-center p-4 space-x-2 border-b border-gray-300">
          <div
            className="w-10 h-10 text-white flex items-center justify-center rounded-full text-lg"
            style={{ backgroundColor: "#5328FF" }}
          >
            S
          </div>
          <span className="text-xl font-bold">sample_project</span>
        </div>

        {/* Navigation Links */}
        <nav className="flex-grow p-2 space-y-1">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              to={item.route}
              className="flex items-center space-x-3 text-black hover:text-blue-600 hover:bg-gray-100 p-2 rounded-md"
            >
              {item.icon}
              <span>{item.name}</span>
            </Link>
          ))}
        </nav>

        {/* Settings Link */}
        <div className="p-2">
          <Link
            to="/settings"
            className="flex items-center space-x-3 text-black hover:text-blue-600 hover:bg-gray-100 p-2 rounded-md"
          >
            <Settings />
            <span>Settings</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DeploymentSidebar;
