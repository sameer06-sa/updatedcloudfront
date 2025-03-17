import React from "react";
// import "./DatastoreDeleteConfirmationModal.css"; // Update CSS import if needed

const DatastoreDeleteConfirmationModal = ({
  serviceName,
  onConfirm,
  onCancel,
}) => {
  return (
    <div className="delete-modal-overlay">
      <div className="delete-modal-content">
        <h3>Delete Data Store</h3>
        <p>Are you sure you want to delete the data store <strong>{serviceName}</strong>?</p>
        <div className="delete-modal-actions">
          <button className="delete-confirm-button" onClick={onConfirm}>
            Yes
          </button>
          <button className="delete-cancel-button" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DatastoreDeleteConfirmationModal;