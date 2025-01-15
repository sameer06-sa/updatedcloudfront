import React, { useState, useEffect } from 'react';
import './CreateProject.css';
import { useNavigate } from 'react-router-dom';
import Header from '../../../Components/Header/Header';

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
                const response = await fetch(`http://localhost:3000/api/org/organizations`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch organizations');
                }

                const data = await response.json();
                console.log("Fetched organizations:", data); // Inspect the structure

                // Handle both direct arrays and wrapped arrays
                if (Array.isArray(data)) {
                    setOrganizations(data);
                } else if (data && Array.isArray(data.data)) {
                    setOrganizations(data.data);
                } else {
                    console.error("Unexpected response format:", data);
                    setOrganizations([]); // Fallback to an empty array
                }
            } catch (error) {
                console.error('Error fetching organizations:', error);
                setOrganizations([]); // Handle errors gracefully
            }
        };

        fetchOrganizations();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newProject = {
            projectName,
            organizationName,
            subscriptionName,
        };

        try {
            const response = await fetch(`http://localhost:3000/api/proj/projects`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`, // Include the token in the header
                },
                body: JSON.stringify(newProject),
            });

            if (!response.ok) {
                throw new Error('Failed to create project');
            }

            const createdProject = await response.json();
            console.log('Project created successfully:', createdProject);

            // Clear form fields
            setProjectName('');
            setOrganizationName('');
            setSubscriptionName('');

            // Navigate to the projects page after project creation
            navigate("/projects", { state: { project: createdProject } });
        } catch (error) {
            console.error('Error creating project:', error);
        }
    };

    return (
        <div className="projects-page">
            <Header />

            <div className="create-project-container">
                <h2>Create new project</h2>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="projectName">Project name *</label>
                        <input
                            type="text"
                            id="projectName"
                            value={projectName}
                            onChange={(e) => setProjectName(e.target.value)}
                            required
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="organizationName">Organization name *</label>
                        <select
                            id="organizationName"
                            value={organizationName}
                            onChange={(e) => setOrganizationName(e.target.value)}
                            required
                        >
                            <option value="">Select an organization</option>
                            {organizations.map((org) => (
                                <option key={org._id} value={org.organizationName}>{org.organizationName}</option>
                            ))}
                        </select>
                    </div>

                    <div className="input-group">
                        <label htmlFor="subscriptionName">Subscription name *</label>
                        <select
                            id="subscriptionName"
                            value={subscriptionName}
                            onChange={(e) => setSubscriptionName(e.target.value)}
                            required
                        >
                            <option value="">Select a subscription</option>
                            <option value="FreeTrail">FreeTrail</option>
                            <option value="Organization">Organization</option>
                        </select>
                    </div>

                    <div className="button-group">
                        <button type="button" className="cancel-button" onClick={() => navigate('/projects')}>
                            Cancel
                        </button>
                        <button type="submit" className="create-button">
                            Create
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CreateProjectForm;
