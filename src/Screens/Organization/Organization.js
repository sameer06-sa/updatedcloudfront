import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaPlus, FaEdit, FaTrash, FaInfoCircle } from "react-icons/fa";
import "./Organization.css";
import Header from "../../Components/Header/Header";

const OrganizationPage = () => {
  const navigate = useNavigate();
  const [organizationData, setOrganizationData] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [selectedOrganizations, setSelectedOrganizations] = useState([]);

  // Fetch organization data from the backend
  useEffect(() => {
    const fetchOrganizations = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/org/organizations`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setOrganizationData(data);
        setFilteredData(data);
      } catch (error) {
        console.error("Error fetching organization data:", error);
      }
    };

    fetchOrganizations();
  }, []);

  // Handle search input
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearch(query);
    const filtered = organizationData.filter(
      (org) =>
        org.name.toLowerCase().includes(query) ||
        org.details.toLowerCase().includes(query) ||
        org.contact.toLowerCase().includes(query) ||
        org.email.toLowerCase().includes(query) ||
        org.paymentMethod.toLowerCase().includes(query)
    );
    setFilteredData(filtered);
  };

  // Handle row selection
  const handleSelectOrganization = (orgId) => {
    setSelectedOrganizations((prevSelected) =>
      prevSelected.includes(orgId)
        ? prevSelected.filter((id) => id !== orgId)
        : [...prevSelected, orgId]
    );
  };

  // Handle "Select All"
  const handleSelectAll = () => {
    if (selectedOrganizations.length === filteredData.length) {
      setSelectedOrganizations([]);
    } else {
      setSelectedOrganizations(filteredData.map((org) => org._id));
    }
  };

  return (
    <div className="App">
      <Header />
      <div className="main-container">
        <div>
          <h2>Organization</h2>

          <input
            type="text"
            placeholder="Search Services"
            className="search-bar services"
            value={search}
            onChange={handleSearch}
          />

          <div className="organization-controls">
            <button onClick={() => navigate("/create-organization")}>
              <FaPlus /> Create
            </button>
            <button disabled={selectedOrganizations.length === 0}>
              <FaEdit /> Rename
            </button>
            <button disabled={selectedOrganizations.length === 0}>
              <FaTrash /> Delete
            </button>
            <button disabled={selectedOrganizations.length === 0}>
              <FaInfoCircle /> Details
            </button>
          </div>

          {/* Table Format */}
          <table className="organization-table">
            <thead>
              <tr>
                <th>
                  <input
                    type="checkbox"
                    onChange={handleSelectAll}
                    checked={selectedOrganizations.length === filteredData.length && filteredData.length > 0}
                    style={{ transform: "scale(1.3)", cursor: "pointer" }} // Bigger checkbox
                  />
                </th>
                <th>Organization Name</th>
                <th>Details</th>
                <th>Contact Number</th>
                <th>Email</th>
                <th>Payment Method</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length > 0 ? (
                filteredData.map((org) => (
                  <tr key={org._id}>
                    <td>
                      <input
                        type="checkbox"
                        checked={selectedOrganizations.includes(org._id)}
                        onChange={() => handleSelectOrganization(org._id)}
                        style={{ transform: "scale(1.3)", cursor: "pointer" }} // Bigger checkbox
                      />
                    </td>
                    <td>{org.organizationName}</td>
                    <td>{org.organizationDetails}</td>
                    <td>{org.contactNo}</td>
                    <td>{org.organizationEmail}</td>
                    <td>{org.paymentMethod}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" style={{ textAlign: "center" }}>
                    No matching results found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OrganizationPage;
