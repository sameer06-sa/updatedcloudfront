import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { toast, ToastContainer } from "react-toastify"; // Import toast and ToastContainer
import "react-toastify/dist/ReactToastify.css"; // Import styles for react-toastify
const apiUrl = process.env.REACT_APP_API_URL;
 
const CreateNewDeploymentCircle = () => {
  const [formData, setFormData] = useState({
    name: "",
    start: "",
    end: "",
    project: "",  // Initial value is an empty string
  });
  const navigate = useNavigate(); // Initialize navigate function
  const [projects, setProjects] = useState([]);  // State to hold project names
 
  // Fetch deployment projects when the component mounts
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/deploymentCircles/projects`);
        setProjects(response.data);  // Set projects in state
      } catch (error) {
        console.error("Error fetching projects:", error);
        toast.error("Failed to load projects.");
      }
    };
    fetchProjects();
  }, []);
 
  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
 
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${apiUrl}/api/deploymentCircles`, {
        name: formData.name,
        projectName: formData.project,
        startDate: formData.start,
        endDate: formData.end,
      });
      console.log("Deployment Circle Created:", response.data);
      toast.success("Deployment Circle Created Successfully!"); // Show success toast
      // navigate("/circle"); // Redirect to /circle page after successful creation
      setTimeout(() => {
        navigate("/circle"); // Redirect after 3 seconds
      }, 3000);
    } catch (error) {
      console.error("Error creating deployment circle:", error);
      toast.error("Failed to create deployment circle."); // Show error toast
    }
  };
 
  const handleCancel = () => {
    navigate("/circle"); // Redirect to /circle page on cancel
  };
 
  return (
    <div className="flex justify-center items-center min-h-screen bg--100">
      <div className="bg-white p-6 rounded-2xl shadow-lg w-[450px]">
        <h2 className="text-xl font-semibold mb-4">New Circle</h2>
 
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-600 text-sm mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter deployment circle name"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
 
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-gray-600 text-sm mb-1">Start</label>
              <input
                type="date"
                name="start"
                value={formData.start}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-600 text-sm mb-1">End</label>
              <input
                type="date"
                name="end"
                value={formData.end}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
 
          <div className="mb-4">
            <label className="block text-gray-600 text-sm mb-1">Project Name</label>
            <select
              name="project"
              value={formData.project}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select a project</option>
              {projects.map((project) => (
                <option key={project} value={project}>
                  {project}
                </option>
              ))}
            </select>
          </div>
 
          <div className="flex justify-between">
            <button
              type="button"
              onClick={handleCancel}
              className="px-4 py-2 bg-white border rounded-lg text-gray-700 hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Create Circle
            </button>
          </div>
        </form>
      </div>
 
      {/* Add ToastContainer to show toasts */}
      <ToastContainer />
    </div>
  );
};
 
export default CreateNewDeploymentCircle;