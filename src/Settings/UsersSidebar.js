import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { People, Security, Settings, Assignment, Help } from '@mui/icons-material'; // Import icons
import { FaBars } from 'react-icons/fa'; // Hamburger menu icon
import './UsersSidebar.css';

const UsersSidebar = () => {
  const [isOpen, setIsOpen] = useState(false); // Sidebar state
  const sidebarRef = useRef(null); // Reference for sidebar

  const toggleSidebar = () => {
    setIsOpen(!isOpen); // Toggle the sidebar
  };

  const handleClickOutside = (event) => {
    // Close the sidebar if clicked outside
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
    <div className="users-sidebar-container">
      {/* Hamburger Menu Button */}
      <button className="hamburger-menu" onClick={toggleSidebar}>
        <FaBars />
      </button>

      {/* Vertical Line */}
      <div className="user-bar-line"></div> {/* This is the vertical line */}

      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`users-sidebar ${isOpen ? 'open' : 'closed'}`} // Add classes based on state
      >
        <h2 className="users-sidebar-title">User Management</h2>
        <nav className="users-sidebar-nav">
          <ul>
            <li>
              <Link to="/manage-users" className="users-sidebar-link">
                <People className="users-sidebar-icon" /> All Users
              </Link>
            </li>
            <li>
              <Link to="/deleted-users" className="users-sidebar-link">
                <Assignment className="users-sidebar-icon" /> Deleted Users
              </Link>
            </li>
            <li>
              <Link to="/password-reset" className="users-sidebar-link">
                <Security className="users-sidebar-icon" /> Password Reset
              </Link>
            </li>
            <li>
              <Link to="/user-settings" className="users-sidebar-link">
                <Settings className="users-sidebar-icon" /> User Settings
              </Link>
            </li>
            <li>
              <Link to="/support" className="users-sidebar-link">
                <Help className="users-sidebar-icon" /> Support
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default UsersSidebar;