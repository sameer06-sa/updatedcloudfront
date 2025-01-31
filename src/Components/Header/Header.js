import React, { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaSearch, FaBell, FaUserCircle } from "react-icons/fa";
import "./Header.css";
import axios from "axios";
import debounce from "lodash.debounce";

const apiUrl = process.env.REACT_APP_API_URL;

function Header() {
    const [userEmail, setUserEmail] = useState("Guest");  // Default value to 'Guest'
    const [options, setOptions] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const [filteredOptions, setFilteredOptions] = useState([]);
    const [showOptions, setShowOptions] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const navigate = useNavigate();
    const dropdownRef = useRef(null); // Reference for the dropdown menu

    // Fetch options from the server
    useEffect(() => {
        const fetchOptions = async () => {
            try {
                const res = await axios.get(`http://localhost:3000/api/webapp`);
                if (res.data?.data) {
                    setOptions(res.data.data);
                }
            } catch (error) {
                console.error("Failed to fetch options:", error.message);
                alert("Error fetching search options. Please try again later.");
            }
        };

        fetchOptions();
    }, []);

    // Fetch user email from localStorage and handle missing or invalid data
    useEffect(() => {
        try {
            const userData = localStorage.getItem("userData");
            if (userData) {
                const parsedData = JSON.parse(userData);
                if (parsedData && parsedData.email) {
                    setUserEmail(parsedData.email); // Set email if available
                } else {
                    console.warn("Email not found in userData.");
                    setUserEmail("Guest");  // Fallback value
                }
            } else {
                console.warn("User data not found in localStorage.");
                setUserEmail("Guest");  // Fallback value
            }
        } catch (error) {
            console.error("Error parsing userData from localStorage:", error);
            setUserEmail("Guest");  // Fallback value
        }
    }, []);

    // Toggle user menu visibility
    const toggleMenu = () => {
        setShowMenu((prev) => !prev);
    };

    // Handle option selection from dropdown
    const handleSelect = (option) => {
        navigate(option.route);
        setInputValue(option.name);
        setShowOptions(false);
    };

    // Handle input change with debounce to optimize search
    const handleInputChange = debounce((value) => {
        if (value) {
            const filtered = options.filter((option) =>
                option.name.toLowerCase().includes(value.toLowerCase())
            );
            setFilteredOptions(filtered);
            setShowOptions(filtered.length > 0);
        } else {
            setShowOptions(false);
        }
    }, 300);

    const handleChange = (e) => {
        const value = e.target.value;
        setInputValue(value);
        handleInputChange(value);
    };

    // Clear session and redirect to a specific path
    const clearSessionAndRedirect = (redirectPath) => {
        localStorage.clear();  // Clear localStorage on logout
        sessionStorage.clear();  // Optional: clear sessionStorage if needed
        navigate(redirectPath);  // Redirect user to the given path
    };

    const handleSignOut = () => {
        clearSessionAndRedirect("/signin");  // Clear session data and redirect to sign-in page
    };

    const handleSignInWithDifferentAccount = () => {
        clearSessionAndRedirect("/signin");  // Clear session data and redirect to sign-in page
    };

    const handleNotifications = () => {
        navigate("/notifications");
    };

    const handleSubscriptions = () => {
        navigate("/subscriptions");
    };

    // Close dropdown menu on outside click or Escape key press
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowMenu(false);
            }
        };

        const handleKeyDown = (event) => {
            if (event.key === "Escape") {
                setShowMenu(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    // Render dropdown options
    const renderOptions = () => {
        return (
            <ul
                className="dropdown-options"
                role="listbox"
                aria-labelledby="search-input"
            >
                {filteredOptions.map((option, index) => (
                    <li
                        key={index}
                        onClick={() => handleSelect(option)}
                        role="option"
                        className="dropdown-option"
                    >
                        {option.name}
                    </li>
                ))}
            </ul>
        );
    };

    return (
        <header className="header">
            <div className="header-left">
                <h1 className="app-name">
                    <Link to="/home" className="app-link">
                        Application Name
                    </Link>
                </h1>
            </div>

            <div className="divider"></div>

            <div className="search-container">
                <input
                    id="search-input"
                    type="text"
                    value={inputValue}
                    onChange={handleChange}
                    placeholder="Search Services..."
                    className="search-input"
                    aria-autocomplete="list"
                    aria-controls="search-options"
                    aria-expanded={showOptions}
                />
                {showOptions && renderOptions()}
                <FaSearch className="search-icon" />
            </div>

            <div className="header-right">
                <div className="divider"></div>
                <button className="upgrade-button" onClick={handleSubscriptions}>
                    Upgrade
                </button>
                <div className="divider"></div>
                <FaBell className="icon" onClick={handleNotifications} />
                <div className="divider"></div>
                <FaUserCircle className="user-icon" onClick={toggleMenu} />
            </div>

            {showMenu && (
                <div className="dropdown-menu" ref={dropdownRef}>
                    <div className="dropdown-header">
                        <p className="application-name">Application Name</p>
                        <p className="signout" onClick={handleSignOut}>
                            Signout
                        </p>
                    </div>
                    <div className="account">
                        <div className="icon-circle">👤</div>
                        <p className="email">{userEmail}</p> {/* Fallback to 'Guest' if not available */}
                    </div>
                    <div className="account" onClick={handleSignInWithDifferentAccount}>
                        <div className="icon-circle">🧑</div>
                        <p>Signin with different account</p>
                    </div>
                </div>
            )}
        </header>
    );
}

export default Header;
