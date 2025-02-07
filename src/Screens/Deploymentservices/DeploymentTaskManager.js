import React, { useEffect, useState } from "react";
import DeploymentSidebar from "../../Screens/Deploymentservices/DeploymentSidebar";

const DeploymentTaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [taskName, setTaskName] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [status, setStatus] = useState("Pending");
  const [area, setArea] = useState("");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/tasks");
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const createTask = async () => {
    if (!taskName || !assignedTo || !area) {
      alert("Please fill in all required fields.");
      return;
    }

    const newTask = { taskName, assignedTo, status, area };

    try {
      const response = await fetch("http://localhost:3000/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTask),
      });

      if (response.ok) {
        const createdTask = await response.json();
        setTasks([...tasks, createdTask]); 
        setTaskName("");
        setAssignedTo("");
        setStatus("Pending");
        setArea("");
      } else {
        console.error("Failed to create task");
      }
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="w-64 fixed left-0 top-0 h-screen bg-gray-100 shadow-lg">
        <DeploymentSidebar />
      </div>

      {/* Main Content */}
      <div className="flex-grow p-6 bg-white w-1000 rounded-lg ml-64">
        <div className="mt-10">
          {/* Top Section */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">Tasks</h2>
          </div>
          
          
            {/* Search Bar */}
            <div className="flex items-center border-gray-300 rounded-lg px-3 py-2 w-64 bg-white">
              <input
                type="text"
                placeholder="Search tasks..."
                className="ml-2 outline-none w-full"
              />
            </div>
          </div>

          {/* Filter Section */}
          <div className="mt-16 bg-white shadow-md p-4 rounded-lg border-b border-gray-300">
            <div className="flex items-center gap-3 mb-3 border-b pb-3 border-gray-300">
              <span className="text-gray-600 font-medium flex items-center gap-1">
                Filter by:
              </span>
              <span className="text-black font-medium">✅ Task</span>
            </div>

          {/* Create Task Form */}
          <div className="bg-gray-50 p-4 rounded-lg border mb-6">
            <h2 className="text-lg font-semibold mb-3">Create a New Task</h2>
            <div className="grid grid-cols-4 gap-3">
              <input
                type="text"
                placeholder="Task Name"
                className="p-2 border rounded-lg"
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
              />
              <input
                type="text"
                placeholder="Assigned To"
                className="p-2 border rounded-lg"
                value={assignedTo}
                onChange={(e) => setAssignedTo(e.target.value)}
              />
              <select
                className="p-2 border rounded-lg"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
              <input
                type="text"
                placeholder="Area"
                className="p-2 border rounded-lg"
                value={area}
                onChange={(e) => setArea(e.target.value)}
              />
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded-lg"
                onClick={createTask}
              >
                + Create Task
              </button>
            </div>
          </div>

          {/* Task Table */}
          <div className="mt-6 bg-white shadow-md rounded-lg overflow-hidden">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100 border-b">
                  <th className="text-left p-3 text-gray-700">ID</th>
                  <th className="text-left p-3 text-gray-700">Task</th>
                  <th className="text-left p-3 text-gray-700">Assigned To</th>
                  <th className="text-left p-3 text-gray-700">Status</th>
                  <th className="text-left p-3 text-gray-700">Area</th>
                </tr>
              </thead>
              <tbody>
                {tasks.length > 0 ? (
                  tasks.map((task) => (
                    <tr key={task._id}>
                      <td className="text-left p-3 text-gray-700">{task._id}</td>
                      <td className="text-left p-3 text-gray-700">{task.taskName}</td>
                      <td className="text-left p-3 text-gray-700">{task.assignedTo}</td>
                      <td className="text-left p-3 text-gray-700">{task.status}</td>
                      <td className="text-left p-3 text-gray-700">{task.area}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center p-6 text-gray-500">
                      No tasks match your filter
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeploymentTaskManager;
