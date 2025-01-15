import React, { useEffect, useState } from 'react';
import './HubIngest.css';
import { useNavigate } from 'react-router-dom';
import Header from '../../../../Components/Header/Header';
import axios from 'axios';

const Hubingest = () => {
    const navigate = useNavigate();
    const [hubIngests, setHubIngests] = useState([]); // State to store fetched data

    // Fetch Hub Ingest data on component mount
    useEffect(() => {
        const fetchHubIngests = async () => {
            const token = localStorage.getItem('token'); // Retrieve token from localStorage
            
            if (!token) {
                console.error('No authentication token or user ID found. Please log in.');
                alert('Please log in to access this page.');
                return;
            }

            try {
                const response = await axios.get(`http://localhost:3000/api/hubingest`, {
                    headers: { Authorization: `Bearer ${token}` }, // Include authentication header
                });
                setHubIngests(response.data); // Set the fetched data into state
            } catch (error) {
                if (error.response?.status === 401) {
                    console.error('Unauthorized: Please check your credentials.', error);
                    alert('Unauthorized access. Please log in again.');
                } else {
                    console.error('Error fetching Hub Ingest data:', error);
                    alert('Failed to fetch Hub Ingest data. Please try again later.');
                }
            }
        };

        fetchHubIngests();
    }, [navigate]); // Include navigate as a dependency

    const handleCreateClick = () => {
        navigate('/create-hub-ingest'); // Navigate to the CreateHubIngest component
    };

    const handleAccess = (hubIngest) => {
        navigate('/access-hub-ingest', { state: { hubIngest } }); // Pass Hub Ingest data for Access
    };

    const handleDetails = (hubIngest) => {
        navigate('/details-hub-ingest', { state: { hubIngest } }); // Pass Hub Ingest data for Details
    };

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
                            {/* Updated handling of projectName */}
                            <td>{hubIngest.projectName?.projectName || hubIngest.projectName || 'N/A'}</td> {/* Project name */}
                            <td>{hubIngest.name || 'N/A'}</td> {/* Hub Ingest name */}
                            <td>{hubIngest.subscriptionType?.type || 'N/A'}</td> {/* Subscription name */}
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
