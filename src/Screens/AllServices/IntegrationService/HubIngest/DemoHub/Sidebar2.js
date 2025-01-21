import React from 'react';
import './Sidebar2.css';
import { FaSearch, FaFolder, FaPlug, FaCubes } from 'react-icons/fa'; // Import additional icons
import { Link } from 'react-router-dom';
 
const Sidebar2 = () => {
  return (
    <div className="sidebar3">
      {/* Search Bar */}
      <div className="search-container">
        <input id="search-input" type="text" placeholder="Search" className="search-input" />
        <FaSearch className="search-icon" />
      </div>
 
      {/* Sidebar Menu */}
      <ul>
        <li>
          <a href="#">
            <FaFolder className="menu-icon" /> Collection
          </a>
          <ul>
            <li>
              <Link to="/demo-collec">demo_collec</Link> {/* Routing to demo_collec */}
            </li>
          </ul>
        </li>
        <li>
          <a href="#">
            <FaPlug className="menu-icon" /> Connections
          </a>
          <ul>
            <li>
              <Link to="/mongodb-con">mongodb_con</Link> {/* Routing to mongodb_con */}
            </li>
          </ul>
        </li>
        <li>
          <a href="#">
            <FaCubes className="menu-icon" /> Structures
          </a>
          <ul>
            <li>
              <Link to="/mongodb-str">mongodb_str</Link> {/* Routing to mongodb_str */}
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
};
 
export default Sidebar2;