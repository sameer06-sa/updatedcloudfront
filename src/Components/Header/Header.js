import React, { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaSearch, FaBell, FaUserCircle, FaTimes } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import debounce from "lodash.debounce";
import "./Header.css";
 
const apiUrl = process.env.REACT_APP_API_URL;
const MAX_PREVIOUS_ACCOUNTS = 5;
 
const RemoveAccountsPopup = ({ previousAccounts, onRemove, onClose }) => {
    const [selectedAccounts, setSelectedAccounts] = useState([]);
 
    const handleCheckboxChange = (account) => {
        setSelectedAccounts(prev =>
            prev.includes(account)
                ? prev.filter(acc => acc !== account)
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
    const [options, setOptions] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const [filteredOptions, setFilteredOptions] = useState([]);
    const [showOptions, setShowOptions] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const [previousAccounts, setPreviousAccounts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [showRemoveAccountsPopup, setShowRemoveAccountsPopup] = useState(false);
    const navigate = useNavigate();
    const dropdownRef = useRef(null);
 
    useEffect(() => {
        const fetchOptions = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/webapp`);
                if (response.data?.data) {
                    setOptions(response.data.data);
                }
            } catch (error) {
                console.error("Failed to fetch options:", error);
            }
        };
        fetchOptions();
    }, []);
 
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
        };
 
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);
 
    const handleAutoLogin = async (email) => {
        setIsLoading(true);
        try {
            const response = await axios.post(`http://localhost:3000/api/user/auto-login`, { email });
 
            if (response.data?.success) {
                if (response.data.data?.user) {
                    localStorage.setItem('userData', JSON.stringify(response.data.data.user));
                }
                if (response.data.data?.token) {
                    localStorage.setItem('token', response.data.data.token);
                }
 
                const currentEmail = userEmail;
                const updatedAccounts = [
                    currentEmail,
                    ...previousAccounts.filter(acc => acc !== email && acc !== currentEmail)
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
 
                navigate('/home');
            } else {
                toast.error(response.data?.message || 'Auto-login failed', {
                    position: "top-right",
                    autoClose: 3000,
                });
            }
        } catch (error) {
            console.error('Auto-login failed:', error);
 
            toast.error(error.response?.data?.message || 'Unable to auto-login. Please try again.', {
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
        const updatedAccounts = previousAccounts.filter(acc => !accountsToRemove.includes(acc));
        try {
            localStorage.setItem("previousAccounts", JSON.stringify(updatedAccounts));
            setPreviousAccounts(updatedAccounts);
 
            toast.info(`Selected accounts removed Successful `, {
                position: "top-right",
                autoClose: 3000,
            });
        } catch (error) {
            console.error("Error removing accounts:", error);
 
            toast.error('Failed to remove accounts', {
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
                ...previousAccounts.filter(acc => acc !== currentEmail)
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
 
        toast.info('You have been signed out', {
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
            const filtered = options.filter(option =>
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
 
    const handleSelect = (option) => {
        navigate(option.route);
        setInputValue(option.name);
        setShowOptions(false);
    };
 
    const handleNotifications = () => navigate("/notifications");
    const handleSubscriptions = () => navigate("/subscriptions");
    const toggleMenu = () => setShowMenu(prev => !prev);
 
    return (
        <>
            <header className="header">
                <div className="header-left">
                    <Link to="/home" className="app-link">
                        <h1 className="app-name">Application Name</h1>
                    </Link>
                </div>
                <div className="divider"></div>
                <div className="search-container">
                    <input
                        type="text"
                        value={inputValue}
                        onChange={handleChange}
                        placeholder="Search Services..."
                        className="search-input"
                        aria-label="Search services"
                    />
                    <FaSearch className="search-icon" />
                    {showOptions && (
                        <ul className="dropdown-options">
                            {filteredOptions.map((option, index) => (
                                <li
                                    key={index}
                                    onClick={() => handleSelect(option)}
                                    className="dropdown-option"
                                >
                                    {option.name}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
 
                <div className="header-right">
                    <div className="divider"></div>
                    <button
                        className="upgrade-button"
                        onClick={handleSubscriptions}
                    >
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
                                    .filter(acc => acc !== userEmail) // Exclude the current account
                                    .map((account, index) => (
                                        <div
                                            key={index}
                                            className={`account ${isLoading ? 'disabled' : ''}`}
                                            onClick={() => !isLoading && handlePreviousAccountClick(account)}
                                        >
                                            <div className="icon-circle">👤</div>
                                            <p className="email">
                                                {account}
                                                <span className="auto-login-text">
                                                    {isLoading ? 'Logging in...' : ''}
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
 
                        <button className="login-different-mail-button red-button1" onClick={handleLoginWithDifferentMail}>
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