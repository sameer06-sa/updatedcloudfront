import axios from 'axios';

const API_URL = 'http://localhost:3000/api/add-user'; // Base URL for all user-related API requests

// Fetch all users
export const getAllUsers = async () => {
  try {
    const response = await axios.get(API_URL); // Fetch all users from correct endpoint
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

// Create a new user
export const createUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/add-user`, userData); // Create a new user with correct endpoint
    return response.data;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

// Update a user
export const updateUser = async (id, userData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, userData); // Update a specific user
    return response.data;
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};

// Delete a user
export const deleteUser = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/delete-user/${id}`); // Correct DELETE URL for deleting user
    return response.data;
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
};