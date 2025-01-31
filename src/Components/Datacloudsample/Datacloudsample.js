import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaFolderPlus, FaUpload, FaSync, FaEdit, FaTrash } from "react-icons/fa"; // Importing icons
import "./Datacloudsample.css";
import Sidebar from "../Sidebar/Sidebar";
import Header from "../Header/Header";

const Datacloudsample = () => {
  const navigate = useNavigate();

  // Data for the table
  const [data, setData] = useState([
    { name: "Input Folder", created: "20-12-2024", type: "Folder", size: "2 GB", details: "This is a folder" },
    { name: "demo.csv", created: "20-12-2024", type: "CSV", size: "1 GB", details: "This is a folder" },
  ]);

  // State for search input
  const [searchQuery, setSearchQuery] = useState("");

  // State for filter dropdown
  const [filterType, setFilterType] = useState("All");

  // Filtered data based on search query and filter type
  const filteredData = data.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterType === "All" || item.type === filterType;
    return matchesSearch && matchesFilter;
  });

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <div className="Datacloudsample-sample-container">
      {/* Header */}
      <div>{<Header />}</div>
      <div>{<Sidebar/>}</div>

      <div className="Datacloudsample-header">
        <button className="Datacloudsample-back-icon" onClick={handleBackClick}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M20 11V13H8L13.5 18.5L12.08 19.92L4.16 12L12.08 4.07999L13.5 5.49999L8 11H20Z" fill="black"/>
</svg>

        </button>
        <h2>Sample</h2>
      </div>

      {/* Search Bar and Filter */}
      <div className="Datacloudsample-controls">
        <input
          type="text"
          className="Datacloudsample-search-bar"
          placeholder="Search Services"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        
      </div>

      {/* Action Buttons */}
      <div className="Datacloudsample-action-buttons">
        <button>
          <FaFolderPlus /> Create Folder
        </button>
        <button>
          <FaUpload /> Upload
        </button>
        <button>
          <FaSync /> Refresh
        </button>
        <button>
          <FaEdit /> Edit
        </button>
        <button>
          <FaTrash /> Delete
        </button>
      </div>
      <select
          className="Datacloudsample-filter-bar"
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
        >
          <option value="Filter">All</option>
          <option value="Folder">Folder</option>
          <option value="CSV">CSV</option>
        </select>

      {/* Table */}
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Created</th>
            <th>Type</th>
            <th>Size</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.created}</td>
              <td>{item.type}</td>
              <td>{item.size}</td>
              <td>{item.details}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Datacloudsample;
