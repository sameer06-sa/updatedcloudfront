import React, { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaSearch, FaBell, FaUserCircle } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import debounce from "lodash.debounce";
import "./Header.css";

const apiUrl = process.env.REACT_APP_API_URL;
const MAX_PREVIOUS_ACCOUNTS = 5;

// Static list of files (replace with your actual file data)
const filesList = [
  { id: 1, name: "subscription", route: "/freetrail" },
  { id: 2, name: "Organization", route: "/organizations" },
  { id: 3, name: "HubIngest", route: "/hub-ingest" },
  { id: 4, name: "Notifications", route: "/notifications" },
  { id: 5, name: "Project", route: "/projects" },
  { id: 6, name: "Doc", route: "/docs" },
  { id: 7, name: "Settings", route: "/settings" },
  { id: 8, name: "Help Support", route: "/help-support" },
  { id: 9, name: "Reporting Analytics", route: "/reporting-analytics" },
  { id: 10, name: "All Services", route: "/all-services" },
  { id: 11, name: "Management Services", route: "/management-services" },
  { id: 12, name: "Integration Services", route: "/integration-services" },
  { id: 13, name: "Compute Services", route: "/compute-services" },
  { id: 14, name: "DataBase Services", route: "/database-services" },
  { id: 15, name: "Status Tracker", route: "/projects/page" },
  { id: 16, name: "Security Services", route: "/security-services" },
  { id: 17, name: "Data Store", route: "/data-store-services" },
  { id: 18, name: "Task", route: "/tasks" },
  { id: 19, name: "Circle", route: "/circle" },
  { id: 20, name: "Subscription Plan", route: "/subscriptions" },
];

const RemoveAccountsPopup = ({ previousAccounts, onRemove, onClose }) => {
  const [selectedAccounts, setSelectedAccounts] = useState([]);

  const handleCheckboxChange = (account) => {
    setSelectedAccounts((prev) =>
      prev.includes(account)
        ? prev.filter((acc) => acc !== account)
        : [...prev, account]
    );
  };

  const handleRemove = () => {
    onRemove(selectedAccounts);
    onClose();
  };

  return (
    <div className="popup-overlay">
      <div className="popup-card">
        <h3>Select Accounts to Remove</h3>
        {previousAccounts.map((account, index) => (
          <div key={index} className="account-checkbox">
            <input
              type="checkbox"
              id={`account-${index}`}
              checked={selectedAccounts.includes(account)}
              onChange={() => handleCheckboxChange(account)}
            />
            <label htmlFor={`account-${index}`}>{account}</label>
          </div>
        ))}
        <div className="popup-actions">
          <button onClick={onClose}>Cancel</button>
          <button onClick={handleRemove}>Remove Selected</button>
        </div>
      </div>
    </div>
  );
};

function Header() {
  const [userEmail, setUserEmail] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [showOptions, setShowOptions] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [previousAccounts, setPreviousAccounts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showRemoveAccountsPopup, setShowRemoveAccountsPopup] = useState(false);
  const [filteredFiles, setFilteredFiles] = useState([]); // State to store filtered files
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const searchRef = useRef(null);

  useEffect(() => {
    const initializeUserData = () => {
      const userData = localStorage.getItem("userData");
      if (userData) {
        try {
          const parsedData = JSON.parse(userData);
          setUserEmail(parsedData?.email || "");
        } catch (error) {
          console.error("Error parsing user data:", error);
          setUserEmail("");
        }
      } else {
        // Redirect to login if no user data is found
        navigate("/signin");
      }
    };

    const loadPreviousAccounts = () => {
      const stored = localStorage.getItem("previousAccounts");
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          setPreviousAccounts(Array.isArray(parsed) ? parsed : []);
        } catch (error) {
          console.error("Error loading previous accounts:", error);
          setPreviousAccounts([]);
        }
      }
    };

    initializeUserData();
    loadPreviousAccounts();
  }, [navigate]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowMenu(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowOptions(false);
        setInputValue("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleAutoLogin = async (email) => {
    setIsLoading(true);
    try {
      const response = await axios.post(`${apiUrl}/api/user/auto-login`, { email });

      if (response.data?.success) {
        if (response.data.data?.user) {
          localStorage.setItem("userData", JSON.stringify(response.data.data.user));
        }
        if (response.data.data?.token) {
          localStorage.setItem("token", response.data.data.token);
        }

        const currentEmail = userEmail;
        const updatedAccounts = [
          currentEmail,
          ...previousAccounts.filter((acc) => acc !== email && acc !== currentEmail),
        ].slice(0, MAX_PREVIOUS_ACCOUNTS);

        try {
          localStorage.setItem("previousAccounts", JSON.stringify(updatedAccounts));
          setPreviousAccounts(updatedAccounts);
        } catch (error) {
          console.error("Error saving previous accounts:", error);
        }

        setUserEmail(response.data.data?.user?.email || email);
        setShowMenu(false);

        toast.success(`Successfully switched to account: ${email}`, {
          position: "top-right",
          autoClose: 3000,
        });

        navigate("/home");
      } else {
        toast.error(response.data?.message || "Auto-login failed", {
          position: "top-right",
          autoClose: 3000,
        });
      }
    } catch (error) {
      console.error("Auto-login failed:", error);

      toast.error(error.response?.data?.message || "Unable to auto-login. Please try again.", {
        position: "top-right",
        autoClose: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handlePreviousAccountClick = async (account) => {
    if (isLoading) return;
    await handleAutoLogin(account);
  };

  const handleRemoveAccounts = (accountsToRemove) => {
    const updatedAccounts = previousAccounts.filter(
      (acc) => !accountsToRemove.includes(acc)
    );
    try {
      localStorage.setItem("previousAccounts", JSON.stringify(updatedAccounts));
      setPreviousAccounts(updatedAccounts);

      toast.info(`Selected accounts removed successfully`, {
        position: "top-right",
        autoClose: 3000,
      });
    } catch (error) {
      console.error("Error removing accounts:", error);

      toast.error("Failed to remove accounts", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  const handleSignOut = () => {
    const currentEmail = userEmail;
    if (currentEmail) {
      const updatedAccounts = [
        currentEmail,
        ...previousAccounts.filter((acc) => acc !== currentEmail),
      ].slice(0, MAX_PREVIOUS_ACCOUNTS);

      try {
        localStorage.setItem("previousAccounts", JSON.stringify(updatedAccounts));
        setPreviousAccounts(updatedAccounts);
      } catch (error) {
        console.error("Error saving previous accounts:", error);
      }
    }

    localStorage.removeItem("userData");
    localStorage.removeItem("token");
    sessionStorage.clear();
    setUserEmail("");

    toast.info("You have been signed out", {
      position: "top-right",
      autoClose: 3000,
    });

    navigate("/signin");
  };

  const handleLoginWithDifferentMail = () => {
    handleSignOut();
  };

  const handleInputChange = debounce((value) => {
    if (value) {
      // Filter files based on the search query
      const filtered = filesList.filter((file) =>
        file.name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredFiles(filtered); // Update the filtered files state
      setShowOptions(true); // Always show the dropdown when there's input
    } else {
      setFilteredFiles([]); // Clear filtered files if the search term is empty
      setShowOptions(false); // Hide the dropdown
    }
  }, 300);

  const handleChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    handleInputChange(value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && filteredFiles.length > 0) {
      handleSelect(filteredFiles[0]);
    }
  };

  const handleSelect = (file) => {
    navigate(file.route); // Navigate to the file's route
    setInputValue(file.name); // Update the input value with the selected file name
    setShowOptions(false); // Hide the dropdown
  };

  const handleNotifications = () => navigate("/notifications");
  const handleSubscriptions = () => navigate("/subscriptions");
  const toggleMenu = () => setShowMenu((prev) => !prev);

  return (
    <>
      <header className="header">
        <div className="header-left">
          <Link to="/home" className="app-link">
            <h1 className="app-name1">Application Name</h1>
          </Link>
        </div>
        <div className="divider"></div>
        <div className="search-container" ref={searchRef}>
          <input
            type="text"
            value={inputValue}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder="Search services..."
            className="search-input"
            aria-label="Search files"
          />
          <FaSearch className="search-icon" />
          {showOptions && (
            <ul className="dropdown-options">
              {filteredFiles.length > 0 ? (
                filteredFiles.map((file, index) => (
                  <li
                    key={index}
                    onClick={() => handleSelect(file)}
                    className="dropdown-option"
                  >
                    {file.name}
                  </li>
                ))
              ) : (
                <li className="dropdown-option no-results">No matching records</li>
              )}
            </ul>
          )}
        </div>

        <div className="header-right">
          <div className="divider"></div>
          <button className="upgrade-button" onClick={handleSubscriptions}>
            Upgrade
          </button>
          <div className="divider"></div>
          <FaBell
            className="icon"
            onClick={handleNotifications}
            aria-label="Notifications"
          />
          <div className="divider"></div>
          <FaUserCircle
            className="user-icon"
            onClick={toggleMenu}
            aria-label="User menu"
          />
        </div>

        {showMenu && (
          <div className="dropdown-menu" ref={dropdownRef}>
            <div className="dropdown-header">
              <p className="application-name">Application Name</p>
              <button
                className="signout-button1 red-button"
                onClick={handleSignOut}
              >
                Sign Out
              </button>
            </div>

            <div className="current-account">
              <div className="icon-circle">👤</div>
              <p className="email">{userEmail}</p>
            </div>

            {previousAccounts.length > 0 && (
              <div className="previous-accounts-section">
                <h3>Switch Accounts</h3>
                {previousAccounts
                  .filter((acc) => acc !== userEmail) // Exclude the current account
                  .map((account, index) => (
                    <div
                      key={index}
                      className={`account ${isLoading ? "disabled" : ""}`}
                      onClick={() => !isLoading && handlePreviousAccountClick(account)}
                    >
                      <div className="icon-circle">👤</div>
                      <p className="email">
                        {account}
                        <span className="auto-login-text">
                          {isLoading ? "Logging in..." : ""}
                        </span>
                      </p>
                    </div>
                  ))}
                <button
                  className="remove-accounts-button red-button"
                  onClick={() => setShowRemoveAccountsPopup(true)}
                >
                  Remove Accounts
                </button>
              </div>
            )}

            <button
              className="login-different-mail-button red-button1"
              onClick={handleLoginWithDifferentMail}
            >
              <div className="icon-circle">👤</div>
              <p>Login with different mail</p>
            </button>
          </div>
        )}
      </header>
      {showRemoveAccountsPopup && (
        <RemoveAccountsPopup
          previousAccounts={previousAccounts}
          onRemove={handleRemoveAccounts}
          onClose={() => setShowRemoveAccountsPopup(false)}
        />
      )}
      <ToastContainer />
    </>
  );
}

export default Header;