import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Datastorageservice.css";
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
import "font-awesome/css/font-awesome.min.css";
import DataStoreDetailsModal from "../DataStoreDetailsModal";
import DatastoreDeleteConfirmationModal from "../DatastoreDeleteConfirmationModal"; // Import the renamed modal

const apiUrl = process.env.REACT_APP_API_URL;

const Datastoreservice = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [renameServiceName, setRenameServiceName] = useState("");
  const [renameServiceId, setRenameServiceId] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedDataStoreDetails, setSelectedDataStoreDetails] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteServiceId, setDeleteServiceId] = useState(null);
  const [deleteServiceName, setDeleteServiceName] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setFilteredData(
      data.filter(
        (item) =>
          item.serviceName.toLowerCase().includes(search.toLowerCase()) ||
          item.organizationName.toLowerCase().includes(search.toLowerCase()) ||
          item.serviceType.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, data]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/datastore`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setData(response.data);
      setFilteredData(response.data);
    } catch (error) {
      toast.error("Failed to fetch data");
    }
  };

  const handleCreate = () => navigate("/Datacloudcreation");

  const handleEdit = () => {
    if (selectedRows.length === 1) {
      const selectedData = data[selectedRows[0]];
      setRenameServiceName(selectedData.serviceName);
      setRenameServiceId(selectedData._id);
    } else {
      toast.warning("Please select exactly one service to rename");
    }
  };

  const handleRenameSave = async () => {
    if (renameServiceName.trim() === "") {
      toast.warning("Please enter a valid name.");
      return;
    }

    try {
      await axios.put(
        `${apiUrl}/api/datastore/${renameServiceId}`,
        { serviceName: renameServiceName },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      toast.success("Service renamed successfully!");
      setRenameServiceName("");
      setRenameServiceId(null);
      fetchData();
    } catch (error) {
      console.error("Error renaming service:", error);
      toast.error("Failed to rename the service");
    }
  };

  const handleDelete = () => {
    if (selectedRows.length === 0) {
      toast.warning("Select at least one service to delete");
      return;
    }

    const selectedIndex = selectedRows[0]; // Assuming only one row is selected
    const selectedData = filteredData[selectedIndex];
    setDeleteServiceId(selectedData._id);
    setDeleteServiceName(selectedData.serviceName);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await axios.delete(`${apiUrl}/api/datastore/${deleteServiceId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      setData(data.filter((item) => item._id !== deleteServiceId));
      setFilteredData(filteredData.filter((item) => item._id !== deleteServiceId));
      setSelectedRows([]);
      toast.success("Data store deleted successfully!");
    } catch (error) {
      console.error("Error deleting data store:", error);
      toast.error("Failed to delete the data store.");
    } finally {
      setShowDeleteModal(false);
      setDeleteServiceId(null);
      setDeleteServiceName("");
    }
  };

  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
    setDeleteServiceId(null);
    setDeleteServiceName("");
  };

  const handleDetails = async () => {
    if (selectedRows.length === 0) {
      toast.warning("Please select at least one service to view details.");
      return;
    }

    try {
      const selectedIndex = selectedRows[0]; // Assuming only one row is selected
      const selectedData = filteredData[selectedIndex];
      const response = await axios.get(`${apiUrl}/api/datastore/${selectedData._id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      setSelectedDataStoreDetails(response.data);
      setShowDetailsModal(true);
    } catch (error) {
      console.error("Error fetching details:", error);
      toast.error("Failed to fetch data store details.");
    }
  };

  const handleSelectRow = (index) => {
    setSelectedRows((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const handleSelectAll = () => {
    setSelectedRows(
      selectedRows.length === filteredData.length ? [] : filteredData.map((_, index) => index)
    );
  };

  const handleServiceNameClick = (serviceName) => {
    navigate(`/Datacloudoverview`);
  };

  return (
    <div className="cloud-data-store-container">
      <Header />
      <Sidebar />
      <header className="cloud-header">
        <h1>Data Store</h1>
        <input
          type="text"
          className="Data-overview11"
          placeholder="Search Services"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </header>
      <div className="cloud-actions">
        <button className="cloud-action-button" onClick={handleCreate}>
          <i className="fa fa-plus" /> Create
        </button>
        <button className="cloud-action-button" onClick={handleEdit} disabled={selectedRows.length !== 1}>
          <i className="fa fa-pencil" /> Edit
        </button>
        <button className="cloud-action-button" onClick={handleDelete} disabled={selectedRows.length === 0}>
          <i className="fa fa-trash" /> Delete
        </button>
        <button className="cloud-action-button" onClick={handleDetails} disabled={selectedRows.length === 0}>
          <i className="fa fa-info-circle" /> Details
        </button>
      </div>
      <p className="cloud-services-info1">Available {filteredData.length} services</p>
      <table className="cloud-data-table">
        <thead>
          <tr>
            <th>
              <input type="checkbox" checked={selectedRows.length === filteredData.length && filteredData.length > 0} onChange={handleSelectAll} />
            </th>
            <th>Service Name</th>
            <th>Service Type</th>
            <th>Project Name</th>
            <th>Project ID</th>
            <th>Subscription</th>
            <th>Organization Name</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.length > 0 ? (
            filteredData.map((item, index) => (
              <tr key={index}>
                <td>
                  <input type="checkbox" checked={selectedRows.includes(index)} onChange={() => handleSelectRow(index)} />
                </td>
                <td>
                  <button onClick={() => handleServiceNameClick(item.serviceName)}>{item.serviceName}</button>
                </td>
                <td>{item.serviceType}</td>
                <td>{item.projectName}</td>
                <td>{item.projectId}</td>
                <td>{item.subscription}</td>
                <td>{item.organizationName}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="no-results">No matching results found.</td>
            </tr>
          )}
        </tbody>
      </table>

      {renameServiceId && (
        <div className="rename-modal">
          <div className="rename-modal-content">
            <i 
              className="fa fa-times close-icon"
              onClick={() => {
                setRenameServiceName("");
                setRenameServiceId(null);
              }}
            />
            <h3>Rename a Service</h3>
            <input
              type="text"
              value={renameServiceName}
              onChange={(e) => setRenameServiceName(e.target.value)}
              placeholder="Enter new service name"
            />
            <div className="rename-actions">
              <button onClick={handleRenameSave} className="button save">
                Save
              </button>
              <button
                onClick={() => {
                  setRenameServiceName("");
                  setRenameServiceId(null);
                }}
                className="button cancel"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {showDetailsModal && (
        <DataStoreDetailsModal
          details={selectedDataStoreDetails}
          onClose={() => setShowDetailsModal(false)}
        />
      )}

      {showDeleteModal && (
        <DatastoreDeleteConfirmationModal
          serviceName={deleteServiceName}
          onConfirm={handleDeleteConfirm}
          onCancel={handleDeleteCancel}
        />
      )}

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default Datastoreservice;