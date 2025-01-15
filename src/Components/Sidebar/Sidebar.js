import React, { useState, useRef, useEffect } from 'react';
import './Sidebar.css';
import { Link } from 'react-router-dom';

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false); // Tracks whether the sidebar is open
  const sidebarRef = useRef(null); // Sidebar reference

  const toggleSidebar = () => {
    setIsOpen((prev) => !prev);
  };

  // Closes the sidebar if clicked outside
  const handleClickOutside = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="sidebar-container">
      {/* Toggle Button */}
      <div className="toggle-container">
        <button className="toggle-btn" onClick={toggleSidebar}>
          {isOpen ? 'X' : '≣'}
        </button>
      </div>
      {/* Vertical Line */}
      <div className="user-bar-line"></div> {/* This is the vertical line */}


      {/* Sidebar */}
      <div ref={sidebarRef} className={`sidebar ${isOpen ? 'sidebar-open' : ''}`}>
        <h2>Menu</h2>
        <ul className="menu-list">
          <li>
            <Link to="/organizations" onClick={toggleSidebar}>Organization</Link>
          </li>

          <li>
            <Link to="/freetrail" onClick={toggleSidebar}>Subscriptions</Link>
          </li>
          <li>
            <Link to="/projects" onClick={toggleSidebar}>Projects</Link>
          </li>
          <li>
            <Link to="/manage-users" onClick={toggleSidebar}>My Manage</Link>
          </li>
          <li>
            <Link to="/docs" onClick={toggleSidebar}>Docs</Link>
          </li>
          <li>
            <Link to="/settings" onClick={toggleSidebar}>Settings</Link>
          </li>
          <li>
            <Link to="/help-support" onClick={toggleSidebar}>Help</Link>
          </li>
        </ul>

      </div>
    </div>
  );
}

export default Sidebar;