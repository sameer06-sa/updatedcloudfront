import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { deleteUser } from '../Services/UserServices'; // Import the deleteUser function
import Header from '../Header/Header';
import UsersSidebar from '../../Settings/UsersSidebar';
import { Button, CircularProgress, Typography } from '@mui/material';

const DeleteUser = () => {
  const { id } = useParams(); // Get the user ID from the URL
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  // Delete user on component mount
  useEffect(() => {
    const handleDelete = async () => {
      setLoading(true);
      try {
        await deleteUser(id); // Call the deleteUser function from services
        setSuccess(true); // If successful, update success state
      } catch (err) {
        setError('Failed to delete user. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    handleDelete(); // Trigger the deletion
  }, [id]);

  // Navigate back to the user list after successful deletion
  const goBackToUsers = () => {
    navigate('/manage-users');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <Header />
      <div style={{ display: 'flex', flex: 1, marginTop: '60px' }}>
        <UsersSidebar />
        <div style={{ padding: '20px', flex: 1, marginLeft: '10px' }}>
          {loading && (
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
              <CircularProgress />
            </div>
          )}
          {error && (
            <Typography color="error" variant="h6" style={{ textAlign: 'center', marginTop: '20px' }}>
              {error}
            </Typography>
          )}
          {success && (
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
              <Typography variant="h5" color="primary">
                User deleted successfully!
              </Typography>
              <Button
                variant="contained"
                color="primary"
                style={{ marginTop: '20px' }}
                onClick={goBackToUsers}
              >
                Go back to User List
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DeleteUser;