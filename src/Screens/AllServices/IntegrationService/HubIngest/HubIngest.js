import React, { useEffect, useState } from 'react';
import './HubIngest.css';
import { useNavigate } from 'react-router-dom';
import Header from '../../../../Components/Header/Header';
import axios from 'axios';

const Hubingest = () => {
    const navigate = useNavigate();
    const [hubIngests, setHubIngests] = useState([]);
    const [selectedHubIngest, setSelectedHubIngest] = useState(null);

    useEffect(() => {
        const fetchHubIngests = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error('No authentication token found. Please log in.');
                alert('Please log in to access this page.');
                navigate('/login');
                return;
            }

            try {
                const response = await axios.get('http://localhost:3000/api/hubingest', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setHubIngests(response.data);
            } catch (error) {
                if (error.response?.status === 401) {
                    console.error('Unauthorized access:', error);
                    alert('Unauthorized access. Please log in again.');
                    navigate('/login');
                } else {
                    console.error('Error fetching data:', error);
                    alert('Failed to fetch data. Please try again later.');
                }
            }
        };

        fetchHubIngests();
    }, [navigate]);

    const handleCreateClick = () => {
        navigate('/create-hub-ingest');
    };

    const handleAccess = () => {
        if (!selectedHubIngest) {
            alert('Please select a Hub Ingest first.');
            return;
        }
        navigate('/access-hub-ingest', { state: { hubIngest: selectedHubIngest } });
    };

    const handleDetails = () => {
        if (!selectedHubIngest) {
            alert('Please select a Hub Ingest first.');
            return;
        }
        navigate('/details-hub-ingest', { state: { hubIngest: selectedHubIngest } });
    };

    const handleEdit = () => {
        if (!selectedHubIngest) {
            alert('Please select a Hub Ingest first.');
            return;
        }
        navigate('/edit-hub-ingest', { state: { hubIngest: selectedHubIngest } });
    };

    const handleDelete = async () => {
        if (!selectedHubIngest) {
            alert('Please select a Hub Ingest first.');
            return;
        }

        const token = localStorage.getItem('token');
        try {
            await axios.delete(`http://localhost:3000/api/hubingest/${selectedHubIngest._id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            alert('Hub Ingest deleted successfully!');
            setHubIngests(hubIngests.filter((hubIngest) => hubIngest._id !== selectedHubIngest._id));
            setSelectedHubIngest(null); // Reset selected item
        } catch (error) {
            console.error('Error deleting Hub Ingest:', error);
            alert('Failed to delete Hub Ingest.');
        }
    };

    const handleNameClick = (hubIngest) => {
        navigate('/overview', { state: hubIngest });
    };

    return (
        <div className="hub-ingest_main-content">
            <Header />
            <h1 className="page-title">Hub Ingest</h1>
            <input type="text" placeholder="Search" className="search-bar" />
            <div className="toolbar">
                <button onClick={handleCreateClick}>
                    <i className="fas fa-plus"></i> Create
                </button>
                <button onClick={handleAccess}>
                    <i className="fas fa-folder-open"></i> Access
                </button>
                <button onClick={handleDetails}>
                    <i className="fas fa-info-circle"></i> Details
                </button>
                <button onClick={handleEdit}>
                    <i className="fas fa-edit"></i> Edit
                </button>
                <button onClick={handleDelete}>
                    <i className="fas fa-trash-alt"></i> Delete
                </button>
            </div>
            <table className="custom-table">
                <thead>
                    <tr>
                        <th>Select</th>
                        <th>Project Name</th>
                        <th>Hub Ingest Name</th>
                        <th>Subscription Name</th>
                    </tr>
                </thead>
                <tbody>
                    {hubIngests.map((hubIngest, index) => (
                        <tr
                            key={index}
                            onClick={() => setSelectedHubIngest(hubIngest)}
                            className={selectedHubIngest?._id === hubIngest._id ? 'selected-row' : ''}
                        >
                            <td>
                                <input
                                    type="radio"
                                    name="selectedHubIngest"
                                    checked={selectedHubIngest?._id === hubIngest._id}
                                    onChange={() => setSelectedHubIngest(hubIngest)}
                                />
                            </td>
                            <td>{hubIngest.projectName?.projectName || hubIngest.projectName || 'N/A'}</td>
                            <td
                                className="clickable-name"
                                onClick={() => handleNameClick(hubIngest)}
                            >
                                {hubIngest.name || 'N/A'}
                            </td>
                            <td>{hubIngest.subscriptionType?.type || 'N/A'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Hubingest;