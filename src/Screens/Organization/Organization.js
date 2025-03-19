import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from '../../Components/Sidebar/Sidebar';
import Header from '../../Components/Header/Header';
import "./Organization.css";
 
const apiUrl = process.env.REACT_APP_API_URL; // Backend API URL
 
const Organizations = () => {
  const [organizations, setOrganizations] = useState([]); // Store organizations
  const [loading, setLoading] = useState(true); // Show loading state
  const [error, setError] = useState(null); // Store error message
 
  useEffect(() => {
    // Get user email from localStorage
    const userEmail = localStorage.getItem("userData")
      ? JSON.parse(localStorage.getItem("userData")).email
      : null;
 
    if (!userEmail) {
      setError("User session expired. Please log in again.");
      setLoading(false);
      return;
    }
 
    console.log("Fetching organizations for:", userEmail);
 
    axios
      .get(`${apiUrl}/api/admin-organization/user/${userEmail}`)
      .then((response) => {
        console.log("API Response:", response.data);
        setOrganizations(response.data.data); // Store API data
      })
      .catch((err) => {
        console.error("Error fetching organizations:", err.message);
        setError(
          err.response && err.response.status === 404
            ? "No organizations found for this user."
            : "Failed to fetch organizations. Please try again later."
        );
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
 
  if (loading) {
    return <div className="loading-message">Loading organizations...</div>;
  }
 
  return (
    <div className="App">
      <Header />
      <div className="organizations-main-container">
        <Sidebar />
        <div className="content">
          <div className="organizations-container">
            <h1 className="organizations-title">Organizations</h1>
 
            {error && <p className="error-message">{error}</p>}
 
            {organizations.length > 0 ? (
              <div className="organizations-table-container">
                <table className="organizations-table">
                  <thead>
                    <tr>
                      <th>Organization Name</th>
                      <th>Details</th>
                      <th>Contact Number</th>
                      <th>Email</th>
                      <th>Payment Method</th>
                    </tr>
                  </thead>
                  <tbody>
                    {organizations.map((org) => (
                      <tr key={org._id}>
                        <td>{org.organizationName}</td>
                        <td>{org.details}</td>
                        <td>{org.contactNumber}</td>
                        <td>{org.email}</td>
                        <td>{org.paymentMethod}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="no-organization-message">
                <p>No organizations found. Please contact support.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
 
export default Organizations;