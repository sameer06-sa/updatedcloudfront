import React from "react";
import "./DeleteConfirmationModal.css"; // Add CSS for styling

const DeleteConfirmationModal = ({
  projectName,
  onConfirm,
  onCancel,
}) => {
  return (
    <div className="delete-modal-overlay">
      <div className="delete-modal-content">
        <h3>Delete Project</h3>
        <p>Are you sure you want to delete the project <strong>{projectName}</strong>?</p>
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

export default DeleteConfirmationModal;