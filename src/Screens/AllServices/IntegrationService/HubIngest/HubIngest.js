import React, { useEffect, useState } from 'react';
import './HubIngest.css';
import { useNavigate } from 'react-router-dom';
import Header from '../../../../Components/Header/Header';
import axios from 'axios';

const Hubingest = () => {
    const navigate = useNavigate();
    const [hubIngests, setHubIngests] = useState([]);

    useEffect(() => {
        const fetchHubIngests = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error('No authentication token found. Please log in.');
                alert('Please log in to access this page.');
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
                } else {
                    console.error('Error fetching data:', error);
                    alert('Failed to fetch data. Please try again later.');
                }
            }
        };

        fetchHubIngests();
    }, []);

    const handleEdit = (hubIngest) => {
        navigate('/edit-hub-ingest', { state: { hubIngest } }); // Pass Hub Ingest data for Edit
    };

    const handleDelete = async (id) => {
        const token = localStorage.getItem('token'); // Retrieve token from localStorage
        try {
            await axios.delete(`http://localhost:3000/api/hubingest/${id}`, {
                headers: { Authorization: `Bearer ${token}` }, // Include authentication header
            });
            alert('Hub Ingest deleted successfully!');
            setHubIngests(hubIngests.filter((hubIngest) => hubIngest._id !== id)); // Remove from state
        } catch (error) {
            console.error('Error deleting Hub Ingest:', error);
            alert('Failed to delete Hub Ingest.');
        }
    };

    const handleNameClick = (hubIngest) => {
        navigate('/overview', { state: hubIngest }); // Pass the hub ingest data to Overview
    };

    const handleCreateClick = () => {
        navigate('/create-hub-ingest'); // Navigate to the CreateHubIngest component
    };

    const handleDetails = (hubIngest) => {
        navigate('/details-hub-ingest', { state: { hubIngest } }); // Pass Hub Ingest data for Details
    };

    return (
        <div className="hub-ingest_main-content">
            <Header />
            <h1 className="page-title">Hub Ingest</h1>
            <input type="text" placeholder="Search" className="search-bar" />
            <div className="toolbar">
                <button onClick={handleCreateClick}>+ Create</button>
                <button>📁 Access</button>
                <button>📝 Details</button>
            </div>
            <table className="custom-table">
                <thead>
                    <tr>
                        <th>Project Name</th>
                        <th>Hub Ingest Name</th>
                        <th>Subscription Name</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {hubIngests.map((hubIngest, index) => (
                        <tr key={index}>
                            <td>{hubIngest.projectName?.projectName || hubIngest.projectName || 'N/A'}</td>
                            <td
                                className="clickable-name"
                                onClick={() => handleNameClick(hubIngest)}
                            >
                                {hubIngest.name || 'N/A'}
                            </td>
                            <td>{hubIngest.subscriptionType?.type || 'N/A'}</td>
                            <td>
                                <button onClick={() => handleEdit(hubIngest)}>✍🏼 Edit</button>
                                <button onClick={() => handleDelete(hubIngest._id)}>🗑 Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Hubingest;
