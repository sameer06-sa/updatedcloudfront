import React, { useState } from 'react';
import { updateUser } from '../Services/UserServices';

const EditUser = ({ user, onClose, onUserUpdated }) => {
  const [formData, setFormData] = useState({
    userName: user.userName,
    userAdminName: user.userAdminName,
    userType: user.userType,
    companyName: user.companyName,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateUser(user._id, formData);
      alert('User updated successfully');
      onUserUpdated(); // Refresh the user list in the parent component
      onClose(); // Close the modal or form
    } catch (error) {
      console.error('Error updating user:', error);
      alert('Failed to update user');
    }
  };

  return (
    <div className="edit-user-modal">
      <form onSubmit={handleSubmit}>
        <h2>Edit User</h2>
        <label>
          User Name:
          <input
            type="text"
            name="userName"
            value={formData.userName}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Admin Name:
          <input
            type="text"
            name="userAdminName"
            value={formData.userAdminName}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          User Type:
          <select
            name="userType"
            value={formData.userType}
            onChange={handleChange}
            required
          >
            <option value="Admin">Admin</option>
            <option value="Editor">Editor</option>
            <option value="Viewer">Viewer</option>
          </select>
        </label>
        <label>
          Company Name:
          <input
            type="text"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            required
          />
        </label>
        <div className="form-actions">
          <button type="submit">Save Changes</button>
          <button type="button" onClick={onClose}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditUser;