import React from "react";
import { FaHome, FaFolderOpen, FaBriefcase, FaCogs, FaTachometerAlt, FaBook } from "react-icons/fa"; // Import the icons you want to use
import "./Sidebar1.css";
 
function Sidebar1() {
  return (
    <div className="sidebar2">
      <ul>
        <li><FaHome /> Home</li>
        <li><FaFolderOpen /> Collection</li>
        <li><FaBriefcase /> Jobs</li>
        <li><FaCogs /> Settings</li>
        <li><FaTachometerAlt /> Dashboard</li>
        <li><FaBook /> Docs</li>
      </ul>
    </div>
  );
}
 
export default Sidebar1;