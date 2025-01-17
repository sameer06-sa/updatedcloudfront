import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../../../../../Components/Header/Header';
import Sidebar from '../../../../../Components/Sidebar/Sidebar';
import './Overview.css';

const Overview = () => {
    const location = useLocation(); // Access passed data
    const navigate = useNavigate();
    const { projectName, name, subscriptionType,titleName } = location.state || {}; // Destructure the passed data

    const handleOpenClick = () => {
        window.open('/demo-hub','_blank');
    };

    return (
        <div className="overview-layout">
            <Header />
            <div className="overview-main">
                <Sidebar />
                <div className="app-container1">
                    <aside className="sidebar1">
                        <div className="sidebar-header">
                            <h2>{name|| 'Demo_HubIngest'}</h2>
                            {/* <h2>{name || 'HubIngest'}</h2> */}
                        </div>
                        <nav className="sidebar-nav">
                            <ul>
                                <li>Overview</li>
                                <li>Store</li>
                                <li>Dashboard</li>
                                <li>Security</li>
                                <li>Settings</li>
                                <li>Docs</li>
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
                                {/* <p>
                                    <strong>Location:</strong>
                                </p> */}
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
