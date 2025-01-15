import React, { useState } from 'react';
import { createUser } from '../Services/UserServices';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, MenuItem, Typography, Alert } from '@mui/material';
import Header from '../Header/Header'; // Import Header component

const CreateUser = () => {
  const [formData, setFormData] = useState({
    userName: '',
    userAdminName: '',
    userType: '',
    companyName: '',
  });
  const [error, setError] = useState(''); // For error messages
  const [success, setSuccess] = useState(false); // For success confirmation
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors
    setSuccess(false); // Clear previous success state

    // Simple client-side validation
    if (!formData.userName || !formData.userAdminName || !formData.userType || !formData.companyName) {
      setError('All fields are required.');
      return;
    }

    try {
      await createUser(formData);
      setSuccess(true); // Show success message
      setError(''); // Clear any previous error message
      setTimeout(() => {
        navigate('/manage-users'); // Redirect to manage-users page after 2 seconds
      }, 2000); // Redirect after 2 seconds
    } catch (err) {
      console.error('Error creating user:', err);
      setError('Failed to create user. Please try again.');
    }
  };

  return (
    <div>
      {/* Add Header component */}
      <Header />
      
      <div style={{ padding: '20px',paddingTop:'40px', maxWidth: '600px', margin: 'auto',marginTop:'30px' }}>
        <Typography variant="h4" gutterBottom>
          Create New User
        </Typography>
        {error && <Alert severity="error" style={{ marginBottom: '16px' }}>{error}</Alert>}
        {success && <Alert severity="success" style={{ marginBottom: '16px' }}>User created successfully! Redirecting...</Alert>}
        
        <form onSubmit={handleSubmit}>
          <TextField
            label="User Name"
            name="userName"
            value={formData.userName}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Admin Email"
            name="userAdminName"
            type="email"
            value={formData.userAdminName}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="User Type"
            name="userType"
            value={formData.userType}
            onChange={handleChange}
            select
            fullWidth
            margin="normal"
            required
          >
            <MenuItem value="Admin">Admin</MenuItem>
            <MenuItem value="Editor">Editor</MenuItem>
            <MenuItem value="Viewer">Viewer</MenuItem>
          </TextField>
          <TextField
            label="Company Name"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Create User
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CreateUser;