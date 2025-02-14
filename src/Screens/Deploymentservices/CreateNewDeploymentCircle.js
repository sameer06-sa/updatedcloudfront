import React, { useState } from "react";

const CreateNewDeploymentCircle = () => {  // Renamed Component
  const [formData, setFormData] = useState({
    name: "",
    start: "",
    end: "",
    project: "sample_project",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-white">
      <div className="bg-white p-6 rounded-2xl shadow-lg w-[450px]">
        <h2 className="text-xl font-semibold mb-4">New Circle</h2>  {/* Updated Name */}
        
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
            <option value="sample_project">sample_project</option>
            <option value="project_2">project_2</option>
            <option value="project_3">project_3</option>
          </select>
        </div>

        <div className="flex justify-between">
          <button className="px-4 py-2 bg-white border rounded-lg text-gray-700 hover:bg-gray-100">
            Cancel
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Create Circle
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateNewDeploymentCircle;
