import React, { useEffect, useState } from 'react';
import './HubIngest.css';
import { useNavigate } from 'react-router-dom';
import Header from '../../../../Components/Header/Header';
import axios from 'axios';
 
// Font Awesome Icons
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPlus, faFolderOpen, faInfoCircle, faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
 
// React Toastify for notifications
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
 
library.add(faPlus, faFolderOpen, faInfoCircle, faEdit, faTrashAlt);
const apiUrl = process.env.REACT_APP_API_URL;
 
const Hubingest = () => {
    const navigate = useNavigate();
    const [hubIngests, setHubIngests] = useState([]); // All Hub Ingests from API
    const [selectedHubIngests, setSelectedHubIngests] = useState([]); // Selected Hub Ingests
    const [selectAll, setSelectAll] = useState(false); // Select All checkbox state
    const [searchTerm, setSearchTerm] = useState(''); // Search term state
    const [showDeleteModal, setShowDeleteModal] = useState(false); // State to control delete modal visibility
    const [showEditModal, setShowEditModal] = useState(false); // State to control edit modal visibility
    const [showDetailsModal, setShowDetailsModal] = useState(false); // State to control details modal visibility
    const [editName, setEditName] = useState(''); // State to store the new name for editing
 
    // Fetch Hub Ingests on component mount
    useEffect(() => {
        const fetchHubIngests = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                toast.error('No authentication token found. Please log in.');
                navigate('/login');
                return;
            }
 
            try {
                const response = await axios.get(`${apiUrl}/api/hubingest`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setHubIngests(response.data); // Set fetched data to state
            } catch (error) {
                if (error.response?.status === 401) {
                    toast.error('Unauthorized access. Please log in again.');
                    navigate('/login');
                } else {
                    toast.error('Failed to fetch data. Please try again later.');
                }
            }
        };
 
        fetchHubIngests();
    }, [navigate]);
 
    // Filter Hub Ingests based on search term
    const filteredHubIngests = hubIngests.filter((hubIngest) => {
        const hubIngestName = hubIngest.name || '';
        const projectName = hubIngest.projectName?.projectName || hubIngest.projectName || '';
        const subscriptionName = hubIngest.subscriptionType?.type || '';
 
        return (
            hubIngestName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            subscriptionName.toLowerCase().includes(searchTerm.toLowerCase())
        );
    });
 
    // Handle Create button click
    const handleCreateClick = () => {
        navigate('/create-hub-ingest');
    };
 
    // Handle Details button click
    const handleDetailsClick = () => {
        if (selectedHubIngests.length === 0) {
            toast.warning('Please select a Hub Ingest first.');
            return;
        }
        if (selectedHubIngests.length > 1) {
            toast.warning('Please select only one Hub Ingest to view details.');
            return;
        }
        setShowDetailsModal(true); // Show the details modal
    };
 
    // Handle Edit button click
    const handleEditClick = () => {
        if (selectedHubIngests.length === 0) {
            toast.warning('Please select a Hub Ingest first.');
            return;
        }
        if (selectedHubIngests.length > 1) {
            toast.warning('Please select only one Hub Ingest to edit.');
            return;
        }
        setEditName(selectedHubIngests[0].name || ''); // Set the current name for editing
        setShowEditModal(true); // Show the edit modal
    };
 
    // Handle Save button in the edit modal
    const handleSaveEdit = async () => {
        if (!editName.trim()) {
            toast.warning('Please enter a valid name.');
            return;
        }
 
        const token = localStorage.getItem('token');
        const hubIngestToUpdate = selectedHubIngests[0]; // Get the selected Hub Ingest
 
        try {
            const response = await axios.put(
                `${apiUrl}/api/hubingest/${hubIngestToUpdate._id}`,
                { name: editName },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            toast.success('Hub Ingest name updated successfully!');
            setHubIngests(hubIngests.map((hubIngest) =>
                hubIngest._id === hubIngestToUpdate._id ? { ...hubIngest, name: editName } : hubIngest
            ));
            setShowEditModal(false); // Close the modal
        } catch (error) {
            console.error('Error updating Hub Ingest:', error);
            toast.error('Failed to update Hub Ingest name.');
        }
    };
 
    // Handle Delete button click
    const handleDeleteClick = () => {
        if (selectedHubIngests.length === 0) {
            toast.warning('Please select a Hub Ingest first.');
            return;
        }
        setShowDeleteModal(true); // Show the delete confirmation modal
    };
 
    // Handle actual deletion after confirmation
    const handleDeleteConfirm = async () => {
        const token = localStorage.getItem('token');
        try {
            await Promise.all(
                selectedHubIngests.map(async (hubIngest) => {
                    await axios.delete(`${apiUrl}/api/hubingest/${hubIngest._id}`, {
                        headers: { Authorization: `Bearer ${token}` },
                    });
                })
            );
            toast.success('Hub Ingests deleted successfully!');
            setHubIngests(hubIngests.filter((hubIngest) => !selectedHubIngests.some(selected => selected._id === hubIngest._id)));
            setSelectedHubIngests([]); // Clear selected Hub Ingests
        } catch (error) {
            console.error('Error deleting Hub Ingests:', error);
            toast.error('Failed to delete Hub Ingests.');
        } finally {
            setShowDeleteModal(false); // Close the modal
        }
    };
 
    // Handle Cancel button in the delete modal
    const handleCancelDelete = () => {
        setShowDeleteModal(false); // Close the modal
        toast.info('Deletion canceled.'); // Notify user that deletion was canceled
    };
 
    // Handle Cancel button in the edit modal
    const handleCancelEdit = () => {
        setShowEditModal(false); // Close the modal
        toast.info('Edit canceled.'); // Notify user that edit was canceled
    };
 
    // Handle Cancel button in the details modal
    const handleCancelDetails = () => {
        setShowDetailsModal(false); // Close the modal
        toast.info('Details view closed.'); // Notify user that details view was closed
    };
 
    // Handle checkbox change for individual Hub Ingest
    const handleCheckboxChange = (hubIngest) => {
        if (selectedHubIngests.some((selected) => selected._id === hubIngest._id)) {
            setSelectedHubIngests(selectedHubIngests.filter((selected) => selected._id !== hubIngest._id));
        } else {
            setSelectedHubIngests([...selectedHubIngests, hubIngest]);
        }
    };
 
    // Handle Select All checkbox change
    const handleSelectAllChange = () => {
        if (selectAll) {
            setSelectedHubIngests([]); // Deselect all
        } else {
            setSelectedHubIngests(filteredHubIngests); // Select all visible Hub Ingests
        }
        setSelectAll(!selectAll);
    };
 
    // Handle Hub Ingest name click to navigate to overview
    const handleNameClick = (hubIngest) => {
        navigate('/overview', { state: hubIngest });
    };
 
    return (
        <div className="hub-ingest_main-content">
            <Header />
            <h1 className="page-title">Hub Ingest</h1>
            {/* Search Bar */}
            <input
                type="text"
                placeholder="Search..."
                className="search-bar"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)} // Update search term
            />
            {/* Toolbar with buttons */}
            <div className="toolbar">
                <button onClick={handleCreateClick}>
                    <FontAwesomeIcon icon="plus" /> Create
                </button>
                <button onClick={handleDetailsClick}>
                    <FontAwesomeIcon icon="info-circle" /> Details
                </button>
                <button onClick={handleEditClick}>
                    <FontAwesomeIcon icon="edit" /> Edit
                </button>
                <button onClick={handleDeleteClick}>
                    <FontAwesomeIcon icon="trash-alt" /> Delete
                </button>
            </div>
            {/* Table to display Hub Ingests */}
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
                        <th>Hub Ingest Name</th>
                        <th>Project Name</th>
                        <th>Subscription Name</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredHubIngests.map((hubIngest, index) => (
                        <tr
                            key={index}
                            onClick={() => setSelectedHubIngests([hubIngest])}
                            className={selectedHubIngests.some((selected) => selected._id === hubIngest._id) ? 'selected-row' : ''}
                        >
                            <td>
                                <input
                                    type="checkbox"
                                    checked={selectedHubIngests.some((selected) => selected._id === hubIngest._id)}
                                    onChange={() => handleCheckboxChange(hubIngest)}
                                />
                            </td>
                            <td
                                className="clickable-name"
                                onClick={() => handleNameClick(hubIngest)}
                            >
                                {hubIngest.name || 'N/A'}
                            </td>
                            <td>{hubIngest.projectName?.projectName || hubIngest.projectName || 'N/A'}</td>
                            <td>{hubIngest.subscriptionType?.type || 'N/A'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {/* Toast notifications */}
            <ToastContainer position="top-right" autoClose={3000} />
 
            {/* Delete Confirmation Modal */}
            {showDeleteModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h3>Delete Confirmation</h3>
                        </div>
                        <div className="modal-body">
                            <p>
                                Are you sure you want to delete {selectedHubIngests.length} selected Hub Ingests? This action cannot be undone.
                            </p>
                        </div>
                        <div className="modal-footer">
                            <button onClick={handleCancelDelete} className="cancel-button">
                                Cancel
                            </button>
                            <button onClick={handleDeleteConfirm} className="delete-button">
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
 
            {/* Edit Modal */}
            {showEditModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h3>Edit Hub Ingest Name</h3>
                        </div>
                        <div className="modal-body">
                            <input
                                type="text"
                                placeholder="Enter new name"
                                value={editName}
                                onChange={(e) => setEditName(e.target.value)}
                                className="edit-input"
                            />
                        </div>
                        <div className="modal-footer">
                            <button onClick={handleCancelEdit} className="cancel-button">
                                Cancel
                            </button>
                            <button onClick={handleSaveEdit} className="save-button">
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}
 
            {/* Details Modal */}
            {showDetailsModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h3>Hub Ingest Details</h3>
                        </div>
                        <div className="modal-body">
                            <table className="details-table">
                                <thead>
                                    <tr>
                                        <th>Field</th>
                                        <th>Value</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Hub Ingest Name</td>
                                        <td>{selectedHubIngests[0]?.name || 'N/A'}</td>
                                    </tr>
                                    <tr>
                                        <td>Project Name</td>
                                        <td>{selectedHubIngests[0]?.projectName?.projectName || selectedHubIngests[0]?.projectName || 'N/A'}</td>
                                    </tr>
                                    <tr>
                                        <td>Subscription Name</td>
                                        <td>{selectedHubIngests[0]?.subscriptionType?.type || 'N/A'}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="modal-footer">
                            <button onClick={handleCancelDetails} className="cancel-button">
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
 
export default Hubingest;