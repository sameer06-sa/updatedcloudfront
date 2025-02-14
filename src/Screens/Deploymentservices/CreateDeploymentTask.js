import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "./DeploymentHeader";
import DeploymentSidebar from "../../Screens/Deploymentservices/DeploymentSidebar";
 
const CreateDeploymentTask = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [taskDetails, setTaskDetails] = useState(null);
  const [editedTask, setEditedTask] = useState({});
 
  useEffect(() => {
    if (location.state && location.state.task) {
      setTaskDetails(location.state.task);
      setEditedTask(location.state.task);
    }
  }, [location]);
 
  if (!taskDetails) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg text-gray-600">Loading task details...</p>
      </div>
    );
  }
 
  const handleSaveChanges = () => {
    console.log("Updated Task:", editedTask);
    alert("Task changes saved!");
  };
 
  const handleCancel = () => {
    navigate("/tasks");
  };
 
  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="w-64 fixed left-0 top-0 h-screen">
        <DeploymentSidebar />
      </div>
 
      {/* Main Content */}
      <div className="flex flex-col flex-grow ml-64 p-6">
        {/* Header */}
        <Header />
 
        {/* Task Details */}
        <div className="bg-white p-6 rounded-lg shadow-md mt-6 w-full max-w-6xl mx-auto">
          {/* Task Header */}
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold">{editedTask.taskName}</h1>
              <p className="text-gray-500">{editedTask.area}</p>
            </div>
            <div className="flex space-x-3">
              <button className="px-4 py-2 bg-gray-200 text-blue-600 rounded-lg">
                Follow
              </button>
              <button
                onClick={() => navigate("/tasks")}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg"
              >
                + Update Status
              </button>
            </div>
          </div>
 
          {/* Content Grid */}
          <div className="grid grid-cols-2 gap-6 mt-4">
            {/* Task Description */}
            <div className="bg-gray-50 p-4 rounded-lg border">
              <h2 className="text-lg font-semibold">Task Description</h2>
              <textarea
                value={editedTask.description || ""}
                onChange={(e) =>
                  setEditedTask({ ...editedTask, description: e.target.value })
                }
                className="mt-2 w-full h-24 p-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              ></textarea>
            </div>
 
            {/* Task Details */}
            <div className="bg-gray-50 p-4 rounded-lg border">
              <h2 className="text-lg font-semibold">Task Details</h2>
              <div className="mt-3">
                <p className="text-gray-600 font-medium">Status</p>
                <p className="flex items-center gap-2">
                  <span
                    className={`h-2 w-2 rounded-full ${
                      editedTask.status === "Completed"
                        ? "bg-green-500"
                        : editedTask.status === "In Progress"
                        ? "bg-yellow-500"
                        : "bg-gray-500"
                    }`}
                  ></span>{" "}
                  {editedTask.status}
                </p>
              </div>
              <div className="mt-3">
                <p className="text-gray-600 font-medium">Assigned To</p>
                <p>{editedTask.assignedTo}</p>
              </div>
            </div>
          </div>
 
          {/* Discussion & Timeline */}
          <div className="grid grid-cols-2 gap-6 mt-4">
            {/* Discussion */}
            <div className="bg-gray-50 p-4 rounded-lg border">
              <h2 className="text-lg font-semibold">Discussion</h2>
              <textarea
                placeholder="Add a comment... Use # to reference tasks. @ to mention team members"
                className="mt-2 w-full h-20 p-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                rows="4"
              ></textarea>
              <button className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg">
                Post Comment
              </button>
            </div>
 
            {/* Timeline */}
            <div className="bg-gray-50 p-4 rounded-lg border">
              <h2 className="text-lg font-semibold">Timeline</h2>
              <div className="mt-2">
                <label className="block text-gray-600 font-medium">
                  Start Date
                </label>
                <input
                  type="date"
                  value={editedTask.startDate || ""}
                  onChange={(e) =>
                    setEditedTask({ ...editedTask, startDate: e.target.value })
                  }
                  className="w-full p-2 border rounded-lg mt-1"
                />
              </div>
              <div className="mt-2">
                <label className="block text-gray-600 font-medium">
                  Due Date
                </label>
                <input
                  type="date"
                  value={editedTask.dueDate || ""}
                  onChange={(e) =>
                    setEditedTask({ ...editedTask, dueDate: e.target.value })
                  }
                  className="w-full p-2 border rounded-lg mt-1"
                />
              </div>
            </div>
          </div>
 
          {/* Action Buttons */}
          <div className="flex justify-end space-x-3 mt-6">
            <button
              onClick={handleCancel}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveChanges}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
 
export default CreateDeploymentTask;