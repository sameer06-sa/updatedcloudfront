import React, { useState, useEffect } from 'react';
import './CreateProject.css';
import { useNavigate } from 'react-router-dom';
import Header from '../../../Components/Header/Header';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
 
const apiUrl = process.env.REACT_APP_API_URL;
 
function CreateProjectForm() {
    const navigate = useNavigate();
 
    const [projectName, setProjectName] = useState('');
    const [organizationName, setOrganizationName] = useState('');
    const [subscriptionName, setSubscriptionName] = useState('');
    const [organizations, setOrganizations] = useState([]);
 
    useEffect(() => {
        const fetchOrganizations = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                alert("You need to log in first!");
                return;
            }
 
            try {
                const response = await fetch(`${apiUrl}/api/org/organizations`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });
 
                if (!response.ok) {
                    throw new Error('Failed to fetch organizations');
                }
 
                const data = await response.json();
                if (Array.isArray(data)) {
                    setOrganizations(data);
                } else if (data && Array.isArray(data.data)) {
                    setOrganizations(data.data);
                } else {
                    console.error("Unexpected response format:", data);
                    setOrganizations([]);
                }
            } catch (error) {
                console.error('Error fetching organizations:', error);
                setOrganizations([]);
            }
        };
 
        fetchOrganizations();
    }, []);
 
    useEffect(() => {
        if (subscriptionName === 'FreeTrail') {
            setOrganizationName('Free Trial Organization');
        } else if (subscriptionName === 'Organization') {
            setOrganizationName('');
        }
    }, [subscriptionName]);
 
    const handleSubmit = async (e) => {
        e.preventDefault();
 
        if (subscriptionName === 'FreeTrail' && organizationName !== 'Free Trial Organization') {
            alert("You must select 'Free Trial Organization' for FreeTrial subscription.");
            return;
        }
 
        if (subscriptionName === 'Organization' && !organizationName) {
            alert("Please select an organization.");
            return;
        }
 
        const newProject = {
            projectName,
            organizationName,
            subscriptionName,
        };
 
        try {
            const response = await fetch(`${apiUrl}/api/proj/projects`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify(newProject),
            });
 
            if (!response.ok) {
                throw new Error('Failed to create project');
            }
 
            const createdProject = await response.json();
            console.log('Project created successfully:', createdProject);
 
            // Show success toast message
            toast.success('Project created successfully!');
 
            // Clear form fields
            setProjectName('');
            setOrganizationName('');
            setSubscriptionName('');
 
            // Navigate to the projects page after a delay
            setTimeout(() => navigate("/projects", { state: { project: createdProject } }), 3000);
        } catch (error) {
            console.error('Error creating project:', error);
            toast.error('Failed to create the project. Please try again.');
        }
    };
 
    return (
        <div className="projects-page">
            <Header />
 
            <div className="create-project-container">
                <h2>Create New Project</h2>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="projectName">Project Name *</label>
                        <input
                            type="text"
                            id="projectName"
                            value={projectName}
                            onChange={(e) => setProjectName(e.target.value)}
                            required
                        />
                    </div>
 
                    {subscriptionName === 'Organization' ? (
                        <div className="input-group">
                            <label htmlFor="organizationName">Organization Name *</label>
                            <select
                                id="organizationName"
                                value={organizationName}
                                onChange={(e) => setOrganizationName(e.target.value)}
                                required
                            >
                                <option value="">Select an Organization</option>
                                {organizations.map((org) => (
                                    <option key={org._id} value={org.organizationName}>
                                        {org.organizationName}
                                    </option>
                                ))}
                            </select>
                        </div>
                    ) : subscriptionName === 'FreeTrail' && (
                        <div className="input-group">
                            <label htmlFor="organizationName">Organization Name *</label>
                            <input
                                type="text"
                                id="organizationName"
                                value="Free Trial Organization"
                                readOnly
                            />
                        </div>
                    )}
 
                    <div className="input-group">
                        <label htmlFor="subscriptionName">Subscription Type *</label>
                        <select
                            id="subscriptionName"
                            value={subscriptionName}
                            onChange={(e) => setSubscriptionName(e.target.value)}
                            required
                        >
                            <option value="">Select a Subscription</option>
                            <option value="FreeTrail">FreeTrial</option>
                            <option value="Organization">Organization</option>
                        </select>
                    </div>
 
                    <div className="button-group1">
                        <button type="button" className="cancel-button" onClick={() => navigate('/projects')}>
                            Cancel
                        </button>
                        <button type="submit" className="create-button">
                            Create
                        </button>
                    </div>
                </form>
            </div>
 
            {/* Toast container for displaying messages */}
            <ToastContainer position="top-center" autoClose={3000} />
        </div>
    );
}
 
export default CreateProjectForm;