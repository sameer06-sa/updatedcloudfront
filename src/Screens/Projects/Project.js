import React, { useEffect, useState } from "react";
import "./Project.css";
import Header from "../../Components/Header/Header";
import { useServiceTracking } from "../../Hooks/UseServiceTracking";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faCogs, faPen, faPlus, faSearch, faTimes } from "@fortawesome/free-solid-svg-icons";
import { toast, ToastContainer } from "react-toastify";
import { FaSearch } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";
import PropertiesModal from "../../Components/PropertiesModal";
import DeleteConfirmationModal from "../../Components/DeleteConfirmationModal";
import ProjectDetailsModal from "../../Components/ProjectDetailsModal"; // Import the project details modal

const apiUrl = process.env.REACT_APP_API_URL;



const ProjectsPage = () => {
  const navigate = useNavigate();
  const startTracking = useServiceTracking();
  const [projects, setProjects] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [selectedProjects, setSelectedProjects] = useState([]);
  const [renameProjectName, setRenameProjectName] = useState("");
  const [renameProjectId, setRenameProjectId] = useState(null);
  const [showPropertiesModal, setShowPropertiesModal] = useState(false);
  const [projectProperties, setProjectProperties] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteProjectId, setDeleteProjectId] = useState(null);
  const [deleteProjectName, setDeleteProjectName] = useState("");
  const [showProjectDetailsModal, setShowProjectDetailsModal] = useState(false);
  const [selectedProjectDetails, setSelectedProjectDetails] = useState(null);
  

  useEffect(() => {
    startTracking("All Projects", "Project");
    fetchProjects();
  }, []);

  useEffect(() => {
    const filtered = projects.filter(
      (project) =>
        project.projectName.toLowerCase().includes(search.toLowerCase()) ||
        project.organizationName.toLowerCase().includes(search.toLowerCase()) ||
        project.subscriptionName.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredProjects(filtered);
  }, [search, projects]);

  const fetchProjects = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`http://localhost:3000/api/proj/projects`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (Array.isArray(response.data.data)) {
        const projectsData = response.data.data.map((project) => ({
          ...project,
          subscriptionName: project.subscriptionType,
        }));
        setProjects(projectsData);
        setFilteredProjects(projectsData);
      } else {
        console.error("API response does not contain an array in 'data'.", response.data);
      }
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  const handleCreateClick = () => navigate("/create-project");

  const handleDeleteClick = () => {
    if (selectedProjects.length > 0) {
      const projectId = selectedProjects[0]; // Assuming only one project is selected
      const project = projects.find((proj) => proj._id === projectId);
      setDeleteProjectId(projectId);
      setDeleteProjectName(project.projectName);
      setShowDeleteModal(true);
    } else {
      toast.warning("Please select at least one project to delete.");
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:3000/api/proj/${deleteProjectId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setProjects((prev) =>
        prev.filter((project) => project._id !== deleteProjectId)
      );
      setFilteredProjects((prev) =>
        prev.filter((project) => project._id !== deleteProjectId)
      );
      setSelectedProjects((prev) =>
        prev.filter((id) => id !== deleteProjectId)
      );
      toast.success("Project deleted successfully!");
    } catch (error) {
      console.error("Error deleting project:", error);
      toast.error("Failed to delete the project.");
    } finally {
      setShowDeleteModal(false);
      setDeleteProjectId(null);
      setDeleteProjectName("");
    }
  };

  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
    setDeleteProjectId(null);
    setDeleteProjectName("");
  };

  const handleRenameClick = () => {
    if (selectedProjects.length === 1) {
      const projectId = selectedProjects[0];
      const project = projects.find((proj) => proj._id === projectId);
      setRenameProjectName(project.projectName);
      setRenameProjectId(projectId);
    } else {
      toast.warning("Please select exactly one project to rename.");
    }
  };

  const handleRenameSave = async () => {
    if (renameProjectName.trim() === "") {
      toast.warning("Please enter a valid name.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:3000/api/proj/${renameProjectId}`,
        { projectName: renameProjectName },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success("Project renamed successfully!");
      setRenameProjectName("");
      setRenameProjectId(null);
      fetchProjects();
    } catch (error) {
      console.error("Error renaming project:", error);
      toast.error("Failed to rename the project.");
    }
  };

  const handlePropertiesClick = async () => {
    if (selectedProjects.length === 0) {
      toast.warning("Please select at least one project to view properties.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const responses = await Promise.all(
        selectedProjects.map((projectId) =>
          axios.get(`http://localhost:3000/api/proj/${projectId}`, {
            headers: { Authorization: `Bearer ${token}` },
          })
        )
      );
      const properties = responses.map((res) => res.data);
      setProjectProperties(properties);
      setShowPropertiesModal(true);
    } catch (error) {
      console.error("Error fetching properties:", error);
      toast.error("Failed to fetch project properties.");
    }
  };

  const handleProjectNameClick = (project) => {
    setSelectedProjectDetails(project);
    setShowProjectDetailsModal(true);
  };

  const handleCheckboxChange = (projectId) => {
    if (selectedProjects.includes(projectId)) {
      setSelectedProjects(selectedProjects.filter((id) => id !== projectId));
    } else {
      setSelectedProjects([...selectedProjects, projectId]);
    }
  };

  const handleSelectAllChange = () => {
    if (selectedProjects.length === filteredProjects.length) {
      setSelectedProjects([]);
    } else {
      setSelectedProjects(filteredProjects.map((project) => project._id));
    }
  };

  return (
    <div className="projects-page">
      <Header />
      <main className="main">
        <h1 className="pro">Projects</h1>
        <div className="search-container">
          <input
            id="search-input"
            type="text"
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search Projects..."
            className="search-input"
          />
          <FaSearch className="search-icon" />
        </div>
        <div className="action">
          <button className="button3" onClick={handleCreateClick}>
            <FontAwesomeIcon icon={faPlus} /> Create
          </button>
          <button
            className="button3"
            onClick={handleRenameClick}
            disabled={selectedProjects.length !== 1}
          >
            <FontAwesomeIcon icon={faPen} /> Rename
          </button>
          <button
            className="button3"
            onClick={handleDeleteClick}
            disabled={selectedProjects.length === 0}
          >
            <FontAwesomeIcon icon={faTrashAlt} /> Delete
          </button>
          <button
            className="button3"
            onClick={handlePropertiesClick}
            disabled={selectedProjects.length !== 1}
          >
            <FontAwesomeIcon icon={faCogs} /> Properties
          </button>
        </div>
        <table className="projects-table">
          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  checked={selectedProjects.length === filteredProjects.length}
                  onChange={handleSelectAllChange}
                />
              </th>
              <th>Project Name</th>
              <th>Organization Name</th>
              <th>Subscription Name</th>
            </tr>
          </thead>
          <tbody>
            {filteredProjects.length > 0 ? (
              filteredProjects.map((project) => (
                <tr key={project._id}>
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedProjects.includes(project._id)}
                      onChange={() => handleCheckboxChange(project._id)}
                    />
                  </td>
                  <td>
                    <button
                      className="project-name-button"
                      onClick={() => handleProjectNameClick(project)}
                    >
                      {project.projectName}
                    </button>
                  </td>
                  <td>{project.organizationName}</td>
                  <td>{project.subscriptionName}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" style={{ textAlign: "center" }}>
                  No matching results found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
        {renameProjectId && (
          <div className="rename-modal">
            <div className="rename-modal-content">
              <FontAwesomeIcon
                icon={faTimes}
                className="close-icon"
                onClick={() => {
                  setRenameProjectName("");
                  setRenameProjectId(null);
                }}
              />
              <h3>Rename Project</h3>
              <input
                type="text"
                value={renameProjectName}
                onChange={(e) => setRenameProjectName(e.target.value)}
                placeholder="Enter new project name"
              />
              <div className="rename-actions">
                <button onClick={handleRenameSave} className="button save">
                  Save
                </button>
                <button
                  onClick={() => {
                    setRenameProjectName("");
                    setRenameProjectId(null);
                  }}
                  className="button cancel"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
        {showPropertiesModal && (
          <PropertiesModal
            properties={projectProperties}
            onClose={() => setShowPropertiesModal(false)}
          />
        )}
        {showDeleteModal && (
          <DeleteConfirmationModal
            projectName={deleteProjectName}
            onConfirm={handleDeleteConfirm}
            onCancel={handleDeleteCancel}
          />
        )}
        {showProjectDetailsModal && (
          <ProjectDetailsModal
            project={selectedProjectDetails}
            onClose={() => setShowProjectDetailsModal(false)}
          />
        )}
        <ToastContainer position="top-right" autoClose={3000} />
      </main>
    </div>
  );
};

export default ProjectsPage;