import React, { useEffect, useState } from "react";
import "./Project.css";
import Header from "../../Components/Header/Header";
import { useServiceTracking } from "../../Hooks/UseServiceTracking";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrashAlt,
  faCogs,
  faPen,
  faPlus,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";

const ProjectsPage = () => {
  const navigate = useNavigate();
  const startTracking = useServiceTracking();
  const [projects, setProjects] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [selectedProjects, setSelectedProjects] = useState([]);
  const [isRenameModalOpen, setIsRenameModalOpen] = useState(false);
  const [renameProjectName, setRenameProjectName] = useState("");
  const [renameProjectId, setRenameProjectId] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [notification, setNotification] = useState("");
  const [projectToDelete, setProjectToDelete] = useState(null);
  const [propertiesData, setPropertiesData] = useState(null);

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
      const response = await axios.get(
        `http://localhost:3000/api/proj/projects`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Access the 'data' array within the API response
      if (Array.isArray(response.data.data)) {
        setProjects(response.data.data);
        setFilteredProjects(response.data.data);
      } else {
        console.error(
          "API response does not contain an array in 'data'.",
          response.data
        );
      }
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  const handleCreateClick = () => {
    navigate("/create-project");
  };

  const handleEditClick = () => {
    if (selectedProjects.length === 1) {
      const projectId = selectedProjects[0];
      navigate(`/edit-project/${projectId}`);
    } else {
      alert("Please select one project to edit.");
    }
  };

  const handleDeleteClick = () => {
    if (selectedProjects.length > 0) {
      const projectsToDelete = projects.filter((project) =>
        selectedProjects.includes(project._id)
      );
      setProjectToDelete(projectsToDelete);
      setIsDeleteModalOpen(true);
    } else {
      alert("Please select at least one project to delete.");
    }
  };

  const confirmDelete = async () => {
    if (!projectToDelete || projectToDelete.length === 0) return;

    try {
      const token = localStorage.getItem("token");

      await Promise.all(
        projectToDelete.map((project) =>
          axios.delete(
            `http://localhost:3000/api/proj/projects/${project._id}`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          )
        )
      );

      setProjects(
        projects.filter((project) => !projectToDelete.includes(project))
      );
      setFilteredProjects(
        filteredProjects.filter((project) => !projectToDelete.includes(project))
      );
      setSelectedProjects([]);
      setNotification(
        `${projectToDelete.length} project(s) have been successfully deleted.`
      );

      setTimeout(() => {
        setNotification("");
      }, 2000);
    } catch (error) {
      console.error("Error deleting project:", error);
      setNotification("Failed to delete the project(s).");
    } finally {
      setIsDeleteModalOpen(false);
      setProjectToDelete(null);
    }
  };

  const handlePropertiesClick = async () => {
    if (selectedProjects.length === 0) {
      alert("Please select at least one project to view properties.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const responses = await Promise.all(
        selectedProjects.map((projectId) =>
          axios.get(`http://localhost:3000/api/proj/projects/${projectId}`, {
            headers: { Authorization: `Bearer ${token}` },
          })
        )
      );
      setPropertiesData(responses.map((res) => res.data));
    } catch (error) {
      console.error("Error fetching properties:", error);
      alert("Failed to fetch project properties.");
    }
  };

  const handleRenameClick = () => {
    if (selectedProjects.length === 1) {
      const projectId = selectedProjects[0];
      const project = projects.find((proj) => proj._id === projectId);
      setRenameProjectName(project.projectName);
      setRenameProjectId(projectId);
      setIsRenameModalOpen(true);
    } else {
      alert("Please select one project to rename.");
    }
  };

  const handleRenameSave = async () => {
    if (renameProjectName.trim() === "") {
      alert("Please enter a new name for the project.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:3000/api/proj/projects/${renameProjectId}`,
        { projectName: renameProjectName },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setNotification(`${renameProjectName} has been renamed successfully!`);
      setTimeout(() => {
        setNotification("");
      }, 2000);
      fetchProjects();
      setIsRenameModalOpen(false);
    } catch (error) {
      console.error("Error renaming project:", error);
      alert("Failed to rename the project.");
    }
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
        <div className="search-bar-container">
          <FontAwesomeIcon icon={faSearch} className="search-icon" />
          <input
            type="text"
            placeholder="Search Projects..."
            className="search-bar"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        {notification && (
          <div className="notification success">{notification}</div>
        )}
        <div className="action">
          <button className="proj-button" onClick={handleCreateClick}>
            <FontAwesomeIcon icon={faPlus} /> Create
          </button>
          <button
            className="proj-button"
            onClick={handleRenameClick}
            disabled={selectedProjects.length !== 1}
          >
            <FontAwesomeIcon icon={faPen} /> Rename
          </button>
          <button
            className="proj-button"
            onClick={handleDeleteClick}
            disabled={selectedProjects.length === 0}
          >
            <FontAwesomeIcon icon={faTrashAlt} /> Delete
          </button>
          <button
            className="proj-button"
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
                  checked={
                    filteredProjects.length > 0 &&
                    selectedProjects.length === filteredProjects.length
                  }
                  disabled={filteredProjects.length === 0}
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
                  <td>{project.projectName}</td>
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
        {isRenameModalOpen && (
          <div className="modal-overlay">
            <div className="modal">
              <h2>Rename a Project</h2>
              <input
                type="text"
                value={renameProjectName}
                onChange={(e) => setRenameProjectName(e.target.value)}
              />
              <div className="modal-actions">
                <button onClick={handleRenameSave} className="button">
                  Save
                </button>
                <button
                  onClick={() => setIsRenameModalOpen(false)}
                  className="button"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
        {isDeleteModalOpen && (
          <div className="modal-overlay">
            <div className="modal">
              <h2>Confirm Deletion</h2>
              <p>Are you sure you want to delete the selected project(s)?</p>
              <div className="modal-actions">
                <button onClick={confirmDelete} className="button">
                  Delete
                </button>
                <button
                  onClick={() => setIsDeleteModalOpen(false)}
                  className="button"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
        {propertiesData && (
          <div className="properties-modal">
            <h2>Project Properties</h2>
            <pre>{JSON.stringify(propertiesData, null, 2)}</pre>
            <button onClick={() => setPropertiesData(null)} className="button">
              Close
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default ProjectsPage;
