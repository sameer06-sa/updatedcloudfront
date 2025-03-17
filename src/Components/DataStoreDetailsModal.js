import React from "react";
import "./DataStoreDetailsModal.css"; // Add CSS for styling

const DataStoreDetailsModal = ({ details, onClose }) => {
  return (
    <div className="details-modal-overlay">
      <div className="details-modal-content">
        <button className="close-icon" onClick={onClose}>
          &times;
        </button>
        <h2>Data Store Details</h2>
        <div className="details-list">
          <p><strong>Service Name:</strong> {details.serviceName}</p>
          <p><strong>Service Type:</strong> {details.serviceType}</p>
          <p><strong>Project Name:</strong> {details.projectName}</p>
          <p><strong>Project ID:</strong> {details.projectId}</p>
          <p><strong>Subscription:</strong> {details.subscription}</p>
          <p><strong>Organization Name:</strong> {details.organizationName}</p>
        </div>
        <div className="modal-actions">
          <button className="close-button" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default DataStoreDetailsModal;