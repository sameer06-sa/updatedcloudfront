import React, { createContext, useState, useContext, useEffect } from "react";
import { fetchDeploymentProjects } from "./services/deploymentProjectService";

const DeploymentProjectContext = createContext();

export const DeploymentProjectProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);

  // Fetch projects when the context is initialized
  useEffect(() => {
    const loadProjects = async () => {
      try {
        const data = await fetchDeploymentProjects(); 
        setProjects(data);
      } catch (error) {
        console.error("Error fetching deployment projects:", error);
      }
    };

    loadProjects();
  }, []);

  const addProject = (newProject) => {
    setProjects((prevProjects) => [...prevProjects, newProject]);
  };

  return (
    <DeploymentProjectContext.Provider value={{ projects, addProject }}>
      {children}
    </DeploymentProjectContext.Provider>
  );
};

export const useDeploymentProjects = () => useContext(DeploymentProjectContext);
