import { Navigate, Outlet } from "react-router-dom";
 
// Mock function to check if the user is authenticated
const isAuthenticated = () => {
  return localStorage.getItem("token"); // Replace with actual auth logic
};
 
const PrivateRoute = () => {
  return isAuthenticated() ? <Outlet /> : <Navigate to="/signin" />;
};
 
export default PrivateRoute;