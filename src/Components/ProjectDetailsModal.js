import React from "react";
import "./ProjectDetailsModal.css"; // Add CSS for styling

const ProjectDetailsModal = ({ project, onClose }) => {
  return (
    <div className="project-details-modal-overlay">
      <div className="project-details-modal-content">
        <button className="close-icon" onClick={onClose}>
          &times;
        </button>
        <h2>Project Details</h2>
        <div className="project-details-list">
          <p><strong>Project Name:</strong> {project.projectName}</p>
          <p><strong>Subscription:</strong> {project.subscriptionName}</p>
          <p><strong>Organization:</strong> {project.organizationName}</p>
          {/* <p><strong>Subscription ID:</strong> {project.subscriptionId}</p> */}
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

export default ProjectDetailsModal;