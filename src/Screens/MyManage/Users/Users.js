// import React, { useState } from 'react';
// import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Checkbox, Button } from '@mui/material';
// import DeleteIcon from '@mui/icons-material/Delete';
// import RefreshIcon from '@mui/icons-material/Refresh';
// import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
// import AddIcon from '@mui/icons-material/Add';
// import './Users.css';
// import UsersSidebar from '../../../Settings/UsersSidebar';
// import Header from '../../../Components/Header/Header';


// const Users = () => {
//   const users = [
//     { username: 'xyz', adminName: 'xyz123@gmail.com', userType: 'Member', companyName: 'xyz_company', id: 1 },
//     { username: 'xyz2', adminName: 'xyz123@gmail.com', userType: 'Member', companyName: 'xyz_company', id: 2 },
//   ];
//   const [selected, setSelected] = useState([]);
//   const isAllSelected = users.length > 0 && selected.length === users.length;
//   const isIndeterminate = selected.length > 0 && selected.length < users.length;

//   const handleSelectAllClick = (event) => {
//     if (event.target.checked) {
//       setSelected(users.map((row) => row.id));
//     } else {
//       setSelected([]);
//     }
//   };

//   const handleRowClick = (id) => {
//     setSelected((prevSelected) =>
//       prevSelected.includes(id)
//         ? prevSelected.filter((selectedId) => selectedId !== id)
//         : [...prevSelected, id]
//     );
//   };

//   return (
//     <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
//       {/* Header */}
//       <Header />

//       <div style={{ display: 'flex', flex: 1 }}> {/* Adjust marginTop to match header height */}
//         <UsersSidebar />
//         {/* Main Content */}
//         <div style={{ padding: '10px',paddingLeft:'60px',  flex: 1, marginLeft: '10px' }}> {/* Adjust marginLeft to match sidebar width */}
//           <h2 className='user-title'>My Manage | Users</h2>
//           <div style={{ display: 'flex', justifyContent: 'flex-start', gap: '20px', marginBottom: '10px' }}>
//             <Button variant="text" color="primary" startIcon={<AddIcon />}>New User</Button>
//             <Button variant="text" color="primary" startIcon={<FileDownloadOutlinedIcon />}>Download Users</Button>
//             <Button variant="text" color="error" startIcon={<DeleteIcon />}>Delete Users</Button>
//             <Button variant="text" color="primary" startIcon={<RefreshIcon />}>Refresh</Button>
//           </div>
//           <div>
//             <input type="text" placeholder="Search" className="search-bar table-search-bar" />
//           </div>
//           <TableContainer>
//             <Table>
//               <TableHead>
//                 <TableRow>
//                   <TableCell>
//                     <Checkbox
//                       checked={isAllSelected}
//                       indeterminate={isIndeterminate}
//                       onChange={handleSelectAllClick}
//                     />
//                   </TableCell>
//                   <TableCell style={{ fontWeight: 'bold' }}>User Name</TableCell>
//                   <TableCell style={{ fontWeight: 'bold' }}>User Admin Name</TableCell>
//                   <TableCell style={{ fontWeight: 'bold' }}>User Type</TableCell>
//                   <TableCell style={{ fontWeight: 'bold' }}>Company Name</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {users.map((user) => (
//                   <TableRow key={user.id}>
//                     <TableCell>
//                       <Checkbox
//                         checked={selected.includes(user.id)}
//                         onChange={() => handleRowClick(user.id)}
//                       />
//                     </TableCell>
//                     <TableCell>{user.username}</TableCell>
//                     <TableCell>{user.adminName}</TableCell>
//                     <TableCell>{user.userType}</TableCell>
//                     <TableCell>{user.companyName}</TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </TableContainer>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Users;