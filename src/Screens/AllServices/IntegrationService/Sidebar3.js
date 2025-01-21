import React from 'react';
import './Sidebar3.css';
import { FaSearch} from "react-icons/fa";

const Sidebar3 = () => {

  return (
    <div className="sidebar4">
        <h2>demo_collec</h2>
        <h2>Transformations</h2>
      {/* Search Bar */}
      <div className="search-container">
        <input id="search-input" type="text" placeholder="Search" className="search-input"/>
        <FaSearch className="search-icon" />
      </div>

      {/* Sidebar Menu */}
      <ul>
        <li>input/output</li>
        <li>Input</li>
        <li>Output</li>
      </ul>
    </div>
  );
};

export default Sidebar3;
