import React from "react";
import "./PropertiesModal.css";

const PropertiesModal = ({ properties, onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        {/* Close icon at the top-right corner */}
        <button className="close-icon" onClick={onClose}>
          &times;
        </button>

        <h2>Project Properties</h2>

        {/* Display project properties */}
        <div className="properties-list">
          {properties.map((property, index) => (
            <div key={index} className="property-item">
              {/* <h3>Project {index + 1}</h3> */}
              <p><strong>ID:</strong> {property.data._id}</p>
              <p><strong>Project Name:</strong> {property.data.projectName}</p>
              <p><strong>Organization Name:</strong> {property.data.organizationName}</p>
              <p><strong>Subscription Type:</strong> {property.data.subscriptionType}</p>
              <p><strong>Created By:</strong> {property.data.createdBy}</p>
            </div>
          ))}
        </div>

        {/* Close button at the bottom */}
        <div className="modal-actions">
          <button className="close-button" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default PropertiesModal;