import React, { useEffect, useState } from 'react';
import './HubIngest.css';
import { useNavigate } from 'react-router-dom';
import Header from '../../../../Components/Header/Header';
import axios from 'axios';
 
// Ensure you have Font Awesome imported
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPlus, faFolderOpen, faInfoCircle, faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
 
library.add(faPlus, faFolderOpen, faInfoCircle, faEdit, faTrashAlt);
const apiUrl = process.env.REACT_APP_API_URL;
 
const Hubingest = () => {
    const navigate = useNavigate();
    const [hubIngests, setHubIngests] = useState([]);
    const [selectedHubIngests, setSelectedHubIngests] = useState([]); // Allow multiple selections
    const [selectAll, setSelectAll] = useState(false); // State to track "Select All" checkbox
 
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
                const response = await axios.get(`${apiUrl}/api/hubingest`, {
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
        if (selectedHubIngests.length === 0) {
            alert('Please select a Hub Ingest first.');
            return;
        }
        navigate('/access-hub-ingest', { state: { hubIngests: selectedHubIngests } });
    };
 
    const handleDetails = () => {
        if (selectedHubIngests.length === 0) {
            alert('Please select a Hub Ingest first.');
            return;
        }
        navigate('/details-hub-ingest', { state: { hubIngests: selectedHubIngests } });
    };
 
    const handleEdit = () => {
        if (selectedHubIngests.length === 0) {
            alert('Please select a Hub Ingest first.');
            return;
        }
        navigate('/edit-hub-ingest', { state: { hubIngests: selectedHubIngests } });
    };
 
    const handleDelete = async () => {
        if (selectedHubIngests.length === 0) {
            alert('Please select a Hub Ingest first.');
            return;
        }
 
        const token = localStorage.getItem('token');
        try {
            await Promise.all(
                selectedHubIngests.map(async (hubIngest) => {
                    await axios.delete(`${apiUrl}/api/hubingest/${hubIngest._id}`, {
                        headers: { Authorization: `Bearer ${token}` },
                    });
                })
            );
            alert('Hub Ingests deleted successfully!');
            setHubIngests(hubIngests.filter((hubIngest) => !selectedHubIngests.some(selected => selected._id === hubIngest._id)));
            setSelectedHubIngests([]); // Reset selected items
        } catch (error) {
            console.error('Error deleting Hub Ingests:', error);
            alert('Failed to delete Hub Ingests.');
        }
    };
 
    const handleCheckboxChange = (hubIngest) => {
        if (selectedHubIngests.some((selected) => selected._id === hubIngest._id)) {
            setSelectedHubIngests(selectedHubIngests.filter((selected) => selected._id !== hubIngest._id));
        } else {
            setSelectedHubIngests([...selectedHubIngests, hubIngest]);
        }
    };
 
    const handleSelectAllChange = () => {
        if (selectAll) {
            setSelectedHubIngests([]); // Deselect all
        } else {
            setSelectedHubIngests(hubIngests); // Select all
        }
        setSelectAll(!selectAll); // Toggle the "Select All" state
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
                    <FontAwesomeIcon icon="plus" /> Create
                </button>
                <button onClick={handleAccess}>
                    <FontAwesomeIcon icon="folder-open" /> Access
                </button>
                <button onClick={handleDetails}>
                    <FontAwesomeIcon icon="info-circle" /> Details
                </button>
                <button onClick={handleEdit}>
                    <FontAwesomeIcon icon="edit" /> Edit
                </button>
                <button onClick={handleDelete}>
                    <FontAwesomeIcon icon="trash-alt" /> Delete
                </button>
            </div>
            <table className="custom-table">
                <thead>
                    <tr>
                        <th>
                            <input
                                type="checkbox"
                                checked={selectAll}
                                onChange={handleSelectAllChange}
                            />
                        </th>
                        <th>Project Name</th>
                        <th>Hub Ingest Name</th>
                        <th>Subscription Name</th>
                    </tr>
                </thead>
                <tbody>
                    {hubIngests.map((hubIngest, index) => (
                        <tr
                            key={index}
                            onClick={() => setSelectedHubIngests([hubIngest])} // Single row selection
                            className={selectedHubIngests.some((selected) => selected._id === hubIngest._id) ? 'selected-row' : ''}
                        >
                            <td>
                                <input
                                    type="checkbox"
                                    checked={selectedHubIngests.some((selected) => selected._id === hubIngest._id)}
                                    onChange={() => handleCheckboxChange(hubIngest)}
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