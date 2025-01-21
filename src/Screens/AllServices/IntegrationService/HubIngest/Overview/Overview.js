import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../../../../../Components/Header/Header';
import Sidebar from '../../../../../Components/Sidebar/Sidebar';
import './Overview.css';
import { FaFilter } from 'react-icons/fa'; // Import filter icon from react-icons
 
const Overview = () => {
    const location = useLocation(); // Access passed data
    const navigate = useNavigate();
    const { projectName, name, subscriptionType, titleName } = location.state || {}; // Destructure the passed data
    const [filterText, setFilterText] = useState('');
 
    const handleOpenClick = () => {
        window.open('/demo-hub', '_blank');
    };
 
    const handleFilterChange = (event) => {
        setFilterText(event.target.value);
    };
 
    return (
        <div className="overview-layout">
            <Header />
            <div className="overview-main">
                <Sidebar />
                <div className="app-container1">
                    <aside className="sidebar1">
                        <div className="sidebar-header">
                            <h2>{name || 'Demo_HubIngest'}</h2>
                            <h2>HubIngest</h2>
                        </div>
                        <div className="filter-container">
                            <FaFilter className="filter-icon" />
                            <input
                                type="text"
                                placeholder="Filter"
                                className="filter-input"
                                value={filterText}
                                onChange={handleFilterChange}
                            />
                        </div>
                        <nav className="sidebar-nav">
                            <ul>
                                {['Overview', 'Store', 'Dashboard', 'Security', 'Settings', 'Docs']
                                    .filter((item) => item.toLowerCase().includes(filterText.toLowerCase()))
                                    .map((item) => (
                                        <li key={item}>{item}</li>
                                    ))}
                            </ul>
                        </nav>
                    </aside>
                    <main className="main-content1">
                        <header className="header1">
                            <h1>Overview</h1>
                        </header>
                        <div className="overview-grid">
                            <div className="overview-card">
                                <p>
                                    <strong>Project Name:</strong> {projectName?.projectName || projectName || 'N/A'}
                                </p>
                                <p>
                                    <strong>Subscription Type:</strong> {subscriptionType?.type || 'N/A'}
                                </p>
                                <p>
                                    <strong>Service Name:</strong> {name || 'N/A'}
                                </p>
                                <p>
                                    <strong>Titles:</strong> {titleName || 'N/A'}
                                </p>
                            </div>
                            <div className="overview-card">
                                <p>
                                    <strong>Project Id:</strong>
                                </p>
                                <p>
                                    <strong>Subscription Id:</strong>
                                </p>
                                <p>
                                    <strong>Service Type:</strong> HubIngest
                                </p>
                            </div>
                        </div>
                        <div className="hub-ingest-section">
                            <h2>Hub Ingest</h2>
                            <button className="open-button" onClick={handleOpenClick}>
                                Open
                            </button>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
};
 
export default Overview;