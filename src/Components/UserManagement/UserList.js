import React, { useEffect, useState } from 'react';
import { getAllUsers } from '../Services/UserServices';
import { Link, useNavigate } from 'react-router-dom'; 
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Checkbox, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import RefreshIcon from '@mui/icons-material/Refresh';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import AddIcon from '@mui/icons-material/Add';
import UsersSidebar from '../../Settings/UsersSidebar';
import Header from '../Header/Header';

const UserList = () => {
  const [users, setUsers] = useState([]); // List of users
  const [selected, setSelected] = useState([]); // Selected users
  const [searchTerm, setSearchTerm] = useState(''); // Search term
  const navigate = useNavigate(); // useNavigate hook for navigation

  const isAllSelected = users.length > 0 && selected.length === users.length;
  const isIndeterminate = selected.length > 0 && selected.length < users.length;

  // Fetch users on component mount
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await getAllUsers();
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      setSelected(users.map((user) => user._id));
    } else {
      setSelected([]);
    }
  };

  const handleRowClick = (id) => {
    setSelected((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((selectedId) => selectedId !== id)
        : [...prevSelected, id]
    );
  };

  const handleDelete = (id) => {
    // Navigate to deleteuser.js with the userId as a parameter
    navigate(`/delete-user/${id}`);
  };

  const handleDeleteSelected = () => {
    // Handle deletion of selected users here, or navigate to deleteuser.js for batch delete
    selected.forEach(id => {
      navigate(`/delete-user/${id}`);
    });
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <Header />
      <div style={{ display: 'flex', flex: 1, marginTop: '60px' }}>
        <UsersSidebar />
        <div style={{ padding: '10px', paddingLeft: '40px', flex: 1, marginLeft: '10px' }}>
          <h2 className="user-title">My Manage | Users</h2>
          <div style={{ display: 'flex', justifyContent: 'flex-start', gap: '20px', marginBottom: '10px' }}>
            <Button variant="text" color="primary" startIcon={<AddIcon />}>
              <Link to="/create-user" style={{ textDecoration: 'none', color: 'inherit' }}>
                New User
              </Link>
            </Button>
            <Button variant="text" color="primary" startIcon={<FileDownloadOutlinedIcon />}>
              Download Users
            </Button>
            <Button variant="text" color="error" startIcon={<DeleteIcon />} onClick={handleDeleteSelected}>
              Delete Users
            </Button>
            <Button variant="text" color="primary" startIcon={<RefreshIcon />} onClick={fetchUsers}>
              Refresh
            </Button>
          </div>

          <div className="search-bar table-search-bar">
            <input type="text" placeholder="Search" value={searchTerm} onChange={handleSearchChange} />
          </div>

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Checkbox
                      checked={isAllSelected}
                      indeterminate={isIndeterminate}
                      onChange={handleSelectAllClick}
                    />
                  </TableCell>
                  <TableCell>User ID</TableCell>
                  <TableCell>User Name</TableCell>
                  <TableCell>User Admin Name</TableCell>
                  <TableCell>User Type</TableCell>
                  <TableCell>Company Name</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users
                  .filter((user) => user.userName.toLowerCase().includes(searchTerm.toLowerCase()))
                  .map((user) => (
                    <TableRow key={user._id}>
                      <TableCell>
                        <Checkbox
                          checked={selected.includes(user._id)}
                          onChange={() => handleRowClick(user._id)}
                        />
                      </TableCell>
                      <TableCell>{user._id}</TableCell>
                      <TableCell>{user.userName}</TableCell>
                      <TableCell>{user.userAdminName}</TableCell>
                      <TableCell>{user.userType}</TableCell>
                      <TableCell>{user.companyName}</TableCell>
                      <TableCell>
                        <Button
                          variant="outlined"
                          color="secondary"
                          onClick={() => handleDelete(user._id)} // Navigate to delete user page
                        >
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </div>
  );
};

export default UserList;